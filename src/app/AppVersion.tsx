import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Play, Pause, Home, Heart, Settings, Accessibility, ChevronLeft, ChevronDown, Globe, Share2, Star, Clock, Info } from 'lucide-react';
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
            <div className="flex-1 relative overflow-hidden">
               {/* Map Background */}
               <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#F9F7F2]">
                 <img src="map-bg.png" className={`max-w-full max-h-full object-contain ${isHifi ? 'scale-110 opacity-60' : ''}`} alt="Map" />
                 
                 {/* Regional Marker */}
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className="absolute top-[48%] left-[50%] cursor-pointer"
                   onClick={() => setSelectedPlace(MOCK_PLACES[0])}
                 >
                   <div className={`p-1 rounded-2xl shadow-2xl border border-black/5 flex flex-col items-center transition-all ${isHifi ? 'bg-white p-1.5' : 'bg-white'}`}>
                     <div className="p-2 bg-neoul-mint rounded-xl">
                       <MapPin className="w-4 h-4 text-white" />
                     </div>
                     <span className="text-[10px] font-bold mt-1 px-2">서울</span>
                   </div>
                 </motion.div>
               </div>

               {/* Search Bar */}
               <div className="absolute top-4 left-6 right-6 z-20">
                 <div className={`rounded-3xl flex items-center px-5 py-4 transition-all ${isHifi ? 'bg-white shadow-2xl shadow-black/10' : 'bg-white/90 backdrop-blur-md shadow-sm border border-black/5'}`}>
                   <Search className={`w-4 h-4 mr-3 ${isHifi ? 'text-neoul-mint' : 'text-neoul-heuk/40'}`} />
                   <input type="text" placeholder="어디로 여행을 떠나볼까요?" className="bg-transparent border-none outline-none w-full text-xs font-bold placeholder:text-black/20" />
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
                       <img src={idx === 0 ? 'hanok.png' : 'gyeongbokgung.png'} className="w-full h-full object-cover" />
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

            {/* Hi-Fi Detail Screen */}
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
                         <img src="gyeongbokgung.png" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-sm font-medium text-neoul-heuk/10 select-none">[ X ] 이미지 플레이스홀더</div>
                      )}
                      
                      {isHifi && (
                        <div className="absolute top-4 left-6 flex gap-2">
                           <span className="bg-black/60 backdrop-blur px-3 py-1.5 rounded-full text-white text-[10px] font-bold">KOREAN HERITAGE</span>
                        </div>
                      )}

                      {!isHifi && (
                        <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
                          <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
                          <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" />
                        </svg>
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
                           {selectedPlace.name}은(는) 14세기 조선 왕조의 법궁으로, 한국의 유구한 역사와 미학적 가치를 상징하는 가장 아름다운 궁궐입니다.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                         <h4 className="text-lg font-bold tracking-tight">장소 정보</h4>
                         <p className="text-[14px] font-medium text-neoul-heuk/60 leading-relaxed">
                            {selectedPlace.description}
                         </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-slate-50 p-4 rounded-3xl border border-black/5">
                            <Clock className="w-5 h-5 text-neoul-heuk/20 mb-2" />
                            <p className="text-[10px] font-bold text-neoul-heuk/40 uppercase mb-1">운영 시간</p>
                            <p className="text-xs font-bold">09:00 - 18:00</p>
                         </div>
                         <div className="bg-slate-50 p-4 rounded-3xl border border-black/5">
                            <MapPin className="w-5 h-5 text-neoul-heuk/20 mb-2" />
                            <p className="text-[10px] font-bold text-neoul-heuk/40 uppercase mb-1">위치 정보</p>
                            <p className="text-xs font-bold">서울 종로구 사직로</p>
                         </div>
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
                      {isHifi ? 'LISTEN TO AI DOCENT' : 'AI 도슨트 시작하기'}
                    </button>
                  </footer>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Hi-Fi Player Screen */
          <motion.div 
            key="player" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className={`absolute inset-0 z-50 flex flex-col transition-all ${isHifi ? 'bg-white' : 'bg-white'}`}
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
                {isHifi ? (
                   <img src="hanok.png" className="w-full h-full object-cover opacity-80" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-neoul-heuk/10 uppercase">[ Art ]</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>

              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-neoul-heuk mb-2 tracking-tighter">{MOCK_PLACES[0].name.split('(')[0]}</h3>
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
                <div className="flex justify-between font-bold text-[10px] text-neoul-heuk/40">
                  <span className={isHifi ? 'text-neoul-heuk' : 'text-neoul-jeok'}>01:23</span>
                  <span>04:50</span>
                </div>
              </div>

              <div className="w-full flex items-center justify-around">
                <button className="text-neoul-heuk/20 hover:text-neoul-heuk transition-colors"><Play className="w-10 h-10 rotate-180 fill-current" /></button>
                <button className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95 ${isHifi ? 'bg-neoul-heuk text-white shadow-black/40' : 'bg-neoul-gray border border-black/5 text-neoul-heuk'}`}>
                  <Pause className="w-10 h-10 fill-current" />
                </button>
                <button className="text-neoul-heuk/20 hover:text-neoul-heuk transition-colors"><Play className="w-10 h-10 fill-current" /></button>
              </div>
            </div>

            <div className={`p-8 flex items-center justify-center text-center transition-all ${isHifi ? 'bg-slate-900 h-[22%]' : 'bg-neoul-gray/50 h-[20%] border-t border-black/5'}`}>
              <p className={`text-sm font-medium leading-relaxed ${isHifi ? 'text-white/80' : 'text-neoul-heuk/60'}`}>
                "지금 보시는 근정전의 마당에 깔린 박석은... <br />
                눈부심 방지와 미끄럼 방지 기능을 합니다. <br />
                조선의 배려가 담긴 지혜로운 건축입니다."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
