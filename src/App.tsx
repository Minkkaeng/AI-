import { useState } from 'react';
import WebVersion from './webapp/WebVersion';
import AppVersion from './app/AppVersion';
import { Monitor, Smartphone, LayoutList, CheckCircle2, ChevronRight, FileText, Database, MousePointer2 } from 'lucide-react';

type PlatformMode = 'app' | 'web' | 'flow';

const SPEC_DATA = {
  app: {
    title: '1.0 모바일 앱 (Mobile App)',
    description: '모바일 환경에 최적화된 Neoul의 핵심 UX 화면입니다. DatePop 스타일의 탐색 피드와 직관적인 지도 인터랙션을 제공합니다.',
    features: [
      { name: '스플래시 화면', desc: '앱 초기 진입 시 브랜드 정체성을 보여주는 로딩 애니메이션' },
      { name: '홈 (지역 탐색)', desc: '검색바와 추천 지역(서울, 경주 등)이 그리드 형태로 노출되는 메인 진입점' },
      { name: '지역 피드 (스플릿)', desc: '상단은 지도, 하단은 바텀 시트 형태의 스크롤 피드로 코스와 스팟을 분리 제공' },
      { name: '장소 디테일', desc: '전체 화면 모달 뷰로, 갤러리/편의시설/역사 정보를 스크롤하여 확인 가능' },
      { name: 'AI 도슨트 플레이어', desc: '프리미엄 음악 플레이어 스타일의 오디오 가이드 제어 화면' }
    ],
    data: ['사용자 위치 (GPS)', '지역(Region) 메타데이터', '장소(Place) 상세 정보 및 갤러리', '도슨트 오디오 스크립트']
  },
  web: {
    title: '2.0 데스크탑 웹 (Desktop Web)',
    description: 'PC 환경에서 다량의 정보를 효과적으로 탐색할 수 있는 에어비앤비 스타일의 와이드 레이아웃 화면입니다.',
    features: [
      { name: '히어로 & 메인 검색', desc: '풀스크린 배경 영상/이미지와 다중 필터(위치, 일정, 테마) 검색바 결합' },
      { name: '스플릿 뷰 (60:40)', desc: '좌측에는 가로/세로 스크롤이 혼합된 풍부한 피드, 우측에는 반응형 고정 지도 맵핑' },
      { name: '대화면 디테일 모달', desc: '이미지 고정형(Sticky) 레이아웃으로, 좌측에 고해상도 이미지를 고정하고 우측에 정보 스크롤 제공' },
      { name: '플로팅 액션', desc: '지도 컨트롤러 및 도슨트 시작 버튼을 플로팅으로 띄워 접근성 강화' }
    ],
    data: ['다중 조건 검색 쿼리', '마커 좌표 데이터', '고해상도 이미지 에셋']
  },
  flow: {
    title: '3.0 UX 플로우 (User Flow)',
    description: '서비스의 핵심 가치가 사용자에게 전달되는 전체적인 단계와 브랜드 여정을 도식화한 화면입니다.',
    features: [
      { name: 'Phase 1: Identity', desc: '한국 전통 오방색을 기반으로 한 미니멀리즘 브랜드 경험' },
      { name: 'Phase 2: Discovery', desc: '지리적 위치와 테마를 기반으로 한 탐색 여정' },
      { name: 'Phase 3: Insight', desc: '장소에 담긴 역사적 맥락과 큐레이팅된 인사이트 제공' },
      { name: 'Phase 4: Immersion', desc: 'AI 스마트 도슨트를 통한 시/청각적 몰입 경험 완성' }
    ],
    data: ['브랜드 컬러 팔레트', '페르소나 여정 맵 (Journey Map)']
  }
};

export default function App() {
  const [platform, setPlatform] = useState<PlatformMode>('app');

  return (
    <div className="w-full h-screen flex flex-col font-sans bg-[#F8FAFC] overflow-hidden text-slate-800">
      
      {/* 설계서 Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 p-2 rounded-lg">
            <LayoutList className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tight">NEOUL 화면 설계서 <span className="text-slate-400 text-sm font-bold ml-2">v1.0 (최종)</span></h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button onClick={() => setPlatform('app')} className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-black transition-all ${platform === 'app' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900'}`}><Smartphone className="w-4 h-4" /> App</button>
            <button onClick={() => setPlatform('web')} className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-black transition-all ${platform === 'web' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900'}`}><Monitor className="w-4 h-4" /> Web</button>
          </div>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-lg text-xs font-black hover:bg-slate-800 transition-colors">문서 내보내기 (PDF)</button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: IA (Information Architecture) */}
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col overflow-y-auto z-20 shadow-[10px_0_20px_rgba(0,0,0,0.02)]">
          <div className="p-6">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Document Index</h2>
            
            <nav className="space-y-6">
              <div>
                <button onClick={() => setPlatform('app')} className={`w-full flex items-center justify-between text-sm font-black mb-3 transition-colors ${platform === 'app' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}>
                  1.0 모바일 앱 (App) {platform === 'app' && <ChevronRight className="w-4 h-4" />}
                </button>
                <ul className="space-y-2 border-l-2 border-slate-100 ml-2 pl-4">
                  <li className={`text-xs font-bold ${platform === 'app' ? 'text-slate-600' : 'text-slate-400'}`}>1.1 로딩/스플래시</li>
                  <li className={`text-xs font-bold ${platform === 'app' ? 'text-slate-600' : 'text-slate-400'}`}>1.2 홈/지역 탐색</li>
                  <li className={`text-xs font-bold ${platform === 'app' ? 'text-slate-600' : 'text-slate-400'}`}>1.3 지역 상세 피드</li>
                  <li className={`text-xs font-bold ${platform === 'app' ? 'text-slate-600' : 'text-slate-400'}`}>1.4 장소 정보 모달</li>
                  <li className={`text-xs font-bold ${platform === 'app' ? 'text-slate-600' : 'text-slate-400'}`}>1.5 오디오 가이드 뷰</li>
                </ul>
              </div>

              <div>
                <button onClick={() => setPlatform('web')} className={`w-full flex items-center justify-between text-sm font-black mb-3 transition-colors ${platform === 'web' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}>
                  2.0 데스크탑 (Web) {platform === 'web' && <ChevronRight className="w-4 h-4" />}
                </button>
                <ul className="space-y-2 border-l-2 border-slate-100 ml-2 pl-4">
                  <li className={`text-xs font-bold ${platform === 'web' ? 'text-slate-600' : 'text-slate-400'}`}>2.1 히어로 검색</li>
                  <li className={`text-xs font-bold ${platform === 'web' ? 'text-slate-600' : 'text-slate-400'}`}>2.2 스플릿 지도 뷰</li>
                  <li className={`text-xs font-bold ${platform === 'web' ? 'text-slate-600' : 'text-slate-400'}`}>2.3 분할 상세 모달</li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        {/* Center: Interactive Prototype Viewer */}
        <div className="flex-1 bg-slate-100 relative overflow-hidden flex items-center justify-center p-8">
           {/* Background Grid Pattern for "Blueprint" feel */}
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
           
           <div className="relative z-10 w-full h-full flex items-center justify-center">
             {platform === 'app' && (
               <div className="w-[400px] h-[800px] bg-slate-900 rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative p-3 border-[6px] border-slate-800 shrink-0">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-3xl z-[60]" />
                 <div className="w-full h-full bg-white rounded-[2.5rem] relative overflow-hidden shadow-inner isolate">
                   <AppVersion />
                 </div>
                 <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/20 rounded-full" />
               </div>
             )}

             {platform === 'web' && (
               <div className="w-full h-full max-w-[1400px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 isolate">
                 <div className="h-10 border-b border-slate-200 flex items-center px-4 gap-2 bg-slate-50 flex-shrink-0">
                   <div className="flex gap-1.5"><div className="w-3 h-3 bg-red-400 rounded-full" /><div className="w-3 h-3 bg-amber-400 rounded-full" /><div className="w-3 h-3 bg-green-400 rounded-full" /></div>
                   <div className="ml-4 bg-white rounded-md border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-400 w-64 text-center shadow-sm">neoul.ai/web-app</div>
                 </div>
                 <div className="flex-1 relative overflow-hidden bg-white">
                   <WebVersion />
                 </div>
               </div>
             )}
           </div>
        </div>

        {/* Right Sidebar: Screen Specification Data */}
        <div className="w-96 bg-white border-l border-slate-200 flex flex-col overflow-y-auto z-20">
          <div className="p-8">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Screen Specification</h2>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{SPEC_DATA[platform].title}</h3>
            <p className="text-sm font-medium text-slate-600 leading-relaxed mb-10 pb-8 border-b border-slate-100">
              {SPEC_DATA[platform].description}
            </p>

            <div className="mb-10">
              <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 mb-6 uppercase tracking-wide"><FileText className="w-4 h-4 text-blue-500" /> 핵심 기능 정의 (Features)</h4>
              <ul className="space-y-6">
                {SPEC_DATA[platform].features.map((feat, i) => (
                  <li key={i}>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-sm font-black text-slate-800 mb-1">{feat.name}</span>
                        <span className="block text-xs font-medium text-slate-500 leading-relaxed">{feat.desc}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-10">
              <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 mb-4 uppercase tracking-wide"><Database className="w-4 h-4 text-orange-500" /> 연동 필요 데이터 (Data Schema)</h4>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
                {SPEC_DATA[platform].data.map((d, i) => (
                  <div key={i} className="text-xs font-bold text-slate-600 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" /> {d}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-sm font-black text-slate-900 mb-4 uppercase tracking-wide"><MousePointer2 className="w-4 h-4 text-purple-500" /> 화면 인터랙션 노트</h4>
              <div className="bg-purple-50/50 rounded-xl p-5 border border-purple-100 text-xs font-medium text-purple-900 leading-relaxed">
                현재 렌더링된 화면은 인터랙티브 프로토타입입니다. 중앙의 뷰어 화면에서 <strong>클릭, 스크롤, 호버</strong> 등의 동작을 직접 수행하여 실제 사용자 경험(UX) 플로우를 확인할 수 있습니다.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
