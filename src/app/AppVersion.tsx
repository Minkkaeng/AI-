import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Play, Pause, Home, Heart, Settings, Accessibility, ChevronLeft, ChevronDown, Share2, Compass, Bell, Star, Navigation, Info, MessageCircle, X } from 'lucide-react';
import { MOCK_REGIONS, MOCK_PLACES } from '../types';
import type { Place, Region } from '../types';

export default function AppVersion() {
  const [isSplash, setIsSplash] = useState(true);
  
  // Navigation & Core State
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
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
          
          {/* STATE 1: HOME (COUNTRY) */}
          {!selectedRegion && !selectedPlace && !showPlayer && (
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
               <div className="px-6 mb-8">
                  <h2 className="text-3xl font-black leading-tight mb-6">이번 주말,<br/>어디로 떠나볼까요?</h2>
                  <div onClick={() => setShowSearch(true)} className="w-full bg-white p-4 rounded-[2rem] shadow-lg shadow-black/5 flex items-center gap-4 border border-gray-100">
                     <div className="w-12 h-12 bg-neoul-brand/10 rounded-2xl flex items-center justify-center"><Compass className="w-6 h-6 text-neoul-brand" /></div>
                     <div>
                        <p className="text-sm font-bold text-neoul-heuk">지역, 문화재, 테마 검색</p>
                        <p className="text-[11px] text-gray-400 font-medium mt-0.5">경복궁, 야간개장, 배리어프리...</p>
                     </div>
                  </div>
               </div>

               {/* Regions Grid */}
               <div className="px-6 mb-10">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-black">지역으로 찾기</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <motion.div whileTap={{ scale: 0.95 }} onClick={() => setSelectedRegion(MOCK_REGIONS[0])} className="col-span-2 relative h-40 rounded-[2rem] overflow-hidden shadow-lg group cursor-pointer">
                        <img src="hero-bg.png" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white border border-white/20">HOT</div>
                        <div className="absolute bottom-5 left-5">
                           <h4 className="text-2xl font-black text-white drop-shadow-md">서울 · 경기</h4>
                           <p className="text-xs text-white/80 font-medium mt-1">조선의 도읍, 천년의 역사</p>
                        </div>
                     </motion.div>
                     
                     <motion.div whileTap={{ scale: 0.95 }} onClick={() => showToast('준비 중입니다.')} className="h-32 bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100 flex flex-col justify-end relative overflow-hidden">
                        <div className="absolute top-4 right-4 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center"><MapPin className="w-5 h-5 text-gray-400" /></div>
                        <h4 className="text-lg font-black text-gray-400">인천</h4>
                        <p className="text-[10px] text-gray-400 font-bold mt-1">근대 문화의 흔적</p>
                     </motion.div>
                     <motion.div whileTap={{ scale: 0.95 }} onClick={() => showToast('준비 중입니다.')} className="h-32 bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100 flex flex-col justify-end relative overflow-hidden">
                        <div className="absolute top-4 right-4 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center"><MapPin className="w-5 h-5 text-gray-400" /></div>
                        <h4 className="text-lg font-black text-gray-400">경주</h4>
                        <p className="text-[10px] text-gray-400 font-bold mt-1">신라 천년의 향기</p>
                     </motion.div>
                  </div>
               </div>
            </motion.div>
          )}

          {/* STATE 2: REGION MODE (MAP + FEED) */}
          {selectedRegion && !selectedPlace && !showPlayer && (
            <motion.div key="region" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="absolute inset-0 flex flex-col bg-gray-100">
               {/* Map Area */}
               <div className="relative h-[45%] w-full flex-shrink-0 bg-gray-200 overflow-hidden">
                  <img src="seoul-map.png" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 bg-black/5" />
                  
                  {/* Floating Header */}
                  <header className="absolute top-12 left-6 right-6 flex items-center justify-between z-10">
                     <button onClick={() => setSelectedRegion(null)} className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center border border-white"><ChevronLeft className="w-6 h-6" /></button>
                     <div className="px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg font-black text-sm border border-white">{selectedRegion.name} 탐험</div>
                     <button onClick={() => setShowSearch(true)} className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center border border-white"><Search className="w-5 h-5" /></button>
                  </header>

                  {/* Markers */}
                  {MOCK_PLACES.map((place, i) => (
                    <motion.div key={place.id} className={`absolute ${i === 0 ? 'top-[40%] left-[50%]' : i === 1 ? 'top-[60%] left-[30%]' : 'top-[50%] left-[70%]'} -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10`} onClick={() => setSelectedPlace(place)}>
                       <div className="flex flex-col items-center">
                          <div className="bg-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-gray-100 mb-1 active:scale-95 transition-transform">
                             <div className="w-2 h-2 bg-neoul-brand rounded-full animate-pulse" />
                             <span className="text-xs font-black whitespace-nowrap">{place.name}</span>
                          </div>
                          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-white" />
                       </div>
                    </motion.div>
                  ))}
               </div>

               {/* Bottom Sheet Feed */}
               <div className="flex-1 bg-white relative rounded-t-[2.5rem] -mt-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20 flex flex-col overflow-hidden">
                  <div className="w-full flex justify-center py-4 flex-shrink-0 bg-white">
                     <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                  </div>
                  
                  <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
                     {/* Filter Chips */}
                     <div className="px-6 flex gap-2 mb-6 overflow-x-auto no-scrollbar">
                        {['전체', '궁궐/사적', '박물관', '야간개장', '무장애'].map((filter, i) => (
                           <button key={filter} className={`px-5 py-2 rounded-full text-xs font-bold flex-shrink-0 transition-colors ${i === 0 ? 'bg-neoul-heuk text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{filter}</button>
                        ))}
                     </div>

                     <div className="px-6 mb-8">
                        <h3 className="text-xl font-black mb-4">추천 테마 코스</h3>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
                           {[1, 2].map(item => (
                              <div key={item} className="w-[280px] bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden flex-shrink-0">
                                 <div className="h-36 bg-gray-200 relative">
                                    <img src="hanok.png" className="w-full h-full object-cover" />
                                    <div className="absolute top-3 right-3 w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center"><Heart className="w-4 h-4 text-white" /></div>
                                 </div>
                                 <div className="p-4">
                                    <h4 className="font-black text-base mb-1">달빛 아래 궁궐 산책</h4>
                                    <p className="text-xs text-gray-400 font-bold flex items-center gap-1"><MapPin className="w-3 h-3" /> 덕수궁 ➔ 정동길 ➔ 경복궁</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="px-6 space-y-4">
                        <h3 className="text-xl font-black mb-4">인기 스팟</h3>
                        {MOCK_PLACES.map(place => {
                           const isSaved = savedPlaces.includes(place.id);
                           return (
                             <motion.div whileTap={{ scale: 0.98 }} key={place.id} onClick={() => setSelectedPlace(place)} className="flex gap-4 p-3 bg-white rounded-3xl shadow-sm border border-gray-100 relative">
                                <motion.div layoutId={`image-${place.id}`} className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                                   <img src={place.image} className="w-full h-full object-cover" />
                                </motion.div>
                                <div className="flex-1 py-1 flex flex-col justify-center">
                                   <div className="flex justify-between items-start">
                                      <motion.h4 layoutId={`title-${place.id}`} className="font-black text-base pr-6">{place.name}</motion.h4>
                                      <div className="flex items-center gap-1 text-xs font-bold text-neoul-accent"><Star className="w-3.5 h-3.5 fill-current" /> {place.rating}</div>
                                   </div>
                                   <p className="text-xs text-gray-400 font-medium mt-1 line-clamp-1">{place.description}</p>
                                   <div className="mt-auto flex items-center gap-2 text-[10px] font-bold">
                                      <span className="text-neoul-brand bg-neoul-brand/10 px-2 py-1 rounded-md">{place.category}</span>
                                      <span className="text-gray-400">{place.distance}</span>
                                   </div>
                                </div>
                                {isSaved && <div className="absolute top-4 right-4"><Heart className="w-4 h-4 text-neoul-accent fill-current" /></div>}
                             </motion.div>
                           )
                        })}
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {/* STATE 3: PLACE DETAIL */}
          {selectedPlace && !showPlayer && (
            <motion.div key="detail" initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute inset-0 z-[100] bg-white flex flex-col overflow-hidden">
               {/* Detail Header */}
               <header className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent z-20 flex items-center justify-between px-6 pt-8">
                  <button onClick={() => setSelectedPlace(null)} className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-95 transition-transform"><ChevronDown className="w-7 h-7" /></button>
                  <div className="flex gap-3">
                     <button onClick={() => showToast('공유하기')} className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-95 transition-transform"><Share2 className="w-5 h-5" /></button>
                     <button onClick={() => toggleSave(selectedPlace.id)} className={`w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 active:scale-95 transition-transform ${savedPlaces.includes(selectedPlace.id) ? 'text-neoul-accent' : 'text-white'}`}>
                        <Heart className={`w-5 h-5 ${savedPlaces.includes(selectedPlace.id) ? 'fill-current' : ''}`} />
                     </button>
                  </div>
               </header>

               <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                  <motion.div layoutId={`image-${selectedPlace.id}`} className="w-full h-[50vh] relative bg-gray-200">
                     <img src={selectedPlace.image} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
                  </motion.div>
                  
                  <div className="px-8 -mt-20 relative z-10">
                     <motion.h2 layoutId={`title-${selectedPlace.id}`} className="text-4xl font-black text-neoul-heuk drop-shadow-sm">{selectedPlace.name}</motion.h2>
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
                  {/* Artwork */}
                  <motion.div animate={{ scale: isPlaying ? 1.02 : 1 }} transition={{ duration: 0.5 }} className="w-64 h-80 rounded-[3rem] shadow-2xl overflow-hidden mb-12 border-[8px] border-gray-50 shrink-0">
                     <img src={selectedPlace?.image} className="w-full h-full object-cover" />
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
            <motion.nav initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="h-20 bg-white border-t border-gray-100 flex items-center justify-around px-2 z-[60] pb-2 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
               <button onClick={() => { setActiveTab('home'); setSelectedRegion(null); }} className={`flex flex-col items-center gap-1.5 w-16 ${activeTab === 'home' && !selectedRegion ? 'text-neoul-brand' : 'text-gray-400'}`}>
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
