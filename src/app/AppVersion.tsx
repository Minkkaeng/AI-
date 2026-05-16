import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Play, Pause, Home, Heart, Settings, Accessibility, ChevronLeft, ChevronDown, Globe, Share2, Star, Info, Plane } from 'lucide-react';
import { MOCK_PLACES } from '../types';

interface AppVersionProps {
  isHifi?: boolean;
}

export default function AppVersion({ isHifi = false }: AppVersionProps) {
  const [isSplash, setIsSplash] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 2000);
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
          <div className="flex gap-3 mb-8">
            <div className="w-3 h-12 bg-neoul-jeok rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-3 h-12 bg-neoul-cheong rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-3 h-12 bg-neoul-hwang rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter text-neoul-heuk">NEOUL</h1>
          <p className="mt-2 text-[10px] font-bold text-neoul-heuk/40 uppercase tracking-[0.3em]">AI Heritage Docent</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`relative w-full h-full ${isHifi ? 'bg-slate-50' : 'bg-neoul-gray'} overflow-hidden font-sans text-neoul-heuk transition-colors duration-500`}>
      <AnimatePresence mode="wait">
        {!showPlayer ? (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
            {/* Header */}
            <header className={`h-14 ${isHifi ? 'bg-white border-b border-black/5' : 'bg-neoul-mint'} flex items-center px-6 flex-shrink-0 z-40 transition-all`}>
              <div className={`flex w-full justify-around font-bold text-[10px] tracking-widest ${isHifi ? 'text-neoul-heuk' : 'text-white'}`}>
                <button className={isHifi ? 'text-neoul-mint' : 'border-b-2 border-white pb-1'}>HOME</button>
                <button className="opacity-40">GUIDE</button>
                <button className="opacity-40">BROWSE</button>
                <button className="opacity-40">MY LOG</button>
              </div>
            </header>

            {/* Notice Bar */}
            <div className={`${isHifi ? 'bg-white py-1 px-6 border-b border-black/5' : 'bg-neoul-orange h-8 flex items-center justify-center px-4'} flex-shrink-0 transition-all`}>
              {isHifi ? (
                 <div className="flex items-center gap-2 text-[9px] font-bold text-neoul-heuk/60">
                    <span className="bg-neoul-orange/10 text-neoul-orange px-2 py-0.5 rounded-full">NOTICE</span>
                    <span>새로운 역사 해설 '경복궁' 편이 업데이트 되었습니다!</span>
                 </div>
              ) : (
                <p className="text-[8px] font-bold text-white text-center leading-none">
                  새로운 역사 해설 '경복궁' 편이 업데이트 되었습니다!
                </p>
              )}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative overflow-hidden bg-white">
               {/* Precise South Korea Silhouette Map */}
               <div className="absolute inset-0 z-0 flex items-center justify-center bg-white p-8">
                 <img src="map-bg.png" className={`max-w-full h-full object-contain ${isHifi ? 'opacity-100 shadow-2xl rounded-[3rem]' : 'opacity-40'}`} alt="South Korea Silhouette Map" />
                 
                 {/* Corrected Geographical Positions */}
                 
                 {/* 1. Incheon Airport (Top Left Coast) */}
                 <motion.div 
                   initial={{ y: -10, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   className="absolute top-[28%] left-[22%] flex flex-col items-center z-10"
                 >
                    <div className="w-10 h-10 bg-neoul-cheong rounded-full shadow-lg flex items-center justify-center border-4 border-white">
                       <Plane className="w-5 h-5 text-white -rotate-45" />
                    </div>
                    <span className="text-[7px] font-black mt-1 bg-white/90 px-2 py-0.5 rounded-full border border-black/5">INCHEON</span>
                 </motion.div>

                 {/* 2. Seoul Landmark (Near Incheon, slightly inland) */}
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className="absolute top-[30%] left-[30%] cursor-pointer group z-20"
                   onClick={() => setSelectedPlace(MOCK_PLACES[0])}
                 >
                   <div className="bg-white p-1 rounded-2xl shadow-2xl border border-black/5 flex flex-col items-center">
                     <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 ring-2 ring-neoul-mint/20">
                        <img src="gyeongbokgung.png" className="w-full h-full object-cover" />
                     </div>
                     <span className="text-[10px] font-black mt-1 px-2 uppercase tracking-tighter">서울</span>
                   </div>
                 </motion.div>

                 {/* 3. Jeonju (South-West) */}
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 0.2 }}
                   className="absolute top-[60%] left-[28%] cursor-pointer z-10"
                   onClick={() => setSelectedPlace(MOCK_PLACES[1])}
                 >
                   <div className="bg-white p-1 rounded-2xl shadow-2xl border border-black/5 flex flex-col items-center">
                     <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100">
                        <img src="hanok.png" className="w-full h-full object-cover" />
                     </div>
                     <span className="text-[9px] font-black mt-1 px-2 uppercase tracking-tighter">전주</span>
                   </div>
                 </motion.div>

                 {/* 4. Gyeongju (South-East) */}
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 0.3 }}
                   className="absolute top-[65%] left-[68%] cursor-pointer opacity-50 z-10"
                 >
                   <div className="bg-white p-1 rounded-2xl shadow-xl border border-black/5 flex flex-col items-center">
                     <div className="w-10 h-10 rounded-xl bg-neoul-hwang/20 flex items-center justify-center"><Star className="w-5 h-5 text-neoul-hwang" /></div>
                     <span className="text-[8px] font-black mt-0.5">경주</span>
                   </div>
                 </motion.div>

                 {/* 5. Busan (South-East Coast) */}
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 0.4 }}
                   className="absolute top-[75%] left-[72%] cursor-pointer opacity-50 z-10"
                 >
                   <div className="bg-white p-1 rounded-2xl shadow-xl border border-black/5 flex flex-col items-center">
                     <div className="w-10 h-10 rounded-xl bg-neoul-cheong/20 flex items-center justify-center"><Globe className="w-5 h-5 text-neoul-cheong" /></div>
                     <span className="text-[8px] font-black mt-0.5">부산</span>
                   </div>
                 </motion.div>

                 {/* 6. Jeju Island (Bottom) */}
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 0.5 }}
                   className="absolute bottom-[8%] left-[25%] cursor-pointer z-10"
                 >
                   <div className="bg-white p-2 rounded-2xl shadow-2xl border border-black/5 flex flex-col items-center">
                     <div className="w-12 h-12 rounded-full bg-neoul-mint/20 flex items-center justify-center text-xl">🌴</div>
                     <span className="text-[9px] font-black mt-1 px-2 uppercase">제주</span>
                   </div>
                 </motion.div>
               </div>

               {/* Search Bar */}
               <div className="absolute top-4 left-6 right-6 z-30">
                 <div className={`rounded-3xl flex items-center px-5 py-4 transition-all ${isHifi ? 'bg-white shadow-2xl shadow-black/10' : 'bg-white/90 backdrop-blur-md shadow-sm border border-black/5'}`}>
                   <Search className={`w-4 h-4 mr-3 ${isHifi ? 'text-neoul-mint' : 'text-neoul-heuk/40'}`} />
                   <input type="text" placeholder="한국의 어디로 떠나볼까요?" className="bg-transparent border-none outline-none w-full text-xs font-bold placeholder:text-black/20" />
                 </div>
               </div>
            </div>

            {/* Bottom Cards Scroll */}
            <div className="absolute bottom-24 left-0 right-0 z-20 overflow-x-auto no-scrollbar flex gap-5 px-6 pb-6">
              {MOCK_PLACES.map((place, idx) => (
                <motion.div
                  key={place.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlace(place)}
                  className={`min-w-[280px] rounded-[2.5rem] p-5 shadow-2xl flex items-center gap-5 cursor-pointer border border-black/5 transition-all bg-white shadow-black/10`}
                >
                  <div className="w-18 h-18 rounded-3xl flex items-center justify-center overflow-hidden flex-shrink-0 bg-slate-100 relative">
                    <img src={idx === 0 ? 'gyeongbokgung.png' : 'hanok.png'} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-lg font-bold text-neoul-heuk truncate tracking-tight">{place.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                       <Star className="w-3 h-3 fill-neoul-hwang text-neoul-hwang" />
                       <span className="text-[9px] font-bold">4.8</span>
                       <span className="text-[9px] font-medium text-neoul-heuk/40 tracking-widest uppercase ml-2">{place.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Bar */}
            <nav className={`px-10 h-24 flex items-center justify-between flex-shrink-0 z-40 transition-all bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)]`}>
              <button className="flex flex-col items-center gap-1 font-bold text-[9px] text-neoul-mint">
                <Home className="w-6 h-6" />
                <span>홈</span>
              </button>
              <button className="flex flex-col items-center gap-1 font-bold text-[9px] text-neoul-heuk/20">
                <MapPin className="w-6 h-6" />
                <span>탐색</span>
              </button>
              <div className={`w-16 h-16 -mt-12 flex items-center justify-center rounded-3xl shadow-2xl bg-neoul-heuk text-white shadow-neoul-heuk/20 transition-all`}>
                <Accessibility className="w-8 h-8" />
              </div>
              <button className="flex flex-col items-center gap-1 font-bold text-[9px] text-neoul-heuk/20">
                <Heart className="w-6 h-6" />
                <span>찜</span>
              </button>
              <button className="flex flex-col items-center gap-1 font-bold text-[9px] text-neoul-heuk/20">
                <Settings className="w-6 h-6" />
                <span>마이</span>
              </button>
            </nav>

            {/* Detail Screen ... (keeping as is) */}
            <AnimatePresence>
              {selectedPlace && (
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  className="absolute inset-0 z-50 bg-white flex flex-col"
                >
                   {/* ... simplified for length, content remains same ... */}
                   <header className="h-16 border-b border-black/5 flex items-center justify-between px-6 flex-shrink-0 bg-white">
                    <button onClick={() => setSelectedPlace(null)} className="icon-btn"><ChevronLeft className="w-7 h-7" /></button>
                    <h3 className="text-base font-bold text-neoul-heuk tracking-tight truncate px-4">{selectedPlace.name}</h3>
                    <button className="icon-btn"><Share2 className="w-5 h-5 text-neoul-heuk/40" /></button>
                  </header>
                  <div className="flex-1 overflow-y-auto no-scrollbar">
                    <div className="w-full aspect-[4/3] bg-slate-100 relative overflow-hidden">
                       <img src={selectedPlace.id === 1 ? 'gyeongbokgung.png' : 'hanok.png'} className="w-full h-full object-cover" />
                    </div>
                    <div className="px-6 py-8">
                       <p className="text-[14px] font-medium leading-relaxed text-neoul-heuk/70">{selectedPlace.description}</p>
                    </div>
                  </div>
                  <footer className="p-6 border-t border-black/5 bg-white/80 backdrop-blur-xl absolute bottom-0 left-0 right-0 z-50">
                    <button onClick={() => setShowPlayer(true)} className="w-full py-5 rounded-[2rem] bg-neoul-heuk text-white text-sm font-bold flex items-center justify-center gap-3">
                       <Play className="w-5 h-5 fill-white" /> LISTEN TO AI DOCENT
                    </button>
                  </footer>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Player Screen ... (keeping as is) */
          <motion.div key="player" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 flex flex-col bg-white">
            {/* ... content remains same ... */}
            <header className="h-16 border-b border-black/5 flex items-center justify-between px-6">
              <button onClick={() => setShowPlayer(false)} className="icon-btn"><ChevronDown className="w-8 h-8" /></button>
              <div className="text-center"><p className="text-xs font-bold">AI HERITAGE GUIDE</p></div>
              <button className="icon-btn"><Globe className="w-6 h-6" /></button>
            </header>
            <div className="flex-1 flex flex-col items-center justify-center px-10">
               <div className="w-64 h-64 rounded-full border-8 border-slate-50 shadow-2xl overflow-hidden mb-12"><img src="hanok.png" className="w-full h-full object-cover" /></div>
               <h3 className="text-2xl font-bold mb-10">Audio Guide Log #01</h3>
               <div className="w-full flex items-center justify-around">
                  <Play className="w-10 h-10 rotate-180 text-slate-200" /><Pause className="w-20 h-20 text-slate-900" /><Play className="w-10 h-10 text-slate-200" />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
