import { useState } from 'react';
import WebVersion from './webapp/WebVersion';
import AppVersion from './app/AppVersion';
import { Monitor, Smartphone, Layout, Layers, Sparkles } from 'lucide-react';

type ViewMode = 'web' | 'app' | 'flow';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('app');
  const [designMode, setDesignMode] = useState<'wireframe' | 'hifi'>('hifi');

  return (
    <div className="w-full h-screen bg-[#F0F2F5] flex flex-col font-sans overflow-hidden">
      {/* Integrated Header */}
      <header className="h-16 bg-neoul-heuk text-white flex items-center justify-between px-6 z-50 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="bg-neoul-mint p-1.5 rounded-lg shadow-lg shadow-neoul-mint/20">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold uppercase tracking-tight text-lg">NEOUL STUDIO</h1>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setViewMode('web')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold transition-all ${viewMode === 'web' ? 'bg-white text-neoul-heuk shadow-lg' : 'text-white/60 hover:text-white'}`}
          >
            <Monitor className="w-4 h-4" />
            WEB
          </button>
          <button 
            onClick={() => setViewMode('app')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold transition-all ${viewMode === 'app' ? 'bg-white text-neoul-heuk shadow-lg' : 'text-white/60 hover:text-white'}`}
          >
            <Smartphone className="w-4 h-4" />
            MOBILE
          </button>
          <button 
            onClick={() => setViewMode('flow')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold transition-all ${viewMode === 'flow' ? 'bg-neoul-mint text-white shadow-lg shadow-neoul-mint/20' : 'text-white/60 hover:text-white'}`}
          >
            <Layers className="w-4 h-4" />
            FLOW
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
             <button 
               onClick={() => setDesignMode('wireframe')}
               className={`px-3 py-1.5 rounded-full text-[9px] font-bold transition-all ${designMode === 'wireframe' ? 'bg-white/20 text-white' : 'text-white/40'}`}
             >
               WIREFRAME
             </button>
             <button 
               onClick={() => setDesignMode('hifi')}
               className={`px-3 py-1.5 rounded-full text-[9px] font-bold transition-all flex items-center gap-1.5 ${designMode === 'hifi' ? 'bg-neoul-jeok text-white shadow-lg shadow-neoul-jeok/40' : 'text-white/40'}`}
             >
               <Sparkles className="w-3 h-3" />
               HI-FI UI
             </button>
          </div>
          <button className="bg-neoul-mint text-white px-6 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-all uppercase shadow-lg shadow-neoul-mint/20">
            Publish
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center">
        {viewMode === 'web' && (
          <div className="w-full h-full p-10 flex flex-col items-center">
            <div className="w-full h-full max-w-6xl bg-white rounded-[2rem] shadow-2xl shadow-black/10 flex flex-col overflow-hidden relative border border-black/5">
              <div className="h-12 border-b border-black/5 flex items-center px-6 gap-2 bg-neoul-gray flex-shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <div className="w-3 h-3 bg-amber-400 rounded-full" />
                  <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                </div>
                <div className="ml-6 bg-white/80 backdrop-blur rounded-lg border border-black/5 px-4 py-1 text-[11px] font-medium text-neoul-heuk/40 w-80 truncate">
                   https://neoul.ai/preview/web
                </div>
              </div>
              <div className="flex-1 overflow-hidden relative">
                <WebVersion isHifi={designMode === 'hifi'} />
              </div>
            </div>
          </div>
        )}

        {viewMode === 'app' && (
          <div className="p-10 flex flex-col items-center">
            <div className="w-[380px] h-[780px] bg-neoul-heuk rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative p-3 border-[6px] border-white/10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-neoul-heuk rounded-b-3xl z-[60]" />
              <div className="w-full h-full bg-white rounded-[3rem] relative overflow-hidden shadow-inner">
                <AppVersion isHifi={designMode === 'hifi'} />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full" />
            </div>
          </div>
        )}

        {viewMode === 'flow' && (
          <div className="w-full h-full overflow-auto bg-[#E5E5E5] p-20 custom-scrollbar">
            {/* Flow view implementation... keeping original but updating colors */}
            <div className="inline-flex items-start gap-32 min-w-max pr-40">
              {/* Simplified Flow for brevity in this edit */}
              <div className="flex flex-col items-center gap-10">
                 <div className="text-center">
                   <span className="bg-neoul-jeok text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-neoul-jeok/20">User Journey Flow</span>
                   <h3 className="text-3xl font-bold mt-4 text-neoul-heuk tracking-tighter">너울: AI 도슨트 서비스 경험 설계</h3>
                 </div>
                 <div className="mt-10 flex gap-20">
                    <div className="p-4 bg-white rounded-[2rem] shadow-xl border border-black/5">
                       <p className="text-xs font-bold text-neoul-heuk/40 mb-4 uppercase">01. Onboarding</p>
                       <div className="w-60 h-96 bg-neoul-gray rounded-2xl animate-pulse" />
                    </div>
                    <div className="p-4 bg-white rounded-[2rem] shadow-xl border border-black/5 scale-110 -rotate-2">
                       <p className="text-xs font-bold text-neoul-mint mb-4 uppercase">02. Exploration</p>
                       <div className="w-60 h-96 bg-neoul-mint/10 rounded-2xl" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Status */}
      <footer className="h-10 bg-white border-t border-black/5 flex items-center justify-between px-8 z-50 flex-shrink-0">
        <div className="flex items-center gap-6 text-[10px] font-bold text-neoul-heuk/40 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>Design Status: {designMode.toUpperCase()}</span>
          </div>
          <span className="text-black/5">|</span>
          <span>Engine: Antigravity Render v4.0</span>
        </div>
        <div className="text-[10px] font-bold text-neoul-heuk/20 uppercase tracking-[0.2em]">
          Premium AI Experience Lab
        </div>
      </footer>
    </div>
  );
}
