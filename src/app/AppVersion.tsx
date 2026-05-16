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
               {/* Korea Puzzle Map Background */}
               <div className="absolute inset-0 z-0 flex items-center justify-center bg-white">
                 <img src="map-bg.png" className={`max-w-full h-[85%] object-contain ${isHifi ? 'opacity-90' : 'opacity-40'}`} alt="Korea Puzzle Map" />
                 
                 {/* 1. Airport Location (Incheon) */}
                 <motion.div 
                   initial={{ y: -10, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   className="absolute top-[32%] left-[24%] flex flex-col items-center"
                 >
                    <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-black/5">
                       <Plane className="w-5 h-5 text-neoul-cheong -rotate-45" />
                    </div>
                    <span className="text-[8px] font-black mt-1 bg-white/80 px-2 py-0.5 rounded-full">INCHEON</span>
                 </motion.div>

                 {/* 2. Seoul Landmark (Gyeongbokgung) */}
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className="absolute top-[34%] left-[34%] cursor-pointer group"
                   onClick={() => setSelectedPlace(MOCK_PLACES[0])}
                 >
                   <div className="bg-white p-1 rounded-2xl shadow-2xl border border-black/5 flex flex-col items-center">
                     <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100">
                        <img src="gyeongbokgung.png" className="w-full h-full object-cover" />
                     </div>
                     <span className="text-[9px] font-black mt-1 px-2 uppercase tracking-tighter">서울</span>
                   </div>
                 </motion.div>

                 {/* 3. Jeonju Landmark (Hanok Village) */}
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 0.2 }}
                   className="absolute top-[58%] left-[32%] cursor-pointer"
                   onClick={() => setSelectedPlace(MOCK_PLACES[1])}
                 >
                   <div className="bg-white p-1 rounded-2xl shadow-2xl border border-black/5 flex flex-col items-center">
                     <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100">
                        <img src="hanok.png" className="w-full h-full object-cover" />
                     </div>
                     <span className="text-[8px] font-black mt-1 px-2 uppercase tracking-tighter">전주</span>
                   </div>
                 </motion.div>

                 {/* 4. Gyeongju (Historical Capital) */}
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 0.3 }}
                   className="absolute top-[64%] left-[62%] cursor-pointer opacity-50"
                 >
                   <div className="bg-white p-1 rounded-2xl shadow-xl border border-black/5 flex flex-col items-center">
                     <div className="w-8 h-8 rounded-xl bg-neoul-hwang/20 flex items-center justify-center"><Star className="w-4 h-4 text-neoul-hwang" /></div>
                     <span className="text-[7px] font-black mt-0.5">경주</span>
                   </div>
                 </motion.div>

                 {/* 5. Busan (Coastal City) */}
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 0.4 }}
                   className="absolute top-[78%] left-[65%] cursor-pointer opacity-50"
                 >
                   <div className="bg-white p-1 rounded-2xl shadow-xl border border-black/5 flex flex-col items-center">
                     <div className="w-8 h-8 rounded-xl bg-neoul-cheong/20 flex items-center justify-center"><Globe className="w-4 h-4 text-neoul-cheong" /></div>
                     <span className="text-[7px] font-black mt-0.5">부산</span>
                   </div>
                 </motion.div>
               </div>

               {/* Search Bar */}
               <div className="absolute top-4 left-6 right-6 z-20">
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
                  className={`min-w-[280px] rounded-[2.5rem] p-5 shadow-2xl flex items-center gap-5 cursor-pointer border border-black/5 transition-all ${isHifi ? 'bg-white shadow-black/10' : 'bg-white shadow-black/5'}`}
                >
                  <div className="w-18 h-18 rounded-3xl flex items-center justify-center overflow-hidden flex-shrink-0 bg-slate-100 relative">
                    {isHifi ? (
                       <img src={idx === 0 ? 'gyeongbokgung.png' : 'hanok.png'} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-neoul-heuk/10">[ X ]</span>
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-lg font-bold text-neoul-heuk truncate tracking-tight">{place.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                       <div className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-neoul-hwang text-neoul-hwang" />
                          <span className="text-[9px] font-bold">4.8</span>
                       </div>
                       <span className="text-[9px] font-medium text-neoul-heuk/40 tracking-widest">{place.distance} • {place.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Bar */}
            <nav className={`px-10 h-24 flex items-center justify-between flex-shrink-0 z-30 transition-all ${isHifi ? 'bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)]' : 'bg-white border-t border-neoul-gray'}`}>
              <button className="flex flex-col items-center gap-1 font-bold text-[9px] text-neoul-mint">
                <Home className="w-6 h-6" />
                <span>홈</span>
              </button>
              <button className="flex flex-col items-center gap-1 font-bold text-[9px] text-neoul-heuk/20">
                <MapPin className="w-6 h-6" />
                <span>탐색</span>
              </button>
              <div className={`w-16 h-16 -mt-12 flex items-center justify-center rounded-3xl shadow-2xl transition-all ${isHifi ? 'bg-neoul-heuk text-white shadow-neoul-heuk/20' : 'bg-neoul-mint text-white shadow-neoul-mint/20'}`}>
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
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="absolute inset-0 z-50 bg-white flex flex-col"
                >
                  <header className="h-16 border-b border-black/5 flex items-center justify-between px-6 flex-shrink-0 bg-white">
                    <button onClick={() => setSelectedPlace(null)} className="icon-btn">
                      <ChevronLeft className="w-7 h-7" />
                    </button>
                    <h3 className="text-base font-bold text-neoul-heuk tracking-tight truncate px-4">
                      {selectedPlace.name}
                    </h3>
                    <button className="icon-btn">
                      <Share2 className="w-5 h-5 text-neoul-heuk/40" />
                    </button>
                  </header>

                  <div className="flex-1 overflow-y-auto no-scrollbar">
                    <div className="w-full aspect-[4/3] bg-slate-100 flex items-center justify-center relative overflow-hidden">
                      {isHifi ? (
                         <img src={selectedPlace.id === 1 ? 'gyeongbokgung.png' : 'hanok.png'} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-sm font-medium text-neoul-heuk/10 select-none">[ X ] 이미지 플레이스홀더</div>
                      )}
                      
                      {isHifi && (
                        <div className="absolute top-4 left-6 flex gap-2">
                           <span className="bg-black/60 backdrop-blur px-3 py-1.5 rounded-full text-white text-[10px] font-bold">KOREAN HERITAGE</span>
                        </div>
                      )}
                    </div>

                    <div className="px-6 py-6 flex flex-col gap-6">
                      <div className="flex gap-3 overflow-x-auto no-scrollbar">
                        {['♿ 휠체어 가능', '🛗 엘리베이터', '🚻 편의시설', '🔊 음성 안내'].map((badge) => (
                           <div key={badge} className={`px-4 py-2 rounded-2xl text-[11px] font-bold whitespace-nowrap transition-all ${isHifi ? 'bg-neoul-cheong/5 text-neoul-cheong border border-neoul-cheong/10' : 'bg-neoul-cheong/5 border border-neoul-cheong text-neoul-cheong'}`}>
                              {badge}
                           </div>
                        ))}
                      </div>

                      <div className={`p-6 rounded-[2rem] transition-all ${isHifi ? 'bg-gradient-to-br from-neoul-hwang/10 to-orange-50 border border-neoul-hwang/10' : 'bg-neoul-hwang/10 border-l-4 border-neoul-hwang'}`}>
                        <div className="flex items-center gap-2 mb-3">
                           <Info className="w-4 h-4 text-neoul-hwang" />
                           <span className="text-xs font-bold text-neoul-hwang uppercase tracking-widest">History Highlight</span>
                        </div>
                        <p className="text-[13px] font-medium leading-relaxed text-neoul-heuk/80">
                           {selectedPlace.name}은(는) 한국의 소중한 문화유산으로, 그 역사적 가치와 아름다움을 보존하고 있습니다.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                         <h4 className="text-lg font-bold tracking-tight">장소 정보</h4>
                         <p className="text-[14px] font-medium text-neoul-heuk/60 leading-relaxed">
                            {selectedPlace.description}
                         </p>
                      </div>
                      <div className="h-32" />
                    </div>
                  </div>

                  <footer className={`p-6 border-t border-black/5 bg-white/80 backdrop-blur-xl absolute bottom-0 left-0 right-0 z-50`}>
                    <button 
                      onClick={() => { setShowPlayer(true); setSelectedPlace(null); }} 
                      className={`w-full py-5 rounded-[2rem] text-sm font-bold flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95 ${isHifi ? 'bg-neoul-heuk text-white shadow-black/20' : 'bg-neoul-jeok text-white shadow-neoul-jeok/20'}`}
                    >
                      <Play className="w-5 h-5 fill-white" />
                      LISTEN TO AI DOCENT
                    </button>
                  </footer>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Player Screen ... (keeping as is) */
          <motion.div 
            key="player" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 z-50 flex flex-col bg-white"
          >
            <header className="h-16 border-b border-black/5 flex items-center justify-between px-6 flex-shrink-0">
              <button onClick={() => setShowPlayer(false)} className="icon-btn">
                <ChevronDown className="w-8 h-8 text-neoul-heuk" />
              </button>
              <div className="text-center">
                 <h2 className="text-[10px] font-bold text-neoul-heuk/40 uppercase tracking-[0.3em] mb-0.5">Now Playing</h2>
                 <p className="text-xs font-bold text-neoul-heuk">AI HERITAGE GUIDE</p>
              </div>
              <button className="icon-btn">
                <Globe className="w-6 h-6 text-neoul-heuk" />
              </button>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center px-10">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className={`w-64 h-64 rounded-full shadow-2xl mb-12 relative overflow-hidden border-8 border-white ${isHifi ? 'shadow-black/20' : 'shadow-black/5 bg-neoul-gray'}`}
              >
                <img src="hanok.png" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>

              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-neoul-heuk mb-2 tracking-tighter">Ancient Heritage</h3>
                <div className="bg-neoul-mint/10 text-neoul-mint px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block">
                  Premium Audio Log #01
                </div>
              </div>

              <div className="w-full flex flex-col gap-4 mb-12">
                <div className="relative h-2 bg-neoul-gray rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '40%' }}
                    className={`absolute top-0 left-0 bottom-0 transition-all ${isHifi ? 'bg-neoul-heuk' : 'bg-neoul-jeok'}`} 
                  />
                </div>
              </div>

              <div className="w-full flex items-center justify-around">
                <button className="text-neoul-heuk/20 hover:text-neoul-heuk transition-colors"><Play className="w-10 h-10 rotate-180 fill-current" /></button>
                <button className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95 bg-neoul-heuk text-white shadow-black/40`}>
                  <Pause className="w-10 h-10 fill-current" />
                </button>
                <button className="text-neoul-heuk/20 hover:text-neoul-heuk transition-colors"><Play className="w-10 h-10 fill-current" /></button>
              </div>
            </div>

            <div className="p-8 flex items-center justify-center text-center bg-slate-900 h-[22%]">
              <p className="text-sm font-medium leading-relaxed text-white/80">
                "이곳은 한국의 아름다운 문화유산입니다. <br />
                함께 그 가치를 느껴보세요."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
