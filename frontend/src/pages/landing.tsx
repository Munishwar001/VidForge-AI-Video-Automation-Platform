import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Premium Logo Icon
const LogoIcon = () => (
  <svg className="w-8 h-8 text-[#6D5DF6] filter drop-shadow-[0_0_8px_rgba(109,93,246,0.3)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function Landing() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FAQ open/close state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Pricing duration state
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly");

  // Hero Mockup Simulation States
  const [mockupStep, setMockupStep] = useState(0);
  const [mockupPromptText, setMockupPromptText] = useState("");
  const [mockupProgress, setMockupProgress] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState("Aurora (AI)");

  const fullPrompt = "Create a cinematic space documentary about Mars colonization, cinematic music, narration...";

  // Simulating dashboard walkthrough loop
  useEffect(() => {
    let timer: any;
    
    const runSimulation = () => {
      // Step 0: Typing prompt
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
        }, 30);
        return () => clearInterval(typeInterval);
      }
      
      // Step 1: Processing AI timeline
      if (mockupStep === 1) {
        timer = setTimeout(() => setMockupStep(2), 2500);
      }

      // Step 2: Voice & subtitles synthesis
      if (mockupStep === 2) {
        timer = setTimeout(() => setMockupStep(3), 3000);
      }

      // Step 3: Exporting progress
      if (mockupStep === 3) {
        let currentProg = 0;
        const progressInterval = setInterval(() => {
          if (currentProg < 100) {
            currentProg += 4;
            setMockupProgress(Math.min(currentProg, 100));
          } else {
            clearInterval(progressInterval);
            timer = setTimeout(() => {
              // Reset simulation
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

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAFBFF] text-[#6B7280] font-sans selection:bg-[#6D5DF6]/20 selection:text-[#6D5DF6]">
      {/* Background Pastel Meshes & Faint Grid */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] rounded-full bg-purple-200/40 blur-[130px] animate-pulse-glow" />
        <div className="absolute bottom-[5%] right-[-5%] w-[55%] h-[55%] rounded-full bg-blue-200/40 blur-[160px] animate-pulse-glow" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-[35%] left-[25%] w-[35%] h-[35%] rounded-full bg-[#6D5DF6]/5 blur-[110px] animate-float-1" />
        <div className="absolute inset-0 bg-grid-faint pointer-events-none opacity-80" />
        <div className="absolute inset-0 bg-noise pointer-events-none" />
      </div>

      {/* 1. PREMIUM FLOATING NAVBAR */}
      <div className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-4">
        <nav className="mx-auto max-w-7xl rounded-2xl border border-slate-200/60 bg-white/75 backdrop-blur-md transition-all duration-300 shadow-premium-md">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
              <LogoIcon />
              <span className="text-xl font-bold text-[#111827] tracking-tight font-heading">
                VidForge <span className="bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] bg-clip-text text-transparent">AI</span>
              </span>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection("features")} className="text-sm font-medium hover:text-[#6D5DF6] transition-colors cursor-pointer text-[#6B7280]">Features</button>
              <button onClick={() => scrollToSection("workflow")} className="text-sm font-medium hover:text-[#6D5DF6] transition-colors cursor-pointer text-[#6B7280]">Workflow</button>
              <button onClick={() => scrollToSection("dashboard-showcase")} className="text-sm font-medium hover:text-[#6D5DF6] transition-colors cursor-pointer text-[#6B7280]">Editor</button>
              <button onClick={() => scrollToSection("integrations")} className="text-sm font-medium hover:text-[#6D5DF6] transition-colors cursor-pointer text-[#6B7280]">Integrations</button>
              <button onClick={() => scrollToSection("pricing")} className="text-sm font-medium hover:text-[#6D5DF6] transition-colors cursor-pointer text-[#6B7280]">Pricing</button>
              <button onClick={() => scrollToSection("faq")} className="text-sm font-medium hover:text-[#6D5DF6] transition-colors cursor-pointer text-[#6B7280]">FAQ</button>
            </div>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login">
                <button className="text-sm font-semibold text-[#6B7280] hover:text-[#111827] transition-colors">Login</button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-slate-50 border border-slate-250 hover:bg-slate-100 rounded-xl text-sm font-semibold text-[#111827] transition duration-300 shadow-premium-sm">
                  Register
                </button>
              </Link>
              <button 
                onClick={() => scrollToSection("pricing")}
                className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-[#6D5DF6] cursor-pointer shadow-premium-sm"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] rounded-xl group-hover:opacity-90 transition duration-300"></span>
                <span className="relative block px-6 py-2 rounded-xl bg-white text-sm font-bold text-[#111827] transition duration-300 group-hover:bg-transparent group-hover:text-white">
                  Join Waitlist
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[#111827] hover:text-[#6D5DF6] focus:outline-none">
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200/50 bg-white/95 backdrop-blur-xl px-6 py-4 space-y-3 rounded-b-2xl">
              <button onClick={() => scrollToSection("features")} className="block w-full text-left py-2 text-base font-medium hover:text-[#6D5DF6]">Features</button>
              <button onClick={() => scrollToSection("workflow")} className="block w-full text-left py-2 text-base font-medium hover:text-[#6D5DF6]">Workflow</button>
              <button onClick={() => scrollToSection("dashboard-showcase")} className="block w-full text-left py-2 text-base font-medium hover:text-[#6D5DF6]">Editor</button>
              <button onClick={() => scrollToSection("integrations")} className="block w-full text-left py-2 text-base font-medium hover:text-[#6D5DF6]">Integrations</button>
              <button onClick={() => scrollToSection("pricing")} className="block w-full text-left py-2 text-base font-medium hover:text-[#6D5DF6]">Pricing</button>
              <button onClick={() => scrollToSection("faq")} className="block w-full text-left py-2 text-base font-medium hover:text-[#6D5DF6]">FAQ</button>
              <div className="pt-4 flex flex-col gap-3">
                <Link to="/login" className="w-full">
                  <button className="w-full text-center py-2.5 border border-slate-200 rounded-xl text-[#111827] font-semibold hover:bg-slate-50">Login</button>
                </Link>
                <button onClick={() => scrollToSection("pricing")} className="w-full py-2.5 bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] rounded-xl text-white font-bold shadow-premium-md">Join Waitlist</button>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* 2. HERO SECTION */}
      <section id="hero" className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-8 text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 bg-purple-50 text-[#6D5DF6] text-xs font-bold tracking-wide shadow-premium-sm">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-ping"></span>
                Next-Gen Video Generation
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-none font-heading">
                Generate Studio-Quality <span className="bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">Videos</span> with AI in Minutes
              </h1>
              <p className="text-lg text-[#6B7280] leading-relaxed max-w-xl">
                Create videos from a single prompt. Automatically generate visuals, AI voiceovers, subtitles, music, transitions, and export production-ready content without editing manually.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={() => scrollToSection("pricing")}
                  className="px-8 py-4 bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] hover:from-[#5C4EE5] hover:to-[#2563EB] rounded-2xl text-white font-extrabold transition-all duration-300 shadow-premium-lg hover:shadow-[0_12px_24px_rgba(109,93,246,0.3)] transform hover:scale-[1.03] cursor-pointer"
                >
                  Start Creating
                </button>
                <button 
                  onClick={() => scrollToSection("dashboard-showcase")}
                  className="px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-slate-350 rounded-2xl text-[#111827] font-semibold transition-all duration-300 flex items-center gap-2 shadow-premium-sm group"
                >
                  <svg className="w-5 h-5 text-[#6D5DF6] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Watch Demo
                </button>
              </div>

              {/* Trusted by creators with avatar group */}
              <div className="pt-6 border-t border-slate-200/60 flex items-center gap-4">
                <div className="flex -space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center font-bold text-[#111827] text-[10px]">SC</div>
                  <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center font-bold text-[#111827] text-[10px]">MK</div>
                  <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white flex items-center justify-center font-bold text-[#111827] text-[10px]">DB</div>
                  <div className="w-8 h-8 rounded-full bg-[#6D5DF6] border-2 border-white flex items-center justify-center font-bold text-white text-[9px]">+99</div>
                </div>
                <div className="text-sm font-medium text-[#111827]">
                  Trusted by <span className="text-[#6D5DF6] font-bold">10,000+</span> creators
                </div>
              </div>
            </div>

            {/* Right Side PREMIUM WHITE AI DASHBOARD */}
            <div className="lg:col-span-6 relative z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 to-blue-200/20 blur-3xl rounded-3xl" />
              
              <div className="relative bg-white rounded-3xl border border-slate-200/70 shadow-premium-lg overflow-hidden animate-float-1">
                {/* Browser top-bar */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                    <span className="w-3 h-3 rounded-full bg-slate-350"></span>
                    <span className="w-3 h-3 rounded-full bg-slate-500"></span>
                  </div>
                  <div className="text-xs font-mono text-[#6B7280] px-3 py-1 bg-white rounded-lg border border-slate-200">
                    vidforge.ai/editor
                  </div>
                  <div className="w-6"></div>
                </div>

                {/* Main simulation workspace */}
                <div className="p-6 space-y-6">
                  {/* Prompt Box Input Section */}
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold tracking-wider uppercase text-[#6D5DF6] block text-left">Step 1: Enter Prompt</label>
                    <div className="relative flex items-center bg-slate-50 rounded-2xl border border-slate-200/60 p-4 shadow-inner">
                      <span className="text-[#6D5DF6] mr-2">✦</span>
                      <div className="text-sm font-semibold text-[#111827] min-h-[24px] select-none text-left">
                        {mockupPromptText}
                        <span className="w-2 h-4 bg-[#3B82F6] inline-block ml-1 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Generation Pipeline Progress list */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Processing Steps */}
                    <div className="space-y-3">
                      <label className="text-xs font-extrabold tracking-wider uppercase text-[#3B82F6] block text-left">Pipeline Status</label>
                      <div className="space-y-2 text-left">
                        <div className={`flex items-center justify-between p-2.5 rounded-xl transition-colors duration-300 text-xs border ${mockupStep >= 1 ? 'bg-purple-50/50 border-purple-200 text-[#111827]' : 'bg-slate-50/50 text-[#6B7280] border-transparent'}`}>
                          <span>📝 AI Scripting</span>
                          <span className={mockupStep >= 1 ? "text-emerald-500 font-bold" : "text-slate-400"}>{mockupStep >= 1 ? "✓ Done" : "Waiting"}</span>
                        </div>
                        <div className={`flex items-center justify-between p-2.5 rounded-xl transition-colors duration-300 text-xs border ${mockupStep >= 2 ? 'bg-purple-50/50 border-purple-200 text-[#111827]' : 'bg-slate-50/50 text-[#6B7280] border-transparent'}`}>
                          <span>🎙 Voice Synthesis</span>
                          <span className={mockupStep >= 2 ? "text-emerald-500 font-bold" : "text-slate-400"}>{mockupStep >= 2 ? "✓ Generated" : "Waiting"}</span>
                        </div>
                        <div className={`flex items-center justify-between p-2.5 rounded-xl transition-colors duration-300 text-xs border ${mockupStep >= 3 ? 'bg-purple-50/50 border-purple-200 text-[#111827]' : 'bg-slate-50/50 text-[#6B7280] border-transparent'}`}>
                          <span>🎬 Final Rendering</span>
                          <span className={mockupStep >= 3 ? "text-[#3B82F6] font-bold" : "text-slate-400"}>{mockupStep >= 3 ? (mockupProgress === 100 ? "✓ Done" : "Compiling...") : "Waiting"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Voice Selection */}
                    <div className="space-y-3">
                      <label className="text-xs font-extrabold tracking-wider uppercase text-[#6D5DF6] block text-left">AI Actor Voice</label>
                      <div className="bg-slate-50/50 p-2 rounded-xl border border-slate-200/60 space-y-2">
                        {["Arthur (AI)", "Aurora (AI)", "Seraphina (AI)"].map((voice) => (
                          <div 
                            key={voice}
                            onClick={() => setSelectedVoice(voice)}
                            className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer transition-all duration-300 ${selectedVoice === voice ? 'bg-blue-50 border border-blue-200 text-[#3B82F6]' : 'hover:bg-slate-50 text-[#6B7280]'}`}
                          >
                            <div className="flex items-center gap-1.5 font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                              {voice}
                            </div>
                            <span className="text-[10px] text-emerald-600 font-bold">Ready</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Video Preview Screen */}
                  <div className="relative aspect-video rounded-2xl bg-slate-900 overflow-hidden border border-slate-200 shadow-premium-md group">
                    <div className="absolute inset-0 transition-all duration-1000">
                      {mockupStep === 0 && (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-500">
                          <svg className="w-12 h-12 mb-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs uppercase tracking-widest font-mono">Idle - Awaiting Prompt</span>
                        </div>
                      )}
                      
                      {mockupStep === 1 && (
                        <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-slate-950 flex flex-col justify-center items-center p-6 text-center">
                          <div className="w-10 h-10 border-4 border-purple-500/20 border-t-[#6D5DF6] rounded-full animate-spin mb-4" />
                          <p className="text-sm font-semibold text-purple-200">Generating script & sequence beats...</p>
                          <span className="text-[10px] font-mono text-[#6D5DF6] mt-2">LLM Engine v4</span>
                        </div>
                      )}

                      {mockupStep === 2 && (
                        <div className="w-full h-full bg-gradient-to-r from-purple-800 to-blue-900 flex flex-col justify-between p-4 relative">
                          <div className="absolute inset-0 bg-black/30" />
                          <div className="z-10 flex items-center justify-between text-xs text-white">
                            <span className="bg-[#6D5DF6] px-2.5 py-1 rounded-lg font-bold">SCENE 1/4</span>
                            <span className="text-slate-200 font-semibold">Space Colonization</span>
                          </div>
                          
                          <div className="z-10 w-full flex justify-center py-4">
                            <div className="w-32 h-32 rounded-full border-2 border-dashed border-blue-400/40 animate-spin flex items-center justify-center">
                              <span className="w-24 h-24 rounded-full bg-red-500/30 animate-pulse" />
                            </div>
                          </div>

                          <div className="z-10 text-center bg-white/90 backdrop-blur-md py-2 px-4 rounded-xl border border-slate-200/50 max-w-sm mx-auto shadow-premium-md">
                            <p className="text-xs text-[#111827] font-semibold">"Mars, a rusty canvas waiting for humanity's touch."</p>
                          </div>
                        </div>
                      )}

                      {mockupStep === 3 && (
                        <div className="w-full h-full bg-slate-950 flex flex-col justify-between p-4">
                          <div className="flex items-center justify-between text-xs text-white">
                            <span className="bg-emerald-600 px-2 py-0.5 rounded font-bold">EXPORT PHASE</span>
                            <span className="text-slate-300">Format: MP4 (1080p)</span>
                          </div>
                          <div className="flex flex-col items-center justify-center flex-1">
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-[#3B82F6] mb-2">
                              <svg className="w-8 h-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </div>
                            <div className="w-48 bg-slate-800 rounded-full h-2 overflow-hidden">
                              <div className="bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] h-full transition-all duration-100" style={{ width: `${mockupProgress}%` }} />
                            </div>
                            <span className="text-xs font-mono text-blue-300 mt-2 font-bold">{mockupProgress}% Completed</span>
                          </div>
                          <div className="text-center text-[10px] text-slate-500">
                            Rendering frame rate: 60 FPS
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. STATISTICS / TRUSTED BY SECTION */}
      <section className="py-16 border-y border-slate-200/60 bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-10">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Trusted by modern creators & startups worldwide</p>
            
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
              <span className="text-lg font-extrabold tracking-tight text-[#111827] font-heading">NEXUS.AI</span>
              <span className="text-lg font-extrabold tracking-tight text-[#111827] font-heading">SYNTHETIX</span>
              <span className="text-lg font-extrabold tracking-tight text-[#111827] font-heading">BYTEFORGE</span>
              <span className="text-lg font-extrabold tracking-tight text-[#111827] font-heading">AETHER</span>
              <span className="text-lg font-extrabold tracking-tight text-[#111827] font-heading">APEX CREATORS</span>
            </div>

            {/* Statistics in Elevated White Floating Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto pt-8">
              {[
                { label: "Videos Generated", value: "50K+", color: "from-purple-500 to-indigo-500" },
                { label: "Active Creators", value: "10K+", color: "from-blue-500 to-cyan-500" },
                { label: "Countries Supported", value: "120+", color: "from-purple-500 to-pink-500" },
                { label: "Automation Rate", value: "98%", color: "from-emerald-500 to-teal-500" }
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-premium-md hover:border-[#6D5DF6]/30 transition-all duration-350 text-center">
                  <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-heading`}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-[#6B7280] mt-1.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. AI WORKFLOW TIMELINE */}
      <section id="workflow" className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4 font-heading">How VidForge AI Works</h2>
            <p className="text-[#6B7280] font-medium">Watch your idea transform from a single input line into a finished production-quality video asset in seconds.</p>
          </div>

          {/* Workflow Cards Connected with dashed purple lines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {[
              { idx: "01", name: "Prompt", desc: "Describe your concept, blog post link, script, or paste files directly into the prompt.", icon: "✦", gradient: "bg-purple-100 text-[#6D5DF6]" },
              { idx: "02", name: "Script", desc: "Our advanced script generator constructs a narrative story block with scenes layout.", icon: "📝", gradient: "bg-blue-100 text-[#3B82F6]" },
              { idx: "03", name: "Visuals", desc: "Hyper-realistic AI image models render cinematic clips matching each scene beat.", icon: "🎨", gradient: "bg-pink-100 text-pink-600" },
              { idx: "04", name: "Voice", desc: "Generate studio voiceovers with rich emotion in 50+ languages and custom cloning.", icon: "🎙", gradient: "bg-purple-100 text-[#6D5DF6]" },
              { idx: "05", name: "Music", desc: "AI automatically selects and loops license-free background soundtracks.", icon: "🎵", gradient: "bg-blue-100 text-[#3B82F6]" },
              { idx: "06", name: "Subtitles", desc: "Transcribe voiceover and insert animated captions onto the video frame.", icon: "💬", gradient: "bg-pink-100 text-pink-600" },
              { idx: "07", name: "Rendering", desc: "Combine all layers, applying cinematic color grading, transitions, and pacing.", icon: "⚡", gradient: "bg-yellow-100 text-yellow-600" },
              { idx: "08", name: "Export", desc: "Download crystal clear MP4 video ready to publish on social channels.", icon: "📤", gradient: "bg-emerald-100 text-emerald-600" }
            ].map((step, sIdx) => (
              <div key={step.name} className="relative group text-left">
                {/* Connecting lines */}
                {sIdx < 7 && (
                  <div className="absolute top-[38px] left-[76px] right-[-24px] h-[2px] border-t-2 border-dashed border-purple-300 hidden lg:block z-0" />
                )}
                
                <div className="relative z-10 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-premium-sm hover:border-[#6D5DF6]/40 transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${step.gradient} rounded-2xl flex items-center justify-center font-bold text-lg`}>
                        {step.icon}
                      </div>
                      <span className="text-xs font-mono font-black text-slate-300">{step.idx}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#111827] mb-2">{step.name}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 5. FEATURES GRID */}
      <section id="features" className="py-24 relative bg-slate-50/50 border-y border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4 font-heading">Engineered for Rapid Automation</h2>
            <p className="text-[#6B7280] font-medium">Everything you need to automate video production, customized templates, branding, and multilingual voices.</p>
          </div>

          {/* Features Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "🎥", title: "AI Video Generator", desc: "Transform abstract descriptions into highly detailed video outputs without manual editing." },
              { icon: "🎙", title: "AI Voice Generator", desc: "Create voiceovers with realistic cadence, intonation, emotions, and accents." },
              { icon: "🎵", title: "Auto Background Music", desc: "Selects music based on the emotion of the script, matching tempo to scene transitions." },
              { icon: "📝", title: "AI Script Writer", desc: "Copy an article link or paste notes to automatically structure a viral social hook script." },
              { icon: "💬", title: "Auto Subtitle Generator", desc: "Generate visual captions styled with custom fonts, highlighted colors, and emoji accents." },
              { icon: "✨", title: "AI Scene Detection", desc: "Advanced visual models split text beats into logical narrative transitions." },
              { icon: "🎨", title: "Template Library", desc: "Access high-performance layout shapes ready for marketing, real estate, and finance channels." },
              { icon: "☁", title: "Cloud Rendering", desc: "Parallel processing engine exports multi-minute clips instantly to high fidelity servers." },
              { icon: "⚡", title: "Batch Video Creation", desc: "Feed a CSV file of script prompts to generate dozens of personalized video files at once." },
              { icon: "📤", title: "One-click Export", desc: "Export high fidelity video files optimized for YouTube, TikTok, Reels, or Twitter instantly." }
            ].map((f) => (
              <div key={f.title} className="bg-white/80 border border-slate-200/70 p-8 rounded-3xl text-left hover:border-[#6D5DF6]/30 shadow-premium-sm hover:shadow-premium-lg transition-all duration-350 hover:translate-y-[-4px]">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl mb-4">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DASHBOARD SHOWCASE (LIGHT BROWSER MOCKUP) */}
      <section id="dashboard-showcase" className="py-24 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4 font-heading">The All-in-One AI Studio</h2>
            <p className="text-[#6B7280] font-medium">Take complete creative control when you need it. Make manual revisions on our visual timeline editor.</p>
          </div>

          {/* Browser Mockup Light */}
          <div className="relative bg-white rounded-3xl border border-slate-200 shadow-premium-lg overflow-hidden max-w-5xl mx-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-250"></span>
                <span className="w-3 h-3 rounded-full bg-slate-350"></span>
                <span className="w-3 h-3 rounded-full bg-slate-500"></span>
                <span className="text-xs text-[#6B7280] ml-4 font-mono font-bold">VidForge Studio v1.2</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-1.5 bg-white border border-slate-250 hover:bg-slate-50 rounded-xl text-xs text-[#111827] font-semibold shadow-premium-sm">Save draft</button>
                <button className="px-4 py-1.5 bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] hover:from-[#5C4EE5] hover:to-[#2563EB] rounded-xl text-xs font-bold text-white shadow-premium-sm cursor-pointer">Export Video</button>
              </div>
            </div>

            {/* Dashboard Workspace Layout */}
            <div className="grid grid-cols-12 min-h-[500px]">
              
              {/* Left Sidebar */}
              <div className="col-span-3 border-r border-slate-100 bg-slate-50/50 p-5 flex flex-col justify-between text-left">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">PROJECTS</span>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 text-[#6D5DF6] border border-purple-100 rounded-xl text-xs font-semibold">
                        <span>📁</span> Space Colonization
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 text-[#6B7280] rounded-xl text-xs font-medium cursor-pointer">
                        <span>📁</span> Tech Demo Launch
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 text-[#6B7280] rounded-xl text-xs font-medium cursor-pointer">
                        <span>📁</span> Real Estate Reel
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">LIBRARY</span>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 text-[#6B7280] rounded-xl text-xs font-medium cursor-pointer">
                        <span>🎨</span> Templates
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 text-[#6B7280] rounded-xl text-xs font-medium cursor-pointer">
                        <span>🎥</span> Uploaded Media
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 text-[#6B7280] rounded-xl text-xs font-medium cursor-pointer">
                        <span>⚙</span> Settings
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-150 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center font-bold text-[#6D5DF6] text-[10px]">JD</div>
                    <span className="text-[#111827] font-semibold">John Doe</span>
                  </div>
                  <span className="text-emerald-700 text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">PRO</span>
                </div>
              </div>

              {/* Central Editor Canvas */}
              <div className="col-span-9 p-6 flex flex-col justify-between space-y-6 text-left">
                
                {/* Upper Section */}
                <div className="grid grid-cols-2 gap-6">
                  
                  {/* Left Column: Script & Voice selection */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-black text-slate-400">Prompt & Script Editor</span>
                      <textarea 
                        className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-[#111827] font-semibold focus:outline-none focus:border-[#6D5DF6] font-sans resize-none"
                        defaultValue="Introduce the colonization of Mars. Establish dramatic setting of space exploration and show rocket launch sequences..."
                      />
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-black text-slate-400">Voiceover Settings</span>
                      <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
                        <div className="flex items-center gap-2 font-semibold text-[#111827]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                          <span>Arthur - Deep Cinematic Voice</span>
                        </div>
                        <button className="text-[10px] text-[#6D5DF6] font-extrabold hover:text-[#5C4EE5]">Change Voice</button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Video Preview */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-black text-slate-400">Video Canvas Preview</span>
                    <div className="aspect-video bg-slate-900 rounded-2xl border border-slate-200 overflow-hidden relative flex flex-col justify-end p-4 shadow-inner">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-400/30 flex items-center justify-center animate-pulse">
                          <span className="text-2xl">🚀</span>
                        </div>
                      </div>
                      
                      <div className="z-20 text-center">
                        <span className="bg-yellow-400 text-black px-2 py-0.5 rounded font-black text-[10px] uppercase tracking-wide mr-1">🚀 Launching</span>
                        <span className="text-white font-heading font-semibold text-xs">towards the red planet.</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Lower Section: Timeline Editor */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-black text-slate-400">Timeline Editor</span>
                    <span className="text-xs font-mono text-[#6B7280]">00:00 / 00:15</span>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2 font-mono text-[10px]">
                    {/* Visual Lane */}
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-[#6B7280] font-bold text-left">VIDEO</span>
                      <div className="flex-1 grid grid-cols-12 gap-1 h-6">
                        <div className="col-span-4 bg-purple-100 border border-purple-200 rounded-lg flex items-center px-2 text-[#6D5DF6] font-semibold">Scene 1 (0-5s)</div>
                        <div className="col-span-5 bg-purple-100 border border-purple-200 rounded-lg flex items-center px-2 text-[#6D5DF6] font-semibold">Scene 2 (5-11s)</div>
                        <div className="col-span-3 bg-purple-100 border border-purple-200 rounded-lg flex items-center px-2 text-[#6D5DF6] font-semibold">Scene 3 (11-15s)</div>
                      </div>
                    </div>

                    {/* Audio Lane */}
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-[#6B7280] font-bold text-left">VOICE</span>
                      <div className="flex-1 grid grid-cols-12 gap-1 h-6">
                        <div className="col-span-3 bg-blue-100 border border-blue-200 rounded-lg flex items-center px-2 text-[#3B82F6] font-semibold">Arthur VO</div>
                        <div className="col-span-1" />
                        <div className="col-span-5 bg-blue-100 border border-blue-200 rounded-lg flex items-center px-2 text-[#3B82F6] font-semibold">Arthur VO 2</div>
                        <div className="col-span-3 bg-blue-100 border border-blue-200 rounded-lg flex items-center px-2 text-[#3B82F6] font-semibold">Outro VO</div>
                      </div>
                    </div>

                    {/* Music Lane */}
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-[#6B7280] font-bold text-left">MUSIC</span>
                      <div className="flex-1 bg-emerald-100 border border-emerald-200 rounded-lg h-6 flex items-center justify-between px-2 text-emerald-800 font-semibold">
                        <span>🎵 Synth Wave Background Beats</span>
                        <span>120 BPM</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. AUTOMATION PIPELINE TIMELINE */}
      <section className="py-24 relative bg-slate-50/50 border-y border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4 font-heading">Complete Hands-Free Pipeline</h2>
            <p className="text-[#6B7280] font-medium">Everything compiles sequentially under a unified AI rendering architecture. Here is what VidForge does behind the scenes:</p>
          </div>

          <div className="max-w-4xl mx-auto relative px-4">
            {/* Visual connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] transform -translate-y-1/2 hidden md:block" />
            
            <div className="grid grid-cols-2 md:grid-cols-8 gap-4 relative z-10">
              {[
                { name: "Prompt", icon: "✦", bg: "bg-purple-100 text-[#6D5DF6]" },
                { name: "Script", icon: "📝", bg: "bg-blue-100 text-[#3B82F6]" },
                { name: "Scenes", icon: "🎨", bg: "bg-pink-100 text-pink-600" },
                { name: "Voice", icon: "🎙", bg: "bg-purple-100 text-[#6D5DF6]" },
                { name: "Music", icon: "🎵", bg: "bg-blue-100 text-[#3B82F6]" },
                { name: "Subtitles", icon: "💬", bg: "bg-pink-100 text-pink-600" },
                { name: "Rendering", icon: "⚡", bg: "bg-yellow-100 text-yellow-600" },
                { name: "Publishing", icon: "📤", bg: "bg-emerald-100 text-emerald-600" }
              ].map((step, idx) => (
                <div key={step.name} className="flex flex-col items-center bg-white border border-slate-200/80 p-4 rounded-2xl shadow-premium-sm hover:border-[#6D5DF6]/45 transition-colors">
                  <div className={`w-10 h-10 rounded-full ${step.bg} flex items-center justify-center font-bold text-sm mb-2`}>
                    {step.icon}
                  </div>
                  <span className="text-xs font-extrabold text-[#111827]">{step.name}</span>
                  <span className="text-[10px] text-[#6B7280] font-semibold mt-1">Step {idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. INTEGRATIONS SECTION */}
      <section id="integrations" className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4 font-heading">Connected to Your Tools</h2>
            <p className="text-[#6B7280] font-medium">Import assets, configure API keys, and push finalized output directly to hosting and social hubs.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "OpenAI", label: "LLM Scripting" },
              { name: "ElevenLabs", label: "Ultra Voice" },
              { name: "FFmpeg", label: "Video Render" },
              { name: "Cloudinary", label: "CDN Media" },
              { name: "AWS S3", label: "Secure Storage" },
              { name: "Google Drive", label: "Cloud Sync" },
              { name: "Dropbox", label: "File Sync" },
              { name: "YouTube", label: "Direct Upload" },
              { name: "Instagram", label: "Reels Post" },
              { name: "TikTok", label: "Viral Post" },
              { name: "LinkedIn", label: "SaaS Marketing" },
              { name: "Zapier", label: "Workflow Integrations" }
            ].map((tool) => (
              <div key={tool.name} className="bg-white p-6 rounded-3xl border border-slate-200/80 flex flex-col items-center justify-center hover:border-[#6D5DF6]/40 shadow-premium-sm hover:shadow-premium-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-3 text-[#6D5DF6] font-bold group-hover:scale-110 transition-transform">
                  ✦
                </div>
                <span className="text-sm font-bold text-[#111827]">{tool.name}</span>
                <span className="text-[10px] text-[#6B7280] mt-1 font-semibold">{tool.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PRICING */}
      <section id="pricing" className="py-24 relative bg-slate-50/50 border-y border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4 font-heading">Predictable Pricing for Scale</h2>
            <p className="text-[#6B7280] font-medium">Choose a package that fits your video output demands. Switch easily anytime.</p>
            
            {/* Toggle Duration */}
            <div className="inline-flex items-center bg-white border border-slate-200 rounded-full p-1.5 mt-6 shadow-premium-sm">
              <button 
                onClick={() => setBillingPeriod("monthly")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${billingPeriod === "monthly" ? 'bg-[#6D5DF6] text-white shadow-premium-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingPeriod("annually")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${billingPeriod === "annually" ? 'bg-[#6D5DF6] text-white shadow-premium-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
              >
                Annually (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Starter Plan */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 flex flex-col justify-between hover:border-slate-300 transition-all duration-300 text-left shadow-premium-md">
              <div>
                <span className="text-xs uppercase font-extrabold text-[#6B7280] tracking-wider">Starter</span>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-[#111827] font-heading">${billingPeriod === "monthly" ? "29" : "23"}</span>
                  <span className="text-sm text-[#6B7280] ml-2">/ month</span>
                </div>
                <p className="text-xs text-[#6B7280] mt-2 font-medium">Perfect for creators experimenting with automated content workflows.</p>
                
                <ul className="mt-8 space-y-3 text-xs font-medium">
                  <li className="flex items-center gap-2"><CheckIcon /> 30 minutes of video export / mo</li>
                  <li className="flex items-center gap-2"><CheckIcon /> 1080p Export Quality</li>
                  <li className="flex items-center gap-2"><CheckIcon /> 15 AI Voice actors</li>
                  <li className="flex items-center gap-2"><CheckIcon /> Standard transitions & templates</li>
                  <li className="flex items-center gap-2 text-slate-350">✕ Custom branding uploads</li>
                </ul>
              </div>

              <div className="mt-8">
                <button className="w-full py-3.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-[#111827] transition-all cursor-pointer shadow-premium-sm">
                  Start Free Trial
                </button>
              </div>
            </div>

            {/* Pro Plan (Highlighted) */}
            <div className="bg-white p-8 rounded-3xl border-2 border-[#6D5DF6] relative flex flex-col justify-between hover:border-[#5C4EE5] transition-all duration-300 text-left shadow-premium-lg">
              <span className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] px-3.5 py-1 rounded-full text-[10px] font-black uppercase text-white tracking-widest shadow-md">Most Popular</span>
              <div>
                <span className="text-xs uppercase font-extrabold text-[#6D5DF6] tracking-wider">Pro</span>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-[#111827] font-heading">${billingPeriod === "monthly" ? "79" : "63"}</span>
                  <span className="text-sm text-[#6B7280] ml-2">/ month</span>
                </div>
                <p className="text-xs text-[#6B7280] mt-2 font-medium">Best for professional content marketers, channels, and social growth agency setups.</p>
                
                <ul className="mt-8 space-y-3 text-xs font-semibold">
                  <li className="flex items-center gap-2"><CheckIcon /> 180 minutes of video export / mo</li>
                  <li className="flex items-center gap-2"><CheckIcon /> 4K Ultra-HD Export Option</li>
                  <li className="flex items-center gap-2"><CheckIcon /> 50+ Custom voices & languages</li>
                  <li className="flex items-center gap-2"><CheckIcon /> Full custom branding kits</li>
                  <li className="flex items-center gap-2"><CheckIcon /> Auto translation module</li>
                </ul>
              </div>

              <div className="mt-8">
                <button className="w-full py-3.5 bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] rounded-xl text-xs font-extrabold text-white shadow-premium-md hover:from-[#5C4EE5] hover:to-[#2563EB] transition-all cursor-pointer">
                  Upgrade to Pro
                </button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 flex flex-col justify-between hover:border-slate-300 transition-all duration-300 text-left shadow-premium-md">
              <div>
                <span className="text-xs uppercase font-extrabold text-[#6B7280] tracking-wider">Enterprise</span>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-[#111827] font-heading">Custom</span>
                </div>
                <p className="text-xs text-[#6B7280] mt-2 font-medium">For custom scale, private LLM templates, automated APIs, and dedicated server queues.</p>
                
                <ul className="mt-8 space-y-3 text-xs font-medium">
                  <li className="flex items-center gap-2"><CheckIcon /> Unlimited rendering minutes</li>
                  <li className="flex items-center gap-2"><CheckIcon /> Full system REST API Access</li>
                  <li className="flex items-center gap-2"><CheckIcon /> Custom AI model fine-tuning</li>
                  <li className="flex items-center gap-2"><CheckIcon /> Dedicated Slack/Support channels</li>
                  <li className="flex items-center gap-2"><CheckIcon /> Sync custom voice clones</li>
                </ul>
              </div>

              <div className="mt-8">
                <button className="w-full py-3.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-[#111827] transition-all cursor-pointer shadow-premium-sm">
                  Talk to Sales
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4 font-heading">Loved by Automation Creators</h2>
            <p className="text-[#6B7280] font-medium">See how faceless channel owners and marketing agencies scaled video generation to millions of views.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-[#6D5DF6]/30 transition-colors text-left flex flex-col justify-between shadow-premium-md">
              <p className="text-sm text-[#111827] font-semibold leading-relaxed">
                "VidForge completely overhauled my social workflow. I went from spending 12 hours manually stitching background assets and sync lines to putting in a single prompt and having a completed, high-engagement TikTok reel ready in under 5 minutes."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-[#6D5DF6] text-xs">
                  SC
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111827]">Sarah Chen</h4>
                  <p className="text-[10px] text-slate-500 font-bold">TikTok Creator, @facelesstech</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-[#6D5DF6]/30 transition-colors text-left flex flex-col justify-between shadow-premium-md">
              <p className="text-sm text-[#111827] font-semibold leading-relaxed">
                "The AI voice synthesis output is scary realistic. We compared ElevenLabs integrations on VidForge with our custom layouts and the auto script-to-voice flow here produced identical results in half the clicks."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-[#3B82F6] text-xs">
                  MK
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111827]">Marcus Kovac</h4>
                  <p className="text-[10px] text-slate-500 font-bold">Content Lead at NexaTech</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-[#6D5DF6]/30 transition-colors text-left flex flex-col justify-between shadow-premium-md">
              <p className="text-sm text-[#111827] font-semibold leading-relaxed">
                "We generate up to 50 localized videos in batches for our global marketing campaigns. VidForge AI saves us thousands of dollars every single month in voice actors, editing contractors, and visual rendering."
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center font-bold text-pink-600 text-xs">
                  DB
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111827]">Diana Brooks</h4>
                  <p className="text-[10px] text-slate-500 font-bold">VP Marketing, Synthetix</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section id="faq" className="py-24 relative bg-slate-50/50 border-y border-slate-200/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4 font-heading">Frequently Asked Questions</h2>
            <p className="text-[#6B7280] font-medium">Everything you need to know about VidForge AI.</p>
          </div>

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
                q: "Can I export videos in high definition?",
                a: "Yes, the Starter plan supports crystal-clear 1080p exports, while the Pro and Enterprise plans unlock 4K Ultra-HD resolution."
              },
              {
                q: "Can I edit the generated video script?",
                a: "Absolutely! The timeline editor is interactive. You can modify scripts, replace generated visuals, choose different voice models, or adjust the background music volumes directly in the studio."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-premium-sm overflow-hidden">
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-[#111827] hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#6D5DF6]">{openFaqIndex === idx ? "−" : "+"}</span>
                </button>
                {openFaqIndex === idx && (
                  <div className="px-6 pb-5 pt-2 text-sm text-[#6B7280] font-medium border-t border-slate-100 bg-slate-50/50 text-left">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-none font-heading">
            Let AI Produce Your Next <span className="bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] bg-clip-text text-transparent">Viral Video</span>
          </h2>
          <p className="text-[#6B7280] text-lg max-w-xl mx-auto font-medium">
            Join thousands of creators, marketers, and startups automating their video production from single prompts.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={() => scrollToSection("pricing")}
              className="px-8 py-4 bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] hover:from-[#5C4EE5] hover:to-[#2563EB] rounded-2xl text-white font-extrabold transition-all duration-300 shadow-premium-lg cursor-pointer"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => scrollToSection("dashboard-showcase")}
              className="px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl text-[#111827] font-semibold transition-all duration-300 cursor-pointer shadow-premium-sm"
            >
              Book Demo
            </button>
          </div>

        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white py-12 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-start text-left">
            
            {/* Logo and About */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
                <LogoIcon />
                <span className="text-lg font-bold text-[#111827] tracking-tight font-heading">
                  VidForge <span className="bg-gradient-to-r from-[#6D5DF6] to-[#3B82F6] bg-clip-text text-transparent">AI</span>
                </span>
              </div>
              <p className="text-xs text-[#6B7280] max-w-xs leading-relaxed font-semibold">
                Generate production-ready videos from simple prompts. Empowering creators and agencies to scale visual output globally.
              </p>
              <div className="text-xs text-[#6B7280] pt-2 font-bold">
                © {new Date().getFullYear()} VidForge AI. All rights reserved.
              </div>
            </div>

            {/* Links Column 1: Product */}
            <div>
              <span className="text-xs uppercase font-extrabold text-[#111827] tracking-wider">Product</span>
              <ul className="mt-4 space-y-2 text-xs font-semibold text-[#6B7280]">
                <li><button onClick={() => scrollToSection("features")} className="hover:text-[#6D5DF6] transition-colors cursor-pointer">Features</button></li>
                <li><button onClick={() => scrollToSection("workflow")} className="hover:text-[#6D5DF6] transition-colors cursor-pointer">Workflow</button></li>
                <li><button onClick={() => scrollToSection("pricing")} className="hover:text-[#6D5DF6] transition-colors cursor-pointer">Pricing</button></li>
                <li><a href="#" className="hover:text-[#6D5DF6] transition-colors">API Docs</a></li>
              </ul>
            </div>

            {/* Links Column 2: Resources */}
            <div>
              <span className="text-xs uppercase font-extrabold text-[#111827] tracking-wider">Resources</span>
              <ul className="mt-4 space-y-2 text-xs font-semibold text-[#6B7280]">
                <li><a href="#" className="hover:text-[#6D5DF6] transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-[#6D5DF6] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[#6D5DF6] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#6D5DF6] transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            {/* Links Column 3: Connect */}
            <div>
              <span className="text-xs uppercase font-extrabold text-[#111827] tracking-wider">Connect</span>
              <ul className="mt-4 space-y-2 text-xs font-semibold text-[#6B7280]">
                <li><a href="#" className="hover:text-[#6D5DF6] transition-colors">Twitter / X</a></li>
                <li><a href="#" className="hover:text-[#6D5DF6] transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-[#6D5DF6] transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-[#6D5DF6] transition-colors">LinkedIn</a></li>
              </ul>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
