import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Play, Pause, Home, Heart, Settings, Accessibility, ChevronLeft, ChevronDown, Globe, Share2, Star, Plane, Clock, Info, ExternalLink, MessageCircle } from 'lucide-react';
import { MOCK_PLACES, MOCK_REGIONS, Place, Region } from '../types';

interface AppVersionProps {
  isHifi?: boolean;
}

export default function AppVersion({ isHifi: _isHifi = false }: AppVersionProps) {
  const [isSplash, setIsSplash] = useState(true);
  const [mapMode, setMapMode] = useState<'country' | 'region'>('country');
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'review'>('info');

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

  const handleBackToCountry = () => {
    setMapMode('country');
    setSelectedRegion(null);
  };

  return (
    <div className="relative w-full h-full bg-white overflow-hidden font-sans text-neoul-heuk">
      <AnimatePresence mode="wait">
        {!showPlayer ? (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
            {/* Header */}
            <header className="h-16 bg-white flex items-center justify-between px-6 flex-shrink-0 z-40 border-b border-neoul-border">
              {mapMode === 'region' ? (
                <button onClick={handleBackToCountry} className="flex items-center gap-2 text-neoul-heuk/60 hover:text-neoul-brand transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                  <span className="text-sm font-bold uppercase tracking-widest">{selectedRegion?.name}</span>
                </button>
              ) : (
                <h1 className="text-xl font-bold tracking-tight text-neoul-brand">NEOUL</h1>
              )}
              <div className="flex items-center gap-4">
                 <button className="p-2 hover:bg-neoul-gray rounded-full transition-colors"><Search className="w-6 h-6 text-neoul-heuk/60" /></button>
                 <button className="p-2 hover:bg-neoul-gray rounded-full transition-colors"><Globe className="w-6 h-6 text-neoul-heuk/60" /></button>
              </div>
            </header>

            {/* Map Area */}
            <div className="flex-1 relative overflow-hidden bg-white">
               <AnimatePresence mode="wait">
                 {mapMode === 'country' ? (
                   /* Phase 1: National Map */
                   <motion.div 
                     key="country-map"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 1.1 }}
                     className="absolute inset-0 flex items-center justify-center p-10"
                   >
                     <img src="map-bg.png" className="max-w-full h-full object-contain" alt="Korea Map" />
                     
                     {/* Incheon Airplane */}
                     <div className="absolute top-[28%] left-[22%]">
                        <div className="w-8 h-8 bg-neoul-brand rounded-full shadow-lg border-2 border-white flex items-center justify-center animate-pulse"><Plane className="w-4 h-4 text-white -rotate-45" /></div>
                     </div>

                     {/* Seoul City Marker (Clickable for zoom) */}
                     <motion.div 
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.95 }}
                       className="absolute top-[30%] left-[32%] cursor-pointer group"
                       onClick={() => handleRegionClick('seoul')}
                     >
                       <div className="bg-white p-2 rounded-2xl shadow-2xl border border-neoul-brand flex flex-col items-center group-hover:bg-neoul-brand transition-all">
                         <div className="w-12 h-12 rounded-xl overflow-hidden shadow-inner border border-neoul-border">
                            <img src="gyeongbokgung.png" className="w-full h-full object-cover" />
                         </div>
                         <span className="text-[10px] font-black mt-1 px-2 uppercase group-hover:text-white">서울</span>
                       </div>
                       <div className="absolute -top-1 -right-1 w-4 h-4 bg-neoul-brand text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white">3</div>
                     </motion.div>

                     {/* Jeonju, Busan markers etc... */}
                     <div className="absolute top-[60%] left-[28%] w-4 h-4 bg-neoul-heuk/10 rounded-full cursor-not-allowed" title="Update soon" />
                     <div className="absolute top-[75%] left-[72%] w-4 h-4 bg-neoul-heuk/10 rounded-full cursor-not-allowed" />
                   </motion.div>
                 ) : (
                   /* Phase 2: Regional Map (Zoomed) */
                   <motion.div 
                     key="region-map"
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.8 }}
                     className="absolute inset-0 flex items-center justify-center p-6"
                   >
                     <img src="seoul-map.png" className="max-w-full h-full object-contain opacity-80" alt="Seoul Map" />
                     
                     {/* Spots in Seoul */}
                     {selectedRegion?.spots.map((spot, idx) => (
                       <motion.div
                         key={spot.id}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: idx * 0.1 }}
                         whileHover={{ scale: 1.1, zIndex: 30 }}
                         className={`absolute cursor-pointer flex flex-col items-center ${idx === 0 ? 'top-[25%] left-[45%]' : idx === 1 ? 'top-[45%] left-[35%]' : 'top-[35%] left-[65%]'}`}
                         onClick={() => setSelectedPlace(spot)}
                       >
                          <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-neoul-border flex items-center gap-2 hover:border-neoul-brand transition-all">
                             <div className="w-1.5 h-1.5 bg-neoul-brand rounded-full" />
                             <span className="text-[11px] font-bold whitespace-nowrap">{spot.name}</span>
                          </div>
                          <div className="mt-1 w-8 h-8 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                             <img src={spot.image} className="w-full h-full object-cover" />
                          </div>
                       </motion.div>
                     ))}
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            {/* Navigation */}
            <nav className="h-24 bg-white border-t border-neoul-border flex items-center justify-around px-4 z-40">
              <button onClick={handleBackToCountry} className={`flex flex-col items-center gap-1.5 font-bold text-[10px] ${mapMode === 'country' ? 'text-neoul-brand' : 'text-neoul-heuk/20'}`}><Home className="w-6 h-6" /><span>홈</span></button>
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><MapPin className="w-6 h-6" /><span>지도</span></button>
              <div className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><Accessibility className="w-6 h-6" /><span>접근성</span></div>
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><Heart className="w-6 h-6" /><span>보관함</span></button>
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><Settings className="w-6 h-6" /><span>설정</span></button>
            </nav>

            {/* Detail Screen ... */}
            <AnimatePresence>
              {selectedPlace && (
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute inset-0 z-50 bg-white flex flex-col"
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
                          <p className="text-sm font-bold text-neoul-heuk/40 mt-1 uppercase tracking-widest">{selectedPlace.nameEn}</p>
                       </div>
                    </div>
                    <div className="flex items-center justify-around py-6 border-b border-neoul-border">
                       <div className="flex flex-col items-center gap-1"><span className="text-neoul-brand font-black text-lg">{selectedPlace.rating}</span><span className="text-[10px] font-bold text-neoul-heuk/20 uppercase">Rating</span></div>
                       <div className="w-px h-8 bg-neoul-border" />
                       <div className="flex flex-col items-center gap-1"><span className="text-neoul-heuk font-black text-lg">{selectedPlace.reviewCount}</span><span className="text-[10px] font-bold text-neoul-heuk/20 uppercase">Reviews</span></div>
                    </div>
                    <div className="px-8 py-10 space-y-6">
                       <h4 className="text-xl font-bold tracking-tight">안내 및 정보</h4>
                       <p className="text-[15px] font-medium leading-relaxed text-neoul-heuk/70">{selectedPlace.description}</p>
                    </div>
                  </div>

                  <footer className="p-6 bg-white/80 backdrop-blur-2xl absolute bottom-0 left-0 right-0 z-50 border-t border-neoul-border">
                    <button 
                      onClick={() => { setShowPlayer(true); setSelectedPlace(null); }} 
                      className="w-full py-5 rounded-3xl bg-neoul-brand text-white text-lg font-bold flex items-center justify-center gap-3 shadow-2xl shadow-neoul-brand/30 transition-all active:scale-[0.98]"
                    >
                      <Play className="w-6 h-6 fill-white" /> AI 도슨트 시작하기
                    </button>
                  </footer>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Player Screen ... */
          <motion.div key="player" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 flex flex-col bg-white">
            <header className="h-16 flex items-center justify-between px-6 border-b border-neoul-border flex-shrink-0">
              <button onClick={() => setShowPlayer(false)} className="p-2 hover:bg-neoul-gray rounded-full transition-colors"><ChevronDown className="w-8 h-8" /></button>
              <div className="text-center"><p className="text-xs font-bold text-neoul-heuk">AI HERITAGE GUIDE</p></div>
              <button className="p-2 hover:bg-neoul-gray rounded-full transition-colors"><Globe className="w-6 h-6 text-neoul-heuk/60" /></button>
            </header>
            <div className="flex-1 flex flex-col items-center justify-center px-10">
               <div className="w-64 h-80 rounded-[3rem] shadow-2xl overflow-hidden mb-12 relative"><img src="gyeongbokgung.png" className="w-full h-full object-cover" /></div>
               <div className="w-full h-24 mb-10 text-center"><p className="text-lg font-bold leading-relaxed">"지금 보시는 근정전의 마당에 깔린 박석은 <br />지혜와 배려가 담긴 건축 미학입니다."</p></div>
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
