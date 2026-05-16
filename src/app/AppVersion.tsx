import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Play, Pause, Home, Heart, Settings, Accessibility, ChevronLeft, ChevronDown, Globe, Share2, Star, Plane, Clock, Info, ExternalLink, MessageCircle } from 'lucide-react';
import { MOCK_PLACES, Place } from '../types';

interface AppVersionProps {
  isHifi?: boolean;
}

export default function AppVersion({ isHifi: _isHifi = false }: AppVersionProps) {
  const [isSplash, setIsSplash] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'review'>('info');

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
            {/* Header */}
            <header className="h-16 bg-white flex items-center justify-between px-6 flex-shrink-0 z-40 border-b border-neoul-border">
              <h1 className="text-xl font-bold tracking-tight text-neoul-brand">NEOUL</h1>
              <div className="flex items-center gap-4">
                 <button className="p-2 hover:bg-neoul-gray rounded-full transition-colors"><Search className="w-6 h-6 text-neoul-heuk/60" /></button>
                 <button className="p-2 hover:bg-neoul-gray rounded-full transition-colors"><Globe className="w-6 h-6 text-neoul-heuk/60" /></button>
              </div>
            </header>

            {/* Discovery Area */}
            <div className="flex-1 relative overflow-hidden">
               <div className="absolute inset-0 z-0 flex items-center justify-center bg-white p-10">
                 <img src="map-bg.png" className="max-w-full h-full object-contain opacity-100" alt="Map" />
                 
                 {/* Incheon */}
                 <div className="absolute top-[28%] left-[22%] z-10">
                    <div className="w-8 h-8 bg-neoul-brand rounded-full shadow-lg border-2 border-white flex items-center justify-center"><Plane className="w-4 h-4 text-white -rotate-45" /></div>
                 </div>

                 {/* Landmarks */}
                 {MOCK_PLACES.map((place, idx) => (
                   <motion.div 
                     key={place.id}
                     whileHover={{ scale: 1.05, y: -5 }}
                     className={`absolute cursor-pointer z-20 ${idx === 0 ? 'top-[30%] left-[32%]' : 'top-[60%] left-[28%]'}`}
                     onClick={() => setSelectedPlace(place)}
                   >
                     <div className="bg-white p-1 rounded-2xl shadow-2xl border border-neoul-border flex flex-col items-center">
                       <div className="w-14 h-14 rounded-xl overflow-hidden shadow-inner">
                          <img src={place.image} className="w-full h-full object-cover" />
                       </div>
                       <div className="px-3 py-1 flex items-center gap-1">
                          <div className={`w-1 h-1 rounded-full ${idx === 0 ? 'bg-neoul-brand' : 'bg-neoul-accent'}`} />
                          <span className="text-[10px] font-bold">{place.name}</span>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>

               <div className="absolute top-0 left-0 right-0 z-30 p-6 flex justify-center">
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-1 shadow-2xl border border-white flex">
                     <button className="px-6 py-2.5 rounded-xl text-xs font-bold bg-neoul-heuk text-white shadow-lg">지역별</button>
                     <button className="px-6 py-2.5 rounded-xl text-xs font-bold text-neoul-heuk/40">테마별</button>
                     <button className="px-6 py-2.5 rounded-xl text-xs font-bold text-neoul-heuk/40">내 주변</button>
                  </div>
               </div>
            </div>

            {/* Bottom Slider */}
            <div className="h-64 flex flex-col z-20">
               <div className="px-6 mb-4 flex justify-between items-end">
                  <h3 className="text-xl font-bold tracking-tight">추천 문화유산</h3>
                  <button className="text-xs font-bold text-neoul-brand">전체보기</button>
               </div>
               <div className="flex-1 overflow-x-auto no-scrollbar flex gap-4 px-6 pb-6">
                  {MOCK_PLACES.map((place) => (
                    <motion.div
                      key={place.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPlace(place)}
                      className="min-w-[300px] bg-neoul-gray rounded-3xl p-4 flex items-center gap-4 cursor-pointer border border-neoul-border shadow-sm"
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white flex-shrink-0"><img src={place.image} className="w-full h-full object-cover" /></div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold truncate">{place.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                           <Star className="w-3.5 h-3.5 fill-neoul-accent text-neoul-accent" />
                           <span className="text-xs font-bold">{place.rating}</span>
                           <span className="text-[10px] font-bold text-neoul-heuk/20 ml-2 uppercase tracking-widest">{place.category}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* Navigation */}
            <nav className="h-24 bg-white border-t border-neoul-border flex items-center justify-around px-4 z-40">
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-brand"><Home className="w-6 h-6" /><span>홈</span></button>
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><MapPin className="w-6 h-6" /><span>지도</span></button>
              <div className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><Accessibility className="w-6 h-6" /><span>접근성</span></div>
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><Heart className="w-6 h-6" /><span>보관함</span></button>
              <button className="flex flex-col items-center gap-1.5 font-bold text-[10px] text-neoul-heuk/20"><Settings className="w-6 h-6" /><span>설정</span></button>
            </nav>

            {/* Refined Detail Screen (Detailed Work) */}
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
                    <button onClick={() => setSelectedPlace(null)} className="w-10 h-10 bg-black/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20"><ChevronLeft className="w-7 h-7" /></button>
                    <div className="flex gap-2">
                       <button className="w-10 h-10 bg-black/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20"><Share2 className="w-5 h-5" /></button>
                       <button className="w-10 h-10 bg-black/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20"><Heart className="w-5 h-5" /></button>
                    </div>
                  </header>

                  <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
                    {/* Hero Image */}
                    <div className="w-full aspect-[4/5] bg-neoul-gray relative overflow-hidden">
                       <img src={selectedPlace.image} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/10" />
                       <div className="absolute bottom-8 left-8 right-8">
                          <h3 className="text-4xl font-bold tracking-tight text-neoul-heuk">{selectedPlace.name}</h3>
                          <p className="text-sm font-bold text-neoul-heuk/40 mt-1 uppercase tracking-widest">{selectedPlace.nameEn}</p>
                       </div>
                    </div>

                    {/* Quick Stats Bar */}
                    <div className="flex items-center justify-around py-6 border-b border-neoul-border">
                       <div className="flex flex-col items-center gap-1"><span className="text-neoul-brand font-black text-lg">{selectedPlace.rating}</span><span className="text-[10px] font-bold text-neoul-heuk/20 uppercase">Rating</span></div>
                       <div className="w-px h-8 bg-neoul-border" />
                       <div className="flex flex-col items-center gap-1"><span className="text-neoul-heuk font-black text-lg">{selectedPlace.reviewCount}</span><span className="text-[10px] font-bold text-neoul-heuk/20 uppercase">Reviews</span></div>
                       <div className="w-px h-8 bg-neoul-border" />
                       <div className="flex flex-col items-center gap-1"><span className="text-neoul-accent font-black text-lg">{selectedPlace.distance}</span><span className="text-[10px] font-bold text-neoul-heuk/20 uppercase">Distance</span></div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex px-6 mt-8 border-b border-neoul-border">
                       {['info', 'history', 'review'].map(tab => (
                          <button 
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === tab ? 'border-neoul-brand text-neoul-brand' : 'border-transparent text-neoul-heuk/30'}`}
                          >
                             {tab === 'info' ? '기본정보' : tab === 'history' ? '역사이야기' : '방문리뷰'}
                          </button>
                       ))}
                    </div>

                    {/* Tab Content */}
                    <div className="px-8 py-10">
                       {activeTab === 'info' && (
                          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="space-y-4">
                                <h4 className="text-lg font-bold flex items-center gap-2"><Info className="w-5 h-5 text-neoul-brand" /> 안내 및 정보</h4>
                                <p className="text-sm font-medium leading-relaxed text-neoul-heuk/60">{selectedPlace.description}</p>
                             </div>
                             
                             <div className="space-y-4">
                                <h4 className="text-sm font-black uppercase tracking-widest text-neoul-heuk/30">편의시설 및 서비스</h4>
                                <div className="grid grid-cols-2 gap-3">
                                   {selectedPlace.amenities.map(item => (
                                      <div key={item.label} className={`flex items-center gap-3 p-4 rounded-2xl border ${item.available ? 'bg-neoul-gray border-neoul-border opacity-100' : 'bg-white border-dashed border-neoul-border opacity-30'}`}>
                                         <span className="text-xl">{item.icon}</span>
                                         <span className="text-[11px] font-bold">{item.label}</span>
                                      </div>
                                   ))}
                                </div>
                             </div>

                             <div className="space-y-4">
                                <h4 className="text-sm font-black uppercase tracking-widest text-neoul-heuk/30">이용 안내</h4>
                                <div className="bg-neoul-gray p-6 rounded-3xl space-y-4">
                                   <div className="flex justify-between items-center text-xs font-bold">
                                      <span className="flex items-center gap-2 text-neoul-heuk/40"><Clock className="w-4 h-4" /> 관람 시간</span>
                                      <span>{selectedPlace.hours}</span>
                                   </div>
                                   <div className="flex justify-between items-center text-xs font-bold">
                                      <span className="flex items-center gap-2 text-neoul-heuk/40"><Accessibility className="w-4 h-4" /> 관람 요금</span>
                                      <span className="text-neoul-brand">{selectedPlace.fee}</span>
                                   </div>
                                </div>
                             </div>
                          </div>
                       )}

                       {activeTab === 'history' && (
                          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="w-full h-48 rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-10"><img src={selectedPlace.gallery[1]} className="w-full h-full object-cover" /></div>
                             <div className="space-y-6">
                                <h4 className="text-2xl font-black italic tracking-tighter">"시간이 멈춘 곳, 그 너머의 이야기"</h4>
                                <p className="text-[15px] font-medium leading-relaxed text-neoul-heuk/70">{selectedPlace.historyText}</p>
                                <button className="flex items-center gap-2 text-neoul-brand text-xs font-bold border-b border-neoul-brand pb-1">관련 사료 더보기 <ExternalLink className="w-3 h-3" /></button>
                             </div>
                          </div>
                       )}

                       {activeTab === 'review' && (
                          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="flex items-center justify-between">
                                <h4 className="text-lg font-bold">리뷰 {selectedPlace.reviewCount}개</h4>
                                <button className="text-xs font-bold text-neoul-brand bg-neoul-brand/5 px-4 py-2 rounded-full">리뷰 작성하기</button>
                             </div>
                             <div className="space-y-6">
                                {[1, 2].map(i => (
                                   <div key={i} className="p-6 bg-white border border-neoul-border rounded-[2rem] shadow-sm">
                                      <div className="flex justify-between mb-4">
                                         <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-neoul-gray rounded-full" />
                                            <div><p className="text-xs font-bold">네임드 너울러_{i}</p><p className="text-[10px] text-neoul-heuk/30 font-bold">2026.05.16</p></div>
                                         </div>
                                         <div className="flex text-neoul-accent"><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /><Star className="w-3.5 h-3.5 fill-current" /></div>
                                      </div>
                                      <p className="text-[13px] font-medium text-neoul-heuk/60 leading-relaxed">AI 도슨트 설명이 너무 친절해서 역사 공부가 절로 되네요! 특히 박석에 관한 설명이 인상깊었습니다.</p>
                                   </div>
                                ))}
                             </div>
                          </div>
                       )}
                    </div>
                  </div>

                  <footer className="p-6 bg-white/80 backdrop-blur-2xl absolute bottom-0 left-0 right-0 z-50 border-t border-neoul-border flex gap-4">
                    <button className="w-16 h-16 rounded-2xl bg-neoul-gray flex items-center justify-center text-neoul-heuk/40 border border-neoul-border"><MessageCircle className="w-7 h-7" /></button>
                    <button 
                      onClick={() => { setShowPlayer(true); setSelectedPlace(null); }} 
                      className="flex-1 py-5 rounded-2xl bg-neoul-brand text-white text-lg font-bold flex items-center justify-center gap-3 shadow-2xl shadow-neoul-brand/30 transition-all active:scale-[0.98]"
                    >
                      <Play className="w-6 h-6 fill-white" /> AI 도슨트 시작하기
                    </button>
                  </footer>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Enhanced Detailed Player Screen */
          <motion.div key="player" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 flex flex-col bg-white">
            <header className="h-16 flex items-center justify-between px-6 border-b border-neoul-border flex-shrink-0">
              <button onClick={() => setShowPlayer(false)} className="p-2 hover:bg-neoul-gray rounded-full transition-colors"><ChevronDown className="w-8 h-8" /></button>
              <div className="text-center"><h2 className="text-[10px] font-bold text-neoul-heuk/30 uppercase tracking-[0.3em] mb-0.5">Now Playing</h2><p className="text-xs font-bold text-neoul-heuk">AI HERITAGE GUIDE</p></div>
              <button className="p-2 hover:bg-neoul-gray rounded-full transition-colors"><Globe className="w-6 h-6 text-neoul-heuk/60" /></button>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center px-10">
               <motion.div 
                 animate={{ y: [-5, 5, -5] }}
                 transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                 className="w-72 h-80 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden mb-12 relative border-4 border-white"
               >
                  <img src="gyeongbokgung.png" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-white">
                     <div className="flex flex-col"><span className="text-[10px] font-bold opacity-60 uppercase">Section 01</span><span className="text-lg font-black tracking-tight">근정전의 비밀</span></div>
                     <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/20"><Play className="w-5 h-5 fill-white" /></div>
                  </div>
               </motion.div>

               {/* Real-time Subtitles (The 'Detail' Work) */}
               <div className="w-full h-24 mb-10 flex items-center justify-center text-center px-4">
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key="subtitle"
                    className="text-[15px] font-bold leading-relaxed text-neoul-heuk"
                  >
                    "지금 보시는 근정전의 마당에 깔린 박석은 <br />
                    햇빛의 반사를 막고 배수를 돕는 지혜가 담겨 있습니다."
                  </motion.p>
               </div>

               <div className="w-full flex flex-col gap-4 mb-14 px-4">
                  <div className="relative h-2 bg-neoul-gray rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '38%' }} className="absolute top-0 left-0 bottom-0 bg-neoul-brand" />
                  </div>
                  <div className="flex justify-between font-bold text-[11px] text-neoul-brand"><span>01:42</span><span className="text-neoul-heuk/20">04:35</span></div>
               </div>

               <div className="w-full flex items-center justify-between px-6">
                  <button className="text-neoul-heuk/10 hover:text-neoul-heuk transition-colors"><Settings className="w-6 h-6" /></button>
                  <button className="text-neoul-heuk/20 hover:text-neoul-heuk transition-colors"><Play className="w-10 h-10 rotate-180 fill-current" /></button>
                  <button className="w-24 h-24 rounded-[2.5rem] bg-neoul-heuk text-white flex items-center justify-center shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] active:scale-95 transition-all"><Pause className="w-10 h-10 fill-current" /></button>
                  <button className="text-neoul-heuk/20 hover:text-neoul-heuk transition-colors"><Play className="w-10 h-10 fill-current" /></button>
                  <button className="text-neoul-heuk/10 hover:text-neoul-heuk transition-colors"><Accessibility className="w-6 h-6" /></button>
               </div>
            </div>

            <div className="p-8 bg-neoul-gray/50 flex flex-col items-center justify-center h-[18%] border-t border-neoul-border">
               <div className="flex gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-1 h-4 rounded-full ${i === 2 ? 'bg-neoul-brand' : 'bg-neoul-brand/20'} animate-pulse`} style={{ animationDelay: `${i * 0.1}s` }} />)}
               </div>
               <p className="text-[11px] font-bold text-neoul-brand uppercase tracking-[0.3em]">AI Voice Synthesis Active</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
