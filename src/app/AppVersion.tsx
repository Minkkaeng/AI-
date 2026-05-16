import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Play, Pause, Home, Heart, Settings, Accessibility, ChevronLeft, ChevronDown, Globe, Share2, Plane, Bell, Mountain, TowerControl as Tower, Landmark, Info, MessageCircle, MoreHorizontal, Navigation, X, Check } from 'lucide-react';
import { MOCK_REGIONS } from '../types';
import type { Place, Region } from '../types';

interface AppVersionProps {
  isHifi?: boolean;
}

export default function AppVersion({ isHifi: _isHifi = false }: AppVersionProps) {
  const [isSplash, setIsSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('HOME');
  const [mapMode, setMapMode] = useState<'country' | 'region'>('country');
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  
  // New Interactive States
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('링크가 클립보드에 복사되었습니다.');
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    showToast(!isSaved ? '보관함에 저장되었습니다.' : '보관함에서 삭제되었습니다.');
  };

  if (isSplash) {
    return (
      <motion.div key="splash" initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-10">
        <div className="flex flex-col items-center">
          <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-20 h-20 bg-neoul-brand rounded-[2.5rem] shadow-2xl shadow-neoul-brand/30 mb-8 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-white rounded-full opacity-80" />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tighter text-neoul-heuk uppercase">NEOUL</h1>
          <p className="mt-3 text-[11px] font-black text-neoul-brand uppercase tracking-[0.4em]">Heritage Intelligence</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative w-full h-full bg-[#F8FAFB] overflow-hidden font-sans text-neoul-heuk">
      
      {/* GLOBAL TOAST SYSTEM */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-32 left-8 right-8 z-[200] bg-neoul-heuk/90 backdrop-blur-xl text-white py-4 px-6 rounded-2xl flex items-center gap-3 shadow-2xl"
          >
            <div className="w-6 h-6 bg-neoul-brand rounded-full flex items-center justify-center"><Check className="w-3.5 h-3.5 text-white" /></div>
            <span className="text-sm font-bold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {showSearch && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[150] bg-white p-8 flex flex-col">
             <header className="flex items-center gap-4 mb-10">
                <div className="flex-1 bg-neoul-gray rounded-2xl flex items-center px-5 gap-3 border border-neoul-border">
                   <Search className="w-5 h-5 text-neoul-brand" />
                   <input autoFocus type="text" placeholder="어떤 유산을 찾으시나요?" className="bg-transparent border-none outline-none py-4 text-sm font-bold w-full" />
                </div>
                <button onClick={() => setShowSearch(false)} className="font-bold text-sm text-neoul-heuk/40">취소</button>
             </header>
             <div className="space-y-6">
                <h4 className="text-xs font-black text-neoul-heuk/20 uppercase tracking-widest">인기 검색어</h4>
                <div className="flex flex-wrap gap-2">
                   {['경복궁', '한옥마을', '덕수궁', '야간개장', '휠체어 투어'].map(tag => (
                      <button key={tag} className="px-5 py-2.5 bg-neoul-gray rounded-full text-xs font-bold border border-neoul-border"># {tag}</button>
                   ))}
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NOTIFICATION OVERLAY */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="absolute inset-0 z-[150] bg-white flex flex-col">
             <header className="h-16 border-b border-neoul-border flex items-center justify-between px-6">
                <h3 className="font-bold">알림</h3>
                <button onClick={() => setShowNotifications(false)}><X className="w-6 h-6" /></button>
             </header>
             <div className="flex-1 flex flex-col items-center justify-center p-10 text-center opacity-30">
                <Bell className="w-16 h-16 mb-4" />
                <p className="text-sm font-bold">새로운 알림이 없습니다.</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showPlayer ? (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
            
            {/* Header */}
            <header className="bg-white flex-shrink-0 z-50">
               <div className="h-14 flex items-center justify-between px-6">
                  <div className="w-10" />
                  <h1 className="text-xl font-black tracking-[0.15em] text-neoul-heuk">NEOUL</h1>
                  <div className="flex items-center gap-3">
                     <button onClick={() => setShowSearch(true)}><Search className="w-6 h-6 text-neoul-heuk" /></button>
                     <button onClick={() => setShowNotifications(true)} className="relative">
                        <Bell className="w-6 h-6 text-neoul-heuk" />
                        <div className="absolute top-0 right-0 w-2 h-2 bg-neoul-brand rounded-full border-2 border-white" />
                     </button>
                  </div>
               </div>
               <div className="flex justify-around px-2 border-b border-neoul-border">
                  {['HOME', 'GUIDE', 'SHOP', 'DOCENT', 'MY'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-3 text-[11px] font-bold tracking-widest transition-all relative ${activeTab === tab ? 'text-neoul-heuk' : 'text-neoul-heuk/30'}`}>
                      {tab}{activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[3px] bg-neoul-heuk" />}
                    </button>
                  ))}
               </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative">
               <div className="relative w-full h-44 bg-white overflow-hidden flex flex-col px-8 pt-8">
                  <h2 className="text-2xl font-bold relative z-10">대한민국 <span className="text-sm font-bold text-neoul-heuk/20 uppercase">KOREA</span></h2>
                  <img src="hero-bg.png" className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-60" />
               </div>

               <div className="p-4 relative">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="col-span-2 grid grid-cols-2 gap-4">
                        <motion.button whileTap={{ scale: 0.98 }} onClick={() => showToast('인천 지역 가이드 준비 중입니다.')} className="bg-white rounded-[2rem] p-6 shadow-xl border border-white flex flex-col items-center justify-between aspect-square">
                           <div className="w-full flex justify-end"><span className="text-[11px] font-bold text-neoul-heuk/40 uppercase tracking-widest">Incheon</span></div>
                           <div className="w-16 h-16 bg-neoul-brand/5 rounded-full flex items-center justify-center"><Plane className="w-8 h-8 text-neoul-brand -rotate-45" /></div>
                           <span className="text-sm font-bold">인천</span>
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.98 }} onClick={() => { const region = MOCK_REGIONS.find(r => r.id === 'seoul'); if (region) { setSelectedRegion(region); setMapMode('region'); } }} className="bg-white rounded-[2rem] p-6 shadow-xl border-2 border-neoul-brand/30 flex flex-col items-center justify-between aspect-square">
                           <div className="w-full flex justify-end"><span className="text-[11px] font-bold text-neoul-brand uppercase tracking-widest">Seoul</span></div>
                           <div className="w-16 h-16 bg-neoul-brand/10 rounded-full flex items-center justify-center"><Landmark className="w-8 h-8 text-neoul-brand" /></div>
                           <span className="text-sm font-bold text-neoul-brand">서울 · 경기</span>
                        </motion.button>
                     </div>
                     <motion.button onClick={() => showToast('강원 지역 가이드 준비 중입니다.')} whileTap={{ scale: 0.98 }} className="bg-white rounded-[2rem] p-6 shadow-xl border border-white flex flex-col items-center justify-center gap-4"><div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center"><Mountain className="w-8 h-8 text-emerald-400" /></div><p className="text-sm font-bold">강원</p></motion.button>
                     <motion.button onClick={() => showToast('충청 지역 가이드 준비 중입니다.')} whileTap={{ scale: 0.98 }} className="bg-white rounded-[2rem] p-6 shadow-xl border border-white flex flex-col items-center justify-center gap-4"><div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center"><Tower className="w-8 h-8 text-amber-400" /></div><p className="text-sm font-bold">충청</p></motion.button>
                  </div>
                  <div className="h-32" />
               </div>
            </div>

            {/* Navigation */}
            <nav className="h-24 bg-white border-t border-neoul-border flex items-center justify-around px-4 z-[60]">
              <button onClick={() => { setMapMode('country'); setSelectedRegion(null); setSelectedPlace(null); }} className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-brand"><Home className="w-6 h-6" /><span>홈</span></button>
              <button onClick={() => showToast('지도 서비스 점검 중입니다.')} className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><MapPin className="w-6 h-6" /><span>지도</span></button>
              <div onClick={() => showToast('무장애 모드가 활성화되었습니다.')} className="w-16 h-16 -mt-12 bg-neoul-brand rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-neoul-brand/30 border-4 border-white cursor-pointer active:scale-95 transition-transform"><Accessibility className="w-8 h-8" /></div>
              <button onClick={() => showToast('보관함으로 이동합니다.')} className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><Heart className="w-6 h-6" /><span>보관함</span></button>
              <button onClick={() => showToast('설정 메뉴를 엽니다.')} className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><Settings className="w-6 h-6" /><span>설정</span></button>
            </nav>

            {/* Regional View */}
            <AnimatePresence>
              {mapMode === 'region' && (
                <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="absolute inset-0 z-[70] bg-white flex flex-col">
                   <header className="h-16 border-b border-neoul-border flex items-center px-6 gap-4">
                      <button onClick={() => setMapMode('country')} className="p-2"><ChevronLeft className="w-8 h-8" /></button>
                      <h3 className="text-xl font-bold">{selectedRegion?.name} 가이드</h3>
                   </header>
                   <div className="flex-1 relative bg-neoul-gray/20">
                      <img src="seoul-map.png" className="absolute inset-0 w-full h-full object-contain opacity-40 p-10" />
                      {selectedRegion?.spots.map((spot, idx) => (
                        <motion.div key={spot.id} whileHover={{ scale: 1.1 }} className={`absolute cursor-pointer flex flex-col items-center ${idx === 0 ? 'top-[30%] left-[45%]' : idx === 1 ? 'top-[48%] left-[32%]' : 'top-[38%] left-[62%]'}`} onClick={() => setSelectedPlace(spot)}>
                           <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-neoul-border flex items-center gap-2"><div className="w-2 h-2 bg-neoul-brand rounded-full animate-pulse" /><span className="text-xs font-black">{spot.name}</span></div>
                        </motion.div>
                      ))}
                   </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Detail Page */}
            <AnimatePresence>
               {selectedPlace && (
                 <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="absolute inset-0 z-[90] bg-white flex flex-col overflow-hidden">
                   <header className="h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-[100]">
                      <button onClick={() => setSelectedPlace(null)} className="w-11 h-11 bg-black/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20"><ChevronLeft className="w-7 h-7" /></button>
                      <div className="flex gap-2">
                        <button onClick={handleShare} className="w-11 h-11 bg-black/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20"><Share2 className="w-5 h-5" /></button>
                        <button onClick={toggleSave} className={`w-11 h-11 backdrop-blur-xl rounded-full flex items-center justify-center border transition-colors ${isSaved ? 'bg-neoul-brand text-white border-neoul-brand' : 'bg-black/20 text-white border-white/20'}`}><Heart className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} /></button>
                      </div>
                   </header>
                   <div className="flex-1 overflow-y-auto no-scrollbar pb-40">
                      <div className="w-full aspect-[4/5] relative overflow-hidden">
                         <img src={selectedPlace.image} className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/10" />
                         <div className="absolute bottom-10 left-8 right-8"><h3 className="text-5xl font-black text-neoul-heuk mb-1">{selectedPlace.name}</h3><p className="text-sm font-bold text-neoul-brand/60 uppercase">{selectedPlace.nameEn}</p></div>
                      </div>
                      <div className="px-8 pt-10 space-y-12">
                         <div className="grid grid-cols-4 gap-4">
                            {[
                               { icon: <Navigation className="w-6 h-6" />, label: '길찾기', action: () => showToast('네이버 지도로 연결됩니다.') },
                               { icon: <Accessibility className="w-6 h-6" />, label: '무장애', action: () => showToast('무장애 시설 안내를 불러옵니다.') },
                               { icon: <MessageCircle className="w-6 h-6" />, label: '리뷰', action: () => showToast('리뷰 작성 페이지로 이동합니다.') },
                               { icon: <MoreHorizontal className="w-6 h-6" />, label: '더보기', action: () => showToast('상세 메뉴를 준비 중입니다.') }
                            ].map(item => (
                               <div key={item.label} onClick={item.action} className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform">
                                  <div className="w-14 h-14 bg-neoul-gray rounded-2xl flex items-center justify-center text-neoul-heuk/60 border border-neoul-border">{item.icon}</div>
                                  <span className="text-[11px] font-bold text-neoul-heuk/40">{item.label}</span>
                               </div>
                            ))}
                         </div>
                         <div className="space-y-4"><h4 className="text-xl font-bold flex items-center gap-2"><Info className="w-6 h-6 text-neoul-brand" /> 상세 정보</h4><p className="text-[15px] font-medium leading-relaxed text-neoul-heuk/60">{selectedPlace.description}</p></div>
                      </div>
                   </div>
                   <footer className="p-6 bg-white/80 backdrop-blur-2xl fixed bottom-0 left-0 right-0 z-[100] border-t border-neoul-border">
                     <button onClick={() => setShowPlayer(true)} className="w-full py-5 rounded-[2.5rem] bg-neoul-heuk text-white text-lg font-black flex items-center justify-center gap-4 shadow-2xl">
                       <Play className="w-6 h-6 fill-white" /> AI 스마트 도슨트 시작
                     </button>
                   </footer>
                 </motion.div>
               )}
            </AnimatePresence>

          </motion.div>
        ) : (
          /* Player Screen */
          <motion.div key="player" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[110] flex flex-col bg-white">
            <header className="h-16 border-b border-neoul-border flex items-center justify-between px-6">
              <button onClick={() => setShowPlayer(false)}><ChevronDown className="w-8 h-8" /></button>
              <div className="text-center"><p className="text-[10px] font-black text-neoul-heuk/20 uppercase">AI Audio Guide</p><p className="text-xs font-bold">{selectedPlace?.name}</p></div>
              <Globe onClick={() => showToast('언어 설정을 준비 중입니다.')} className="w-6 h-6 text-neoul-heuk/20 cursor-pointer" />
            </header>
            <div className="flex-1 flex flex-col items-center justify-center px-10">
               <div className="w-72 h-80 rounded-[3.5rem] shadow-2xl overflow-hidden mb-12 relative border-8 border-slate-50"><img src={selectedPlace?.image} className="w-full h-full object-cover" /></div>
               <div className="w-full h-24 mb-10 text-center"><p className="text-lg font-bold text-neoul-brand">"경복궁 근정전의 박석 하나하나에는 <br />지혜와 배려가 깃들어 있습니다."</p></div>
               <div className="w-full flex items-center justify-around">
                  <Play className="w-10 h-10 rotate-180 text-neoul-heuk/10" /><Pause className="w-24 h-24 text-neoul-heuk bg-white shadow-2xl rounded-full border-4 border-neoul-gray" /><Play className="w-10 h-10 text-neoul-heuk/10" />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
