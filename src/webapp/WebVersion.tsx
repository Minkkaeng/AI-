import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Play, X, Share2, Heart, Star, Bell, Plane } from 'lucide-react';
import { MOCK_PLACES } from '../types';

interface WebVersionProps {
  isHifi?: boolean;
}

export default function WebVersion({ isHifi = false }: WebVersionProps) {
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);

  if (!isHifi) {
    // Original Wireframe Web View
    return (
      <div className="relative w-full h-screen bg-neoul-gray overflow-hidden font-sans text-neoul-heuk">
        <header className="absolute top-0 left-0 right-0 z-40 bg-neoul-mint h-14 flex items-center px-4">
          <div className="flex w-full justify-around text-white font-bold text-xs tracking-widest">
            <button className="border-b-4 border-white pb-1">HOME</button>
            <button className="opacity-60">GUIDE</button>
            <button className="opacity-60">EXPLORE</button>
            <button className="opacity-60">MY LOG</button>
          </div>
        </header>
        <div className="absolute inset-0 z-0 flex items-center justify-center p-10 pt-32 bg-white">
          <img src="map-bg.png" className="max-w-full h-full object-contain opacity-40" alt="Map" />
          <div className="absolute top-[34%] left-[45%] cursor-pointer group" onClick={() => setSelectedPlace(MOCK_PLACES[0])}>
            <div className="bg-white p-2 rounded-2xl shadow-xl border border-black/5 flex flex-col items-center">
              <div className="p-3 bg-neoul-mint rounded-xl"><MapPin className="w-6 h-6 text-white" /></div>
              <span className="text-xs font-bold mt-2 px-2 uppercase">서울</span>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {selectedPlace && (
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="absolute bottom-0 left-0 right-0 z-40 bg-white p-10 shadow-2xl rounded-t-[3rem]">
              <div className="max-w-4xl mx-auto flex justify-between">
                <div><h3 className="text-4xl font-bold">{selectedPlace.name}</h3></div>
                <button onClick={() => setSelectedPlace(null)} className="p-4 bg-neoul-gray rounded-2xl"><X /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-slate-50 font-sans text-neoul-heuk">
      {/* Global Header */}
      <header className="h-20 bg-white border-b border-black/5 flex items-center justify-between px-10 flex-shrink-0 z-50">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
             <div className="w-2 h-8 bg-neoul-mint rounded-full" />
             <h2 className="text-2xl font-black tracking-tighter uppercase">NEOUL</h2>
          </div>
          <nav className="flex items-center gap-8 text-sm font-bold text-neoul-heuk/40 uppercase tracking-widest">
            <button className="text-neoul-mint">Explore</button>
            <button className="hover:text-neoul-heuk">Shop</button>
            <button className="hover:text-neoul-heuk">Community</button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
           <button className="p-2.5 bg-slate-100 rounded-xl"><Bell className="w-5 h-5 text-neoul-heuk/60" /></button>
           <button className="p-2.5 bg-neoul-heuk rounded-xl text-white font-bold px-6">LOGIN</button>
        </div>
      </header>

      {/* Split Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-[450px] bg-white border-r border-black/5 flex flex-col z-40 shadow-2xl shadow-black/5 overflow-y-auto custom-scrollbar p-8">
           <h3 className="text-2xl font-bold tracking-tight mb-8">한국의 보물을 찾아서</h3>
           <div className="space-y-6">
             {MOCK_PLACES.map((place, idx) => (
                <div 
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className={`p-6 rounded-[2.5rem] border cursor-pointer transition-all ${selectedPlace?.id === place.id ? 'bg-white border-neoul-mint shadow-2xl shadow-neoul-mint/10' : 'bg-white border-black/5 hover:border-black/20 shadow-lg shadow-black/5'}`}
                >
                  <div className="flex gap-5">
                     <div className="w-24 h-24 rounded-3xl overflow-hidden bg-slate-100">
                        <img src={idx === 0 ? 'gyeongbokgung.png' : 'hanok.png'} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1">
                        <h4 className="text-lg font-bold">{place.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                           <Star className="w-3.5 h-3.5 fill-neoul-hwang text-neoul-hwang" />
                           <span className="text-xs font-bold">4.8</span>
                           <span className="text-[10px] font-bold text-neoul-heuk/20 uppercase ml-2">{place.category}</span>
                        </div>
                     </div>
                  </div>
                </div>
             ))}
           </div>
        </aside>

        {/* Interactive Map */}
        <main className="flex-1 relative bg-white overflow-hidden">
           <div className="absolute inset-0 flex items-center justify-center p-20">
              <img src="map-bg.png" className="max-w-full h-full object-contain opacity-90" alt="Map" />
              
              {/* Airport Landmark */}
              <div className="absolute top-[32%] left-[32%]">
                 <div className="bg-white p-3 rounded-full shadow-2xl border border-black/5 flex items-center justify-center">
                    <Plane className="w-8 h-8 text-neoul-cheong -rotate-45" />
                 </div>
              </div>

              {/* Landmark 1: Seoul */}
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="absolute top-[34%] left-[45%] cursor-pointer group"
                onClick={() => setSelectedPlace(MOCK_PLACES[0])}
              >
                <div className="bg-white p-2 rounded-3xl shadow-2xl border border-black/5 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 group-hover:ring-4 ring-neoul-mint transition-all">
                    <img src="gyeongbokgung.png" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-black mt-2 px-4 uppercase tracking-widest">서울</span>
                </div>
              </motion.div>

              {/* Landmark 2: Jeonju */}
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="absolute top-[60%] left-[42%] cursor-pointer group"
                onClick={() => setSelectedPlace(MOCK_PLACES[1])}
              >
                <div className="bg-white p-2 rounded-3xl shadow-2xl border border-black/5 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 group-hover:ring-4 ring-neoul-jeok transition-all">
                    <img src="hanok.png" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-black mt-2 px-3 uppercase tracking-widest">전주</span>
                </div>
              </motion.div>
           </div>

           {/* Detail Panel */}
           <AnimatePresence>
             {selectedPlace && (
               <motion.div
                 initial={{ x: '100%' }}
                 animate={{ x: 0 }}
                 exit={{ x: '100%' }}
                 className="absolute right-0 top-0 bottom-0 w-[550px] bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-50 p-12 overflow-y-auto no-scrollbar"
               >
                  <div className="flex justify-between mb-10">
                     <button onClick={() => setSelectedPlace(null)} className="p-4 bg-slate-100 rounded-2xl"><X className="w-6 h-6" /></button>
                     <div className="flex gap-2">
                        <button className="p-4 bg-slate-100 rounded-2xl"><Share2 className="w-6 h-6" /></button>
                        <button className="p-4 bg-slate-100 rounded-2xl"><Heart className="w-6 h-6" /></button>
                     </div>
                  </div>

                  <div className="w-full aspect-video rounded-[3rem] overflow-hidden mb-10 shadow-2xl">
                     <img src={selectedPlace.id === 1 ? 'gyeongbokgung.png' : 'hanok.png'} className="w-full h-full object-cover" />
                  </div>

                  <h3 className="text-4xl font-black mb-6">{selectedPlace.name}</h3>
                  <div className="bg-neoul-hwang/10 p-6 rounded-[2rem] border border-neoul-hwang/10 mb-10">
                     <p className="text-sm font-medium leading-relaxed text-neoul-heuk/70">
                        {selectedPlace.description}
                     </p>
                  </div>

                  <button className="w-full bg-neoul-heuk text-white py-6 rounded-[2rem] text-lg font-black flex items-center justify-center gap-3 shadow-2xl shadow-black/20">
                     <Play className="w-6 h-6 fill-white" />
                     도슨트 가이드 시작
                  </button>
               </motion.div>
             )}
           </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
