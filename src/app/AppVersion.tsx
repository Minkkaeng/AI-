import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Play, Pause, Navigation, Home, Heart, Settings, Accessibility, ChevronLeft, Volume2, X, ChevronDown, RotateCcw, RotateCw, Globe } from 'lucide-react';
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
        <div className="border-8 border-black p-12 bg-white flex flex-col items-center shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex gap-4 mb-8">
            <div className="w-4 h-16 bg-neoul-mint" />
            <div className="w-4 h-16 bg-neoul-orange" />
            <div className="w-4 h-16 bg-black" />
          </div>
          <h1 className="text-6xl font-black tracking-[0.3em] text-black uppercase">NEOUL</h1>
          <p className="mt-4 text-sm font-black tracking-widest text-black/40">DP_WF_VERSION</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {!showPlayer ? (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
            {/* DatePop Style Top Nav */}
            <header className="relative z-40 bg-neoul-mint h-14 flex items-center px-4">
              <div className="flex w-full justify-around text-white font-black text-[10px] tracking-widest">
                <button className="border-b-2 border-white pb-1">HOME</button>
                <button className="opacity-60">POP SHOP</button>
                <button className="opacity-60">BROWSE</button>
                <button className="opacity-60">MY DATE</button>
              </div>
            </header>

            {/* DatePop Style Orange Notice Bar */}
            <div className="relative z-30 bg-neoul-orange h-8 flex items-center justify-center px-4">
              <p className="text-[8px] font-black text-white text-center leading-none">
                적립금 '팝콘'이 생겼어요! 리뷰 쓰고 팝콘 받으러 가실래요?
              </p>
            </div>

            {/* 1. Map Background */}
            <div className="absolute inset-0 z-0 flex items-center justify-center p-12 pt-24 bg-[#F9F7F2]">
              <img src="/map-bg.png" className="max-w-full max-h-full object-contain" alt="Map" />
              
              {/* Regional Marker with Mint Highlight */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-[48%] left-[50%] cursor-pointer"
                onClick={() => setSelectedPlace(MOCK_PLACES[0])}
              >
                <div className={`bg-white p-1.5 border-4 ${selectedPlace?.id === 1 ? 'border-neoul-mint' : 'border-black'} shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] flex flex-col items-center`}>
                  <div className={`p-1.5 ${selectedPlace?.id === 1 ? 'bg-neoul-mint' : 'bg-black'}`}>
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[8px] font-black mt-1 text-black uppercase">SEOUL</span>
                </div>
              </motion.div>
            </div>

            {/* 2. Top Header - Floating Search */}
            <header className="relative z-20 px-6 pt-6">
              <div className="bg-white border-4 border-black flex items-center px-4 py-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <Search className="w-5 h-5 text-black mr-3" />
                <input type="text" placeholder="SEARCH REGION..." className="bg-transparent border-none outline-none w-full text-black font-black text-xs uppercase tracking-widest" />
              </div>
            </header>

            {/* 3. Nearby Cards */}
            <div className="absolute bottom-24 left-0 right-0 z-20 overflow-x-auto no-scrollbar flex gap-4 px-6 pb-6">
              {MOCK_PLACES.map((place) => (
                <motion.div
                  key={place.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPlace(place)}
                  className={`min-w-[280px] bg-white border-4 ${selectedPlace?.id === place.id ? 'border-neoul-mint' : 'border-black'} p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 cursor-pointer`}
                >
                  <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center text-2xl font-black grayscale opacity-20">
                    X
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xl font-black text-black truncate uppercase tracking-tighter">{place.name}</h4>
                    <p className="text-[10px] font-bold text-black/40 uppercase italic">{place.distance} • {place.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 4. Bottom Tab Bar */}
            <nav className="absolute bottom-0 left-0 right-0 z-30 bg-white border-t-8 border-black px-8 h-20 flex items-center justify-between">
              <button className="flex flex-col items-center gap-0.5 font-black uppercase text-[8px] text-neoul-mint">
                <Home className="w-6 h-6" />
                <span>HOME</span>
              </button>
              <button className="flex flex-col items-center gap-0.5 font-black uppercase text-[8px] text-black/20">
                <MapPin className="w-6 h-6" />
                <span>MAP</span>
              </button>
              <div className="w-16 h-16 bg-neoul-mint -mt-14 flex items-center justify-center border-4 border-white shadow-[0_-8px_0px_0px_rgba(0,0,0,1)]">
                <Accessibility className="w-8 h-8 text-white" />
              </div>
              <button className="flex flex-col items-center gap-0.5 font-black uppercase text-[8px] text-black/20">
                <Heart className="w-6 h-6" />
                <span>SAVE</span>
              </button>
              <button className="flex flex-col items-center gap-0.5 font-black uppercase text-[8px] text-black/20">
                <Settings className="w-6 h-6" />
                <span>USER</span>
              </button>
            </nav>

            {/* ASCII Layout Detail Screen inside App version */}
            <AnimatePresence>
              {selectedPlace && (
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  className="absolute inset-0 z-50 bg-white border-t-8 border-black flex flex-col"
                >
                  <header className="h-16 border-b-4 border-black flex items-center justify-between px-6 flex-shrink-0 bg-neoul-mint">
                    <button onClick={() => setSelectedPlace(null)} className="text-white">
                      <ChevronLeft className="w-8 h-8" />
                    </button>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter truncate px-4">
                      {selectedPlace.name}
                    </h3>
                    <div className="w-8" />
                  </header>

                  <div className="w-full aspect-[4/3] border-b-4 border-black bg-gray-50 flex items-center justify-center relative flex-shrink-0">
                    <div className="text-6xl font-black text-black/10 select-none">[ X ] IMAGE</div>
                  </div>

                  <div className="border-b-4 border-black px-6 py-4 flex gap-3 overflow-x-auto no-scrollbar flex-shrink-0">
                    <div className="border-2 border-neoul-mint text-neoul-mint px-3 py-1 font-black uppercase text-[8px] whitespace-nowrap bg-neoul-mint/5">♿ 휠체어 가능</div>
                    <div className="border-2 border-black px-3 py-1 font-black uppercase text-[8px] whitespace-nowrap">🛗 엘리베이터</div>
                    <div className="border-2 border-black px-3 py-1 font-black uppercase text-[8px] whitespace-nowrap">🚻 편의시설</div>
                  </div>

                  <div className="flex-1 overflow-auto px-8 py-8">
                    <p className="text-lg font-bold text-black leading-relaxed uppercase tracking-tight">
                      {selectedPlace.description}
                    </p>
                  </div>

                  <footer className="p-6 border-t-8 border-black bg-white flex-shrink-0">
                    <button 
                      onClick={() => { setShowPlayer(true); setSelectedPlace(null); }} 
                      className="w-full bg-neoul-mint text-white py-6 text-2xl font-black uppercase tracking-widest shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
                    >
                      ▶ START DOCENT
                    </button>
                  </footer>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Player Screen with DatePop Mint Accents */
          <motion.div 
            key="player" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 z-50 bg-white flex flex-col"
          >
            <header className="h-20 border-b-8 border-black flex items-center justify-between px-8 flex-shrink-0 bg-neoul-mint">
              <button onClick={() => setShowPlayer(false)} className="text-white">
                <ChevronDown className="w-10 h-10" />
              </button>
              <h2 className="text-xl font-black text-white uppercase tracking-[0.2em]">DOCENT PLAYER</h2>
              <button className="text-white">
                <Globe className="w-8 h-8" />
              </button>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center px-8 py-10">
              <div className="w-64 h-64 border-8 border-black bg-white flex items-center justify-center shadow-[16px_16px_0px_0px_rgba(45,212,191,1)] mb-12 flex-shrink-0">
                <div className="text-5xl font-black text-black/10 select-none">[ X ]</div>
              </div>

              <div className="text-center mb-12 flex-shrink-0">
                <h3 className="text-3xl font-black text-black mb-2 uppercase tracking-tighter">{MOCK_PLACES[0].name.split('(')[0]}</h3>
                <p className="text-xl font-bold text-neoul-mint uppercase italic tracking-tight border-t-4 border-neoul-mint pt-2 inline-block">
                  AUDIO GUIDE LOG 001
                </p>
              </div>

              <div className="w-full max-w-xs flex flex-col gap-3 mb-12 flex-shrink-0">
                <div className="relative h-3 bg-black/10 border-2 border-black">
                  <div className="absolute top-0 left-0 bottom-0 bg-neoul-mint w-[40%]" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-[40%] w-5 h-5 bg-white border-4 border-black -ml-2.5 shadow-md" />
                </div>
                <div className="flex justify-between font-black text-[10px] uppercase">
                  <span className="text-neoul-mint">01:23</span>
                  <span className="text-black/40">04:50</span>
                </div>
              </div>

              <div className="w-full max-w-xs flex items-center justify-between px-6 flex-shrink-0">
                <button className="text-black/20 rotate-180"><Play className="w-8 h-8" /></button>
                <button className="w-24 h-24 bg-neoul-mint flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all">
                  <Pause className="w-10 h-10 text-white fill-white" />
                </button>
                <button className="text-black/20"><Play className="w-8 h-8" /></button>
              </div>
            </div>

            <div className="h-[18%] border-t-8 border-black bg-neoul-heuk p-8 flex items-center justify-center text-center flex-shrink-0">
              <p className="text-sm font-bold text-white leading-relaxed uppercase tracking-tighter">
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
