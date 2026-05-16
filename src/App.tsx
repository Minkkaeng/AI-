import { useState } from 'react';
import WebVersion from './webapp/WebVersion';
import AppVersion from './app/AppVersion';
import { Monitor, Smartphone, Layout, Layers, Sparkles, ArrowRight, MousePointer2, MapPin, Play, Accessibility } from 'lucide-react';

type ViewMode = 'web' | 'app' | 'flow';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('flow'); // Start with flow for the user to see the result
  const [designMode, setDesignMode] = useState<'wireframe' | 'hifi'>('hifi');

  return (
    <div className="w-full h-screen bg-[#F8FAFC] flex flex-col font-sans overflow-hidden">
      {/* Premium Studio Header */}
      <header className="h-20 bg-slate-900 text-white flex items-center justify-between px-10 z-50 flex-shrink-0 shadow-2xl">
        <div className="flex items-center gap-5">
          <div className="bg-neoul-mint p-2 rounded-xl shadow-lg shadow-neoul-mint/30 rotate-3 transition-transform hover:rotate-0">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-black uppercase tracking-[0.1em] text-xl leading-none">NEOUL STUDIO</h1>
            <p className="text-[10px] font-bold text-white/40 mt-1 uppercase tracking-widest">Heritage Experience Design</p>
          </div>
        </div>

        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xl">
          <button 
            onClick={() => setViewMode('web')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'web' ? 'bg-white text-slate-900 shadow-xl' : 'text-white/40 hover:text-white'}`}
          >
            <Monitor className="w-4 h-4" />
            DESKTOP
          </button>
          <button 
            onClick={() => setViewMode('app')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'app' ? 'bg-white text-slate-900 shadow-xl' : 'text-white/40 hover:text-white'}`}
          >
            <Smartphone className="w-4 h-4" />
            MOBILE
          </button>
          <button 
            onClick={() => setViewMode('flow')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'flow' ? 'bg-neoul-mint text-white shadow-lg shadow-neoul-mint/40' : 'text-white/40 hover:text-white'}`}
          >
            <Layers className="w-4 h-4" />
            UX FLOW
          </button>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10">
             <button 
               onClick={() => setDesignMode('wireframe')}
               className={`px-4 py-2 rounded-full text-[10px] font-black transition-all ${designMode === 'wireframe' ? 'bg-white/20 text-white' : 'text-white/30'}`}
             >
               WIREFRAME
             </button>
             <button 
               onClick={() => setDesignMode('hifi')}
               className={`px-4 py-2 rounded-full text-[10px] font-black transition-all flex items-center gap-2 ${designMode === 'hifi' ? 'bg-neoul-jeok text-white shadow-lg shadow-neoul-jeok/40' : 'text-white/30'}`}
             >
               <Sparkles className="w-3.5 h-3.5" />
               HI-FI UI
             </button>
          </div>
          <button className="bg-neoul-mint text-white px-8 py-3 rounded-2xl text-sm font-black hover:scale-[1.02] transition-all uppercase shadow-lg shadow-neoul-mint/20">
            Publish
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center">
        {viewMode === 'web' && (
          <div className="w-full h-full p-12 flex flex-col items-center">
            <div className="w-full h-full max-w-7xl bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden relative border border-black/5">
              <div className="h-14 border-b border-black/5 flex items-center px-8 gap-3 bg-slate-50 flex-shrink-0">
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 bg-rose-400 rounded-full" />
                  <div className="w-3.5 h-3.5 bg-amber-400 rounded-full" />
                  <div className="w-3.5 h-3.5 bg-emerald-400 rounded-full" />
                </div>
                <div className="ml-8 bg-white rounded-xl border border-black/5 px-6 py-1.5 text-xs font-bold text-slate-400 w-96 truncate shadow-inner">
                   https://neoul.ai/experience/web
                </div>
              </div>
              <div className="flex-1 overflow-hidden relative">
                <WebVersion isHifi={designMode === 'hifi'} />
              </div>
            </div>
          </div>
        )}

        {viewMode === 'app' && (
          <div className="p-12 flex flex-col items-center">
            <div className="w-[420px] h-[860px] bg-slate-900 rounded-[5rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)] relative p-4 border-[8px] border-slate-800">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-10 bg-slate-900 rounded-b-[2.5rem] z-[60]" />
              <div className="w-full h-full bg-white rounded-[4rem] relative overflow-hidden shadow-inner">
                <AppVersion isHifi={designMode === 'hifi'} />
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-36 h-2 bg-white/20 rounded-full" />
            </div>
          </div>
        )}

        {viewMode === 'flow' && (
          <div className="w-full h-full overflow-auto bg-slate-100 p-24 custom-scrollbar">
            <div className="inline-flex items-start gap-40 min-w-max pr-60">
              
              {/* Step 01: Brand Identity */}
              <div className="flex flex-col items-center gap-14 group">
                <div className="text-center">
                  <span className="bg-slate-900 text-white px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-xl">Phase 01</span>
                  <h3 className="text-4xl font-black mt-4 text-slate-900 tracking-tighter uppercase italic">Identity</h3>
                </div>
                <div className="w-[320px] h-[640px] bg-white rounded-[4rem] shadow-2xl border border-black/5 overflow-hidden flex flex-col items-center justify-center p-12 transition-transform group-hover:scale-[1.02]">
                   <div className="flex gap-4 mb-10">
                     <div className="w-4 h-20 bg-neoul-jeok rounded-full" />
                     <div className="w-4 h-20 bg-neoul-cheong rounded-full" />
                     <div className="w-4 h-20 bg-neoul-hwang rounded-full" />
                   </div>
                   <h1 className="text-5xl font-black text-slate-900 tracking-tighter">NEOUL</h1>
                   <p className="text-xs font-bold mt-4 text-slate-400 uppercase tracking-[0.3em]">AI Docent Platform</p>
                </div>
                <div className="max-w-[240px] text-center">
                   <p className="text-sm font-bold text-slate-500 leading-relaxed">한국의 전통 오방색을 현대적으로 재해석한 <br /><span className="text-neoul-jeok">프리미엄 미니멀리즘</span> 브랜딩</p>
                </div>
              </div>

              <div className="pt-96 opacity-20"><ArrowRight className="w-20 h-20" /></div>

              {/* Step 02: Exploration */}
              <div className="flex flex-col items-center gap-14 group">
                <div className="text-center">
                  <span className="bg-neoul-mint text-white px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-xl">Phase 02</span>
                  <h3 className="text-4xl font-black mt-4 text-slate-900 tracking-tighter uppercase italic">Discovery</h3>
                </div>
                <div className="w-[320px] h-[640px] bg-white rounded-[4rem] shadow-2xl border border-black/5 overflow-hidden flex flex-col relative transition-transform group-hover:scale-[1.02]">
                   <div className="h-16 bg-slate-50 border-b border-black/5 flex items-center justify-around px-8">
                      <div className="w-8 h-1 bg-neoul-mint rounded-full" /><div className="w-8 h-1 bg-slate-200 rounded-full" /><div className="w-8 h-1 bg-slate-200 rounded-full" />
                   </div>
                   <div className="flex-1 bg-[#F9F7F2] p-6 relative overflow-hidden">
                      <img src="map-bg.png" className="w-full opacity-60 scale-125 translate-y-10" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-10">
                         <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col items-center border border-black/5">
                            <div className="p-2 bg-neoul-mint rounded-xl"><MapPin className="w-4 h-4 text-white" /></div>
                            <span className="text-[10px] font-black mt-1">SEOUL</span>
                         </div>
                      </div>
                   </div>
                   <div className="absolute bottom-12 left-6 right-6 p-5 bg-white rounded-3xl shadow-2xl border border-black/5 flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-100 rounded-2xl overflow-hidden"><img src="gyeongbokgung.png" className="w-full h-full object-cover" /></div>
                      <div><div className="w-24 h-3 bg-slate-900 rounded-full mb-1.5" /><div className="w-16 h-2 bg-slate-100 rounded-full" /></div>
                   </div>
                   <div className="h-16 bg-white border-t border-black/5 flex items-center justify-center"><div className="w-12 h-12 bg-neoul-mint rounded-2xl shadow-lg shadow-neoul-mint/20 flex items-center justify-center"><Accessibility className="w-6 h-6 text-white" /></div></div>
                   <div className="absolute bottom-40 right-10"><MousePointer2 className="w-12 h-12 text-slate-900 fill-slate-900 drop-shadow-lg" /></div>
                </div>
                <div className="max-w-[240px] text-center">
                   <p className="text-sm font-bold text-slate-500 leading-relaxed">지리적 맥락에 기반한 <span className="text-neoul-mint">스토리 지형도</span>를 통해 장소의 가치를 발견하는 여정</p>
                </div>
              </div>

              <div className="pt-96 opacity-20"><ArrowRight className="w-20 h-20" /></div>

              {/* Step 03: Insight */}
              <div className="flex flex-col items-center gap-14 group">
                <div className="text-center">
                  <span className="bg-neoul-cheong text-white px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-xl">Phase 03</span>
                  <h3 className="text-4xl font-black mt-4 text-slate-900 tracking-tighter uppercase italic">Insight</h3>
                </div>
                <div className="w-[320px] h-[640px] bg-white rounded-[4rem] shadow-2xl border border-black/5 overflow-hidden flex flex-col relative transition-transform group-hover:scale-[1.02]">
                   <div className="h-2 bg-neoul-cheong" />
                   <div className="h-44 overflow-hidden relative">
                      <img src="gyeongbokgung.png" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                   </div>
                   <div className="p-8">
                      <div className="flex gap-2 mb-6"><div className="px-3 py-1 bg-neoul-cheong/10 text-neoul-cheong text-[8px] font-black rounded-full border border-neoul-cheong/20 uppercase tracking-widest">heritage</div></div>
                      <h4 className="text-2xl font-black mb-4">Gyeongbokgung</h4>
                      <div className="p-4 bg-neoul-hwang/10 border-l-4 border-neoul-hwang rounded-r-2xl mb-6">
                         <div className="w-20 h-2 bg-neoul-hwang rounded-full mb-2" />
                         <div className="w-full h-1.5 bg-neoul-hwang/20 rounded-full" />
                      </div>
                      <div className="space-y-2"><div className="w-full h-2 bg-slate-100 rounded-full" /><div className="w-full h-2 bg-slate-100 rounded-full" /><div className="w-2/3 h-2 bg-slate-100 rounded-full" /></div>
                   </div>
                   <div className="absolute bottom-8 left-8 right-8"><div className="w-full h-16 bg-neoul-jeok rounded-3xl shadow-xl shadow-neoul-jeok/20" /></div>
                </div>
                <div className="max-w-[240px] text-center">
                   <p className="text-sm font-bold text-slate-500 leading-relaxed">큐레이팅된 <span className="text-neoul-cheong">데이터 아카이브</span>를 통해 문화재의 깊이 있는 역사적 통찰 제공</p>
                </div>
              </div>

              <div className="pt-96 opacity-20"><ArrowRight className="w-20 h-20" /></div>

              {/* Step 04: Immersion */}
              <div className="flex flex-col items-center gap-14 group">
                <div className="text-center">
                  <span className="bg-neoul-jeok text-white px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] shadow-xl">Phase 04</span>
                  <h3 className="text-4xl font-black mt-4 text-slate-900 tracking-tighter uppercase italic">Immersion</h3>
                </div>
                <div className="w-[320px] h-[640px] bg-slate-950 rounded-[4rem] shadow-2xl border border-white/5 overflow-hidden flex flex-col items-center p-12 relative transition-transform group-hover:scale-[1.02]">
                   <div className="w-48 h-48 rounded-full border-4 border-white/20 overflow-hidden mb-12 shadow-2xl rotate-12"><img src="hanok.png" className="w-full h-full object-cover opacity-60" /></div>
                   <div className="text-center mb-10"><div className="w-40 h-6 bg-white rounded-full mb-2 mx-auto" /><div className="w-24 h-3 bg-neoul-mint rounded-full mx-auto" /></div>
                   <div className="w-full h-1 bg-white/10 rounded-full mb-14 overflow-hidden"><div className="w-1/2 h-full bg-neoul-jeok" /></div>
                   <div className="flex items-center gap-8"><div className="w-10 h-10 border-2 border-white/20 rounded-full" /><div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl"><Play className="w-8 h-8 text-slate-900 fill-slate-900" /></div><div className="w-10 h-10 border-2 border-white/20 rounded-full" /></div>
                   <div className="absolute bottom-0 left-0 right-0 h-32 bg-white/5 backdrop-blur-3xl border-t border-white/10 p-8 flex items-center justify-center text-center"><div className="w-48 h-12 bg-white/10 rounded-2xl" /></div>
                </div>
                <div className="max-w-[240px] text-center">
                   <p className="text-sm font-bold text-slate-500 leading-relaxed">AI 도슨트의 보이스와 실시간 자막이 결합된 <br /><span className="text-neoul-jeok">공감각적 오디오</span> 가이드 경험</p>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Footer Status */}
      <footer className="h-12 bg-white border-t border-black/5 flex items-center justify-between px-10 z-50 flex-shrink-0">
        <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500/50" />
            <span className="text-slate-900">SYSTEM: ACTIVE</span>
          </div>
          <span className="text-slate-200">|</span>
          <div className="flex items-center gap-3">
             <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full border-2 border-white bg-neoul-jeok shadow-sm" />
                <div className="w-5 h-5 rounded-full border-2 border-white bg-neoul-cheong shadow-sm" />
                <div className="w-5 h-5 rounded-full border-2 border-white bg-neoul-hwang shadow-sm" />
             </div>
             <span className="text-slate-400">DESIGN SYSTEM: NEOUL_V10_PREMIUM</span>
          </div>
        </div>
        <div className="text-[10px] font-black uppercase text-slate-300 tracking-[0.3em]">
          Powered by Antigravity Studio Lab
        </div>
      </footer>
    </div>
  );
}
