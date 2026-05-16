import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Play, Navigation, X, Menu, Share2 } from 'lucide-react';
import { MOCK_PLACES } from '../types';
import type { Place } from '../types';

export default function WebVersion() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full h-screen bg-neoul-gray overflow-hidden font-sans text-neoul-heuk">
      {/* 1. DatePop Style Top Nav */}
      <header className="absolute top-0 left-0 right-0 z-40 bg-neoul-mint h-14 flex items-center px-4">
        <div className="flex w-full justify-around text-white font-bold text-xs tracking-widest">
          <button className="border-b-4 border-white pb-1">HOME</button>
          <button className="opacity-60">POP SHOP</button>
          <button className="opacity-60">BROWSE</button>
          <button className="opacity-60">MY DATE</button>
        </div>
      </header>

      {/* 2. DatePop Style Orange Notice Bar */}
      <div className="absolute top-14 left-0 right-0 z-30 bg-neoul-orange h-10 flex items-center justify-center px-4">
        <p className="text-[10px] font-bold text-white text-center">
          적립금 '팝콘'이 생겼어요! 리뷰 쓰고 팝콘 받으러 가실래요? (자세히 보기)
        </p>
      </div>

      {/* 3. Full-screen Map */}
      <div className="absolute inset-0 z-0 flex items-center justify-center p-10 pt-32 bg-[#F9F7F2]">
        <img src="map-bg.png" className="max-w-full max-h-full object-contain" alt="DatePop Style Map" />
        
        {/* Markers */}
        <div className="absolute top-[48%] left-[52%] cursor-pointer group" onClick={() => setSelectedPlace(MOCK_PLACES[0])}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-2 rounded-2xl shadow-xl border border-black/5 flex flex-col items-center"
          >
            <div className="p-3 bg-neoul-mint rounded-xl">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-bold mt-2 px-2 uppercase">서울</span>
          </motion.div>
        </div>
      </div>

      {/* Search Bar - Premium Style */}
      <div className="absolute top-28 left-8 right-8 z-20 flex items-center gap-4 max-w-xl mx-auto">
        <div className="flex-1 bg-white/90 backdrop-blur-md rounded-2xl flex items-center px-6 py-4 shadow-xl border border-black/5">
          <Search className="w-5 h-5 text-neoul-heuk/40 mr-4" />
          <input type="text" placeholder="어디로 여행을 떠나볼까요?" className="bg-transparent border-none outline-none w-full text-sm font-medium" />
        </div>
        <button className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-black/5">
          <Menu className="w-6 h-6 text-neoul-heuk" />
        </button>
      </div>

      {/* Bottom Sheet - Premium Style */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="absolute bottom-0 left-0 right-0 z-40 bg-white border-t border-neoul-gray p-10 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] rounded-t-[3rem]"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-6 items-start">
                   <div className="w-32 h-32 bg-neoul-gray rounded-3xl flex items-center justify-center text-xl font-bold text-neoul-heuk/10 relative overflow-hidden">
                      [ X ]
                      <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
                        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
                        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" />
                      </svg>
                   </div>
                   <div>
                    <span className="px-3 py-1 bg-neoul-cheong text-white text-[10px] font-bold rounded-full mb-3 inline-block uppercase tracking-widest">
                      {selectedPlace.category}
                    </span>
                    <h3 className="text-4xl font-bold text-neoul-heuk tracking-tight">{selectedPlace.name}</h3>
                    <p className="text-sm font-medium text-neoul-heuk/40 mt-2 uppercase tracking-widest">{selectedPlace.distance} • 와이어프레임 모드</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-12 h-12 rounded-2xl bg-neoul-gray flex items-center justify-center text-neoul-heuk">
                    <Share2 className="w-6 h-6" />
                  </button>
                  <button onClick={() => setSelectedPlace(null)} className="w-12 h-12 rounded-2xl bg-neoul-gray flex items-center justify-center text-neoul-heuk">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                   <div className="historical-tip bg-neoul-hwang/10 border-l-4 border-neoul-hwang p-5 rounded-r-2xl mb-6 text-sm font-medium leading-relaxed">
                      💡 {selectedPlace.name}은(는) 한국의 대표적인 문화유산입니다. 도슨트 가이드를 통해 숨겨진 이야기를 만나보세요.
                   </div>
                   <p className="text-base font-medium text-neoul-heuk/70 leading-relaxed max-w-2xl">
                      {selectedPlace.description}
                   </p>
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={() => setIsPlaying(true)} className="bg-neoul-jeok text-white py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 shadow-xl shadow-neoul-jeok/20">
                    <Play className="w-6 h-6 fill-white" />
                    AI 도슨트 시작
                  </button>
                  <button className="bg-white text-neoul-heuk py-5 rounded-2xl text-lg font-bold flex items-center justify-center gap-3 border border-neoul-gray shadow-xl shadow-black/5">
                    <Navigation className="w-6 h-6" />
                    경로 안내받기
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
