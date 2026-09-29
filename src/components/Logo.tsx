import { Sparkles } from 'lucide-react';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = {
    sm: { box: 'w-9 h-9', mark: 22, text: 'text-lg' },
    md: { box: 'w-11 h-11', mark: 28, text: 'text-xl' },
    lg: { box: 'w-16 h-16', mark: 40, text: 'text-3xl' },
  }[size];

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative samam-logo-wrap">
        <div className={`${dims.box} rounded-2xl bg-gradient-to-br from-cyan-300 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30 samam-logo-box`}>
          <svg viewBox="0 0 64 64" width={dims.mark} height={dims.mark} aria-hidden="true">
            <path d="M49 18c-7-7-19-8-29-3C9 20 8 31 14 38c5 6 14 7 21 4 5-2 8-6 8-10 0-4-4-6-8-5l-10 3c-3 1-5-1-5-3 0-4 5-7 10-7 7 0 12 3 16 7 4 4 5 9 4 14-1 7-7 13-15 16-10 3-22 0-29-7 6 10 19 15 31 12 12-3 20-12 20-22 0-8-3-15-8-20Z" fill="white"/>
            <circle cx="47" cy="10" r="5" fill="white"/>
          </svg>
        </div>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.9)]" />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-cyan-300/30" />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`${dims.text} font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent`}>SAMAM AI</span>
        <span className="text-[9px] font-semibold text-slate-400 tracking-[0.18em] mt-1">EQUAL ACCESS</span>
      </div>
    </div>
  );
}
