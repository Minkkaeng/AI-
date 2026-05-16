import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Play, Pause, Navigation, Globe, Accessibility, X, Heart, Menu } from 'lucide-react';
import { MOCK_PLACES } from '../types';
import type { Place } from '../types';

export default function WebVersion() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden font-sans">
      {/* 1. DatePop Style Top Nav */}
      <header className="absolute top-0 left-0 right-0 z-40 bg-neoul-mint h-14 flex items-center px-4">
        <div className="flex w-full justify-around text-white font-black text-xs tracking-widest">
          <button className="border-b-4 border-white pb-1">HOME</button>
          <button className="opacity-60">POP SHOP</button>
          <button className="opacity-60">BROWSE</button>
          <button className="opacity-60">MY DATE</button>
        </div>
      </header>

      {/* 2. DatePop Style Orange Notice Bar */}
      <div className="absolute top-14 left-0 right-0 z-30 bg-neoul-orange h-10 flex items-center justify-center px-4">
        <p className="text-[10px] font-black text-white text-center">
          적립금 '팝콘'이 생겼어요! 리뷰 쓰고 팝콘 받으러 가실래요? (자세히 보기)
        </p>
      </div>

      {/* 3. Full-screen Puzzle Map */}
      <div className="absolute inset-0 z-0 flex items-center justify-center p-10 pt-32 bg-[#F9F7F2]">
        <img src="map-bg.png" className="max-w-full max-h-full object-contain" alt="DatePop Style Map" />
        
        {/* Markers - Blocky Style with DatePop Mint highlight */}
        <div className="absolute top-[48%] left-[52%] cursor-pointer group" onClick={() => setSelectedPlace(MOCK_PLACES[0])}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`bg-white p-2 border-4 ${selectedPlace?.id === 1 ? 'border-neoul-mint' : 'border-black'} flex flex-col items-center shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]`}
          >
            <div className={`p-2 ${selectedPlace?.id === 1 ? 'bg-neoul-mint' : 'bg-black'}`}>
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black mt-1 px-1 uppercase text-black">경복궁</span>
          </motion.div>
        </div>
      </div>

      {/* Search Bar - Minimal Grayscale with thick borders */}
      <div className="absolute top-28 left-6 right-6 z-20 flex items-center gap-3">
        <div className="flex-1 bg-white border-4 border-black flex items-center px-5 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <Search className="w-5 h-5 text-black mr-3" />
          <input type="text" placeholder="SEARCH..." className="bg-transparent border-none outline-none w-full text-black font-black placeholder:text-black/20 text-xs" />
        </div>
        <button className="bg-white border-4 border-black p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <Menu className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Floating Controls */}
      <div className="absolute right-6 top-1/2 z-10 flex flex-col gap-3">
        <button className="bg-white border-4 border-black w-12 h-12 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Navigation className="w-5 h-5 text-black" />
        </button>
        <button className="bg-white border-4 border-black w-12 h-12 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Accessibility className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Bottom Sheet - DatePop Style Wireframe */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="absolute bottom-0 left-0 right-0 z-40 bg-white border-t-8 border-black p-8 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="px-2 py-0.5 bg-neoul-mint text-white text-[10px] font-black uppercase mb-2 inline-block">
                  {selectedPlace.category}
                </span>
                <h3 className="text-3xl font-black text-black uppercase tracking-tighter">{selectedPlace.name}</h3>
                <p className="text-sm text-black font-bold mt-1 uppercase tracking-tight">{selectedPlace.distance} • WF MODE</p>
              </div>
              <button onClick={() => setSelectedPlace(null)} className="w-10 h-10 bg-white border-4 border-black flex items-center justify-center">
                <X className="w-5 h-5 text-black" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setIsPlaying(true)} className="bg-black text-white py-4 text-lg font-black flex items-center justify-center gap-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]">
                <Play className="w-5 h-5 fill-white" />
                PLAY DOCENT
              </button>
              <button className="bg-white text-black py-4 text-lg font-black flex items-center justify-center gap-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]">
                <Navigation className="w-5 h-5 text-black" />
                GET ROUTE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
