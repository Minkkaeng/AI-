import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Play, Pause, Home, Heart, Settings, Accessibility, ChevronLeft, ChevronDown, Globe, Share2, Plane, Bell, Mountain, TowerControl as Tower, Ship, Landmark } from 'lucide-react';
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

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isSplash) {
    return (
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-10"
      >
        <div className="flex flex-col items-center">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 bg-neoul-brand rounded-[2.5rem] shadow-2xl shadow-neoul-brand/30 mb-8 flex items-center justify-center"
          >
            <div className="w-10 h-10 border-4 border-white rounded-full opacity-80" />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tighter text-neoul-heuk uppercase">NEOUL</h1>
          <p className="mt-3 text-[11px] font-black text-neoul-brand uppercase tracking-[0.4em]">Heritage Intelligence</p>
        </div>
      </motion.div>
    );
  }

  const handleRegionClick = (regionId: string) => {
    const region = MOCK_REGIONS.find(r => r.id === regionId);
    if (region) {
      setSelectedRegion(region);
      setMapMode('region');
    }
  };

  return (
    <div className="relative w-full h-full bg-[#F5F9FA] overflow-hidden font-sans text-neoul-heuk">
      <AnimatePresence mode="wait">
        {!showPlayer ? (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
            
            {/* Premium Header - DatePop Style */}
            <header className="bg-white flex-shrink-0 z-50">
               <div className="h-14 flex items-center justify-between px-6">
                  <div className="w-10" /> {/* Spacer */}
                  <h1 className="text-xl font-black tracking-[0.15em] text-neoul-heuk">NEOUL</h1>
                  <div className="flex items-center gap-3">
                     <Search className="w-6 h-6 text-neoul-heuk" />
                     <Bell className="w-6 h-6 text-neoul-heuk" />
                  </div>
               </div>
               <div className="flex justify-around px-2 border-b border-neoul-border">
                  {['HOME', 'GUIDE', 'SHOP', 'DOCENT', 'MY'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 text-[11px] font-bold tracking-widest transition-all relative ${activeTab === tab ? 'text-neoul-heuk' : 'text-neoul-heuk/30'}`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[3px] bg-neoul-heuk" />
                      )}
                    </button>
                  ))}
               </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative">
               
               {/* Hero Illustration Section */}
               <div className="relative w-full h-44 bg-white overflow-hidden flex flex-col px-8 pt-8">
                  <div className="relative z-10">
                     <h2 className="text-2xl font-bold flex items-baseline gap-2">
                        대한민국 <span className="text-sm font-bold text-neoul-heuk/20 uppercase tracking-widest">KOREA</span>
                     </h2>
                  </div>
                  <img src="hero-bg.png" className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-60" />
               </div>

               {/* Stylized Card Grid Map (DatePop Inspired) */}
               <div className="p-4 relative">
                  <div className="grid grid-cols-2 gap-4">
                     
                     {/* Incheon & Seoul/Gyeonggi Group */}
                     <div className="col-span-2 grid grid-cols-2 gap-4">
                        <motion.button 
                          whileTap={{ scale: 0.98 }}
                          className="bg-white rounded-[2rem] p-6 shadow-xl border border-white flex flex-col items-center justify-between aspect-square"
                        >
                           <div className="w-full flex justify-end"><span className="text-[11px] font-bold text-neoul-heuk/40 uppercase tracking-widest">Incheon</span></div>
                           <div className="w-20 h-20 bg-neoul-brand/5 rounded-full flex items-center justify-center">
                              <Plane className="w-10 h-10 text-neoul-brand -rotate-45" />
                           </div>
                           <span className="text-sm font-bold">인천</span>
                        </motion.button>

                        <motion.button 
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleRegionClick('seoul')}
                          className="bg-white rounded-[2rem] p-6 shadow-xl border-2 border-neoul-brand/30 flex flex-col items-center justify-between aspect-square relative"
                        >
                           <div className="w-full flex justify-end"><span className="text-[11px] font-bold text-neoul-brand uppercase tracking-widest">Seoul</span></div>
                           <div className="w-20 h-20 bg-neoul-brand/10 rounded-full flex items-center justify-center">
                              <Landmark className="w-10 h-10 text-neoul-brand" />
                           </div>
                           <span className="text-sm font-bold text-neoul-brand">서울 · 경기</span>
                           <div className="absolute -top-2 -right-2 bg-neoul-brand text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">UPDATE</div>
                        </motion.button>
                     </div>

                     {/* Gangwon Card */}
                     <motion.button 
                        whileTap={{ scale: 0.98 }}
                        className="bg-white rounded-[2rem] p-6 shadow-xl border border-white flex flex-col items-center justify-center gap-4"
                     >
                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center">
                           <Mountain className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div className="text-center">
                           <p className="text-[9px] font-bold text-neoul-heuk/20 uppercase tracking-widest">Gangwon</p>
                           <p className="text-sm font-bold">강원</p>
                        </div>
                     </motion.button>

                     {/* Chungcheong Card */}
                     <motion.button 
                        whileTap={{ scale: 0.98 }}
                        className="bg-white rounded-[2rem] p-6 shadow-xl border border-white flex flex-col items-center justify-center gap-4"
                     >
                        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center">
                           <Tower className="w-8 h-8 text-amber-400" />
                        </div>
                        <div className="text-center">
                           <p className="text-[9px] font-bold text-neoul-heuk/20 uppercase tracking-widest">Chungcheong</p>
                           <p className="text-sm font-bold">충청</p>
                        </div>
                     </motion.button>

                     {/* Gyeongsang Card (Busan focus) */}
                     <motion.button 
                        whileTap={{ scale: 0.98 }}
                        className="col-span-2 bg-white rounded-[3rem] p-8 shadow-xl border border-white flex items-center justify-between"
                     >
                        <div>
                           <p className="text-[9px] font-bold text-neoul-heuk/20 uppercase tracking-widest mb-1">Gyeongsang</p>
                           <p className="text-lg font-black tracking-tight">경상 · 부산</p>
                           <p className="text-xs font-medium text-neoul-heuk/40 mt-1">해안 절경과 근대사 이야기</p>
                        </div>
                        <div className="w-20 h-20 bg-neoul-brand/5 rounded-3xl flex items-center justify-center">
                           <Ship className="w-10 h-10 text-neoul-brand" />
                        </div>
                     </motion.button>

                     {/* Jeolla Card */}
                     <motion.button 
                        whileTap={{ scale: 0.98 }}
                        className="bg-white rounded-[2rem] p-6 shadow-xl border border-white flex flex-col items-center justify-center gap-4 aspect-square"
                     >
                        <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center">
                           <div className="w-8 h-8 bg-rose-400 rounded-lg rotate-12" />
                        </div>
                        <div className="text-center">
                           <p className="text-[9px] font-bold text-neoul-heuk/20 uppercase tracking-widest">Jeolla</p>
                           <p className="text-sm font-bold">전라 · 광주</p>
                        </div>
                     </motion.button>

                     {/* Jeju Card */}
                     <motion.button 
                        whileTap={{ scale: 0.98 }}
                        className="bg-white rounded-[2rem] p-6 shadow-xl border border-white flex flex-col items-center justify-center gap-4 aspect-square"
                     >
                        <div className="text-3xl">🌴</div>
                        <div className="text-center">
                           <p className="text-[9px] font-bold text-neoul-heuk/20 uppercase tracking-widest">Jeju</p>
                           <p className="text-sm font-bold">제주</p>
                        </div>
                     </motion.button>

                  </div>

                  {/* Bottom Quick Action Card */}
                  <div className="mt-8 bg-white/40 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 flex items-center justify-between shadow-2xl shadow-black/5">
                     <div className="flex gap-4">
                        <div className="w-14 h-14 bg-neoul-brand rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">V</div>
                        <div>
                           <p className="text-sm font-black tracking-tight">전국 최저가 도슨트</p>
                           <p className="text-[10px] font-bold text-neoul-heuk/40 mt-0.5">오직 너울에서만 만나는 특가</p>
                        </div>
                     </div>
                     <ChevronLeft className="w-6 h-6 rotate-180 text-neoul-heuk/20" />
                  </div>
                  
                  <div className="h-32" />
               </div>
            </div>

            {/* Navigation Bar */}
            <nav className="h-24 bg-white border-t border-neoul-border flex items-center justify-around px-4 z-[60]">
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-brand"><Home className="w-6 h-6" /><span>홈</span></button>
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><MapPin className="w-6 h-6" /><span>지도</span></button>
              <div className="w-16 h-16 -mt-12 bg-neoul-brand rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-neoul-brand/30 border-4 border-white">
                <Accessibility className="w-8 h-8" />
              </div>
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><Heart className="w-6 h-6" /><span>보관함</span></button>
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><Settings className="w-6 h-6" /><span>설정</span></button>
            </nav>

            {/* Detailed Regional Zoom Overlay (Sketch + DatePop) */}
            <AnimatePresence>
              {mapMode === 'region' && (
                <motion.div 
                   initial={{ x: '100%' }}
                   animate={{ x: 0 }}
                   exit={{ x: '100%' }}
                   transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                   className="absolute inset-0 z-[70] bg-white flex flex-col"
                >
                   <header className="h-16 border-b border-neoul-border flex items-center px-6 gap-4">
                      <button onClick={() => setMapMode('country')} className="p-2 hover:bg-neoul-gray rounded-full"><ChevronLeft className="w-8 h-8" /></button>
                      <h3 className="text-xl font-bold tracking-tight">{selectedRegion?.name} 지역 가이드</h3>
                   </header>
                   <div className="flex-1 relative overflow-hidden bg-neoul-gray/30">
                      <img src="seoul-map.png" className="absolute inset-0 w-full h-full object-contain opacity-60 p-10" />
                      {selectedRegion?.spots.map((spot, idx) => (
                        <motion.div
                          key={spot.id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`absolute cursor-pointer flex flex-col items-center ${idx === 0 ? 'top-[30%] left-[45%]' : idx === 1 ? 'top-[48%] left-[32%]' : 'top-[38%] left-[62%]'}`}
                          onClick={() => setSelectedPlace(spot)}
                        >
                           <div className="bg-white px-5 py-2.5 rounded-2xl shadow-2xl border border-neoul-border flex items-center gap-3 hover:border-neoul-brand transition-all">
                              <div className="w-2 h-2 bg-neoul-brand rounded-full animate-pulse" />
                              <span className="text-xs font-black">{spot.name}</span>
                           </div>
                           <div className="mt-2 w-10 h-10 rounded-xl overflow-hidden border-4 border-white shadow-xl">
                              <img src={spot.image} className="w-full h-full object-cover" />
                           </div>
                        </motion.div>
                      ))}
                   </div>
                   <div className="h-44 bg-white border-t border-neoul-border p-6">
                      <div className="flex items-center justify-between mb-4">
                         <h4 className="font-bold">지금 가장 핫한 유산</h4>
                         <button className="text-xs font-bold text-neoul-brand">전체보기</button>
                      </div>
                      <div className="flex gap-4 overflow-x-auto no-scrollbar">
                         {selectedRegion?.spots.map(spot => (
                            <div key={spot.id} className="min-w-[200px] p-4 bg-neoul-gray rounded-2xl border border-neoul-border flex gap-3">
                               <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0"><img src={spot.image} className="w-full h-full object-cover" /></div>
                               <div className="overflow-hidden"><p className="text-xs font-bold truncate">{spot.name}</p><p className="text-[10px] text-neoul-heuk/40 font-bold">{spot.category}</p></div>
                            </div>
                         ))}
                      </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Place Detail Card */}
            <AnimatePresence>
               {selectedPlace && (
                 <motion.div
                   initial={{ y: '100%' }}
                   animate={{ y: 0 }}
                   exit={{ y: '100%' }}
                   transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                   className="absolute inset-0 z-[80] bg-white flex flex-col"
                 >
                   <header className="h-16 flex items-center justify-between px-6 absolute top-0 left-0 right-0 z-10">
                    <button onClick={() => setSelectedPlace(null)} className="w-10 h-10 bg-black/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20"><ChevronLeft className="w-7 h-7" /></button>
                    <div className="flex gap-2">
                       <button className="w-10 h-10 bg-black/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20"><Share2 className="w-5 h-5" /></button>
                       <button className="w-10 h-10 bg-black/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20"><Heart className="w-5 h-5" /></button>
                    </div>
                  </header>
                  <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                    <div className="w-full aspect-[4/5] bg-neoul-gray relative overflow-hidden">
                       <img src={selectedPlace.image} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/10" />
                       <div className="absolute bottom-8 left-8 right-8">
                          <h3 className="text-4xl font-bold tracking-tight text-neoul-heuk">{selectedPlace.name}</h3>
                          <p className="text-sm font-bold text-neoul-brand mt-1 tracking-widest uppercase">{selectedPlace.nameEn}</p>
                       </div>
                    </div>
                    <div className="px-8 py-10 space-y-6">
                       <div className="flex gap-2">
                          <span className="px-3 py-1 bg-neoul-brand/10 text-neoul-brand text-[10px] font-bold rounded-lg border border-neoul-brand/20">HISTORICAL SITE</span>
                          <span className="px-3 py-1 bg-neoul-gray text-neoul-heuk/40 text-[10px] font-bold rounded-lg border border-neoul-border">{selectedPlace.rating} / 5.0</span>
                       </div>
                       <p className="text-[15px] font-medium leading-relaxed text-neoul-heuk/70">{selectedPlace.description}</p>
                    </div>
                  </div>
                  <footer className="p-6 bg-white/80 backdrop-blur-2xl absolute bottom-0 left-0 right-0 z-50 border-t border-neoul-border">
                    <button onClick={() => setShowPlayer(true)} className="w-full py-5 rounded-3xl bg-neoul-heuk text-white text-lg font-bold flex items-center justify-center gap-3 shadow-2xl">
                       <Play className="w-6 h-6 fill-white" /> AI DOCENT START
                    </button>
                  </footer>
                 </motion.div>
               )}
            </AnimatePresence>

          </motion.div>
        ) : (
          /* Player Screen (Unchanged) */
          <motion.div key="player" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[100] flex flex-col bg-white">
            <header className="h-16 flex items-center justify-between px-6 border-b border-neoul-border flex-shrink-0">
              <button onClick={() => setShowPlayer(false)} className="p-2 hover:bg-neoul-gray rounded-full transition-colors"><ChevronDown className="w-8 h-8" /></button>
              <div className="text-center"><p className="text-xs font-bold text-neoul-heuk">AI HERITAGE GUIDE</p></div>
              <button className="p-2 hover:bg-neoul-gray rounded-full transition-colors"><Globe className="w-6 h-6 text-neoul-heuk/60" /></button>
            </header>
            <div className="flex-1 flex flex-col items-center justify-center px-10">
               <div className="w-64 h-80 rounded-[3rem] shadow-2xl overflow-hidden mb-12 relative border-4 border-slate-50"><img src="gyeongbokgung.png" className="w-full h-full object-cover" /></div>
               <div className="w-full h-24 mb-10 text-center"><p className="text-lg font-bold leading-relaxed text-neoul-brand">"지금 보시는 근정전의 마당에 깔린 박석은 <br />지혜와 배려가 담긴 건축 미학입니다."</p></div>
               <div className="w-full flex items-center justify-around px-6">
                  <Play className="w-10 h-10 rotate-180 text-neoul-heuk/20" /><Pause className="w-24 h-24 text-neoul-heuk shadow-2xl rounded-full" /><Play className="w-10 h-10 text-neoul-heuk/20" />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
