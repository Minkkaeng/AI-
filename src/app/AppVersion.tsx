import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Play, Pause, Home, Heart, Settings, Accessibility, ChevronLeft, ChevronDown, Globe, Share2, Star, Plane, Bell, Mountain, TowerControl as Tower, Ship, Landmark, Info, Clock, ExternalLink, MessageCircle, MoreHorizontal, Navigation } from 'lucide-react';
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
    <div className="relative w-full h-full bg-[#F8FAFB] overflow-hidden font-sans text-neoul-heuk">
      <AnimatePresence mode="wait">
        {!showPlayer ? (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
            
            {/* Header */}
            <header className="bg-white flex-shrink-0 z-50">
               <div className="h-14 flex items-center justify-between px-6">
                  <div className="w-10" />
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
               <div className="relative w-full h-44 bg-white overflow-hidden flex flex-col px-8 pt-8">
                  <div className="relative z-10">
                     <h2 className="text-2xl font-bold flex items-baseline gap-2">대한민국 <span className="text-sm font-bold text-neoul-heuk/20 uppercase">KOREA</span></h2>
                  </div>
                  <img src="hero-bg.png" className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-60" />
               </div>

               <div className="p-4 relative">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="col-span-2 grid grid-cols-2 gap-4">
                        <motion.button whileTap={{ scale: 0.98 }} className="bg-white rounded-[2rem] p-6 shadow-xl border border-white flex flex-col items-center justify-between aspect-square">
                           <div className="w-full flex justify-end"><span className="text-[11px] font-bold text-neoul-heuk/40 uppercase tracking-widest">Incheon</span></div>
                           <div className="w-16 h-16 bg-neoul-brand/5 rounded-full flex items-center justify-center"><Plane className="w-8 h-8 text-neoul-brand -rotate-45" /></div>
                           <span className="text-sm font-bold">인천</span>
                        </motion.button>

                        <motion.button 
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleRegionClick('seoul')}
                          className="bg-white rounded-[2rem] p-6 shadow-xl border-2 border-neoul-brand/30 flex flex-col items-center justify-between aspect-square"
                        >
                           <div className="w-full flex justify-end"><span className="text-[11px] font-bold text-neoul-brand uppercase tracking-widest">Seoul</span></div>
                           <div className="w-16 h-16 bg-neoul-brand/10 rounded-full flex items-center justify-center"><Landmark className="w-8 h-8 text-neoul-brand" /></div>
                           <span className="text-sm font-bold text-neoul-brand">서울 · 경기</span>
                        </motion.button>
                     </div>

                     <motion.button whileTap={{ scale: 0.98 }} className="bg-white rounded-[2rem] p-6 shadow-xl border border-white flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center"><Mountain className="w-8 h-8 text-emerald-400" /></div>
                        <p className="text-sm font-bold">강원</p>
                     </motion.button>

                     <motion.button whileTap={{ scale: 0.98 }} className="bg-white rounded-[2rem] p-6 shadow-xl border border-white flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center"><Tower className="w-8 h-8 text-amber-400" /></div>
                        <p className="text-sm font-bold">충청</p>
                     </motion.button>

                     <motion.button whileTap={{ scale: 0.98 }} className="col-span-2 bg-white rounded-[3rem] p-8 shadow-xl border border-white flex items-center justify-between">
                        <div><p className="text-lg font-black tracking-tight">경상 · 부산</p><p className="text-xs font-medium text-neoul-heuk/40 mt-1">해안 절경과 근대사 이야기</p></div>
                        <div className="w-16 h-16 bg-neoul-brand/5 rounded-3xl flex items-center justify-center"><Ship className="w-8 h-8 text-neoul-brand" /></div>
                     </motion.button>
                  </div>
                  <div className="h-32" />
               </div>
            </div>

            {/* Navigation */}
            <nav className="h-24 bg-white border-t border-neoul-border flex items-center justify-around px-4 z-[60]">
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-brand"><Home className="w-6 h-6" /><span>홈</span></button>
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><MapPin className="w-6 h-6" /><span>지도</span></button>
              <div className="w-16 h-16 -mt-12 bg-neoul-brand rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-neoul-brand/30 border-4 border-white">
                <Accessibility className="w-8 h-8" />
              </div>
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><Heart className="w-6 h-6" /><span>보관함</span></button>
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><Settings className="w-6 h-6" /><span>설정</span></button>
            </nav>

            {/* Detailed Regional View */}
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

            {/* FULL-SCREEN DETAILED PAGE (Redesigned) */}
            <AnimatePresence>
               {selectedPlace && (
                 <motion.div
                   initial={{ y: '100%' }}
                   animate={{ y: 0 }}
                   exit={{ y: '100%' }}
                   transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                   className="absolute inset-0 z-[90] bg-white flex flex-col overflow-hidden"
                 >
                   {/* Floating Header */}
                   <header className="h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-[100]">
                      <button onClick={() => setSelectedPlace(null)} className="w-11 h-11 bg-black/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20"><ChevronLeft className="w-7 h-7" /></button>
                      <div className="flex gap-2">
                        <button className="w-11 h-11 bg-black/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20"><Share2 className="w-5 h-5" /></button>
                        <button className="w-11 h-11 bg-black/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20"><Heart className="w-5 h-5" /></button>
                      </div>
                   </header>

                   <div className="flex-1 overflow-y-auto no-scrollbar">
                      {/* Immersive Hero */}
                      <div className="w-full aspect-[4/5] relative overflow-hidden">
                         <img src={selectedPlace.image} className="w-full h-full object-cover" />
                         <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/10" />
                         <div className="absolute bottom-10 left-8 right-8">
                            <div className="flex items-center gap-2 mb-3">
                               <span className="bg-neoul-brand px-3 py-1 rounded-lg text-white text-[10px] font-black uppercase tracking-widest shadow-lg">Heritage Rank #1</span>
                               <div className="flex items-center gap-1 bg-white/20 backdrop-blur px-2 py-1 rounded-lg text-white text-[10px] font-bold"><Star className="w-3 h-3 fill-neoul-brand text-neoul-brand" /> {selectedPlace.rating}</div>
                            </div>
                            <h3 className="text-5xl font-black tracking-tighter text-neoul-heuk mb-1">{selectedPlace.name}</h3>
                            <p className="text-sm font-bold text-neoul-brand/60 uppercase tracking-widest">{selectedPlace.nameEn}</p>
                         </div>
                      </div>

                      {/* Content Body */}
                      <div className="px-8 pt-10 pb-40 space-y-12">
                         
                         {/* Quick Action Buttons */}
                         <div className="grid grid-cols-4 gap-4">
                            {[
                               { icon: <Navigation className="w-6 h-6" />, label: '길찾기' },
                               { icon: <Accessibility className="w-6 h-6" />, label: '무장애' },
                               { icon: <MessageCircle className="w-6 h-6" />, label: '리뷰' },
                               { icon: <MoreHorizontal className="w-6 h-6" />, label: '더보기' }
                            ].map(item => (
                               <div key={item.label} className="flex flex-col items-center gap-2">
                                  <div className="w-14 h-14 bg-neoul-gray rounded-2xl flex items-center justify-center text-neoul-heuk/60 border border-neoul-border">{item.icon}</div>
                                  <span className="text-[11px] font-bold text-neoul-heuk/40">{item.label}</span>
                               </div>
                            ))}
                         </div>

                         {/* Overview Section */}
                         <div className="space-y-4">
                            <h4 className="text-xl font-bold flex items-center gap-2"><Info className="w-6 h-6 text-neoul-brand" /> 상세 정보</h4>
                            <p className="text-[15px] font-medium leading-relaxed text-neoul-heuk/60">{selectedPlace.description}</p>
                         </div>

                         {/* Visitor Info Card */}
                         <div className="bg-neoul-gray p-8 rounded-[2.5rem] border border-neoul-border space-y-6">
                            <div className="flex items-start gap-4">
                               <Clock className="w-6 h-6 text-neoul-brand flex-shrink-0" />
                               <div><p className="text-[11px] font-bold text-neoul-heuk/20 uppercase tracking-widest mb-1">Operating Hours</p><p className="text-sm font-bold">{selectedPlace.hours}</p></div>
                            </div>
                            <div className="flex items-start gap-4">
                               <MapPin className="w-6 h-6 text-neoul-brand flex-shrink-0" />
                               <div><p className="text-[11px] font-bold text-neoul-heuk/20 uppercase tracking-widest mb-1">Entrance Fee</p><p className="text-sm font-bold text-neoul-brand">{selectedPlace.fee}</p></div>
                            </div>
                         </div>

                         {/* History Section */}
                         <div className="space-y-6">
                            <div className="flex items-center justify-between">
                               <h4 className="text-xl font-bold">역사 이야기</h4>
                               <button className="text-xs font-bold text-neoul-brand flex items-center gap-1">전체 사료 보기 <ExternalLink className="w-3 h-3" /></button>
                            </div>
                            <div className="relative rounded-[3rem] overflow-hidden group">
                               <img src={selectedPlace.gallery[1]} className="w-full h-56 object-cover" />
                               <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-8 text-center text-white opacity-100 group-hover:bg-black/60 transition-all">
                                  <p className="text-[13px] font-medium leading-relaxed italic">"조선 왕조의 위엄과 철학이 담긴 <br />가장 웅장한 공간의 이야기를 만나보세요."</p>
                               </div>
                            </div>
                            <p className="text-[15px] font-medium leading-relaxed text-neoul-heuk/70">{selectedPlace.historyText}</p>
                         </div>

                         {/* Amenities Grid */}
                         <div className="space-y-4">
                            <h4 className="text-xl font-bold">시설 및 편의정보</h4>
                            <div className="grid grid-cols-2 gap-3">
                               {selectedPlace.amenities.map(item => (
                                  <div key={item.label} className="p-5 bg-white border border-neoul-border rounded-[2rem] flex items-center gap-4 shadow-sm">
                                     <span className="text-2xl">{item.icon}</span>
                                     <span className="text-[11px] font-bold">{item.label}</span>
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Fixed Bottom Action */}
                   <footer className="p-6 bg-white/80 backdrop-blur-2xl fixed bottom-0 left-0 right-0 z-[100] border-t border-neoul-border">
                     <button 
                       onClick={() => setShowPlayer(true)} 
                       className="w-full py-5 rounded-[2.5rem] bg-neoul-heuk text-white text-lg font-black flex items-center justify-center gap-4 shadow-2xl active:scale-[0.98] transition-all"
                     >
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
            <header className="h-16 flex items-center justify-between px-6 border-b border-neoul-border">
              <button onClick={() => setShowPlayer(false)} className="p-2"><ChevronDown className="w-8 h-8" /></button>
              <div className="text-center"><p className="text-[10px] font-black text-neoul-heuk/20 uppercase tracking-[0.4em]">AI Audio Guide</p><p className="text-xs font-bold">{selectedPlace?.name}</p></div>
              <Globe className="w-6 h-6 text-neoul-heuk/20" />
            </header>
            <div className="flex-1 flex flex-col items-center justify-center px-10">
               <div className="w-72 h-80 rounded-[3.5rem] shadow-2xl overflow-hidden mb-12 relative border-8 border-slate-50"><img src={selectedPlace?.image} className="w-full h-full object-cover" /></div>
               <div className="w-full h-24 mb-10 text-center"><p className="text-lg font-bold leading-relaxed text-neoul-brand">"경복궁 근정전의 박석 하나하나에는 <br />조상의 지혜와 배려가 깃들어 있습니다."</p></div>
               <div className="w-full flex items-center justify-around">
                  <Play className="w-10 h-10 rotate-180 text-neoul-heuk/10" /><Pause className="w-24 h-24 text-neoul-heuk bg-white shadow-2xl rounded-full border-4 border-neoul-gray" /><Play className="w-10 h-10 text-neoul-heuk/10" />
               </div>
            </div>
            <div className="h-24 bg-neoul-gray flex items-center justify-center"><div className="flex gap-1">{[1,2,3,4,5].map(i => <div key={i} className="w-1 h-4 bg-neoul-brand animate-pulse" style={{ animationDelay: `${i*0.1}s` }} />)}</div></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
