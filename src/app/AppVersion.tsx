import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Play, Pause, Home, Heart, Settings, Accessibility, ChevronLeft, ChevronDown, Globe, Share2, Star, Plane } from 'lucide-react';
import { MOCK_PLACES } from '../types';

interface AppVersionProps {
  isHifi?: boolean;
}

export default function AppVersion({ isHifi = false }: AppVersionProps) {
  const [isSplash, setIsSplash] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 1500);
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
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 bg-neoul-brand rounded-[2.5rem] shadow-2xl shadow-neoul-brand/30 mb-8 flex items-center justify-center"
          >
            <div className="w-10 h-10 border-4 border-white rounded-full opacity-80" />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tighter text-neoul-heuk uppercase">NEOUL</h1>
          <p className="mt-3 text-[11px] font-black text-neoul-brand uppercase tracking-[0.4em]">Heritage Intelligence</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative w-full h-full bg-white overflow-hidden font-sans text-neoul-heuk">
      <AnimatePresence mode="wait">
        {!showPlayer ? (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
            {/* Clean Header */}
            <header className="h-16 bg-white flex items-center justify-between px-6 flex-shrink-0 z-40 border-b border-neoul-border">
              <h1 className="text-xl font-bold tracking-tight text-neoul-brand">NEOUL</h1>
              <div className="flex items-center gap-4">
                 <button className="p-2 hover:bg-neoul-gray rounded-full transition-colors"><Search className="w-6 h-6 text-neoul-heuk/60" /></button>
                 <button className="p-2 hover:bg-neoul-gray rounded-full transition-colors"><Globe className="w-6 h-6 text-neoul-heuk/60" /></button>
              </div>
            </header>

            {/* Main Discovery Area */}
            <div className="flex-1 relative overflow-hidden">
               {/* Minimalist Korea Map */}
               <div className="absolute inset-0 z-0 flex items-center justify-center bg-white p-10">
                 <img src="map-bg.png" className="max-w-full h-full object-contain opacity-100" alt="Minimalist Korea Map" />
                 
                 {/* Subtle Markers */}
                 
                 {/* Incheon */}
                 <div className="absolute top-[28%] left-[22%] z-10">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-8 h-8 bg-neoul-brand rounded-full shadow-lg shadow-neoul-brand/20 flex items-center justify-center border-2 border-white"
                    >
                       <Plane className="w-4 h-4 text-white -rotate-45" />
                    </motion.div>
                 </div>

                 {/* Seoul Landmark */}
                 <motion.div 
                   whileHover={{ scale: 1.05, y: -5 }}
                   className="absolute top-[30%] left-[32%] cursor-pointer z-20"
                   onClick={() => setSelectedPlace(MOCK_PLACES[0])}
                 >
                   <div className="bg-white p-1 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-neoul-border flex flex-col items-center">
                     <div className="w-14 h-14 rounded-xl overflow-hidden shadow-inner">
                        <img src="gyeongbokgung.png" className="w-full h-full object-cover" />
                     </div>
                     <div className="px-3 py-1 flex items-center gap-1">
                        <div className="w-1 h-1 bg-neoul-brand rounded-full" />
                        <span className="text-[10px] font-bold">서울</span>
                     </div>
                   </div>
                 </motion.div>

                 {/* Jeonju Landmark */}
                 <motion.div 
                   whileHover={{ scale: 1.05, y: -5 }}
                   className="absolute top-[60%] left-[28%] cursor-pointer z-10"
                   onClick={() => setSelectedPlace(MOCK_PLACES[1])}
                 >
                   <div className="bg-white p-1 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-neoul-border flex flex-col items-center">
                     <div className="w-12 h-12 rounded-xl overflow-hidden shadow-inner">
                        <img src="hanok.png" className="w-full h-full object-cover" />
                     </div>
                     <div className="px-3 py-1 flex items-center gap-1">
                        <div className="w-1 h-1 bg-neoul-accent rounded-full" />
                        <span className="text-[10px] font-bold">전주</span>
                     </div>
                   </div>
                 </motion.div>

                 {/* Other locations as simple dots */}
                 <div className="absolute top-[65%] left-[68%] w-2 h-2 bg-neoul-heuk/10 rounded-full" />
                 <div className="absolute top-[75%] left-[72%] w-2 h-2 bg-neoul-heuk/10 rounded-full" />
               </div>

               {/* Top Tabs - Triple/DatePop Style */}
               <div className="absolute top-0 left-0 right-0 z-30 p-6 flex justify-center">
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-1 shadow-2xl shadow-black/5 flex border border-white">
                     <button className="px-6 py-2.5 rounded-xl text-xs font-bold bg-neoul-heuk text-white shadow-lg">지역별</button>
                     <button className="px-6 py-2.5 rounded-xl text-xs font-bold text-neoul-heuk/40">주제별</button>
                     <button className="px-6 py-2.5 rounded-xl text-xs font-bold text-neoul-heuk/40">내 주변</button>
                  </div>
               </div>
            </div>

            {/* Bottom Recommendation Slider */}
            <div className="h-64 flex flex-col z-20">
               <div className="px-6 mb-4 flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">이 달의 추천 유산</h3>
                    <p className="text-[11px] font-bold text-neoul-heuk/30 mt-0.5">역사학자가 직접 추천하는 명소</p>
                  </div>
                  <button className="text-xs font-bold text-neoul-brand">전체보기</button>
               </div>
               <div className="flex-1 overflow-x-auto no-scrollbar flex gap-4 px-6 pb-6 items-start">
                  {MOCK_PLACES.map((place, idx) => (
                    <motion.div
                      key={place.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPlace(place)}
                      className="min-w-[300px] bg-neoul-gray rounded-3xl p-4 flex items-center gap-4 cursor-pointer border border-neoul-border shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-inner flex-shrink-0">
                         <img src={idx === 0 ? 'gyeongbokgung.png' : 'hanok.png'} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h4 className="text-lg font-bold text-neoul-heuk truncate tracking-tight">{place.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                           <Star className="w-3.5 h-3.5 fill-neoul-accent text-neoul-accent" />
                           <span className="text-xs font-bold">4.8</span>
                           <span className="text-[10px] font-bold text-neoul-heuk/20 uppercase ml-2 tracking-widest">{place.category}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* Clean Navigation Bar */}
            <nav className="h-24 bg-white border-t border-neoul-border flex items-center justify-around px-4 z-40">
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-brand">
                <Home className="w-6 h-6" />
                <span>홈</span>
              </button>
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20">
                <MapPin className="w-6 h-6" />
                <span>지도</span>
              </button>
              <div className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20">
                <Accessibility className="w-6 h-6" />
                <span>접근성</span>
              </div>
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20">
                <Heart className="w-6 h-6" />
                <span>보관함</span>
              </button>
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20">
                <Settings className="w-6 h-6" />
                <span>설정</span>
              </button>
            </nav>

            {/* Immersive Detail Screen */}
            <AnimatePresence>
              {selectedPlace && (
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute inset-0 z-50 bg-white flex flex-col"
                >
                  <header className="h-16 flex items-center justify-between px-6 absolute top-0 left-0 right-0 z-10">
                    <button onClick={() => setSelectedPlace(null)} className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg">
                      <ChevronLeft className="w-7 h-7" />
                    </button>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </header>

                  <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                    <div className="w-full aspect-[4/5] bg-neoul-gray relative overflow-hidden">
                       <img src={selectedPlace.id === 1 ? 'gyeongbokgung.png' : 'hanok.png'} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
                       <div className="absolute bottom-8 left-8 right-8">
                          <span className="bg-neoul-brand px-3 py-1 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest mb-3 inline-block shadow-lg shadow-neoul-brand/20">HERITAGE SPOT</span>
                          <h3 className="text-4xl font-bold text-neoul-heuk tracking-tight">{selectedPlace.name}</h3>
                          <p className="text-sm font-bold text-neoul-heuk/40 mt-2 flex items-center gap-2">
                             <MapPin className="w-4 h-4" /> 서울 종로구 사직로 161
                          </p>
                       </div>
                    </div>

                    <div className="px-8 py-10 space-y-10">
                       <div className="flex gap-3 overflow-x-auto no-scrollbar">
                          {['♿ 휠체어 전용', '🛗 엘리베이터', '🚻 무장애 화장실'].map(tag => (
                             <div key={tag} className="px-4 py-2.5 bg-neoul-brand/5 text-neoul-brand text-[11px] font-bold rounded-2xl border border-neoul-brand/10 whitespace-nowrap">
                                {tag}
                             </div>
                          ))}
                       </div>

                       <div className="space-y-4">
                          <h4 className="text-xl font-bold tracking-tight">상세 설명</h4>
                          <p className="text-[15px] font-medium leading-relaxed text-neoul-heuk/70">
                             {selectedPlace.description}
                          </p>
                       </div>

                       <div className="bg-slate-50 p-6 rounded-[2rem] border border-neoul-border">
                          <div className="flex items-center gap-2 mb-4">
                             <Info className="w-5 h-5 text-neoul-accent" />
                             <span className="text-xs font-bold text-neoul-accent uppercase tracking-widest">History Tip</span>
                          </div>
                          <p className="text-sm font-medium leading-relaxed text-neoul-heuk/60">
                             조선시대의 가장 웅장한 법궁으로, 사계절 내내 각기 다른 아름다움을 뽐내는 한국의 자존심입니다.
                          </p>
                       </div>
                    </div>
                  </div>

                  <footer className="p-6 bg-white/80 backdrop-blur-2xl absolute bottom-0 left-0 right-0 z-50 border-t border-neoul-border">
                    <button 
                      onClick={() => { setShowPlayer(true); setSelectedPlace(null); }} 
                      className="w-full py-5 rounded-3xl bg-neoul-brand text-white text-lg font-bold flex items-center justify-center gap-3 shadow-2xl shadow-neoul-brand/30 active:scale-[0.98] transition-all"
                    >
                      <Play className="w-6 h-6 fill-white" />
                      AI 도슨트 시작하기
                    </button>
                  </footer>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Elegant Player Screen */
          <motion.div key="player" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 flex flex-col bg-white">
            <header className="h-16 flex items-center justify-between px-6 border-b border-neoul-border flex-shrink-0">
              <button onClick={() => setShowPlayer(false)} className="p-2 hover:bg-neoul-gray rounded-full"><ChevronDown className="w-8 h-8 text-neoul-heuk" /></button>
              <div className="text-center">
                 <h2 className="text-[10px] font-bold text-neoul-heuk/30 uppercase tracking-[0.3em] mb-0.5">Now Playing</h2>
                 <p className="text-xs font-bold text-neoul-heuk">HERITAGE AUDIO GUIDE</p>
              </div>
              <button className="p-2 hover:bg-neoul-gray rounded-full"><Globe className="w-6 h-6 text-neoul-heuk/60" /></button>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center px-10">
               <motion.div 
                 animate={{ y: [-10, 10, -10] }}
                 transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                 className="w-64 h-80 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] overflow-hidden mb-12 relative"
               >
                  <img src="gyeongbokgung.png" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6"><div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/20"><Play className="w-6 h-6 text-white fill-white" /></div></div>
               </motion.div>

               <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold tracking-tight text-neoul-heuk mb-2">{MOCK_PLACES[0].name.split('(')[0]}</h3>
                  <p className="text-sm font-bold text-neoul-brand uppercase tracking-widest">Premium Audio Log #01</p>
               </div>

               <div className="w-full flex flex-col gap-4 mb-14 px-4">
                  <div className="relative h-2 bg-neoul-gray rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '40%' }} className="absolute top-0 left-0 bottom-0 bg-neoul-brand" />
                  </div>
                  <div className="flex justify-between font-bold text-[11px] text-neoul-heuk/30">
                    <span className="text-neoul-brand">01:23</span>
                    <span>04:50</span>
                  </div>
               </div>

               <div className="w-full flex items-center justify-between px-10">
                  <button className="text-neoul-heuk/20 hover:text-neoul-heuk transition-colors"><Play className="w-10 h-10 rotate-180 fill-current" /></button>
                  <button className="w-24 h-24 rounded-full bg-neoul-heuk text-white flex items-center justify-center shadow-2xl shadow-black/30 active:scale-95 transition-all">
                    <Pause className="w-10 h-10 fill-current" />
                  </button>
                  <button className="text-neoul-heuk/20 hover:text-neoul-heuk transition-colors"><Play className="w-10 h-10 fill-current" /></button>
               </div>
            </div>

            <div className="p-8 bg-neoul-gray h-[20%] flex items-center justify-center text-center">
              <p className="text-[14px] font-medium leading-relaxed text-neoul-heuk/50 italic">
                "지금 보시는 근정전의 마당에 깔린 박석은 <br />
                조선 왕실의 지혜와 배려가 담긴 건축 미학입니다."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
