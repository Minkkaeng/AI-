import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Star, Bell, Plane, Search, Globe, Clock, Share2, ChevronRight, Heart, MapPin, Mountain, TowerControl as Tower, ChevronLeft, Calendar, User, SlidersHorizontal, Info } from 'lucide-react';
import { MOCK_PLACES, MOCK_REGIONS } from '../types';
import type { Place, Region } from '../types';

export default function WebVersion() {
  const [mapMode, setMapMode] = useState<'country' | 'region'>('country');
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [hoveredPlace, setHoveredPlace] = useState<number | null>(null);

  // Flow handlers
  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setMapMode('region');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCountry = () => {
    setMapMode('country');
    setSelectedRegion(null);
    setSelectedPlace(null);
  };

  return (
    <div className="flex flex-col w-full h-full bg-white font-sans text-neoul-heuk relative">
      {/* Premium Web Header */}
      <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-12 flex-shrink-0 z-50 sticky top-0 transition-all shadow-sm">
        <div className="flex items-center gap-16">
          <h2 onClick={handleBackToCountry} className="text-3xl font-black tracking-tighter text-neoul-brand uppercase cursor-pointer hover:scale-105 transition-transform">NEOUL</h2>
          
          <nav className="flex items-center gap-8 text-[13px] font-bold text-gray-400 uppercase tracking-widest">
            <button className="text-neoul-heuk">Exploration</button>
            <button className="hover:text-neoul-heuk transition-colors">Digital Archive</button>
            <button className="hover:text-neoul-heuk transition-colors">Docent Shop</button>
            <button className="hover:text-neoul-heuk transition-colors">Community</button>
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-4 py-2.5 rounded-full border border-gray-200 transition-colors cursor-pointer">
              <Globe className="w-4 h-4 text-gray-500" />
              <span className="text-xs font-bold text-gray-500">KR</span>
           </div>
           
           <div className="h-12 w-12 bg-white rounded-full border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="absolute top-3 right-3 w-2 h-2 bg-neoul-accent rounded-full border-2 border-white" />
           </div>

           <div className="flex items-center gap-3 bg-white border border-gray-200 px-3 py-2 rounded-full hover:shadow-md transition-shadow cursor-pointer">
              <SlidersHorizontal className="w-5 h-5 text-gray-600 ml-1" />
              <div className="w-8 h-8 bg-neoul-heuk rounded-full flex items-center justify-center">
                 <User className="w-4 h-4 text-white" />
              </div>
           </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden flex flex-col relative">
        <AnimatePresence mode="wait">
          
          {/* STATE 1: COUNTRY MODE (HERO & GRID) */}
          {mapMode === 'country' && (
            <motion.div key="country" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }} className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-white">
              
              {/* Hero Section */}
              <div className="relative w-full h-[70vh] min-h-[600px] flex-shrink-0 flex flex-col items-center justify-center p-8">
                 <div className="absolute inset-4 rounded-[3rem] overflow-hidden">
                    <img src="hero-bg.png" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40" />
                 </div>
                 
                 <div className="relative z-10 text-center text-white mb-12">
                    <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-6xl md:text-8xl font-black mb-6 drop-shadow-2xl tracking-tighter">아름다운 유산의 발견</motion.h1>
                    <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-xl md:text-2xl font-medium opacity-90 drop-shadow-lg">과거와 현재가 만나는 공간으로 당신을 초대합니다.</motion.p>
                 </div>
                 
                 {/* Premium Search Bar (Airbnb Style) */}
                 <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="relative z-10 bg-white rounded-full flex items-center shadow-[0_20px_40px_rgba(0,0,0,0.15)] w-full max-w-4xl mx-auto border border-gray-100 p-2">
                    <div className="flex-1 hover:bg-gray-50 rounded-full px-8 py-3 transition-colors cursor-pointer group">
                       <span className="block text-[10px] font-black text-neoul-heuk uppercase tracking-widest mb-1">어디로 떠나시나요?</span>
                       <input type="text" placeholder="지역, 문화재 검색" className="w-full bg-transparent outline-none font-bold text-sm text-gray-500 placeholder:text-gray-300" />
                    </div>
                    <div className="w-px h-10 bg-gray-200" />
                    <div className="flex-1 hover:bg-gray-50 rounded-full px-8 py-3 transition-colors cursor-pointer group">
                       <span className="block text-[10px] font-black text-neoul-heuk uppercase tracking-widest mb-1">방문 일정</span>
                       <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                          <Calendar className="w-4 h-4" /> 날짜 선택
                       </div>
                    </div>
                    <div className="w-px h-10 bg-gray-200" />
                    <div className="flex-1 hover:bg-gray-50 rounded-full px-8 py-3 transition-colors cursor-pointer group">
                       <span className="block text-[10px] font-black text-neoul-heuk uppercase tracking-widest mb-1">테마</span>
                       <div className="font-bold text-sm text-gray-400">유형 선택</div>
                    </div>
                    <button className="w-16 h-16 bg-neoul-brand rounded-full flex items-center justify-center shadow-lg shadow-neoul-brand/30 hover:scale-105 active:scale-95 transition-all flex-shrink-0 ml-2">
                       <Search className="w-6 h-6 text-white" />
                    </button>
                 </motion.div>
              </div>

              {/* Destinations Grid */}
              <div className="max-w-[1400px] w-full mx-auto px-12 py-20 flex-1">
                 <div className="flex items-end justify-between mb-12">
                    <div>
                       <h2 className="text-4xl font-black mb-3 text-neoul-heuk tracking-tight">당신을 위한 추천 여행지</h2>
                       <p className="text-lg text-gray-500 font-medium">NEOUL이 엄선한 최고의 전통 문화 공간들</p>
                    </div>
                    <button className="font-bold text-sm text-neoul-brand hover:text-neoul-heuk transition-colors flex items-center gap-1">전체보기 <ChevronRight className="w-4 h-4" /></button>
                 </div>
                 
                 <div className="grid grid-cols-4 gap-8">
                    {/* Seoul Card */}
                    <motion.div whileHover={{ y: -8 }} onClick={() => handleRegionSelect(MOCK_REGIONS[0])} className="group cursor-pointer">
                       <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-5 relative shadow-lg">
                          <img src="hero-bg.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                          <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-neoul-heuk uppercase shadow-sm">Hot Place</div>
                          <div className="absolute bottom-6 left-6 right-6">
                             <h3 className="text-3xl font-black text-white drop-shadow-md">서울 · 경기</h3>
                             <p className="text-sm text-white/80 font-medium mt-1">조선의 도읍, 천년의 역사</p>
                          </div>
                       </div>
                    </motion.div>
                    
                    {/* Placeholders for others */}
                    {[
                      { n: '인천', c: '근대 문화의 흔적', i: <Plane className="w-6 h-6 text-indigo-400 -rotate-45" /> },
                      { n: '강원', c: '자연과 문화의 조화', i: <Mountain className="w-6 h-6 text-emerald-400" /> },
                      { n: '경주', c: '신라 천년의 향기', i: <Tower className="w-6 h-6 text-amber-400" /> }
                    ].map(region => (
                       <motion.div whileHover={{ y: -8 }} key={region.n} className="group cursor-pointer">
                          <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-5 bg-gray-50 flex flex-col items-center justify-center border border-gray-200 transition-colors group-hover:bg-gray-100 relative">
                             <div className="absolute top-5 right-5 text-[10px] font-black text-gray-400 uppercase tracking-widest border border-gray-200 px-3 py-1 rounded-full">Soon</div>
                             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                {region.i}
                             </div>
                             <h3 className="text-2xl font-black text-gray-400 mb-1">{region.n}</h3>
                             <p className="text-sm font-medium text-gray-400">{region.c}</p>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              </div>
            </motion.div>
          )}

          {/* STATE 2: REGION MODE (SPLIT VIEW) */}
          {mapMode === 'region' && (
            <motion.div key="region" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex-1 flex overflow-hidden">
              
              {/* Left: Content Area (Listings) - 60% Width */}
              <div className="w-[60%] bg-white flex flex-col z-10 shadow-[20px_0_40px_rgba(0,0,0,0.03)] relative overflow-hidden">
                 
                 {/* Header / Filter Bar */}
                 <div className="pt-8 pb-4 px-12 border-b border-gray-100 flex items-center justify-between flex-shrink-0 bg-white/95 backdrop-blur-md z-20">
                    <button onClick={handleBackToCountry} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors border border-gray-200">
                       <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                       {['전체', '궁궐/사적', '박물관', '야간개장', '무장애', '포토스팟'].map((filter, i) => (
                         <button key={filter} className={`px-5 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all ${i === 0 ? 'bg-neoul-heuk text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-neoul-heuk hover:text-neoul-heuk'}`}>{filter}</button>
                       ))}
                    </div>
                 </div>
                 
                 <div className="flex-1 overflow-y-auto p-12 pb-32 no-scrollbar scroll-smooth">
                    <div className="mb-14 max-w-2xl">
                       <span className="text-xs font-black text-neoul-brand uppercase tracking-[0.2em] mb-3 block">Curated Roadmap</span>
                       <h1 className="text-5xl font-black mb-6 tracking-tighter leading-tight">{selectedRegion?.name} 관광지 로드맵</h1>
                       <p className="text-lg text-gray-500 font-medium leading-relaxed">한국의 전통과 현대가 가장 아름답게 조화를 이루는 곳. 수백 년의 이야기가 담긴 궁궐부터 골목길 숨은 명소까지, 당신만의 특별한 여정을 시작하세요.</p>
                    </div>

                    {/* Courses Section (Horizontal Scroll) */}
                    <div className="mb-20">
                       <div className="flex items-center justify-between mb-8">
                          <h2 className="text-3xl font-black">추천 테마 코스</h2>
                          <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
                            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
                          </div>
                       </div>
                       <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 -mx-12 px-12 snap-x">
                          {[
                             { title: "조선 왕실 야간 달빛 기행", tags: ["#야간개장", "#궁궐"], spots: "덕수궁 ➔ 정동길 ➔ 경복궁", img: "gyeongbokgung.png" },
                             { title: "한국의 멋, 북촌 산책", tags: ["#한옥마을", "#인생샷"], spots: "창덕궁 ➔ 북촌한옥마을", img: "hanok.png" }
                          ].map((course, i) => (
                             <div key={i} className="w-[400px] flex-shrink-0 group cursor-pointer snap-start">
                                <div className="w-full aspect-[16/10] rounded-[2rem] overflow-hidden mb-5 relative shadow-md">
                                   <img src={course.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                   <div className="absolute top-5 right-5 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-sm"><Heart className="w-5 h-5 text-gray-600" /></div>
                                </div>
                                <div className="flex gap-2 mb-3">
                                   {course.tags.map(tag => <span key={tag} className="text-[11px] font-black text-neoul-brand bg-neoul-brand/5 px-3 py-1.5 rounded-lg uppercase">{tag}</span>)}
                                </div>
                                <h3 className="text-2xl font-black mb-2 text-neoul-heuk group-hover:text-neoul-brand transition-colors">{course.title}</h3>
                                <p className="text-sm text-gray-500 font-bold flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {course.spots}</p>
                             </div>
                          ))}
                       </div>
                    </div>

                    {/* Trending Spots Grid */}
                    <div>
                       <div className="flex items-center justify-between mb-8">
                          <h2 className="text-3xl font-black">모든 장소</h2>
                          <span className="text-sm font-bold text-gray-400">총 {MOCK_PLACES.length}개의 결과</span>
                       </div>
                       <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                          {MOCK_PLACES.map(place => (
                             <div key={place.id} className="group cursor-pointer" onMouseEnter={() => setHoveredPlace(place.id)} onMouseLeave={() => setHoveredPlace(null)} onClick={() => setSelectedPlace(place)}>
                                <div className="w-full aspect-square rounded-[2.5rem] overflow-hidden mb-5 relative shadow-md bg-gray-100">
                                   <img src={place.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                   <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-black uppercase shadow-sm text-neoul-heuk">{place.category}</div>
                                   <div className="absolute top-5 right-5 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-all"><Heart className="w-5 h-5 text-white hover:text-neoul-heuk fill-transparent" /></div>
                                </div>
                                <div className="flex justify-between items-start mb-2">
                                   <h3 className="font-black text-2xl truncate pr-2 group-hover:text-neoul-brand transition-colors">{place.name}</h3>
                                   <div className="flex items-center gap-1.5 text-sm font-black text-neoul-heuk flex-shrink-0 bg-gray-50 px-2 py-1 rounded-lg"><Star className="w-3.5 h-3.5 fill-current text-neoul-accent" /> {place.rating}</div>
                                </div>
                                <p className="text-sm text-gray-500 font-medium line-clamp-2 mb-4 leading-relaxed">{place.description}</p>
                                <div className="text-xs text-gray-400 font-bold flex items-center gap-2">
                                   <span className="text-neoul-brand bg-neoul-brand/10 px-2 py-1 rounded-md">{place.distance}</span>
                                   <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                   <span>{place.reviewCount} 리뷰</span>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              {/* Right: Map Area - 40% Width */}
              <div className="w-[40%] bg-gray-100 relative">
                 <div className="absolute inset-0">
                    <motion.img 
                      animate={{ scale: hoveredPlace ? 1.05 : 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      src="map-bg.png" 
                      className="w-full h-full object-cover opacity-70" 
                      alt="Map" 
                    />
                    <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />
                    
                    {/* Floating Map Controls */}
                    <div className="absolute top-8 right-8 flex flex-col gap-2 z-30">
                       <button className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-gray-50"><MapPin className="w-5 h-5 text-gray-600" /></button>
                       <button className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-gray-50 text-xl font-bold text-gray-600">+</button>
                       <button className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-gray-50 text-xl font-bold text-gray-600">-</button>
                    </div>
                    
                    {/* Map Markers */}
                    {MOCK_PLACES.map((place, i) => {
                       const isHovered = hoveredPlace === place.id;
                       return (
                         <motion.div 
                           key={place.id}
                           animate={{ scale: isHovered ? 1.15 : 1, y: isHovered ? -15 : 0 }}
                           className={`absolute ${i === 0 ? 'top-[40%] left-[30%]' : i === 1 ? 'top-[60%] left-[60%]' : 'top-[50%] left-[50%]'} cursor-pointer group z-20 ${isHovered ? 'z-30' : ''}`}
                           onClick={() => setSelectedPlace(place)}
                         >
                           <div className="bg-white p-2.5 rounded-3xl shadow-xl flex flex-col items-center transform transition-transform group-hover:-translate-y-2 border-2 border-transparent hover:border-neoul-brand">
                             <div className="w-24 h-24 rounded-2xl overflow-hidden relative">
                               <img src={place.image} className="w-full h-full object-cover" />
                               <div className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-md text-[10px] font-black flex items-center gap-1"><Star className="w-2.5 h-2.5 text-neoul-accent fill-current"/>{place.rating}</div>
                             </div>
                             <div className="flex items-center gap-2 mt-3 px-2 pb-1">
                                <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${i === 0 ? 'bg-neoul-brand' : 'bg-neoul-accent'}`} />
                                <span className="text-[11px] font-black uppercase text-neoul-heuk">{place.name}</span>
                             </div>
                           </div>
                         </motion.div>
                       );
                    })}
                 </div>
              </div>
            </motion.div>
          )}

          {/* STATE 3: DETAIL MODAL (Airbnb Style) */}
          <AnimatePresence>
            {selectedPlace && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 md:p-12">
                 <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                   className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                   onClick={() => setSelectedPlace(null)}
                 />
                 
                 <motion.div
                   initial={{ opacity: 0, y: 100, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: 50, scale: 0.95 }}
                   transition={{ type: "spring", damping: 30, stiffness: 300 }}
                   className="relative w-full max-w-[1280px] h-[90vh] bg-white rounded-[3rem] shadow-2xl flex overflow-hidden z-10"
                 >
                    <button onClick={() => setSelectedPlace(null)} className="absolute top-6 right-6 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center z-50 hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm"><X className="w-5 h-5 text-gray-600" /></button>
                    
                    {/* Left: Sticky Image Gallery */}
                    <div className="w-[45%] h-full relative bg-gray-100">
                       <img src={selectedPlace.image} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                       <div className="absolute bottom-12 left-12 right-12 text-white">
                          <div className="flex gap-2 mb-4">
                             <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/30">Heritage</span>
                             <span className="bg-neoul-brand px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Audio Guide</span>
                          </div>
                          <h2 className="text-5xl lg:text-6xl font-black drop-shadow-lg leading-tight mb-2">{selectedPlace.name}</h2>
                          <p className="text-lg font-bold text-white/80 uppercase tracking-widest">{selectedPlace.nameEn}</p>
                       </div>
                    </div>
                    
                    {/* Right: Scrollable Detail Content */}
                    <div className="w-[55%] h-full flex flex-col bg-white">
                       <div className="flex-1 overflow-y-auto px-16 py-12 no-scrollbar">
                          
                          {/* Title & Actions Bar */}
                          <div className="flex items-start justify-between mb-10 pb-10 border-b border-gray-100">
                             <div>
                                <h3 className="text-3xl font-black mb-4">{selectedPlace.category}</h3>
                                <div className="flex items-center gap-4 text-sm font-bold text-gray-600">
                                   <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-neoul-accent fill-current" /> {selectedPlace.rating} ({selectedPlace.reviewCount}개 리뷰)</span>
                                   <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> 내 위치에서 {selectedPlace.distance}</span>
                                </div>
                             </div>
                             <div className="flex gap-3">
                                <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-black transition-all"><Heart className="w-5 h-5 text-gray-600" /></button>
                                <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-black transition-all"><Share2 className="w-5 h-5 text-gray-600" /></button>
                             </div>
                          </div>

                          {/* Quick Info Cards */}
                          <div className="grid grid-cols-2 gap-4 mb-12">
                             <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center gap-4 hover:border-gray-300 transition-colors">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm"><Clock className="w-5 h-5 text-neoul-brand" /></div>
                                <div><div className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">운영 시간</div><div className="text-sm font-bold">{selectedPlace.hours.split('(')[0]}</div></div>
                             </div>
                             <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center gap-4 hover:border-gray-300 transition-colors">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm"><Info className="w-5 h-5 text-neoul-brand" /></div>
                                <div><div className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">입장료</div><div className="text-sm font-bold">{selectedPlace.fee}</div></div>
                             </div>
                          </div>

                          <div className="space-y-16">
                             <section>
                                <h4 className="text-2xl font-black mb-6">공간 이야기</h4>
                                <p className="text-base font-medium leading-relaxed text-gray-600">
                                   {selectedPlace.description} <br/><br/> {selectedPlace.historyText}
                                </p>
                             </section>

                             <section>
                                <h4 className="text-2xl font-black mb-6 flex items-center gap-2">이용 가능한 편의시설</h4>
                                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                   {selectedPlace.amenities.map(item => (
                                      <div key={item.label} className="flex items-center gap-4">
                                         <div className="text-2xl w-8 text-center">{item.icon}</div>
                                         <span className="text-sm font-bold text-gray-700">{item.label}</span>
                                      </div>
                                   ))}
                                </div>
                             </section>
                             
                             <section className="pb-10">
                                <h4 className="text-2xl font-black mb-6">갤러리</h4>
                                <div className="grid grid-cols-2 gap-4">
                                   {selectedPlace.gallery.map((img, i) => (
                                      <div key={i} className="aspect-video rounded-3xl overflow-hidden bg-gray-100 border border-gray-100"><img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
                                   ))}
                                </div>
                             </section>
                          </div>
                       </div>
                       
                       {/* Sticky Action Footer */}
                       <div className="px-16 py-6 border-t border-gray-100 bg-white flex items-center justify-between shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                          <div>
                             <p className="text-sm font-bold text-gray-500 mb-1">프리미엄 오디오 가이드</p>
                             <p className="text-lg font-black text-neoul-heuk">AI 스마트 도슨트</p>
                          </div>
                          <button className="h-16 px-10 bg-neoul-heuk text-white rounded-full text-lg font-black flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-xl">
                             <Play className="w-5 h-5 fill-white" />
                             도슨트 시작하기
                          </button>
                       </div>
                    </div>
                 </motion.div>
              </div>
            )}
          </AnimatePresence>

        </AnimatePresence>
      </div>
    </div>
  );
}
