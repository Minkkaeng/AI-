import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Play, Pause, Home, Heart, Settings, Accessibility, ChevronLeft, ChevronDown, Globe, Share2 } from 'lucide-react';
import { MOCK_PLACES } from '../types';
import type { Place } from '../types';

export default function AppVersion() {
  const [isSplash, setIsSplash] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
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
            <div className="w-3 h-12 bg-neoul-jeok rounded-full" />
            <div className="w-3 h-12 bg-neoul-cheong rounded-full" />
            <div className="w-3 h-12 bg-neoul-hwang rounded-full" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter text-neoul-heuk">NEOUL</h1>
          <p className="mt-2 text-xs font-medium text-neoul-heuk/40 uppercase tracking-widest">Premium Minimalism</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative w-full h-full bg-neoul-gray overflow-hidden font-sans text-neoul-heuk">
      <AnimatePresence mode="wait">
        {!showPlayer ? (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
            {/* DatePop Style Header */}
            <header className="h-14 bg-neoul-mint flex items-center px-4 flex-shrink-0">
              <div className="flex w-full justify-around text-white font-bold text-[10px] tracking-widest">
                <button className="border-b-2 border-white pb-1">HOME</button>
                <button className="opacity-60">POP SHOP</button>
                <button className="opacity-60">BROWSE</button>
                <button className="opacity-60">MY DATE</button>
              </div>
            </header>

            {/* DatePop Style Orange Notice Bar */}
            <div className="bg-neoul-orange h-8 flex items-center justify-center px-4 flex-shrink-0">
              <p className="text-[8px] font-bold text-white text-center leading-none">
                적립금 '팝콘'이 생겼어요! 리뷰 쓰고 팝콘 받으러 가실래요?
              </p>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative overflow-hidden">
               {/* Map Background */}
               <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#F9F7F2]">
                 <img src="map-bg.png" className="max-w-full max-h-full object-contain" alt="Map" />
                 
                 {/* Regional Marker */}
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className="absolute top-[48%] left-[50%] cursor-pointer"
                   onClick={() => setSelectedPlace(MOCK_PLACES[0])}
                 >
                   <div className="bg-white p-1 rounded-xl shadow-lg border border-black/5 flex flex-col items-center">
                     <div className="p-2 bg-neoul-mint rounded-lg">
                       <MapPin className="w-4 h-4 text-white" />
                     </div>
                     <span className="text-[9px] font-bold mt-1 px-2">서울</span>
                   </div>
                 </motion.div>
               </div>

               {/* Search Bar - Premium Style */}
               <div className="absolute top-4 left-4 right-4 z-20">
                 <div className="bg-white/90 backdrop-blur-md rounded-2xl flex items-center px-4 py-3 shadow-sm border border-black/5">
                   <Search className="w-4 h-4 text-neoul-heuk/40 mr-3" />
                   <input type="text" placeholder="어디로 여행을 떠나볼까요?" className="bg-transparent border-none outline-none w-full text-xs font-medium" />
                 </div>
               </div>
            </div>

            {/* Bottom Cards Scroll */}
            <div className="absolute bottom-20 left-0 right-0 z-20 overflow-x-auto no-scrollbar flex gap-4 px-6 pb-6">
              {MOCK_PLACES.map((place) => (
                <motion.div
                  key={place.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPlace(place)}
                  className="min-w-[260px] bg-white rounded-3xl p-4 shadow-xl shadow-black/5 flex items-center gap-4 cursor-pointer border border-black/5"
                >
                  <div className="w-16 h-16 bg-neoul-gray rounded-2xl flex items-center justify-center text-xl font-bold text-neoul-heuk/10">
                    [ X ]
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-neoul-heuk truncate">{place.name}</h4>
                    <p className="text-[10px] font-medium text-neoul-heuk/40">{place.distance} • {place.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Bar */}
            <nav className="bg-white border-t border-neoul-gray px-8 h-20 flex items-center justify-between flex-shrink-0">
              <button className="flex flex-col items-center gap-1 font-bold text-[8px] text-neoul-mint">
                <Home className="w-6 h-6" />
                <span>홈</span>
              </button>
              <button className="flex flex-col items-center gap-1 font-bold text-[8px] text-neoul-heuk/20">
                <MapPin className="w-6 h-6" />
                <span>지도</span>
              </button>
              <div className="w-14 h-14 bg-neoul-mint -mt-10 flex items-center justify-center rounded-2xl shadow-lg shadow-neoul-mint/20 text-white">
                <Accessibility className="w-7 h-7" />
              </div>
              <button className="flex flex-col items-center gap-1 font-bold text-[8px] text-neoul-heuk/20">
                <Heart className="w-6 h-6" />
                <span>찜</span>
              </button>
              <button className="flex flex-col items-center gap-1 font-bold text-[8px] text-neoul-heuk/20">
                <Settings className="w-6 h-6" />
                <span>설정</span>
              </button>
            </nav>

            {/* Refined Detail Screen */}
            <AnimatePresence>
              {selectedPlace && (
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute inset-0 z-50 bg-white flex flex-col"
                >
                  <header className="h-14 border-b border-neoul-gray flex items-center justify-between px-4 flex-shrink-0">
                    <button onClick={() => setSelectedPlace(null)} className="icon-btn">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h3 className="text-sm font-bold text-neoul-heuk truncate px-4">
                      {selectedPlace.name}
                    </h3>
                    <button className="icon-btn">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </header>

                  <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="w-full aspect-video bg-neoul-gray flex items-center justify-center relative">
                      <div className="text-sm font-medium text-neoul-heuk/10 select-none">[ X ] 이미지 플레이스홀더</div>
                      {/* Minimal X line effect using SVG */}
                      <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
                        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
                        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </div>

                    <div className="barrier-free-row flex gap-2 px-5 py-4 overflow-x-auto no-scrollbar">
                      <div className="badge-bf whitespace-nowrap bg-neoul-cheong/5 border border-neoul-cheong text-neoul-cheong px-3 py-1.5 rounded-full text-[10px] font-semibold">♿ 휠체어 가능</div>
                      <div className="badge-bf whitespace-nowrap bg-neoul-cheong/5 border border-neoul-cheong text-neoul-cheong px-3 py-1.5 rounded-full text-[10px] font-semibold">🛗 엘리베이터</div>
                      <div className="badge-bf whitespace-nowrap bg-neoul-cheong/5 border border-neoul-cheong text-neoul-cheong px-3 py-1.5 rounded-full text-[10px] font-semibold">🚻 편의시설</div>
                    </div>

                    <div className="px-5 py-2">
                      <div className="historical-tip bg-neoul-hwang/10 border-l-4 border-neoul-hwang p-3 rounded-r-lg mb-6 text-[11px] font-medium leading-relaxed">
                        💡 {selectedPlace.name}은(는) 역사적으로 매우 중요한 의미를 지닙니다. 이 장소의 특별한 건축 양식에 주목해 보세요.
                      </div>

                      <p className="text-sm font-medium text-neoul-heuk/70 leading-relaxed">
                        {selectedPlace.description}
                      </p>
                      
                      <div className="h-20" /> {/* Spacer */}
                    </div>
                  </div>

                  <footer className="p-4 border-t border-neoul-gray bg-white flex-shrink-0">
                    <button 
                      onClick={() => { setShowPlayer(true); setSelectedPlace(null); }} 
                      className="w-full bg-neoul-jeok text-white py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-neoul-jeok/20"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      AI 도슨트 시작하기
                    </button>
                  </footer>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Refined Player Screen */
          <motion.div 
            key="player" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 z-50 bg-white flex flex-col"
          >
            <header className="h-14 border-b border-neoul-gray flex items-center justify-between px-4 flex-shrink-0">
              <button onClick={() => setShowPlayer(false)} className="icon-btn">
                <ChevronDown className="w-7 h-7" />
              </button>
              <h2 className="text-xs font-bold text-neoul-heuk uppercase tracking-widest">도슨트 플레이어</h2>
              <button className="icon-btn">
                <Globe className="w-5 h-5" />
              </button>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center px-10">
              <div className="w-56 h-56 bg-neoul-gray rounded-3xl flex items-center justify-center shadow-2xl shadow-black/5 mb-10 border border-black/5 relative overflow-hidden">
                <div className="text-xs font-bold text-neoul-heuk/10">[ X ] 앨범아트</div>
              </div>

              <div className="text-center mb-10">
                <h3 className="text-xl font-bold text-neoul-heuk mb-1">{MOCK_PLACES[0].name.split('(')[0]}</h3>
                <p className="text-xs font-medium text-neoul-heuk/40 uppercase tracking-widest">AI Voice Guide</p>
              </div>

              <div className="w-full flex flex-col gap-3 mb-10">
                <div className="relative h-1.5 bg-neoul-gray rounded-full">
                  <div className="absolute top-0 left-0 bottom-0 bg-neoul-jeok rounded-full w-[40%]" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[40%] w-4 h-4 bg-white border-2 border-neoul-jeok rounded-full shadow-md" />
                </div>
                <div className="flex justify-between font-bold text-[10px] text-neoul-heuk/30">
                  <span>01:23</span>
                  <span>04:50</span>
                </div>
              </div>

              <div className="w-full flex items-center justify-around px-4">
                <button className="text-neoul-heuk/20"><Play className="w-8 h-8 rotate-180 fill-current" /></button>
                <button className="w-20 h-20 bg-neoul-gray rounded-full flex items-center justify-center shadow-lg border border-black/5 text-neoul-heuk">
                  <Pause className="w-8 h-8 fill-current" />
                </button>
                <button className="text-neoul-heuk/20"><Play className="w-8 h-8 fill-current" /></button>
              </div>
            </div>

            <div className="h-[20%] border-t border-neoul-gray bg-neoul-gray/50 p-6 flex items-center justify-center text-center">
              <p className="text-[13px] font-medium text-neoul-heuk/60 leading-relaxed">
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
