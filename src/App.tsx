import { useState } from 'react';
import WebVersion from './webapp/WebVersion';
import AppVersion from './app/AppVersion';
import { Monitor, Smartphone, Layout, Info, ArrowRight, MousePointer2, Layers, MapPin } from 'lucide-react';

type ViewMode = 'web' | 'app' | 'flow';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('web');

  return (
    <div className="w-full h-screen bg-[#F0F2F5] flex flex-col font-sans overflow-hidden">
      {/* 1. WeWeb Style Integrated Header */}
      <header className="h-16 bg-black text-white flex items-center justify-between px-6 z-50 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="bg-neoul-mint p-1">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-black uppercase tracking-tighter text-lg">NEOUL_DOCENT_PROTOTYPE</h1>
        </div>

        <div className="flex bg-white/10 p-1 border border-white/20">
          <button 
            onClick={() => setViewMode('web')}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black transition-all ${viewMode === 'web' ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`}
          >
            <Monitor className="w-4 h-4" />
            WEB VERSION
          </button>
          <button 
            onClick={() => setViewMode('app')}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black transition-all ${viewMode === 'app' ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`}
          >
            <Smartphone className="w-4 h-4" />
            NATIVE APP
          </button>
          <button 
            onClick={() => setViewMode('flow')}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black transition-all ${viewMode === 'flow' ? 'bg-neoul-mint text-white' : 'text-white hover:bg-white/10'}`}
          >
            <Layers className="w-4 h-4" />
            UI/UX FLOW
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-[10px] font-black text-white/40 uppercase text-right leading-none">
            Final Wireframe<br />v6.5 Flow Mode
          </div>
          <button className="bg-neoul-mint text-white px-4 py-2 text-xs font-black hover:opacity-90 transition-opacity uppercase">
            Share Link
          </button>
        </div>
      </header>

      {/* 2. Main Workspace */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center">
        {viewMode === 'web' && (
          <div className="w-full h-full max-w-6xl p-10 flex flex-col">
            <div className="w-full h-full bg-white border-8 border-black shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden relative">
              <div className="h-10 border-b-4 border-black flex items-center px-4 gap-2 bg-gray-100 flex-shrink-0">
                <div className="w-3 h-3 bg-black rounded-full" />
                <div className="w-3 h-3 bg-black/40 rounded-full" />
                <div className="w-3 h-3 bg-black/10 rounded-full" />
                <div className="ml-4 bg-white border-2 border-black px-4 py-0.5 text-[10px] font-black w-64 truncate">https://neoul.ai/web</div>
              </div>
              <div className="flex-1 overflow-hidden relative">
                <WebVersion />
              </div>
            </div>
          </div>
        )}

        {viewMode === 'app' && (
          <div className="p-10">
            <div className="w-[420px] h-[840px] bg-black border-[12px] border-black rounded-[4rem] shadow-[32px_32px_0px_0px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-[60]" />
              <div className="flex-1 bg-white relative overflow-hidden">
                <AppVersion />
              </div>
              <div className="h-8 bg-white flex items-center justify-center pb-2">
                <div className="w-32 h-1 bg-black rounded-full" />
              </div>
            </div>
          </div>
        )}

        {viewMode === 'flow' && (
          <div className="w-full h-full overflow-auto bg-[#E5E5E5] p-20 cursor-grab active:cursor-grabbing custom-scrollbar">
            <div className="inline-flex items-start gap-32 min-w-max pr-40">
              
              {/* Step 1: Splash */}
              <div className="flex flex-col items-center gap-10">
                <div className="text-center">
                  <span className="bg-black text-white px-4 py-1 text-xs font-black uppercase tracking-widest">Step 01</span>
                  <h3 className="text-2xl font-black mt-2 text-black">ONBOARDING</h3>
                </div>
                <div className="w-[280px] h-[560px] bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col items-center justify-center relative">
                   <div className="flex gap-2 mb-4">
                     <div className="w-2 h-10 bg-neoul-mint" />
                     <div className="w-2 h-10 bg-neoul-orange" />
                     <div className="w-2 h-10 bg-black" />
                   </div>
                   <h1 className="text-3xl font-black text-black">NEOUL</h1>
                   <p className="text-[8px] font-black mt-2 opacity-20">WF_PROTOTYPE</p>
                </div>
              </div>

              <div className="pt-80">
                <ArrowRight className="w-16 h-16 text-black/20" />
              </div>

              {/* Step 2: Main Map */}
              <div className="flex flex-col items-center gap-10">
                <div className="text-center">
                  <span className="bg-neoul-mint text-white px-4 py-1 text-xs font-black uppercase tracking-widest">Step 02</span>
                  <h3 className="text-2xl font-black mt-2 text-black">MAIN EXPLORER</h3>
                </div>
                <div className="w-[280px] h-[560px] bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(45,212,191,1)] overflow-hidden relative">
                   <div className="h-8 bg-neoul-mint flex items-center justify-center text-[6px] text-white font-black uppercase gap-4">
                      <span>HOME</span><span>POP SHOP</span><span>BROWSE</span>
                   </div>
                   <div className="h-6 bg-neoul-orange flex items-center justify-center text-[5px] text-white font-black uppercase">적립금 팝콘이 생겼어요!</div>
                   <div className="flex-1 p-4 bg-[#F9F7F2]">
                      <img src="/map-bg.png" className="w-full" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                         <div className="bg-white border-2 border-neoul-mint p-1 shadow-md flex flex-col items-center">
                            <MapPin className="w-3 h-3 text-neoul-mint" />
                            <span className="text-[5px] font-black">SEOUL</span>
                         </div>
                      </div>
                   </div>
                   <div className="absolute bottom-10 left-4 right-4 bg-white border-2 border-black p-2 flex items-center gap-2">
                      <div className="w-6 h-6 border border-black flex items-center justify-center text-[8px] font-black opacity-20">X</div>
                      <div className="flex-1"><div className="w-full h-1 bg-black mb-1" /><div className="w-1/2 h-0.5 bg-black/20" /></div>
                   </div>
                   <div className="absolute bottom-0 h-8 border-t-2 border-black w-full" />
                   <MousePointer2 className="absolute bottom-12 right-12 w-8 h-8 text-black fill-black" />
                </div>
                <p className="max-w-[200px] text-[10px] font-bold text-black/60 uppercase leading-relaxed text-center">
                  사용자가 지도상의 핀을 클릭하여 <br />문화재 정보를 탐색합니다.
                </p>
              </div>

              <div className="pt-80">
                <ArrowRight className="w-16 h-16 text-black/20" />
              </div>

              {/* Step 3: Detail Sheet */}
              <div className="flex flex-col items-center gap-10">
                <div className="text-center">
                  <span className="bg-black text-white px-4 py-1 text-xs font-black uppercase tracking-widest">Step 03</span>
                  <h3 className="text-2xl font-black mt-2 text-black">DETAIL ARCHIVE</h3>
                </div>
                <div className="w-[280px] h-[560px] bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden relative">
                   <div className="h-10 bg-neoul-mint border-b-2 border-black" />
                   <div className="h-32 bg-gray-100 border-b-2 border-black flex items-center justify-center text-xl font-black opacity-10">[ X ]</div>
                   <div className="p-4">
                      <div className="w-32 h-4 bg-black mb-4" />
                      <div className="w-full h-1 bg-black/10 mb-2" /><div className="w-full h-1 bg-black/10 mb-2" /><div className="w-3/4 h-1 bg-black/10" />
                   </div>
                   <div className="absolute bottom-0 p-4 w-full">
                      <div className="w-full h-12 bg-black flex items-center justify-center text-[10px] text-white font-black uppercase">▶ START DOCENT</div>
                   </div>
                   <MousePointer2 className="absolute bottom-8 right-8 w-8 h-8 text-black fill-black" />
                </div>
              </div>

              <div className="pt-80">
                <ArrowRight className="w-16 h-16 text-black/20" />
              </div>

              {/* Step 4: Player */}
              <div className="flex flex-col items-center gap-10">
                <div className="text-center">
                  <span className="bg-neoul-orange text-white px-4 py-1 text-xs font-black uppercase tracking-widest">Step 04</span>
                  <h3 className="text-2xl font-black mt-2 text-black">AUDIO IMMERSION</h3>
                </div>
                <div className="w-[280px] h-[560px] bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(251,146,60,1)] overflow-hidden relative flex flex-col items-center p-8">
                   <div className="w-full h-8 border-b-2 border-black mb-10 flex justify-between px-2"><div className="w-4 h-4 border border-black" /><div className="w-4 h-4 border border-black" /></div>
                   <div className="w-40 h-40 border-4 border-black shadow-[10px_10px_0px_0px_rgba(45,212,191,1)] mb-10" />
                   <div className="w-32 h-4 bg-black mb-2" /><div className="w-20 h-2 bg-neoul-mint mb-10" />
                   <div className="w-full h-1 bg-black/20 mb-10" />
                   <div className="w-16 h-16 bg-neoul-mint border-4 border-black" />
                   <div className="absolute bottom-0 left-0 right-0 h-20 bg-black" />
                </div>
                <p className="max-w-[200px] text-[10px] font-bold text-black/60 uppercase leading-relaxed text-center">
                  AI 도슨트 음성 해설과 실시간 <br />다국어 자막 서비스를 제공합니다.
                </p>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* 3. Status Bar */}
      <footer className="h-10 bg-white border-t-4 border-black flex items-center justify-between px-6 z-50 flex-shrink-0">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase">
          <Info className="w-4 h-4" />
          <span>NEOUL_SYSTEM_STATUS: OK</span>
          <span className="text-black/20">|</span>
          <span>DATEPOP_STYLE_THEME: APPLIED</span>
        </div>
        <div className="text-[10px] font-black uppercase text-black/40">
          PROTOTYPE GENERATED BY ANTIGRAVITY AI
        </div>
      </footer>
    </div>
  );
}
