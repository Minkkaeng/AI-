import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Star, Bell, Plane, Search, Globe, Clock, MessageSquare, ChevronRight, Filter } from 'lucide-react';
import { MOCK_PLACES } from '../types';
import type { Place } from '../types';

interface WebVersionProps {
  isHifi?: boolean;
}

export default function WebVersion({ isHifi: _isHifi = false }: WebVersionProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [hoveredPlace, setHoveredPlace] = useState<number | null>(null);

  return (
    <div className="flex flex-col w-full h-full bg-white font-sans text-neoul-heuk">
      {/* Premium Web Header */}
      <header className="h-20 bg-white border-b border-neoul-border flex items-center justify-between px-12 flex-shrink-0 z-50">
        <div className="flex items-center gap-16">
          <h2 className="text-2xl font-black tracking-tighter text-neoul-brand uppercase">NEOUL</h2>
          <nav className="flex items-center gap-10 text-sm font-bold text-neoul-heuk/40 uppercase tracking-widest">
            <button className="text-neoul-brand">Exploration</button>
            <button className="hover:text-neoul-heuk transition-colors">Digital Archive</button>
            <button className="hover:text-neoul-heuk transition-colors">Docent Shop</button>
            <button className="hover:text-neoul-heuk transition-colors">Community</button>
          </nav>
        </div>
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3 bg-neoul-gray px-5 py-2.5 rounded-2xl border border-neoul-border group focus-within:border-neoul-brand transition-all">
              <Search className="w-4 h-4 text-neoul-heuk/20 group-focus-within:text-neoul-brand" />
              <input type="text" placeholder="검색어를 입력하세요" className="bg-transparent border-none outline-none text-xs font-bold w-48" />
           </div>
           <button className="relative p-2.5 hover:bg-neoul-gray rounded-xl transition-colors">
              <Bell className="w-5 h-5 text-neoul-heuk/60" />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-neoul-brand rounded-full border-2 border-white" />
           </button>
           <button className="h-12 px-10 bg-neoul-heuk text-white rounded-2xl font-bold text-sm shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98] transition-all">MY LOG STUDIO</button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Detailed Sidebar */}
        <aside className="w-[520px] bg-white border-r border-neoul-border flex flex-col z-40 p-10 overflow-y-auto no-scrollbar">
           <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-3xl font-black tracking-tighter">유산 큐레이션</h3>
                 <button className="p-3 bg-neoul-gray rounded-xl"><Filter className="w-4 h-4" /></button>
              </div>
              <p className="text-sm font-bold text-neoul-heuk/30 uppercase tracking-[0.2em]">Curated Heritage Log</p>
           </div>
           
           <div className="space-y-8">
             {MOCK_PLACES.map((place) => (
                <motion.div 
                  key={place.id}
                  whileHover={{ x: 10 }}
                  onMouseEnter={() => setHoveredPlace(place.id)}
                  onMouseLeave={() => setHoveredPlace(null)}
                  onClick={() => setSelectedPlace(place)}
                  className={`p-8 rounded-[2.5rem] border cursor-pointer transition-all ${selectedPlace?.id === place.id ? 'bg-neoul-gray border-neoul-brand shadow-2xl' : 'bg-white border-neoul-border hover:border-neoul-brand/30 shadow-sm'}`}
                >
                  <div className="flex gap-8">
                     <div className="w-32 h-32 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white relative group">
                        <img src={place.image} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                     </div>
                     <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2">
                           <span className="px-2.5 py-1 bg-neoul-brand text-white text-[9px] font-black rounded-lg uppercase tracking-widest">{place.category}</span>
                        </div>
                        <h4 className="text-2xl font-bold tracking-tight mb-2">{place.name}</h4>
                        <div className="flex items-center gap-4 text-xs font-bold text-neoul-heuk/40">
                           <div className="flex items-center gap-1.5 text-neoul-accent"><Star className="w-4 h-4 fill-current" /> {place.rating}</div>
                           <div className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" /> {place.reviewCount}</div>
                           <div>{place.distance}</div>
                        </div>
                     </div>
                  </div>
                </motion.div>
             ))}
           </div>

           {/* Newsletter/Info Card */}
           <div className="mt-12 p-8 bg-neoul-brand rounded-[2.5rem] text-white shadow-2xl shadow-neoul-brand/20 relative overflow-hidden">
              <div className="relative z-10">
                 <h4 className="text-xl font-bold mb-2">Heritage Newsletter</h4>
                 <p className="text-xs font-medium opacity-80 mb-6 leading-relaxed">매주 금요일, 잊혀진 역사의 이야기를 <br />이메일로 전달해 드립니다.</p>
                 <button className="w-full py-4 bg-white text-neoul-brand rounded-2xl font-black text-xs uppercase tracking-widest">Subscribe Now</button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
           </div>
        </aside>

        {/* Workspace: Map + Detailed Overlay */}
        <main className="flex-1 relative bg-neoul-gray overflow-hidden">
           {/* Detailed Interactive Map */}
           <div className="absolute inset-0 flex items-center justify-center p-20">
              <motion.img 
                animate={{ scale: hoveredPlace ? 1.02 : 1 }}
                src="map-bg.png" 
                className="max-w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.1)]" 
                alt="Map" 
              />
              
              {/* Landmark 1: Seoul */}
              <motion.div 
                animate={{ scale: hoveredPlace === 1 ? 1.1 : 1, y: hoveredPlace === 1 ? -15 : 0 }}
                className="absolute top-[30%] left-[44%] cursor-pointer group z-20"
                onClick={() => setSelectedPlace(MOCK_PLACES[0])}
              >
                <div className="bg-white p-3 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-4 border-white flex flex-col items-center">
                  <div className="w-32 h-32 rounded-[2rem] overflow-hidden group-hover:ring-8 ring-neoul-brand/10 transition-all">
                    <img src={MOCK_PLACES[0].image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-2 mt-3 px-4 pb-1">
                     <div className="w-2 h-2 bg-neoul-brand rounded-full animate-pulse" />
                     <span className="text-sm font-black tracking-widest uppercase">SEOUL</span>
                  </div>
                </div>
              </motion.div>

              {/* Landmark 2: Jeonju */}
              <motion.div 
                animate={{ scale: hoveredPlace === 2 ? 1.1 : 1, y: hoveredPlace === 2 ? -15 : 0 }}
                className="absolute top-[60%] left-[41%] cursor-pointer group z-20"
                onClick={() => setSelectedPlace(MOCK_PLACES[1])}
              >
                <div className="bg-white p-3 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-4 border-white flex flex-col items-center">
                  <div className="w-28 h-28 rounded-[2rem] overflow-hidden group-hover:ring-8 ring-neoul-accent/10 transition-all">
                    <img src={MOCK_PLACES[1].image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-2 mt-3 px-4 pb-1">
                     <div className="w-2 h-2 bg-neoul-accent rounded-full animate-pulse" />
                     <span className="text-sm font-black tracking-widest uppercase">JEONJU</span>
                  </div>
                </div>
              </motion.div>
           </div>

           {/* Detailed Desktop Panel */}
           <AnimatePresence>
             {selectedPlace && (
               <motion.div
                 initial={{ x: '100%', opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 exit={{ x: '100%', opacity: 0 }}
                 className="absolute right-10 top-10 bottom-10 w-[700px] bg-white shadow-[0_50px_120px_rgba(0,0,0,0.15)] z-50 rounded-[4rem] border border-white flex flex-col overflow-hidden"
               >
                  {/* Hero Header */}
                  <div className="h-[40%] relative overflow-hidden flex-shrink-0">
                     <img src={selectedPlace.image} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30" />
                     <button onClick={() => setSelectedPlace(null)} className="absolute top-10 left-10 w-14 h-14 bg-white/20 backdrop-blur-3xl rounded-3xl flex items-center justify-center text-white border border-white/30 hover:bg-white/40 transition-all"><X className="w-8 h-8" /></button>
                     <div className="absolute bottom-10 left-12 right-12 text-white">
                        <span className="bg-neoul-brand px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block shadow-2xl">Digital Docent Ready</span>
                        <h3 className="text-5xl font-black tracking-tighter drop-shadow-2xl">{selectedPlace.name}</h3>
                     </div>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar p-12">
                     <div className="grid grid-cols-3 gap-6 mb-12">
                        <div className="p-6 bg-neoul-gray rounded-3xl border border-neoul-border flex flex-col items-center">
                           <Star className="w-6 h-6 text-neoul-accent mb-3" />
                           <span className="text-[10px] font-black text-neoul-heuk/20 uppercase mb-1">Rating</span>
                           <span className="text-xl font-black">{selectedPlace.rating}</span>
                        </div>
                        <div className="p-6 bg-neoul-gray rounded-3xl border border-neoul-border flex flex-col items-center">
                           <Clock className="w-6 h-6 text-neoul-brand mb-3" />
                           <span className="text-[10px] font-black text-neoul-heuk/20 uppercase mb-1">Hours</span>
                           <span className="text-xs font-bold text-center leading-none">{selectedPlace.hours.split('(')[0]}</span>
                        </div>
                        <div className="p-6 bg-neoul-gray rounded-3xl border border-neoul-border flex flex-col items-center">
                           <Globe className="w-6 h-6 text-neoul-brand mb-3" />
                           <span className="text-[10px] font-black text-neoul-heuk/20 uppercase mb-1">Accessibility</span>
                           <span className="text-xs font-bold text-center leading-none">휠체어 가능</span>
                        </div>
                     </div>

                     <div className="space-y-12">
                        <div className="space-y-6">
                           <h4 className="text-2xl font-bold flex items-center justify-between">역사적 개요 <button className="text-xs text-neoul-brand flex items-center gap-1 font-bold">전체보기 <ChevronRight className="w-4 h-4" /></button></h4>
                           <div className="p-8 bg-neoul-gray rounded-[2.5rem] border border-neoul-border border-l-[12px] border-l-neoul-brand">
                              <p className="text-lg font-medium leading-relaxed text-neoul-heuk/60">
                                 {selectedPlace.historyText}
                              </p>
                           </div>
                        </div>

                        <div className="space-y-6">
                           <h4 className="text-2xl font-bold">주요 시설 및 안내</h4>
                           <div className="grid grid-cols-2 gap-4">
                              {selectedPlace.amenities.map(item => (
                                 <div key={item.label} className="flex items-center gap-4 p-5 bg-white border border-neoul-border rounded-[2rem] shadow-sm">
                                    <div className="w-12 h-12 bg-neoul-gray rounded-2xl flex items-center justify-center text-2xl">{item.icon}</div>
                                    <span className="text-sm font-bold">{item.label}</span>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <div className="space-y-6">
                           <h4 className="text-2xl font-bold">갤러리</h4>
                           <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                              {selectedPlace.gallery.map((img, i) => (
                                 <div key={i} className="min-w-[280px] h-44 rounded-3xl overflow-hidden shadow-lg border-4 border-white flex-shrink-0"><img src={img} className="w-full h-full object-cover" /></div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="p-10 bg-white border-t border-neoul-border flex gap-6">
                     <button className="h-20 w-20 bg-neoul-gray rounded-3xl flex items-center justify-center text-neoul-heuk/20 border border-neoul-border hover:bg-neoul-border transition-colors"><MessageSquare className="w-8 h-8" /></button>
                     <button className="flex-1 h-20 bg-neoul-brand text-white rounded-3xl text-2xl font-black flex items-center justify-center gap-6 shadow-2xl shadow-neoul-brand/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        <Play className="w-8 h-8 fill-white" />
                        AI 스마트 도슨트 시작
                     </button>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
