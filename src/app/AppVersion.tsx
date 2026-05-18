import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Play, Pause, Home, Heart, Settings, Accessibility, ChevronLeft, ChevronDown, Share2, Compass, Bell, Star, Navigation, Info, MessageCircle, X } from 'lucide-react';
import { MOCK_REGIONS, MOCK_PLACES } from '../types';
import type { Place, Region, SubRegion } from '../types';

export default function AppVersion() {
  const [isSplash, setIsSplash] = useState(true);
  
  // Navigation & Core State
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedSubRegion, setSelectedSubRegion] = useState<SubRegion | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Day 1-3 New Features: Saved Places & Player State
  const [savedPlaces, setSavedPlaces] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scriptIndex, setScriptIndex] = useState(0);

  const mockScript = [
    "경복궁에 오신 것을 환영합니다.",
    "이곳은 조선 제일의 법궁으로,",
    "오백 년 왕조의 숨결이 살아있는 공간입니다.",
    "근정전을 바라보며 천천히 걸어보세요."
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Player Script Timer
  useEffect(() => {
    if (!showPlayer || !isPlaying) return;
    const interval = setInterval(() => {
      setScriptIndex(prev => (prev + 1) % mockScript.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [showPlayer, isPlaying]);

  // Toast System
  const [toast, setToast] = useState('');
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const toggleSave = (id: number) => {
    setSavedPlaces(prev => {
      if (prev.includes(id)) {
        showToast('보관함에서 삭제되었습니다.');
        return prev.filter(pId => pId !== id);
      } else {
        showToast('보관함에 저장되었습니다 💖');
        return [...prev, id];
      }
    });
  };

  if (isSplash) {
    return (
      <motion.div key="splash" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }} className="absolute inset-0 z-[100] bg-neoul-heuk flex flex-col items-center justify-center p-10">
        <div className="flex flex-col items-center">
          <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-24 h-24 bg-gradient-to-br from-neoul-brand to-emerald-500 rounded-[2.5rem] shadow-[0_0_40px_rgba(45,212,191,0.4)] mb-8 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/80 rounded-full" />
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-4xl font-black tracking-widest text-white uppercase">NEOUL</motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 text-[10px] font-black text-neoul-brand/80 uppercase tracking-[0.5em]">Heritage Experience</motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative w-full h-full bg-[#F8FAFB] overflow-hidden font-sans text-neoul-heuk flex flex-col">
      {/* GLOBAL TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: 50, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 50, opacity: 0, scale: 0.9 }} className="absolute bottom-28 left-6 right-6 z-[200] bg-neoul-heuk/95 backdrop-blur-xl text-white py-4 px-6 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10">
            <div className="w-2 h-2 bg-neoul-brand rounded-full animate-pulse" />
            <span className="text-sm font-bold flex-1">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL SCREEN SEARCH */}
      <AnimatePresence>
        {showSearch && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute inset-0 z-[150] bg-white/80 backdrop-blur-2xl p-6 flex flex-col">
             <div className="flex items-center gap-4 mt-10 mb-8">
                <div className="flex-1 bg-white rounded-2xl flex items-center px-5 gap-3 border border-neoul-border shadow-sm focus-within:border-neoul-brand focus-within:ring-2 ring-neoul-brand/20 transition-all">
                   <Search className="w-5 h-5 text-neoul-brand" />
                   <input autoFocus type="text" placeholder="어디로 떠나시나요?" className="bg-transparent border-none outline-none py-4 text-sm font-bold w-full text-neoul-heuk placeholder:text-gray-400" />
                </div>
                <button onClick={() => setShowSearch(false)} className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm border border-neoul-border text-neoul-heuk/50 hover:bg-gray-50"><X className="w-5 h-5" /></button>
             </div>
             <div className="space-y-8 px-2">
                <div>
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Trending</h4>
                  <div className="flex flex-wrap gap-2.5">
                     {['경복궁 야간개장', '북촌 한옥마을', '덕수궁 돌담길', '휠체어 접근 가능'].map(tag => (
                        <button key={tag} className="px-5 py-2.5 bg-white rounded-full text-xs font-bold border border-neoul-border shadow-sm text-gray-600 hover:border-neoul-brand hover:text-neoul-brand transition-colors"># {tag}</button>
                     ))}
                  </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* STATE 1: HOME (NATIONAL MAP) */}
          {!selectedRegion && !selectedSubRegion && !selectedPlace && !showPlayer && (
            <motion.div key="home" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="absolute inset-0 flex flex-col overflow-y-auto no-scrollbar bg-gray-50">
               {/* Premium Header */}
               <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 z-10 bg-gray-50/90 backdrop-blur-md">
                 <div>
                   <h1 className="text-2xl font-black tracking-widest text-neoul-heuk uppercase">Neoul</h1>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Discover Heritage</p>
                 </div>
                 <div className="flex items-center gap-3">
                   <button onClick={() => setShowSearch(true)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100"><Search className="w-4 h-4" /></button>
                   <button onClick={() => showToast('알림이 없습니다.')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 relative">
                      <Bell className="w-4 h-4" />
                      <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-neoul-accent rounded-full border-2 border-white" />
                   </button>
                 </div>
               </header>

               {/* Greeting & Quick Search */}
               <div className="px-6 mb-8 mt-4">
                  <div onClick={() => setShowSearch(true)} className="w-full bg-white p-4 rounded-[2rem] shadow-lg shadow-black/5 flex items-center gap-4 border border-gray-100">
                     <div className="w-12 h-12 bg-neoul-brand/10 rounded-2xl flex items-center justify-center"><Compass className="w-6 h-6 text-neoul-brand" /></div>
                     <div>
                        <p className="text-sm font-bold text-neoul-heuk">지역, 문화재, 테마 검색</p>
                        <p className="text-[11px] text-gray-400 font-medium mt-0.5">경복궁, 야간개장, 배리어프리...</p>
                     </div>
                  </div>
               </div>

               {/* Regions Interactive Vector Map */}
               <div className="px-6 mb-10">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-black">지도에서 지역 선택</h3>
                  </div>
                  <div className="relative w-full h-[400px] bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex items-center justify-center">
                     <div className="absolute inset-0 bg-gradient-to-br from-[#F0F4F8] to-[#E2E8F0] opacity-50" />
                     
                     <svg viewBox="40 10 320 440" className="w-full h-full drop-shadow-2xl relative z-10 p-4">
                        <g stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
                           {/* Gangwon */}
                           <motion.g onClick={() => showToast('강원 지역은 준비 중입니다.')} whileHover={{ scale: 1.03, zIndex: 10 }} whileTap={{ scale: 0.95 }} className="cursor-pointer origin-[215px_105px]">
                              <polygon points="150,70 220,40 280,110 240,170 190,130" fill="#E5E7EB" className="transition-colors hover:fill-[#D1D5DB]" />
                              <text x="215" y="105" textAnchor="middle" alignmentBaseline="middle" fill="#000000" className="font-medium text-[14px] pointer-events-none">강원</text>
                           </motion.g>

                           {/* Chungcheong */}
                           <motion.g onClick={() => showToast('충청 지역은 준비 중입니다.')} whileHover={{ scale: 1.03, zIndex: 10 }} whileTap={{ scale: 0.95 }} className="cursor-pointer origin-[165px_190px]">
                              <polygon points="100,160 190,130 240,170 200,240 90,240" fill="#E5E7EB" className="transition-colors hover:fill-[#D1D5DB]" />
                              <text x="165" y="190" textAnchor="middle" alignmentBaseline="middle" fill="#000000" className="font-medium text-[14px] pointer-events-none">충청</text>
                           </motion.g>

                           {/* Gyeongsang */}
                           <motion.g onClick={() => showToast('경상 지역은 준비 중입니다.')} whileHover={{ scale: 1.03, zIndex: 10 }} whileTap={{ scale: 0.95 }} className="cursor-pointer origin-[260px_225px]">
                              <polygon points="240,170 280,110 320,180 300,280 240,330 200,240" fill="#E5E7EB" className="transition-colors hover:fill-[#D1D5DB]" />
                              <text x="260" y="225" textAnchor="middle" alignmentBaseline="middle" fill="#000000" className="font-medium text-[14px] pointer-events-none">경상</text>
                           </motion.g>

                           {/* Jeolla */}
                           <motion.g onClick={() => showToast('전라 지역은 준비 중입니다.')} whileHover={{ scale: 1.03, zIndex: 10 }} whileTap={{ scale: 0.95 }} className="cursor-pointer origin-[150px_295px]">
                              <polygon points="90,240 200,240 240,330 150,360 70,300" fill="#E5E7EB" className="transition-colors hover:fill-[#D1D5DB]" />
                              <text x="150" y="295" textAnchor="middle" alignmentBaseline="middle" fill="#000000" className="font-medium text-[14px] pointer-events-none">전라</text>
                           </motion.g>

                           {/* Seoul/Gyeonggi - Active Target */}
                           <motion.g onClick={() => setSelectedRegion(MOCK_REGIONS.find(r => r.id === 'gyeonggi') || null)} whileHover={{ scale: 1.05, zIndex: 20 }} whileTap={{ scale: 0.95 }} className="cursor-pointer origin-[125px_115px]">
                              <polygon points="100,80 150,70 190,130 100,160 80,120" fill="#1A1A1A" className="transition-colors hover:fill-[#000000]" />
                              <circle cx="125" cy="100" r="4" fill="#FF4D4D" className="animate-pulse" />
                              <text x="125" y="125" textAnchor="middle" alignmentBaseline="middle" fill="#FFFFFF" className="font-semibold text-[15px] pointer-events-none drop-shadow-md">서울·경기</text>
                           </motion.g>

                           {/* Jeju */}
                           <motion.g onClick={() => showToast('제주 지역은 준비 중입니다.')} whileHover={{ scale: 1.03, zIndex: 10 }} whileTap={{ scale: 0.95 }} className="cursor-pointer origin-[130px_410px]">
                              <polygon points="100,400 150,390 160,420 110,430" fill="#E5E7EB" className="transition-colors hover:fill-[#D1D5DB]" />
                              <text x="130" y="410" textAnchor="middle" alignmentBaseline="middle" fill="#000000" className="font-medium text-[12px] pointer-events-none">제주</text>
                           </motion.g>
                        </g>
                     </svg>
                  </div>
               </div>
            </motion.div>
          )}

          {/* STATE 2: BIG REGION MAP (E.g. Gyeonggi-do) -> Select SubRegion */}
          {selectedRegion && !selectedSubRegion && !selectedPlace && !showPlayer && (
            <motion.div key="big-region" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="absolute inset-0 flex flex-col bg-[#F8FAFB]">
               {/* Minimal Map Area */}
               <div className="absolute inset-0 bg-[#E2E8F0] overflow-hidden flex items-center justify-center">
                  <motion.svg viewBox="0 0 400 400" className="w-[150%] h-[150%] opacity-20 drop-shadow-xl" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                     {/* Abstract Gyeonggi Map Shape */}
                     <path d="M100,100 Q200,50 300,150 T250,350 Q150,300 50,200 Z" fill="#9CA3AF" stroke="#6B7280" strokeWidth="2" />
                  </motion.svg>
               </div>
               
               {/* Floating Header */}
               <header className="absolute top-12 left-6 right-6 flex items-center justify-between z-20">
                  <button onClick={() => setSelectedRegion(null)} className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-sm flex items-center justify-center border border-white"><ChevronLeft className="w-6 h-6 text-neoul-heuk" /></button>
                  <div className="flex flex-col items-center">
                     <span className="px-6 py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm font-black text-sm border border-white text-neoul-heuk">{selectedRegion.name}</span>
                     <span className="text-[10px] font-bold text-gray-500 mt-1.5 px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full">{selectedRegion.description}</span>
                  </div>
                  <button onClick={() => setShowSearch(true)} className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-sm flex items-center justify-center border border-white"><Search className="w-5 h-5 text-neoul-heuk" /></button>
               </header>

               {/* SubRegion Markers (Suwon, Yongin, Paju) */}
               <div className="absolute inset-0 z-10 pointer-events-none">
                  {selectedRegion.subRegions.map((subRegion, i) => {
                     // Determine rough positions based on index
                     const positions = [
                        'top-[45%] left-[45%]', // Suwon (Center)
                        'top-[30%] left-[65%]', // Yongin (Right top)
                        'top-[60%] left-[30%]'  // Paju (Left bottom)
                     ];
                     return (
                        <motion.div key={subRegion.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`absolute ${positions[i % positions.length]} -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer`} onClick={() => setSelectedSubRegion(subRegion)}>
                           <div className="flex flex-col items-center group">
                              <div className="bg-white px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2.5 border border-gray-100 mb-1.5 active:scale-95 transition-all group-hover:border-[#FF4D4D] group-hover:shadow-[#FF4D4D]/20">
                                 <div className="w-2.5 h-2.5 bg-[#FF4D4D] rounded-full group-hover:animate-pulse" />
                                 <span className="text-sm font-black text-neoul-heuk whitespace-nowrap">{subRegion.name}</span>
                              </div>
                              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-white" />
                           </div>
                        </motion.div>
                     );
                  })}
               </div>
            </motion.div>
          )}

          {/* STATE 3: SMALL REGION MAP (E.g. Suwon) -> Select Place */}
          {selectedSubRegion && !selectedPlace && !showPlayer && (
            <motion.div key="small-region" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} className="absolute inset-0 flex flex-col bg-[#F8FAFB]">
               {/* High-detail Map Area */}
               <div className="absolute inset-0 bg-[#F1F5F9] overflow-hidden flex items-center justify-center">
                  {/* Decorative map lines for zoomed-in feel */}
                  <motion.svg viewBox="0 0 200 200" className="w-[200%] h-[200%] opacity-10 drop-shadow-sm" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                     <path d="M0,50 L200,50 M50,0 L50,200 M0,150 L200,150 M150,0 L150,200" stroke="#000" strokeWidth="0.5" />
                     <circle cx="100" cy="100" r="40" fill="none" stroke="#000" strokeWidth="1" strokeDasharray="4 4" />
                  </motion.svg>
               </div>
               
               {/* Floating Header */}
               <header className="absolute top-12 left-6 right-6 flex items-center justify-between z-20">
                  <button onClick={() => setSelectedSubRegion(null)} className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-sm flex items-center justify-center border border-white"><ChevronLeft className="w-6 h-6 text-neoul-heuk" /></button>
                  <div className="flex flex-col items-center">
                     <span className="px-6 py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm font-black text-sm border border-white text-neoul-heuk flex items-center gap-2"><MapPin className="w-4 h-4 text-[#FF4D4D]"/> {selectedRegion?.name} {selectedSubRegion.name}</span>
                  </div>
                  <button onClick={() => showToast('내 위치로 리셋')} className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-sm flex items-center justify-center border border-white"><Compass className="w-5 h-5 text-neoul-heuk" /></button>
               </header>

               {/* Place Profile Markers (Suwon Hwaseong, Hwaseong Haenggung) */}
               <div className="absolute inset-0 z-10 pointer-events-none">
                  {selectedSubRegion.spots.length > 0 ? selectedSubRegion.spots.map((place, i) => {
                     const positions = [
                        'top-[40%] left-[50%]', // Center
                        'top-[65%] left-[35%]'  // Bottom left
                     ];
                     return (
                        <motion.div key={place.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 20, delay: i * 0.1 }} className={`absolute ${positions[i % positions.length]} -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer flex flex-col items-center group`} onClick={() => setSelectedPlace(place)}>
                           {/* Profile Tag */}
                           <div className="bg-neoul-heuk text-white px-3 py-1.5 rounded-lg mb-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-bold flex flex-col items-center">
                              <span>{place.name}</span>
                              <span className="text-[9px] text-gray-300 font-normal">{place.category.split('·')[0]}</span>
                           </div>
                           {/* Main Profile Marker */}
                           <div className="w-14 h-14 bg-white p-1 rounded-full shadow-xl border-2 border-white group-hover:border-[#FF4D4D] transition-colors relative z-10">
                              <img src={place.image} className="w-full h-full rounded-full object-cover" />
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FF4D4D] rounded-full border-2 border-white flex items-center justify-center">
                                 <Star className="w-2.5 h-2.5 text-white fill-white" />
                              </div>
                           </div>
                           {/* Pin tail */}
                           <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-white -mt-1 relative z-0 group-hover:border-t-[#FF4D4D] transition-colors" />
                        </motion.div>
                     );
                  }) : (
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur px-6 py-3 rounded-full text-sm font-bold text-gray-500">
                        이 지역의 문화재를 준비 중입니다.
                     </div>
                  )}
               </div>
            </motion.div>
          )}

          {/* STATE 4: PLACE DETAIL BOTTOM SHEET */}
          {selectedPlace && !showPlayer && (
            <motion.div key="detail" initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: '30%' }} exit={{ opacity: 0, y: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-x-0 bottom-0 top-0 z-[100] bg-white rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden">
               <div className="w-full flex justify-center py-4 shrink-0 bg-white absolute top-0 z-30">
                  <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
               </div>

               {/* Detail Header */}
               <header className="absolute top-6 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-20 flex items-center justify-between px-6">
                  <button onClick={() => setSelectedPlace(null)} className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-neoul-heuk border border-gray-100 shadow-sm active:scale-95 transition-transform"><ChevronDown className="w-6 h-6" /></button>
                  <div className="flex gap-3">
                     <button onClick={() => showToast('공유하기')} className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-neoul-heuk border border-gray-100 shadow-sm active:scale-95 transition-transform"><Share2 className="w-4 h-4" /></button>
                     <button onClick={() => toggleSave(selectedPlace.id)} className={`w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-gray-100 shadow-sm active:scale-95 transition-transform ${savedPlaces.includes(selectedPlace.id) ? 'text-neoul-accent' : 'text-neoul-heuk'}`}>
                        <Heart className={`w-5 h-5 ${savedPlaces.includes(selectedPlace.id) ? 'fill-current' : ''}`} />
                     </button>
                  </div>
               </header>

               <div className="flex-1 overflow-y-auto no-scrollbar pb-32 pt-8">
                  <motion.div layoutId={`image-${selectedPlace.id}`} className="w-full h-48 relative bg-gray-200">
                     <img src={selectedPlace.image} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
                  </motion.div>
                  
                  <div className="px-8 -mt-10 relative z-10">
                     <motion.h2 layoutId={`title-${selectedPlace.id}`} className="text-3xl font-black text-neoul-heuk drop-shadow-sm">{selectedPlace.name}</motion.h2>
                     <p className="text-sm font-black text-neoul-brand uppercase tracking-widest mt-2">{selectedPlace.nameEn}</p>
                     
                     <div className="flex items-center gap-6 mt-6 pb-8 border-b border-gray-100">
                        <div className="flex items-center gap-2"><Star className="w-5 h-5 text-neoul-accent fill-current" /><span className="font-black text-lg">{selectedPlace.rating}</span><span className="text-xs text-gray-400 font-bold">({selectedPlace.reviewCount})</span></div>
                        <div className="w-px h-6 bg-gray-200" />
                        <div className="text-sm font-bold text-gray-500">{selectedPlace.category}</div>
                     </div>

                     <div className="py-8 space-y-10">
                        {/* Quick Actions */}
                        <div className="flex justify-between gap-4">
                           {[{i:<Navigation className="w-6 h-6"/>, l:'길찾기'}, {i:<Accessibility className="w-6 h-6"/>, l:'무장애'}, {i:<MessageCircle className="w-6 h-6"/>, l:'리뷰'}, {i:<Info className="w-6 h-6"/>, l:'정보'}].map(act => (
                              <div key={act.l} onClick={() => showToast(`${act.l} 기능 준비 중`)} className="flex-1 bg-gray-50 py-4 rounded-2xl flex flex-col items-center gap-2 border border-gray-100 active:scale-95 transition-transform cursor-pointer">
                                 <div className="text-neoul-heuk">{act.i}</div>
                                 <span className="text-[11px] font-bold text-gray-500">{act.l}</span>
                              </div>
                           ))}
                        </div>

                        <div>
                           <h3 className="text-xl font-black mb-4 flex items-center gap-2"><Compass className="w-6 h-6 text-neoul-brand" /> 공간 이야기</h3>
                           <p className="text-sm font-medium leading-loose text-gray-600 bg-gray-50 p-6 rounded-3xl border border-gray-100">{selectedPlace.description} {selectedPlace.historyText}</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Action Footer */}
               <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-2xl border-t border-gray-100">
                  <button onClick={() => { setShowPlayer(true); setIsPlaying(true); setScriptIndex(0); }} className="w-full h-16 bg-neoul-heuk text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-transform">
                     <Play className="w-6 h-6 fill-white" /> 스마트 도슨트 시작
                  </button>
               </div>
            </motion.div>
          )}

          {/* STATE 4: PLAYER (Upgraded) */}
          {showPlayer && (
            <motion.div key="player" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="absolute inset-0 z-[120] bg-white flex flex-col">
               {/* Player Header */}
               <header className="h-24 flex items-center justify-between px-6 pt-8 bg-white z-10">
                  <button onClick={() => setShowPlayer(false)} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-transform"><ChevronDown className="w-8 h-8 text-gray-400" /></button>
                  <div className="text-center">
                     <p className="text-[10px] font-black text-neoul-brand uppercase tracking-[0.2em] mb-1">Now Playing</p>
                     <p className="text-sm font-black text-neoul-heuk">{selectedPlace?.name} 도슨트</p>
                  </div>
                  <button onClick={() => toggleSave(selectedPlace!.id)} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-transform">
                     <Heart className={`w-6 h-6 ${savedPlaces.includes(selectedPlace!.id) ? 'fill-current text-neoul-accent' : 'text-gray-400'}`} />
                  </button>
               </header>
               
               <div className="flex-1 flex flex-col items-center justify-start pt-6 pb-10 px-8">
                  {/* Artwork (Image Slideshow synced with script) */}
                  <motion.div animate={{ scale: isPlaying ? 1.02 : 1 }} transition={{ duration: 0.5 }} className="w-64 h-80 rounded-[3rem] shadow-2xl overflow-hidden mb-12 border-[8px] border-gray-50 shrink-0 relative bg-gray-100">
                     <AnimatePresence mode="wait">
                        <motion.img 
                           key={scriptIndex % 3}
                           src={
                              scriptIndex % 3 === 0 ? selectedPlace?.image : 
                              scriptIndex % 3 === 1 ? 'hanok.png' : 
                              'hero-bg.png'
                           } 
                           initial={{ opacity: 0, scale: 1.1 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           transition={{ duration: 0.8, ease: "easeInOut" }}
                           className="absolute inset-0 w-full h-full object-cover" 
                        />
                     </AnimatePresence>
                  </motion.div>
                  
                  {/* Script Viewer (Karaoke Style) */}
                  <div className="w-full h-24 overflow-hidden relative mb-12 flex flex-col items-center justify-center text-center">
                     <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white z-10 pointer-events-none" />
                     <motion.div animate={{ y: -scriptIndex * 36 }} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="absolute top-10 space-y-4 w-full">
                        {mockScript.map((text, idx) => (
                           <p key={idx} className={`font-black h-5 transition-all duration-300 ${idx === scriptIndex ? 'text-lg text-neoul-heuk' : 'text-xs text-gray-300 scale-90'}`}>
                              {text}
                           </p>
                        ))}
                     </motion.div>
                  </div>

                  <div className="mt-auto w-full flex flex-col items-center">
                     {/* Waveform UI */}
                     <div className="flex gap-1.5 h-12 items-center justify-center mb-10 w-full px-12">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => (
                           <motion.div 
                              key={i} 
                              animate={{ height: isPlaying ? [10, Math.random() * 40 + 10, 10] : 10 }}
                              transition={{ duration: 0.5 + (i % 3) * 0.2, repeat: Infinity, ease: "easeInOut" }}
                              className="w-1.5 bg-neoul-brand rounded-full"
                           />
                        ))}
                     </div>
                     
                     {/* Controls */}
                     <div className="w-full max-w-[280px] flex items-center justify-between">
                        <button onClick={() => setScriptIndex(prev => Math.max(0, prev - 1))} className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-gray-50 active:scale-95 transition-transform"><Play className="w-7 h-7 rotate-180 text-gray-300 fill-current" /></button>
                        <button onClick={() => setIsPlaying(!isPlaying)} className="w-24 h-24 bg-neoul-brand text-white rounded-full flex items-center justify-center shadow-xl shadow-neoul-brand/30 hover:scale-105 active:scale-95 transition-all">
                           {isPlaying ? <Pause className="w-10 h-10 fill-white" /> : <Play className="w-10 h-10 fill-white ml-2" />}
                        </button>
                        <button onClick={() => {
                           if (scriptIndex === mockScript.length - 1) {
                              showToast('도슨트 청취를 완료했습니다! 스탬프 획득 🎁');
                              setShowPlayer(false);
                           } else {
                              setScriptIndex(prev => Math.min(mockScript.length - 1, prev + 1));
                           }
                        }} className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-gray-50 active:scale-95 transition-transform"><Play className="w-7 h-7 text-gray-300 fill-current" /></button>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* BOTTOM NAVIGATION (Only show on Home & Region states) */}
      <AnimatePresence>
         {(!selectedPlace && !showPlayer) && (
            <motion.nav initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="h-20 bg-white border-t border-gray-100 flex items-center justify-around px-2 z-[60] pb-2 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] relative">
               <button onClick={() => { setActiveTab('home'); setSelectedRegion(null); setSelectedSubRegion(null); }} className={`flex flex-col items-center gap-1.5 w-16 ${activeTab === 'home' && !selectedRegion ? 'text-neoul-brand' : 'text-gray-400'}`}>
                  <Home className="w-6 h-6" /><span className="text-[10px] font-bold">홈</span>
               </button>
               <button onClick={() => showToast('지도 탭 준비 중')} className="flex flex-col items-center gap-1.5 w-16 text-gray-400">
                  <MapPin className="w-6 h-6" /><span className="text-[10px] font-bold">주변</span>
               </button>
               <div className="relative -top-6">
                  <button onClick={() => showToast('배리어프리 모드 ON')} className="w-16 h-16 bg-neoul-heuk text-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-black/20 border-4 border-white active:scale-95 transition-transform">
                     <Accessibility className="w-7 h-7" />
                  </button>
               </div>
               <button onClick={() => showToast(`보관함 탭 (현재 ${savedPlaces.length}개 저장됨)`)} className="flex flex-col items-center gap-1.5 w-16 text-gray-400 relative">
                  <Heart className="w-6 h-6" />
                  {savedPlaces.length > 0 && <div className="absolute top-0 right-3 w-3 h-3 bg-neoul-accent rounded-full border-2 border-white" />}
                  <span className="text-[10px] font-bold">보관함</span>
               </button>
               <button onClick={() => showToast('설정 탭 준비 중')} className="flex flex-col items-center gap-1.5 w-16 text-gray-400">
                  <Settings className="w-6 h-6" /><span className="text-[10px] font-bold">설정</span>
               </button>
            </motion.nav>
         )}
      </AnimatePresence>

    </div>
  );
}
