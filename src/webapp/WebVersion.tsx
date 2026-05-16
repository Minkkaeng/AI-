import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Play, Navigation, X, Share2, Globe, Heart, Star, Clock, Info, User, Bell, Accessibility, Settings } from 'lucide-react';
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
            <button className="opacity-60">POP SHOP</button>
            <button className="opacity-60">BROWSE</button>
            <button className="opacity-60">MY DATE</button>
          </div>
        </header>
        <div className="absolute top-14 left-0 right-0 z-30 bg-neoul-orange h-10 flex items-center justify-center px-4">
          <p className="text-[10px] font-bold text-white text-center">
            적립금 '팝콘'이 생겼어요! 리뷰 쓰고 팝콘 받으러 가실래요?
          </p>
        </div>
        <div className="absolute inset-0 z-0 flex items-center justify-center p-10 pt-32 bg-[#F9F7F2]">
          <img src="map-bg.png" className="max-w-full max-h-full object-contain" alt="Map" />
          <div className="absolute top-[48%] left-[52%] cursor-pointer group" onClick={() => setSelectedPlace(MOCK_PLACES[0])}>
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
                <div>
                   <h3 className="text-4xl font-bold">{selectedPlace.name}</h3>
                   <p className="text-sm opacity-40 uppercase mt-2">{selectedPlace.category}</p>
                </div>
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
      {/* 1. Desktop Global Header */}
      <header className="h-20 bg-white border-b border-black/5 flex items-center justify-between px-10 flex-shrink-0 z-50">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
             <div className="w-2 h-8 bg-neoul-mint rounded-full" />
             <h2 className="text-2xl font-black tracking-tighter">NEOUL</h2>
          </div>
          <nav className="flex items-center gap-8 text-sm font-bold text-neoul-heuk/40 uppercase tracking-widest">
            <button className="text-neoul-mint">Explore</button>
            <button className="hover:text-neoul-heuk transition-colors">Shop</button>
            <button className="hover:text-neoul-heuk transition-colors">Community</button>
            <button className="hover:text-neoul-heuk transition-colors">Support</button>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-4 py-2 border border-black/5">
             <Globe className="w-4 h-4 text-neoul-heuk/40" />
             <span className="text-xs font-bold">KOR</span>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-2.5 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"><Bell className="w-5 h-5 text-neoul-heuk/60" /></button>
             <button className="p-2.5 bg-neoul-heuk rounded-xl text-white hover:bg-neoul-heuk/90 transition-colors"><User className="w-5 h-5" /></button>
          </div>
        </div>
      </header>

      {/* 2. Split Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Content Sidebar (Wider for Web) */}
        <aside className="w-[450px] bg-white border-r border-black/5 flex flex-col z-40 shadow-2xl shadow-black/5">
          <div className="p-8 border-b border-black/5">
             <h3 className="text-2xl font-bold tracking-tight mb-6">역사적 숨결을 찾아서</h3>
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neoul-heuk/20 group-focus-within:text-neoul-mint transition-colors" />
                <input 
                  type="text" 
                  placeholder="장소나 키워드를 검색하세요" 
                  className="w-full bg-slate-50 border border-black/5 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium outline-none focus:border-neoul-mint transition-all"
                />
             </div>
             <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar">
                {['전체', '궁궐', '한옥마을', '사찰', '박물관'].map((cat, i) => (
                   <button key={cat} className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${i === 0 ? 'bg-neoul-heuk text-white' : 'bg-slate-100 text-neoul-heuk/40 hover:bg-slate-200'}`}>
                      {cat}
                   </button>
                ))}
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
             {MOCK_PLACES.map((place, idx) => (
                <motion.div
                  key={place.id}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedPlace(place)}
                  className={`p-5 rounded-[2rem] border transition-all cursor-pointer group ${selectedPlace?.id === place.id ? 'bg-white border-neoul-mint shadow-2xl shadow-neoul-mint/10' : 'bg-white border-black/5 hover:border-black/20 shadow-lg shadow-black/5'}`}
                >
                  <div className="flex gap-5">
                     <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 relative">
                        <img src={idx === 0 ? 'gyeongbokgung.png' : 'hanok.png'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute top-2 left-2 px-2 py-1 bg-black/40 backdrop-blur rounded-lg text-[8px] font-bold text-white uppercase tracking-widest">SEOUL</div>
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-start">
                           <h4 className="text-lg font-bold tracking-tight text-neoul-heuk">{place.name}</h4>
                           <Heart className="w-5 h-5 text-neoul-heuk/10 hover:text-rose-500 hover:fill-rose-500 transition-all cursor-pointer" />
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                           <div className="flex items-center gap-1 text-neoul-hwang font-bold text-xs">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span>4.9</span>
                           </div>
                           <span className="text-[11px] font-bold text-neoul-heuk/20 uppercase tracking-widest">{place.distance} • {place.category}</span>
                        </div>
                        <p className="text-xs font-medium text-neoul-heuk/40 mt-3 line-clamp-2 leading-relaxed">
                           {place.description}
                        </p>
                     </div>
                  </div>
                </motion.div>
             ))}
          </div>
        </aside>

        {/* Right: Immersive Map View */}
        <main className="flex-1 relative bg-[#F9F7F2]">
           {/* Interactive Map Surface */}
           <div className="absolute inset-0 flex items-center justify-center p-20">
              <img src="map-bg.png" className="max-w-full max-h-full object-contain opacity-80" alt="Map" />
              
              {/* Regional Markers with Web-specific hover states */}
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="absolute top-[48%] left-[52%] cursor-pointer group"
                onClick={() => setSelectedPlace(MOCK_PLACES[0])}
              >
                <div className="bg-white p-2 rounded-2xl shadow-2xl border border-black/5 flex flex-col items-center">
                  <div className="p-3 bg-neoul-mint rounded-xl group-hover:bg-neoul-heuk transition-colors">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-xs font-bold mt-2 px-4 uppercase tracking-widest">SEOUL</span>
                </div>
              </motion.div>
           </div>

           {/* Floating Map Controls */}
           <div className="absolute right-10 top-10 flex flex-col gap-3">
              <button className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-neoul-heuk/40 hover:text-neoul-heuk transition-colors border border-black/5"><Navigation className="w-6 h-6" /></button>
              <button className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-neoul-heuk/40 hover:text-neoul-heuk transition-colors border border-black/5"><Accessibility className="w-6 h-6" /></button>
              <button className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-neoul-heuk/40 hover:text-neoul-heuk transition-colors border border-black/5"><Settings className="w-6 h-6" /></button>
           </div>

           {/* Web-specific Detail Panel (Glassmorphism Overlay) */}
           <AnimatePresence>
             {selectedPlace && (
               <motion.div
                 initial={{ opacity: 0, x: 100, scale: 0.95 }}
                 animate={{ opacity: 1, x: 0, scale: 1 }}
                 exit={{ opacity: 0, x: 100, scale: 0.95 }}
                 className="absolute right-10 bottom-10 top-32 w-[600px] bg-white/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-white/20 p-10 flex flex-col z-50 overflow-hidden"
               >
                  <div className="flex justify-between items-start mb-8">
                     <div className="flex gap-4">
                        <span className="bg-neoul-cheong text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">heritage spot</span>
                        <span className="bg-neoul-hwang/20 text-neoul-hwang px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">ai recommended</span>
                     </div>
                     <button onClick={() => setSelectedPlace(null)} className="p-3 bg-black/5 rounded-2xl hover:bg-black/10 transition-colors"><X className="w-6 h-6" /></button>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar pr-4">
                     <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl">
                        <img src="gyeongbokgung.png" className="w-full h-full object-cover" alt={selectedPlace.name} />
                     </div>

                     <div className="flex justify-between items-end mb-8">
                        <div>
                           <h3 className="text-4xl font-black tracking-tight mb-2">{selectedPlace.name}</h3>
                           <div className="flex items-center gap-4 text-sm font-bold text-neoul-heuk/40">
                              <div className="flex items-center gap-1.5">
                                 <MapPin className="w-4 h-4" />
                                 <span>서울 종로구 사직로 161</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                 <Clock className="w-4 h-4" />
                                 <span>09:00 - 18:00</span>
                              </div>
                           </div>
                        </div>
                        <button className="p-4 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-colors"><Share2 className="w-6 h-6" /></button>
                     </div>

                     <div className="bg-neoul-hwang/10 rounded-3xl p-6 border border-neoul-hwang/10 mb-8">
                        <div className="flex items-center gap-2 mb-3">
                           <Info className="w-5 h-5 text-neoul-hwang" />
                           <span className="text-xs font-black text-neoul-hwang uppercase tracking-[0.2em]">Curator's Insight</span>
                        </div>
                        <p className="text-sm font-medium leading-relaxed text-neoul-heuk/70 italic">
                           "조선의 정궁으로서 가장 웅장한 규모를 자랑하는 이곳은, 사계절 내내 다른 빛깔의 아름다움을 선사합니다. 특히 경회루의 반영은 한국 미학의 정수라 할 수 있습니다."
                        </p>
                     </div>

                     <div className="space-y-6 mb-10">
                        <h4 className="text-xl font-bold">도슨트 가이드 주요 정보</h4>
                        <div className="grid grid-cols-2 gap-4">
                           {['역사적 배경', '건축적 특징', '관람 포인트', '포토 존'].map(item => (
                              <div key={item} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-black/5">
                                 <div className="w-2 h-2 bg-neoul-mint rounded-full" />
                                 <span className="text-sm font-bold">{item}</span>
                              </div>
                           ))}
                        </div>
                        <p className="text-base font-medium text-neoul-heuk/50 leading-relaxed">
                           {selectedPlace.description}
                        </p>
                     </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                     <button className="flex-1 bg-neoul-heuk text-white py-6 rounded-3xl text-lg font-black flex items-center justify-center gap-3 shadow-2xl shadow-black/20 hover:scale-[1.02] transition-all active:scale-95">
                        <Play className="w-6 h-6 fill-white" />
                        AI 도슨트 가이드 시작
                     </button>
                     <button className="px-8 bg-white border border-black/10 text-neoul-heuk py-6 rounded-3xl text-lg font-black shadow-xl hover:bg-slate-50 transition-all">
                        <Navigation className="w-6 h-6" />
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
