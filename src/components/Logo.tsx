import { Scale, Sparkles } from 'lucide-react';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = {
    sm: { box: 'w-9 h-9', icon: 18, text: 'text-lg' },
    md: { box: 'w-11 h-11', icon: 22, text: 'text-xl' },
    lg: { box: 'w-16 h-16', icon: 36, text: 'text-3xl' },
  }[size];

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="relative">
        <div className={`${dims.box} rounded-2xl bg-gradient-to-br from-sdg-blue via-sdg-teal to-sdg-orange flex items-center justify-center shadow-lg shadow-sdg-blue/30 animate-fade-in`}>
          <Scale size={dims.icon} className="text-white" strokeWidth={2.5} />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sdg-orange flex items-center justify-center animate-pulse-soft">
          <Sparkles size={10} className="text-white" />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`${dims.text} font-extrabold bg-gradient-to-r from-sdg-blue to-sdg-teal bg-clip-text text-transparent`}>
          SDG10
        </span>
        <span className="text-[10px] font-medium text-ink-500 tracking-wide">ASSISTANT</span>
      </div>
    </div>
  );
}
