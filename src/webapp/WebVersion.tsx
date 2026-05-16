import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Share2, Heart, Star, Bell, Plane, Search, Globe, Clock, MapPin } from 'lucide-react';
import { MOCK_PLACES } from '../types';

interface WebVersionProps {
  isHifi?: boolean;
}

export default function WebVersion({ isHifi: _isHifi = false }: WebVersionProps) {
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);

  return (
    <div className="flex flex-col w-full h-full bg-white font-sans text-neoul-heuk">
      {/* Premium Web Header */}
      <header className="h-20 bg-white border-b border-neoul-border flex items-center justify-between px-12 flex-shrink-0 z-50">
        <div className="flex items-center gap-16">
          <h2 className="text-2xl font-black tracking-tighter text-neoul-brand uppercase">NEOUL</h2>
          <nav className="flex items-center gap-10 text-sm font-bold text-neoul-heuk/40 uppercase tracking-widest">
            <button className="text-neoul-brand">Exploration</button>
            <button className="hover:text-neoul-heuk">Guide</button>
            <button className="hover:text-neoul-heuk">Log</button>
            <button className="hover:text-neoul-heuk">Archive</button>
          </nav>
        </div>
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2 bg-neoul-gray px-4 py-2 rounded-2xl border border-neoul-border">
              <Search className="w-4 h-4 text-neoul-heuk/30" />
              <input type="text" placeholder="어디로 떠나볼까요?" className="bg-transparent border-none outline-none text-xs font-bold w-40" />
           </div>
           <button className="p-2.5 hover:bg-neoul-gray rounded-xl transition-colors"><Bell className="w-5 h-5 text-neoul-heuk/60" /></button>
           <button className="h-12 px-8 bg-neoul-heuk text-white rounded-2xl font-bold text-sm shadow-xl shadow-black/10">MY STUDIO</button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside className="w-[480px] bg-white border-r border-neoul-border flex flex-col z-40 p-10 overflow-y-auto no-scrollbar">
           <div className="mb-10">
              <h3 className="text-3xl font-bold tracking-tight mb-2">한국 유산 가이드</h3>
              <p className="text-sm font-bold text-neoul-heuk/30 uppercase tracking-widest">Selected Heritage Collection</p>
           </div>
           
           <div className="space-y-8">
             {MOCK_PLACES.map((place, idx) => (
                <motion.div 
                  key={place.id}
                  whileHover={{ x: 10 }}
                  onClick={() => setSelectedPlace(place)}
                  className={`p-6 rounded-[2rem] border cursor-pointer transition-all ${selectedPlace?.id === place.id ? 'bg-neoul-gray border-neoul-brand shadow-xl' : 'bg-white border-neoul-border hover:border-neoul-brand/30 shadow-sm'}`}
                >
                  <div className="flex gap-6">
                     <div className="w-28 h-28 rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                        <img src={idx === 0 ? 'gyeongbokgung.png' : 'hanok.png'} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1">
                           <span className="px-2 py-0.5 bg-neoul-brand/10 text-neoul-brand text-[9px] font-black rounded-full uppercase">{place.category}</span>
                        </div>
                        <h4 className="text-xl font-bold tracking-tight">{place.name}</h4>
                        <div className="flex items-center gap-3 mt-2 text-xs font-bold text-neoul-heuk/40">
                           <div className="flex items-center gap-1 text-neoul-accent"><Star className="w-3.5 h-3.5 fill-current" /> 4.8</div>
                           <div>{place.distance}</div>
                        </div>
                     </div>
                  </div>
                </motion.div>
             ))}
           </div>
        </aside>

        {/* Interactive Workspace */}
        <main className="flex-1 relative bg-neoul-gray overflow-hidden">
           <div className="absolute inset-0 flex items-center justify-center p-20">
              <img src="map-bg.png" className="max-w-full h-[95%] object-contain drop-shadow-2xl" alt="Minimalist Korea Map" />
              
              {/* Refined Markers */}
              <div className="absolute top-[28%] left-[36%]">
                 <div className="w-12 h-12 bg-neoul-brand rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
                    <Plane className="w-6 h-6 text-white -rotate-45" />
                 </div>
              </div>

              {/* Landmark 1: Seoul */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                className="absolute top-[30%] left-[44%] cursor-pointer group"
                onClick={() => setSelectedPlace(MOCK_PLACES[0])}
              >
                <div className="bg-white p-2 rounded-[2rem] shadow-2xl border border-white flex flex-col items-center">
                  <div className="w-28 h-28 rounded-[1.5rem] overflow-hidden group-hover:ring-4 ring-neoul-brand transition-all">
                    <img src="gyeongbokgung.png" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-black mt-3 px-6 pb-2">SEOUL</span>
                </div>
              </motion.div>

              {/* Landmark 2: Jeonju */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                className="absolute top-[60%] left-[41%] cursor-pointer group"
                onClick={() => setSelectedPlace(MOCK_PLACES[1])}
              >
                <div className="bg-white p-2 rounded-[2rem] shadow-2xl border border-white flex flex-col items-center">
                  <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden group-hover:ring-4 ring-neoul-accent transition-all">
                    <img src="hanok.png" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-black mt-3 px-6 pb-2">JEONJU</span>
                </div>
              </motion.div>
           </div>

           {/* Glassmorphism Detail Panel */}
           <AnimatePresence>
             {selectedPlace && (
               <motion.div
                 initial={{ x: '100%', opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 exit={{ x: '100%', opacity: 0 }}
                 className="absolute right-10 top-10 bottom-10 w-[600px] bg-white/90 backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.1)] z-50 rounded-[3rem] border border-white flex flex-col p-12 overflow-y-auto no-scrollbar"
               >
                  <div className="flex justify-between mb-12">
                     <button onClick={() => setSelectedPlace(null)} className="w-12 h-12 bg-neoul-gray rounded-2xl flex items-center justify-center hover:bg-neoul-border transition-colors"><X className="w-6 h-6" /></button>
                     <div className="flex gap-3">
                        <button className="w-12 h-12 bg-neoul-gray rounded-2xl flex items-center justify-center hover:bg-neoul-border transition-colors"><Share2 className="w-6 h-6" /></button>
                        <button className="w-12 h-12 bg-neoul-gray rounded-2xl flex items-center justify-center hover:bg-neoul-border transition-colors"><Heart className="w-6 h-6" /></button>
                     </div>
                  </div>

                  <div className="w-full aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl"><img src={selectedPlace.id === 1 ? 'gyeongbokgung.png' : 'hanok.png'} className="w-full h-full object-cover" /></div>
                  
                  <div className="mb-10">
                     <span className="bg-neoul-brand px-3 py-1 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">selected spot</span>
                     <h3 className="text-5xl font-black tracking-tighter mb-4">{selectedPlace.name}</h3>
                     <div className="flex items-center gap-4 text-sm font-bold text-neoul-heuk/40">
                        <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> 서울 종로구 사직로 161</div>
                        <div className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-neoul-accent text-neoul-accent" /> 4.8 (2,450)</div>
                     </div>
                  </div>

                  <div className="space-y-12 mb-12">
                     <p className="text-lg font-medium leading-relaxed text-neoul-heuk/60">
                        {selectedPlace.description}
                     </p>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-neoul-gray rounded-3xl border border-neoul-border">
                           <Clock className="w-6 h-6 text-neoul-brand mb-4" />
                           <p className="text-xs font-bold text-neoul-heuk/30 uppercase mb-1">운영시간</p>
                           <p className="text-sm font-bold">09:00 - 18:00</p>
                        </div>
                        <div className="p-6 bg-neoul-gray rounded-3xl border border-neoul-border">
                           <Globe className="w-6 h-6 text-neoul-brand mb-4" />
                           <p className="text-xs font-bold text-neoul-heuk/30 uppercase mb-1">입장료</p>
                           <p className="text-sm font-bold">성인 3,000원</p>
                        </div>
                     </div>
                  </div>

                  <button className="w-full bg-neoul-heuk text-white py-7 rounded-[2rem] text-xl font-black flex items-center justify-center gap-4 shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                     <Play className="w-7 h-7 fill-white" />
                     스마트 도슨트 가이드 시작
                  </button>
               </motion.div>
             )}
           </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
