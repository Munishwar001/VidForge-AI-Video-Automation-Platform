import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Premium Logo Icon (blue gradient circle with star/sparkle)
const LogoIcon = () => (
  <div className="w-10 h-10 rounded-full bg-[#1A3BF5] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(26,59,245,0.15)] shrink-0">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83" strokeLinecap="round" />
    </svg>
  </div>
);

// Check Icon for Pricing list
const CheckIcon = () => (
  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// Feature Icons matching the screenshots
const PromptToVideoIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#1A3BF5] shrink-0">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  </div>
);

const ScriptWriterIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  </div>
);

const VoiceGeneratorIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  </div>
);

const SubtitleGeneratorIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    </svg>
  </div>
);

const MusicIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  </div>
);

const BRollIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
  </div>
);

const SceneIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9V9z" />
    </svg>
  </div>
);

const EditingIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
    </svg>
  </div>
);

const ExportIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  </div>
);

const ShortsIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  </div>
);

const ReelsIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center shrink-0">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  </div>
);

export default function Landing() {
  const [mockupStep, setMockupStep] = useState(0);
  const [mockupPromptText, setMockupPromptText] = useState("");
  const [mockupProgress, setMockupProgress] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const fullPrompt = "Create a cinematic space documentary about Mars colonization...";

  useEffect(() => {
    let timer: any;
    
    const runSimulation = () => {
      if (mockupStep === 0) {
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex < fullPrompt.length) {
            setMockupPromptText(fullPrompt.slice(0, charIndex + 1));
            charIndex++;
          } else {
            clearInterval(typeInterval);
            timer = setTimeout(() => setMockupStep(1), 1500);
          }
        }, 40);
        return () => clearInterval(typeInterval);
      }
      
      if (mockupStep === 1) {
        timer = setTimeout(() => setMockupStep(2), 2500);
      }

      if (mockupStep === 2) {
        timer = setTimeout(() => setMockupStep(3), 3000);
      }

      if (mockupStep === 3) {
        let currentProg = 0;
        const progressInterval = setInterval(() => {
          if (currentProg < 100) {
            currentProg += 5;
            setMockupProgress(Math.min(currentProg, 100));
          } else {
            clearInterval(progressInterval);
            timer = setTimeout(() => {
              setMockupStep(0);
              setMockupPromptText("");
              setMockupProgress(0);
            }, 3000);
          }
        }, 100);
        return () => clearInterval(progressInterval);
      }
    };

    const cleanup = runSimulation();
    return () => {
      if (cleanup) cleanup();
      clearTimeout(timer);
    };
  }, [mockupStep]);

  return (
    <div className="relative min-h-screen bg-white text-neutral-800 font-sans selection:bg-[#1A3BF5]/20 selection:text-[#1A3BF5]">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-grid-faint pointer-events-none opacity-40 z-0" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoIcon />
            <div className="flex flex-col text-left">
              <span className="text-lg font-bold text-neutral-900 tracking-tight leading-none">VidForge AI</span>
              <span className="text-[10px] text-neutral-400 font-semibold tracking-wide uppercase mt-1">AI video automation platform</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-semibold text-neutral-600 hover:text-neutral-950 transition-colors">
              Sign In
            </Link>
            <Link to="/register" className="bg-black hover:bg-neutral-900 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="relative pt-12 pb-24 md:pt-16 md:pb-32 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Main Card Wrapper */}
          <div className="rounded-[2.5rem] border border-neutral-200/80 bg-gradient-to-b from-white via-white to-neutral-50/50 p-8 md:p-16 shadow-xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-faint pointer-events-none opacity-20" />
            
            {/* Soft Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#1A3BF5]/5 blur-[120px] pointer-events-none" />

            {/* Badge */}
            <div className="relative inline-flex items-center gap-2 border border-neutral-200/80 bg-white/95 px-4.5 py-1.5 rounded-full text-xs font-bold text-neutral-800 shadow-sm mb-8 z-10">
              <span className="text-[#1A3BF5] font-bold">⚡</span> Premium AI video automation for modern teams
            </div>

            {/* Title */}
            <h1 className="relative text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 leading-tight max-w-4xl mx-auto font-heading z-10">
              Create Cinematic AI Videos <br />From Just One Prompt.
            </h1>

            {/* Subtext */}
            <p className="relative text-lg text-neutral-500 font-medium max-w-2xl mx-auto mt-6 leading-relaxed z-10">
              Generate complete professional videos with AI. Scripts, Voiceovers, AI Avatars, Captions, Editing, Music and Export — all automated in one workflow.
            </p>

            {/* CTA Buttons */}
            <div className="relative flex flex-wrap justify-center items-center gap-4 mt-10 z-10">
              <Link to="/register">
                <button className="flex items-center gap-2 bg-neutral-950 text-white hover:bg-black rounded-full px-8 py-4 font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 fill-current text-white ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  Start Creating Free
                </button>
              </Link>
              <button className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-full px-8 py-4 font-bold transition-all duration-300 hover:-translate-y-0.5 border border-neutral-200/40">
                <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Watch Demo
              </button>
            </div>

            {/* Trusted by Sub-banner */}
            <div className="relative w-full max-w-4xl mx-auto border border-neutral-200/80 rounded-2xl bg-white/70 backdrop-blur-sm p-4 mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-left shadow-sm z-10">
              <span className="text-xs uppercase font-extrabold text-neutral-400 tracking-widest pl-2">Trusted by creators and teams</span>
              <div className="flex flex-wrap gap-2">
                {["Creators", "Marketers", "Agencies", "Businesses"].map((tag) => (
                  <span key={tag} className="border border-neutral-200/80 bg-neutral-50 px-4 py-1.5 rounded-full text-xs font-bold text-neutral-700 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Elegant Mockup Container */}
            <div className="relative mt-16 max-w-4xl mx-auto rounded-3xl border border-neutral-200 bg-white p-2 shadow-2xl overflow-hidden">
              <div className="relative aspect-video rounded-2xl bg-gradient-to-tr from-neutral-50 via-white to-neutral-100/50 overflow-hidden border border-neutral-200 flex flex-col justify-between p-6">
                
                {/* Colored Glowing Dots */}
                <div className="absolute top-24 left-1/4 w-3 h-3 rounded-full bg-[#00D4FF] shadow-[0_0_12px_#00D4FF]" />
                <div className="absolute bottom-24 left-1/3 w-3 h-3 rounded-full bg-[#1A3BF5] shadow-[0_0_12px_#1A3BF5]" />
                <div className="absolute top-44 right-1/4 w-3.5 h-3.5 rounded-full bg-[#9b51e0] shadow-[0_0_12px_#9b51e0]" />

                {/* Floating Glass Container */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-[300px] h-[400px] max-h-full rounded-2xl border border-white/60 bg-white/30 backdrop-blur-xl shadow-2xl flex flex-col justify-between p-6 text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4FF]/10 rounded-full blur-xl pointer-events-none" />
                    
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-white/80 shadow-md flex items-center justify-center text-xl">
                        ✦
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-black/5 rounded-full w-2/3" />
                        <div className="h-3 bg-black/5 rounded-full w-5/6" />
                        <div className="h-3 bg-black/5 rounded-full w-1/2" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-white/70 border border-white/50 shadow-sm text-xs font-semibold text-neutral-800">
                        {mockupStep === 0 && <span className="animate-pulse">Typing prompt...</span>}
                        {mockupStep > 0 && mockupPromptText}
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        <span>Pipeline Status</span>
                        <span>{mockupStep === 3 ? `${mockupProgress}%` : mockupStep > 0 ? "Compiling..." : "Idle"}</span>
                      </div>
                      
                      <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                        <div className="bg-[#1A3BF5] h-full transition-all duration-300" style={{ width: mockupStep === 3 ? `${mockupProgress}%` : mockupStep > 0 ? "50%" : "0%" }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* FEATURES SECTION */}
          <div className="mt-32 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 text-left shadow-sm hover:shadow-md transition-all duration-200">
                <PromptToVideoIcon />
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">Prompt to Video</h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                  Turn a simple prompt into a polished, ready-to-publish video in minutes.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 text-left shadow-sm hover:shadow-md transition-all duration-200">
                <ScriptWriterIcon />
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">AI Script Writer</h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                  Generate compelling scripts with hooks, pacing, and conversion-focused structure.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 text-left shadow-sm hover:shadow-md transition-all duration-200">
                <VoiceGeneratorIcon />
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">AI Voice Generator</h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                  Create natural voiceovers with premium tones, pacing, and multilingual support.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 text-left shadow-sm hover:shadow-md transition-all duration-200">
                <SubtitleGeneratorIcon />
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">Auto Subtitle Generator</h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                  Auto-sync captions with stylish typography and dynamic emphasis.
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 text-left shadow-sm hover:shadow-md transition-all duration-200">
                <MusicIcon />
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">Background Music AI</h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                  Add cinematic soundtracks that adapt to scene energy and pacing.
                </p>
              </div>

              {/* Card 6 */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 text-left shadow-sm hover:shadow-md transition-all duration-200">
                <BRollIcon />
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">B-Roll Generator</h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                  Generate supporting visuals that match your narrative and brand style.
                </p>
              </div>

              {/* Card 7 */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 text-left shadow-sm hover:shadow-md transition-all duration-200">
                <SceneIcon />
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">Smart Scene Detection</h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                  Detect scene changes and structure your video with intelligent pacing.
                </p>
              </div>

              {/* Card 8 */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 text-left shadow-sm hover:shadow-md transition-all duration-200">
                <EditingIcon />
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">Auto Editing</h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                  Automatically trim, align, and polish every frame for a premium finish.
                </p>
              </div>

              {/* Card 9 */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 text-left shadow-sm hover:shadow-md transition-all duration-200">
                <ExportIcon />
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">4K Export</h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                  Export crisp, high-resolution videos optimized for every platform.
                </p>
              </div>

              {/* Card 10 */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 text-left shadow-sm hover:shadow-md transition-all duration-200">
                <ShortsIcon />
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">YouTube Shorts</h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                  Create vertical short-form content with fast, engaging pacing.
                </p>
              </div>

              {/* Card 11 */}
              <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 text-left shadow-sm hover:shadow-md transition-all duration-200">
                <ReelsIcon />
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">Instagram Reels</h3>
                <p className="text-sm text-neutral-500 font-medium leading-relaxed">
                  Design polished reels with captions, motion, and brand-safe visuals.
                </p>
              </div>

            </div>
          </div>

          {/* WORKFLOW SECTION */}
          <div className="mt-32 max-w-4xl mx-auto">
            <span className="text-xs uppercase font-extrabold text-neutral-400 tracking-widest block text-center mb-3">Workflow</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 text-center tracking-tight mb-10 font-heading">
              A seamless production pipeline from prompt to publish.
            </h2>

            <div className="rounded-[2rem] border border-neutral-200/80 bg-white p-6 md:p-8 shadow-lg">
              <div className="divide-y divide-neutral-100">
                {[
                  { name: "Prompt", desc: "Start with a single sentence description of your concept" },
                  { name: "AI writes script", desc: "High-engagement script generated in seconds" },
                  { name: "Voice Generation", desc: "Select from dozens of hyper-realistic voices" },
                  { name: "Scene Creation", desc: "Relevant stock and AI generated clips matched to script beats" },
                  { name: "Video Rendering", desc: "Automatic editing, pacing, music, and subtitles overlay" },
                  { name: "Export", desc: "Download ready-to-share MP4 assets instantly" }
                ].map((step, sIdx) => (
                  <div key={step.name} className="py-5 flex flex-col md:flex-row md:items-center justify-between text-left first:pt-0 last:pb-0 gap-2">
                    <span className="text-lg font-bold text-neutral-900 flex items-center gap-4">
                      <span className="text-xs text-neutral-300 font-mono font-bold">0{sIdx + 1}</span>
                      {step.name}
                    </span>
                    <span className="text-sm text-neutral-500 font-medium">{step.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PRICING SECTION */}
          <div className="mt-32 max-w-6xl mx-auto">
            <span className="text-xs uppercase font-extrabold text-neutral-400 tracking-widest block text-center mb-3">Pricing Plans</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 text-center tracking-tight mb-16 font-heading">
              Choose the perfect plan for your scale.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {/* Starter Plan */}
              <div className="bg-white border border-neutral-200/80 rounded-[2rem] p-8 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-all duration-300">
                <div>
                  <span className="text-xs uppercase font-extrabold text-neutral-400 tracking-widest">Starter</span>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-neutral-900 font-heading">$29</span>
                    <span className="text-sm font-semibold text-neutral-400">/mo</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2 font-medium">Perfect for starting content creation and faceless channel automation setups.</p>
                  
                  <ul className="mt-8 space-y-3 text-xs font-semibold text-neutral-700">
                    <li className="flex items-center gap-2"><CheckIcon /> 30 minutes of video export / mo</li>
                    <li className="flex items-center gap-2"><CheckIcon /> 1080p HD Export Option</li>
                    <li className="flex items-center gap-2"><CheckIcon /> 20+ Premium voices & languages</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Auto captions generator</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Link to="/register" className="block text-center w-full py-3.5 bg-neutral-100 hover:bg-neutral-200 rounded-xl text-xs font-extrabold text-neutral-800 transition-all shadow-sm">
                    Start Free Trial
                  </Link>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="bg-white border-2 border-[#1A3BF5] rounded-[2rem] p-8 shadow-md flex flex-col justify-between relative hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#1A3BF5] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </div>
                <div>
                  <span className="text-xs uppercase font-extrabold text-[#1A3BF5] tracking-widest">Pro</span>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-neutral-900 font-heading">$79</span>
                    <span className="text-sm font-semibold text-neutral-400">/mo</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2 font-medium">Best for professional content marketers, channels, and social growth agency setups.</p>
                  
                  <ul className="mt-8 space-y-3 text-xs font-semibold text-neutral-700">
                    <li className="flex items-center gap-2"><CheckIcon /> 180 minutes of video export / mo</li>
                    <li className="flex items-center gap-2"><CheckIcon /> 4K Ultra-HD Export Option</li>
                    <li className="flex items-center gap-2"><CheckIcon /> 50+ Custom voices & languages</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Full custom branding kits</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Auto translation module</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Link to="/register" className="block text-center w-full py-3.5 bg-black hover:bg-neutral-900 rounded-xl text-xs font-extrabold text-white transition-all shadow-md">
                    Upgrade to Pro
                  </Link>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white border border-neutral-200/80 rounded-[2rem] p-8 shadow-sm flex flex-col justify-between hover:border-neutral-300 transition-all duration-300">
                <div>
                  <span className="text-xs uppercase font-extrabold text-neutral-400 tracking-widest">Enterprise</span>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-neutral-900 font-heading">Custom</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-2 font-medium">For custom scale, private LLM templates, automated APIs, and dedicated server queues.</p>
                  
                  <ul className="mt-8 space-y-3 text-xs font-semibold text-neutral-700">
                    <li className="flex items-center gap-2"><CheckIcon /> Unlimited rendering minutes</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Full system REST API Access</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Custom AI model fine-tuning</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Dedicated Support channels</li>
                    <li className="flex items-center gap-2"><CheckIcon /> Sync custom voice clones</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <button className="w-full py-3.5 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-800 transition-all shadow-sm">
                    Talk to Sales
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* TESTIMONIALS SECTION */}
          <div className="mt-32 max-w-6xl mx-auto">
            <span className="text-xs uppercase font-extrabold text-neutral-400 tracking-widest block text-center mb-3">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 text-center tracking-tight mb-16 font-heading">
              Loved by Automation Creators.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-white border border-neutral-200/80 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
                <p className="text-sm text-neutral-700 font-semibold leading-relaxed">
                  "VidForge completely overhauled my social workflow. I went from spending 12 hours manually stitching background assets and sync lines to putting in a single prompt and having a completed, high-engagement TikTok reel ready in under 5 minutes."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-[#1A3BF5] text-xs">
                    SC
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">Sarah Chen</h4>
                    <p className="text-[10px] text-neutral-400 font-bold">TikTok Creator, @facelesstech</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-neutral-200/80 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
                <p className="text-sm text-neutral-700 font-semibold leading-relaxed">
                  "The AI voice synthesis output is scary realistic. We compared ElevenLabs integrations on VidForge with our custom layouts and the auto script-to-voice flow here produced identical results in half the clicks."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xs">
                    MK
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">Marcus Kovac</h4>
                    <p className="text-[10px] text-neutral-400 font-bold">Content Lead at NexaTech</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-neutral-200/80 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
                <p className="text-sm text-neutral-700 font-semibold leading-relaxed">
                  "We generate up to 50 localized videos in batches for our global marketing campaigns. VidForge AI saves us thousands of dollars every single month in voice actors, editing contractors, and visual rendering."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center font-bold text-pink-600 text-xs">
                    DB
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900">Diana Brooks</h4>
                    <p className="text-[10px] text-neutral-400 font-bold">VP Marketing, Synthetix</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="mt-32 max-w-3xl mx-auto">
            <span className="text-xs uppercase font-extrabold text-neutral-400 tracking-widest block text-center mb-3">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 text-center tracking-tight mb-16 font-heading">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "How does the AI choose video scenes and images?",
                  a: "VidForge AI parses your prompt or script, identifies major scene segments, and utilizes custom-trained AI image generators to create visuals. It can also pull royalty-free stock videos and sync them seamlessly based on keywords."
                },
                {
                  q: "Can I clone my own voice or upload pre-recorded audio?",
                  a: "Yes! On the Pro and Enterprise plans, you can clone your voice by uploading a 1-minute audio sample. Our synthesis engine will generate matching narration files for any text script."
                },
                {
                  q: "What video formats are supported?",
                  a: "We support landscape (16:9) for YouTube, portrait (9:16) for TikTok, Shorts, and Reels, and square (1:1) for Instagram and LinkedIn feeds. You can toggle between formats instantly."
                },
                {
                  q: "Can I edit the generated video script?",
                  a: "Absolutely! The timeline editor is interactive. You can modify scripts, replace generated visuals, choose different voice models, or adjust the background music volumes directly in the studio."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden text-left">
                  <button 
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-neutral-900 hover:bg-neutral-50 transition-colors focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#1A3BF5] font-black">{openFaqIndex === idx ? "−" : "+"}</span>
                  </button>
                  {openFaqIndex === idx && (
                    <div className="px-6 pb-5 pt-2 text-sm text-neutral-500 font-medium border-t border-neutral-100 bg-neutral-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FINAL CTA SECTION */}
          <div className="mt-32 max-w-5xl mx-auto rounded-[2.5rem] border border-neutral-200 bg-gradient-to-b from-white to-neutral-50/50 p-8 md:p-16 shadow-xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-faint pointer-events-none opacity-20" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight max-w-2xl mx-auto font-heading">
              Let AI Produce Your Next <span className="text-[#1A3BF5]">Viral Video</span>
            </h2>
            <p className="text-neutral-500 font-medium max-w-md mx-auto mt-4 leading-relaxed">
              Join thousands of creators, marketers, and startups automating their video production from single prompts.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
              <Link to="/register" className="bg-neutral-950 text-white hover:bg-black rounded-full px-8 py-4 font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                Start Free Trial
              </Link>
              <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-full px-8 py-4 font-bold transition-all duration-300 hover:-translate-y-0.5 border border-neutral-200/40">
                Book Demo
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-neutral-100 bg-neutral-50/50 py-16 relative z-10 text-left">
        <div className="mx-auto max-w-7xl px-6 md:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 items-start">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <LogoIcon />
              <div className="flex flex-col text-left">
                <span className="text-md font-bold text-neutral-900 tracking-tight leading-none">VidForge AI</span>
                <span className="text-[9px] text-neutral-400 font-semibold tracking-wide uppercase mt-1">AI video automation platform</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 max-w-xs leading-relaxed font-semibold">
              Generate production-ready videos from simple prompts. Empowering creators and agencies to scale visual output globally.
            </p>
            <div className="text-xs text-neutral-400 pt-2 font-bold">
              © {new Date().getFullYear()} VidForge AI. All rights reserved.
            </div>
          </div>

          <div>
            <span className="text-xs uppercase font-extrabold text-neutral-950 tracking-wider">Product</span>
            <ul className="mt-4 space-y-2 text-xs font-semibold text-neutral-500">
              <li><a href="#features" className="hover:text-[#1A3BF5] transition-colors">Features</a></li>
              <li><a href="#workflow" className="hover:text-[#1A3BF5] transition-colors">Workflow</a></li>
              <li><a href="#pricing" className="hover:text-[#1A3BF5] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#1A3BF5] transition-colors">API Docs</a></li>
            </ul>
          </div>

          <div>
            <span className="text-xs uppercase font-extrabold text-neutral-950 tracking-wider">Resources</span>
            <ul className="mt-4 space-y-2 text-xs font-semibold text-neutral-500">
              <li><a href="#" className="hover:text-[#1A3BF5] transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-[#1A3BF5] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#1A3BF5] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#1A3BF5] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <span className="text-xs uppercase font-extrabold text-neutral-950 tracking-wider">Connect</span>
            <ul className="mt-4 space-y-2 text-xs font-semibold text-neutral-500">
              <li><a href="#" className="hover:text-[#1A3BF5] transition-colors">Twitter / X</a></li>
              <li><a href="#" className="hover:text-[#1A3BF5] transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-[#1A3BF5] transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-[#1A3BF5] transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
