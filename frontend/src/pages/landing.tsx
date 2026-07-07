import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import heroAnimation from "../assets/animation2.mp4";
import logoCube from "../assets/cubeImage.jpg";
import BorderGlow from "../components/ui/border-glow";
import Reveal from "../components/ui/reveal";
import CountUp from "../components/ui/count-up";
import TiltCard from "../components/ui/tilt-card";
import { useScrolled } from "../hooks/useScrolled";
import { useActiveSection } from "../hooks/useActiveSection";

// Premium Logo Icon (bare brand cube mark)
const LogoIcon = ({ large = false }: { large?: boolean }) => (
  <img
    src={logoCube}
    alt="VidForge AI"
    className={`${large ? "w-11 h-11" : "w-10 h-10"} object-contain shrink-0 transition-transform duration-500 ease-out group-hover:rotate-[15deg] group-hover:scale-105`}
  />
);

// Check Icon for Pricing list
const CheckIcon = () => (
  <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// Feature Icons matching the screenshots
// Showcase icons render bare — the alternating feature blocks wrap them in their own gradient tile
const PromptToVideoIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const ScriptWriterIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const VoiceGeneratorIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const SubtitleGeneratorIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
  </svg>
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

const ReelsIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center shrink-0">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  </div>
);

const AnalyticsIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 shrink-0">
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V9m6 10V5M4 19h16M4 19V4m5 15v-6" />
    </svg>
  </div>
);

// Divider used to visually separate landing page sections
const SectionDivider = () => (
  <div className="my-16 md:my-20 flex justify-center">
    <span className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
  </div>
);

// Small checkmark used inside feature bullet lists (blue, matches section accent)
const FeatureCheck = () => (
  <span className="w-5 h-5 rounded-full bg-[#1A3BF5]/10 text-[#1A3BF5] flex items-center justify-center shrink-0">
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </span>
);

// ---------- Dashboard mockup visuals for the Feature Showcase ----------

const PromptTimelineVisual = () => (
  <div className="flex flex-col h-full gap-4 p-5">
    <div className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
      <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
      <span className="ml-2 text-[10px] text-white/40 font-mono tracking-wide">vidforge — prompt studio</span>
    </div>

    <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-xs text-white/70 font-mono leading-relaxed">
      "A lone astronaut discovers a glowing forest on Mars..."
      <span className="inline-block w-[2px] h-3 bg-[#4F7CFF] ml-1 align-middle animate-pulse" />
    </div>

    <div className="flex justify-center text-white/15">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>

    <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex-1 flex flex-col gap-3">
      <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Scene Timeline</span>
      <div className="flex gap-1.5 h-10">
        {["from-[#1A3BF5] to-[#4F7CFF]", "from-[#4F7CFF] to-[#9b51e0]", "from-[#9b51e0] to-[#00D4FF]", "from-[#00D4FF] to-[#1A3BF5]", "from-[#1A3BF5] to-[#9b51e0]"].map((g, i) => (
          <div key={i} className={`flex-1 rounded-md bg-gradient-to-b ${g} opacity-70`} />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div className="w-7 h-7 rounded-full bg-[#1A3BF5] flex items-center justify-center shrink-0">
          <svg className="w-2.5 h-2.5 fill-current text-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </div>
        <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-to-r from-[#1A3BF5] to-[#00D4FF] rounded-full" />
        </div>
        <span className="text-[10px] text-white/40 font-mono">00:24</span>
      </div>
    </div>
  </div>
);

const ScriptEditorVisual = () => (
  <div className="relative flex h-full gap-4 p-5">
    <div className="flex flex-col gap-3 text-[10px] text-white/20 font-mono pt-1">
      {Array.from({ length: 7 }).map((_, i) => <span key={i}>{i + 1}</span>)}
    </div>
    <div className="flex-1 flex flex-col gap-3 pt-1">
      <div className="h-2 rounded-full bg-white/10 w-4/5" />
      <div className="rounded-lg bg-[#4F7CFF]/15 border-l-2 border-[#4F7CFF] px-2.5 py-1.5 text-[11px] text-white/80 font-mono">
        Hook: "In 10 years, half of jobs will be automated."
      </div>
      <div className="h-2 rounded-full bg-white/10 w-3/5" />
      <div className="h-2 rounded-full bg-white/10 w-full" />
      <div className="h-2 rounded-full bg-white/10 w-2/3" />
      <div className="h-2 rounded-full bg-white/10 w-1/2" />
    </div>
    <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 bg-[#4F7CFF]/15 border border-[#4F7CFF]/30 text-[#a9bcff] text-[10px] font-bold px-2.5 py-1 rounded-full">
      <span className="w-1.5 h-1.5 rounded-full bg-[#4F7CFF] animate-pulse" /> AI writing…
    </div>
  </div>
);

const VoiceStudioVisual = () => (
  <div className="flex flex-col h-full justify-between p-5 gap-4">
    <div className="flex gap-2 flex-wrap">
      {["Aria", "Kai", "Nova", "Zane"].map((chip) => (
        <span
          key={chip}
          className={`text-[10px] font-bold px-3 py-1 rounded-full border ${chip === "Nova" ? "bg-[#4F7CFF]/20 border-[#4F7CFF]/40 text-white" : "bg-white/5 border-white/10 text-white/50"}`}
        >
          {chip}
        </span>
      ))}
    </div>
    <div className="flex items-end justify-center gap-1 h-20">
      {[40, 65, 30, 80, 50, 90, 45, 70, 35, 60, 25, 55].map((h, i) => (
        <span
          key={i}
          className="w-1.5 rounded-full bg-gradient-to-t from-[#1A3BF5] to-[#00D4FF] animate-soft-bounce"
          style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-[#4F7CFF] flex items-center justify-center shrink-0">
        <svg className="w-3 h-3 fill-current text-white ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
      </div>
      <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full w-1/2 bg-[#4F7CFF] rounded-full" />
      </div>
      <span className="text-[10px] text-white/40 font-mono">0:42 / 1:30</span>
    </div>
  </div>
);

const SubtitleTimelineVisual = () => (
  <div className="flex flex-col h-full gap-3 p-5">
    <div className="relative flex-1 rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 overflow-hidden flex items-end justify-center pb-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(79,124,255,0.18),transparent_60%)]" />
      <span className="relative text-white text-xs font-bold bg-black/50 px-3 py-1.5 rounded-md backdrop-blur-sm">
        "...half of jobs will be automated"
      </span>
    </div>
    <div className="rounded-xl bg-white/5 border border-white/10 p-2.5 flex items-center gap-1 h-9">
      {[6, 12, 8, 16, 10, 14, 7, 11, 9, 15, 6, 13, 8, 10, 12].map((h, i) => (
        <span key={i} className="w-1 rounded-full bg-white/20" style={{ height: `${h}px` }} />
      ))}
    </div>
    <div className="flex gap-1.5">
      {[1, 2, 3].map((i) => (
        <span key={i} className="flex-1 h-1.5 rounded-full bg-[#4F7CFF]/50" />
      ))}
    </div>
  </div>
);

// ---------- Feature Showcase data ----------

const showcaseFeatures = [
  {
    number: "01",
    icon: <PromptToVideoIcon />,
    title: "Prompt to Video",
    description: "Turn a single prompt into a fully produced cinematic video using multiple AI models working together.",
    bullets: ["AI Scene Planning", "Intelligent Story Flow", "Auto Camera Angles", "Character Consistency"],
    visual: <PromptTimelineVisual />,
  },
  {
    number: "02",
    icon: <ScriptWriterIcon />,
    title: "AI Script Writer",
    description: "Generate compelling, conversion-focused scripts with hooks, pacing and structure tuned to your audience.",
    bullets: ["Hook & Retention Optimization", "Multi-Tone Rewriting", "Scene-by-Scene Breakdown", "SEO-Aware Keywords"],
    visual: <ScriptEditorVisual />,
  },
  {
    number: "03",
    icon: <VoiceGeneratorIcon />,
    title: "AI Voice Generator",
    description: "Create natural, studio-quality voiceovers with premium tones, pacing and full multilingual support.",
    bullets: ["50+ Hyper-Realistic Voices", "Emotion & Pacing Control", "Custom Voice Cloning", "Multilingual Dubbing"],
    visual: <VoiceStudioVisual />,
  },
  {
    number: "04",
    icon: <SubtitleGeneratorIcon />,
    title: "Auto Subtitles & Captions",
    description: "Auto-sync stylish captions with dynamic emphasis, perfectly timed to every spoken word.",
    bullets: ["Word-Level Sync", "Dynamic Styling Presets", "Multi-Language Export", "Platform-Safe Formatting"],
    visual: <SubtitleTimelineVisual />,
  },
];

// ---------- Bento grid tiles (rest of the feature set) ----------

const bentoTiles = [
  {
    area: "a",
    title: "B-Roll Generator",
    desc: "Generate supporting visuals that match your narrative and brand style automatically.",
    icon: <BRollIcon />,
    large: true,
    preview: (
      <div className="flex gap-1.5 mt-4">
        {["from-amber-400/60 to-orange-500/60", "from-[#4F7CFF]/60 to-[#1A3BF5]/60", "from-teal-400/60 to-emerald-500/60", "from-purple-400/60 to-indigo-500/60"].map((g, i) => (
          <div key={i} className={`h-10 flex-1 rounded-lg bg-gradient-to-br ${g}`} />
        ))}
      </div>
    ),
  },
  {
    area: "b",
    title: "Smart Scene Detection",
    desc: "Detect scene changes and structure pacing intelligently.",
    icon: <SceneIcon />,
    preview: (
      <div className="relative mt-4 h-8 rounded-lg bg-neutral-100 overflow-hidden flex items-center">
        {[20, 45, 70].map((pos) => (
          <span key={pos} className="absolute top-0 bottom-0 w-0.5 bg-teal-500/60" style={{ left: `${pos}%` }} />
        ))}
      </div>
    ),
  },
  {
    area: "c",
    title: "Background Music AI",
    desc: "Cinematic soundtracks that adapt to scene energy and pacing.",
    icon: <MusicIcon />,
    preview: (
      <div className="flex items-end gap-1 mt-4 h-8">
        {[40, 70, 30, 90, 50, 65, 35].map((h, i) => (
          <span key={i} className="w-1.5 rounded-full bg-blue-400/60" style={{ height: `${h}%` }} />
        ))}
      </div>
    ),
  },
  {
    area: "d",
    title: "Social Shorts & Reels",
    desc: "Vertical-ready Shorts and Reels with motion-safe captions.",
    icon: <ReelsIcon />,
    preview: (
      <div className="flex gap-2 mt-4">
        <div className="w-6 h-10 rounded-md bg-gradient-to-b from-purple-400/50 to-indigo-500/50 border border-neutral-200" />
        <div className="w-6 h-10 rounded-md bg-gradient-to-b from-indigo-400/50 to-[#1A3BF5]/50 border border-neutral-200" />
      </div>
    ),
  },
  {
    area: "e",
    title: "4K Ultra Export",
    desc: "Crisp, high-resolution exports optimized for every platform.",
    icon: <ExportIcon />,
    preview: (
      <div className="flex items-center gap-2 mt-4">
        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-md">3840×2160</span>
      </div>
    ),
  },
  {
    area: "f",
    title: "Auto Editing",
    desc: "Automatically trim, align, and polish every frame for a premium finish.",
    icon: <EditingIcon />,
    large: true,
    preview: (
      <div className="flex items-center gap-2 mt-4">
        <div className="h-8 flex-1 rounded-lg bg-neutral-100 flex items-center px-2 gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="w-1 h-4 rounded-full bg-purple-400/40" />
          ))}
        </div>
      </div>
    ),
  },
  {
    area: "g",
    title: "Analytics & Insights",
    desc: "Track engagement, retention and performance across every platform.",
    icon: <AnalyticsIcon />,
    preview: (
      <div className="mt-4 flex items-baseline gap-1">
        <CountUp end={98} suffix="%" className="text-2xl font-black text-cyan-600" />
        <span className="text-[10px] font-bold text-neutral-400">avg. retention</span>
      </div>
    ),
  },
];

// ---------- Navbar links ----------

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const navSectionIds = navLinks.map((item) => item.href.slice(1));

// ---------- Workflow timeline steps ----------

const workflowSteps = [
  "Write Prompt",
  "Generate Script",
  "Create Voice",
  "Generate Scenes",
  "Auto Edit",
  "Export",
];

// ---------- Powered By: infrastructure logo marquee ----------

const poweredByLogos = [
  { name: "OpenAI", hover: "hover:text-[#10A37F]" },
  { name: "Anthropic Claude", hover: "hover:text-[#D97757]" },
  { name: "Google Gemini", hover: "hover:text-[#4F7CFF]" },
  { name: "Runway", hover: "hover:text-neutral-900" },
  { name: "ElevenLabs", hover: "hover:text-neutral-900" },
  { name: "Flux", hover: "hover:text-[#9b51e0]" },
  { name: "Replicate", hover: "hover:text-neutral-900" },
  { name: "FFmpeg", hover: "hover:text-[#007808]" },
  { name: "Cloudflare", hover: "hover:text-[#F6821F]" },
  { name: "Supabase", hover: "hover:text-[#3ECF8E]" },
  { name: "Stripe", hover: "hover:text-[#635BFF]" },
  { name: "Vercel", hover: "hover:text-neutral-900" },
  { name: "AWS", hover: "hover:text-[#FF9900]" },
  { name: "Render", hover: "hover:text-[#00D4FF]" },
];

const poweredByRowTop = poweredByLogos.slice(0, 7);
const poweredByRowBottom = poweredByLogos.slice(7);

function MarqueeRow({
  logos,
  direction,
  duration,
}: {
  logos: typeof poweredByLogos;
  direction: "left" | "right";
  duration: number;
}) {
  const doubled = [...logos, ...logos];
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Driven by GSAP's own rAF ticker (not React state) so the loop keeps running
  // continuously and never stalls or pauses, regardless of parent re-renders.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const from = direction === "left" ? 0 : -50;
    const to = direction === "left" ? -50 : 0;

    gsap.set(track, { xPercent: from });
    const tween = gsap.to(track, {
      xPercent: to,
      duration,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [direction, duration]);

  return (
    <div className="marquee-row">
      <div ref={trackRef} className="marquee-track gap-14 py-2">
        {doubled.map((logo, i) => (
          <span
            key={`${logo.name}-${i}`}
            className={`inline-block shrink-0 whitespace-nowrap select-none cursor-default text-lg md:text-xl font-extrabold tracking-tight text-neutral-500 grayscale opacity-65 transition-all duration-300 ease-out hover:opacity-100 hover:grayscale-0 hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(26,59,245,0.25)] ${logo.hover}`}
          >
            {logo.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Landing() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const scrolled = useScrolled(12);
  const activeSection = useActiveSection(navSectionIds);

  return (
    <div className="relative min-h-screen bg-white text-neutral-800 font-sans selection:bg-[#1A3BF5]/20 selection:text-[#1A3BF5]">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-grid-faint pointer-events-none opacity-40 z-0" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full flex justify-center px-4 pt-4 pb-2">
        <div
          className={`w-full max-w-[1320px] h-[84px] flex items-center justify-between rounded-full border border-white/60 px-8 md:px-10 transition-all duration-500 ease-out ${
            scrolled
              ? "bg-white/90 backdrop-blur-[22px] shadow-[0_18px_55px_rgba(0,0,0,0.10)] scale-[0.99]"
              : "bg-white/80 backdrop-blur-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] scale-100"
          }`}
        >
          <Link to="/" className="group flex items-center gap-3">
            <LogoIcon large />
            <div className="flex flex-col text-left">
              <span className="text-xl font-extrabold text-neutral-900 tracking-tight leading-none">VidForge AI</span>
              <span className="text-[11px] text-neutral-400 font-semibold tracking-[0.15em] uppercase mt-1">AI video automation platform</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`group relative text-sm font-semibold py-1 transition-colors duration-300 ${
                    isActive ? "text-neutral-950" : "text-neutral-600 hover:text-neutral-950"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-[#1A3BF5] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 opacity-80 transition-all duration-300 hover:opacity-100 hover:text-neutral-950"
            >
              Sign In
              <svg
                className="w-3.5 h-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center h-12 px-7 bg-black hover:bg-neutral-900 text-white text-sm font-bold rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_14px_34px_rgba(0,0,0,0.28)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="relative pt-12 pb-24 md:pt-16 md:pb-32 z-10">
        <div className="relative mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
          {/* Main Card Wrapper */}
          <div className="rounded-[2.5rem] border border-neutral-200/80 bg-gradient-to-b from-white via-white to-neutral-50/50 p-8 md:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.08)] relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-faint pointer-events-none opacity-20" />

            {/* Soft Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#1A3BF5]/5 blur-[120px] pointer-events-none" />

            <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">
              {/* Left: Text Content */}
              <div className="text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 border border-neutral-200/80 bg-white/95 px-4.5 py-1.5 rounded-full text-xs font-bold text-neutral-800 shadow-sm mb-8">
                  <span className="text-[#1A3BF5] font-bold">⚡</span> Premium AI video automation for modern teams
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 leading-tight font-heading">
                  Create Cinematic AI Videos From Just One Prompt.
                </h1>

                {/* Subtext */}
                <p className="text-lg text-neutral-500 font-medium mt-6 leading-relaxed">
                  Generate complete professional videos with AI. Scripts, Voiceovers, AI Avatars, Captions, Editing, Music and Export — all automated in one workflow.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 mt-10">
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
              </div>

              {/* Right: Hero Animation */}
              <BorderGlow
                className="w-full max-w-md mx-auto p-2"
                borderRadius={28}
                glowRadius={80}
                glowIntensity={1.4}
                coneSpread={40}
                edgeSensitivity={15}
                glowColor="220 90% 70%"
                backgroundColor="#0a0a0a"
                colors={["#1A3BF5", "#9b51e0", "#00D4FF"]}
              >
                <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950">
                  <video
                    src={heroAnimation}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </BorderGlow>
            </div>

          </div>

        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* POWERED BY SECTION */}
          <div className="relative pt-16 pb-[72px]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
              <div className="absolute inset-0 bg-grid-faint opacity-25 [mask-image:radial-gradient(ellipse_55%_70%_at_50%_40%,black,transparent)]" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[220px] rounded-full bg-[#1A3BF5]/[0.05] blur-[110px]" />
              <div className="hidden lg:block absolute top-8 left-[10%] w-1.5 h-1.5 rounded-full bg-[#1A3BF5]/50 animate-particle" />
              <div className="hidden lg:block absolute bottom-10 right-[12%] w-1 h-1 rounded-full bg-purple-400/50 animate-particle" style={{ animationDelay: "1.2s" }} />
            </div>

            <Reveal className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 border border-blue-100 bg-blue-50/70 px-4 py-1.5 rounded-full text-xs font-bold text-[#1A3BF5] mb-5">
                <span>✨</span> Powered by Industry-Leading AI &amp; Cloud Technologies
              </div>
              <h2 className="text-[36px] md:text-[44px] font-extrabold tracking-[-0.03em] text-neutral-900 leading-[1.05] font-heading">
                Powered by Industry-Leading
                <br />
                AI Infrastructure
              </h2>
              <p className="text-base text-neutral-500 font-medium mt-3 leading-[1.6] max-w-155 mx-auto">
                VidForge AI combines the best AI models, cloud infrastructure and media processing tools into one seamless workflow.
              </p>
            </Reveal>

            {/* Break out of the max-w-7xl page container and re-align to the Hero card's own width */}
            <div className="relative left-1/2 -translate-x-1/2 w-screen mt-9">
              <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal variant="scale" delay={150}>
                  {/* Desktop: two counter-scrolling rows */}
                  <div className="hidden lg:flex flex-col gap-5">
                    <MarqueeRow logos={poweredByRowTop} direction="left" duration={42} />
                    <MarqueeRow logos={poweredByRowBottom} direction="right" duration={38} />
                  </div>

                  {/* Tablet: single, slower row */}
                  <div className="hidden md:block lg:hidden">
                    <MarqueeRow logos={poweredByLogos} direction="left" duration={55} />
                  </div>

                  {/* Mobile: touch-friendly scroll */}
                  <div className="md:hidden flex gap-10 overflow-x-auto px-6 py-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {poweredByLogos.map((logo) => (
                      <span
                        key={logo.name}
                        className={`snap-start shrink-0 whitespace-nowrap text-lg font-extrabold tracking-tight text-neutral-500 grayscale opacity-65 transition-all duration-300 ease-out hover:opacity-100 hover:grayscale-0 hover:scale-105 ${logo.hover}`}
                      >
                        {logo.name}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          {/* FEATURES SECTION */}
          <div id="features" className="scroll-mt-28 max-w-7xl mx-auto relative">
            {/* Decorative floating elements — blur circles, cubes, grid, particles */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
              {/* Subtle wash that differentiates this section from the pure-white Powered By above */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,124,255,0.03),transparent_70%)]" />
              <div className="absolute inset-0 bg-grid-faint opacity-30 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" />
              <div className="absolute -top-16 left-[6%] w-72 h-72 rounded-full bg-[#1A3BF5]/[0.07] blur-[100px] animate-drift-slow" />
              <div className="absolute top-1/3 right-[2%] w-80 h-80 rounded-full bg-purple-400/[0.07] blur-[110px] animate-drift-reverse" />
              <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-cyan-400/[0.06] blur-[100px] animate-drift-slow" />

              <div className="hidden md:block absolute top-20 right-[14%] w-8 h-8 border border-[#1A3BF5]/20 rounded-lg animate-cube-float" />
              <div className="hidden md:block absolute bottom-32 left-[9%] w-6 h-6 border border-purple-400/25 rounded-md animate-cube-float" style={{ animationDelay: "2s" }} />
              <div className="hidden lg:block absolute top-1/2 left-[18%] w-10 h-10 border border-cyan-400/20 rounded-xl animate-cube-float" style={{ animationDelay: "4s" }} />

              <div className="hidden lg:block absolute top-1/4 left-[24%] w-1.5 h-1.5 rounded-full bg-[#1A3BF5]/60 animate-particle" />
              <div className="hidden lg:block absolute top-2/3 right-[22%] w-1 h-1 rounded-full bg-purple-400/60 animate-particle" style={{ animationDelay: "1s" }} />
              <div className="hidden lg:block absolute bottom-1/4 right-[12%] w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-particle" style={{ animationDelay: "2s" }} />
            </div>

            {/* Section Header */}
            <Reveal className="text-center max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 border border-neutral-200/80 bg-white/95 px-4.5 py-1.5 rounded-full text-xs font-bold text-neutral-800 shadow-sm mb-6">
                <span className="text-[#1A3BF5] font-bold">⚡</span> AI Automation Platform
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight font-heading">
                Everything You Need <br className="hidden md:block" />
                To Produce Professional AI Videos
              </h2>
              <p className="text-lg text-neutral-500 font-medium mt-6 leading-relaxed max-w-2xl mx-auto">
                From prompt writing to cinematic export, VidForge AI automates every step of your creative workflow inside one intelligent platform.
              </p>
            </Reveal>

            {/* Stats strip */}
            <Reveal variant="scale" delay={150} className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 mb-24 md:mb-32">
              {[
                { end: 4200, suffix: "+", label: "Videos Rendered" },
                { end: 60, suffix: "+", label: "AI Voices" },
                { end: 98, suffix: "%", label: "Automation Accuracy" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <CountUp end={stat.end} suffix={stat.suffix} className="text-2xl md:text-3xl font-black text-neutral-900 font-heading" />
                  <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </Reveal>

            {/* Alternating Feature Showcase */}
            <div className="space-y-28 md:space-y-36">
              {showcaseFeatures.map((feature, idx) => {
                const reversed = idx % 2 === 1;
                return (
                  <Reveal key={feature.number} variant={reversed ? "right" : "left"} className="group">
                    <div className={`flex flex-col lg:flex-row ${reversed ? "lg:flex-row-reverse" : ""} items-center gap-12 lg:gap-20`}>
                      {/* Content */}
                      <div className="flex-1 w-full text-left">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-6xl md:text-7xl font-black text-neutral-100 leading-none select-none font-heading">
                            {feature.number}
                          </span>
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1A3BF5] to-[#4F7CFF] flex items-center justify-center text-white shadow-[0_8px_24px_rgba(26,59,245,0.25)] shrink-0 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
                            {feature.icon}
                          </div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight font-heading">
                          {feature.title}
                        </h3>
                        <p className="text-neutral-500 font-medium mt-4 leading-relaxed max-w-md">
                          {feature.description}
                        </p>
                        <ul className="mt-6 space-y-3">
                          {feature.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-center gap-3 text-sm font-semibold text-neutral-700">
                              <FeatureCheck />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                        <button className="group/btn inline-flex items-center gap-2 text-sm font-bold text-[#1A3BF5] mt-8">
                          Learn More
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>

                      {/* Visual */}
                      <div className="flex-1 w-full max-w-lg transition-transform duration-500 group-hover:-translate-y-1">
                        <BorderGlow
                          className="w-full p-2"
                          borderRadius={28}
                          glowRadius={70}
                          glowIntensity={1.2}
                          coneSpread={35}
                          edgeSensitivity={18}
                          glowColor="220 90% 70%"
                          backgroundColor="#0a0a0a"
                          colors={["#1A3BF5", "#9b51e0", "#00D4FF"]}
                        >
                          <div className="relative rounded-2xl overflow-hidden bg-neutral-950 aspect-[4/3]">
                            {feature.visual}
                          </div>
                        </BorderGlow>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Premium Feature Bento Grid */}
            <div className="mt-28 md:mt-36">
              <Reveal className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-xs uppercase font-extrabold text-neutral-400 tracking-widest">Full Feature Set</span>
                <h3 className="text-2xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mt-3 font-heading">
                  Every tool your production pipeline needs.
                </h3>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                {bentoTiles.map((tile, i) => (
                  <Reveal
                    key={tile.area}
                    variant="scale"
                    delay={i * 80}
                    className={tile.large ? "md:col-span-4" : "md:col-span-2"}
                  >
                    <TiltCard max={4} className="h-full">
                      <div className="h-full rounded-3xl p-[1px] bg-gradient-to-br from-neutral-200 via-neutral-200 to-neutral-200 hover:from-[#1A3BF5] hover:via-purple-400 hover:to-cyan-400 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(26,59,245,0.25)] hover:-translate-y-1">
                        <div className="bento-card h-full bg-white rounded-[calc(1.5rem-1px)] p-6 md:p-7 text-left overflow-hidden">
                          <div className="relative z-[1]">
                            {tile.icon}
                            <h4 className="text-base font-bold text-neutral-900 mt-5">{tile.title}</h4>
                            <p className="text-sm text-neutral-500 font-medium mt-1.5 leading-relaxed max-w-sm">{tile.desc}</p>
                            {tile.preview}
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Workflow Timeline */}
            <div className="mt-28 md:mt-36">
              <Reveal className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs uppercase font-extrabold text-neutral-400 tracking-widest">The Process</span>
                <h3 className="text-2xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mt-3 font-heading">
                  From one prompt to a finished film.
                </h3>
              </Reveal>

              {/* Desktop: horizontal nodes */}
              <div className="hidden md:flex items-start max-w-6xl mx-auto px-4">
                {workflowSteps.map((step, i) => (
                  <div key={step} className={`flex items-start ${i < workflowSteps.length - 1 ? "flex-1" : ""}`}>
                    <Reveal variant="scale" delay={i * 100} className="flex flex-col items-center text-center w-28 shrink-0">
                      <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200 shadow-[0_8px_24px_rgba(26,59,245,0.12)] flex items-center justify-center text-[#1A3BF5] font-black text-lg hover:scale-110 hover:border-[#1A3BF5]/50 transition-all duration-300">
                        0{i + 1}
                      </div>
                      <span className="text-sm font-bold text-neutral-900 mt-4">{step}</span>
                    </Reveal>
                    {i < workflowSteps.length - 1 && (
                      <div className="workflow-line h-[2px] flex-1 mt-8 rounded-full opacity-60" />
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile: vertical nodes */}
              <div className="md:hidden flex flex-col items-center max-w-xs mx-auto">
                {workflowSteps.map((step, i) => (
                  <div key={step} className="flex flex-col items-center">
                    <Reveal variant="scale" delay={i * 80} className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200 shadow-sm flex items-center justify-center text-[#1A3BF5] font-black">
                        0{i + 1}
                      </div>
                      <span className="text-sm font-bold text-neutral-900 mt-3 mb-1">{step}</span>
                    </Reveal>
                    {i < workflowSteps.length - 1 && <div className="workflow-line-v w-[2px] h-10 rounded-full opacity-60" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <SectionDivider />

          {/* WORKFLOW SECTION */}
          <div id="workflow" className="scroll-mt-28 max-w-4xl mx-auto">
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

          <SectionDivider />

          {/* PRICING SECTION */}
          <div id="pricing" className="scroll-mt-28 max-w-6xl mx-auto">
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

          <SectionDivider />

          {/* TESTIMONIALS SECTION */}
          <div id="testimonials" className="scroll-mt-28 max-w-6xl mx-auto">
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

          <SectionDivider />

          {/* FAQ SECTION */}
          <div id="faq" className="scroll-mt-28 max-w-3xl mx-auto">
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

          <SectionDivider />

          {/* FINAL CTA SECTION */}
          <div className="max-w-5xl mx-auto rounded-[2.5rem] border border-neutral-200 bg-gradient-to-b from-white to-neutral-50/50 p-8 md:p-16 shadow-xl text-center relative overflow-hidden">
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
