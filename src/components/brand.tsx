import mark from "@/assets/arimarun-mark.png";

export function BrandMark({ className = "h-7 w-7" }: { className?: string }) {
  return <img src={mark} alt="ArimaRun" className={className} />;
}

export function BrandLockup({ subtitle = "One-Click AI Workspace" }: { subtitle?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <BrandMark className="h-8 w-8" />
      <div className="leading-tight">
        <div className="text-base font-bold tracking-tight">
          <span className="text-primary dark:text-foreground">Arima</span>
          <span className="text-accent">Run</span>
        </div>
        <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
