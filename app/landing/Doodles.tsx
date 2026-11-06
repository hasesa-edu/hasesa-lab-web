import { cn } from "@/lib/utils";

// Hand-drawn line art for the workbench. Strokes draw themselves in (.draw),
// then small parts keep moving: radio waves, bubbles, a claw. All decorative.

const line = { fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const amber = { ...line, stroke: "var(--sun)" } as const;
const d = (s: number) => ({ ["--d" as string]: `${s}s` }) as React.CSSProperties;

export function RadioDoodle({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 140 110" overflow="visible" className={cn("doodle", className)}>
      {/* body */}
      <rect x="14" y="52" width="82" height="48" rx="8" pathLength={1} className="draw" style={d(0.2)} {...line} />
      {/* tuning dial and speaker slots */}
      <circle cx="38" cy="76" r="11" pathLength={1} className="draw" style={d(0.8)} {...amber} />
      <path d="M38 69 v7" pathLength={1} className="draw" style={d(1.1)} {...amber} />
      <path d="M60 66 h26 M60 74 h26 M60 82 h26 M60 90 h18" pathLength={1} className="draw" style={d(1)} {...line} />
      {/* coil on the side */}
      <path d="M96 64 c8 0 8 6 0 6 c8 0 8 6 0 6 c8 0 8 6 0 6" pathLength={1} className="draw" style={d(1.3)} {...amber} />
      {/* antenna */}
      <path d="M80 52 L104 12" pathLength={1} className="draw" style={d(0.6)} {...line} />
      <circle cx="104" cy="12" r="3" fill="currentColor" />
      {/* radio waves arriving */}
      <path d="M114 6 q7 6 0 14" className="wave-pulse" style={d(0)} {...amber} />
      <path d="M121 1 q12 11 0 24" className="wave-pulse" style={d(0.5)} {...amber} />
      <path d="M128 -4 q17 16 0 34" className="wave-pulse" style={d(1)} {...amber} />
    </svg>
  );
}

export function BeakerDoodle({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 90 110" overflow="visible" className={cn("doodle", className)}>
      <path
        d="M28 12 h34 M33 12 v34 L14 92 q-3 9 7 9 h48 q10 0 7 -9 L57 46 v-34"
        pathLength={1}
        className="draw"
        style={d(0.3)}
        {...line}
      />
      {/* liquid line and a pH scale tick */}
      <path d="M22 74 q11 -5 23 0 t23 0" pathLength={1} className="draw" style={d(1)} {...amber} />
      <path d="M62 30 h8 M62 38 h5 M62 46 h8" pathLength={1} className="draw" style={d(1.2)} {...line} />
      <circle cx="35" cy="88" r="3" className="bubble" style={d(0)} {...amber} />
      <circle cx="47" cy="92" r="2.5" className="bubble" style={d(0.9)} {...amber} />
      <circle cx="56" cy="87" r="2" className="bubble" style={d(1.7)} {...amber} />
    </svg>
  );
}

export function ClawDoodle({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 110" overflow="visible" className={cn("doodle", className)}>
      {/* arm and wrist */}
      <path d="M8 26 h52 q8 0 8 8 v6 q0 8 -8 8 h-52" pathLength={1} className="draw" style={d(0.2)} {...line} />
      {/* tendons (strings) */}
      <path d="M14 33 h62 M14 41 h62" pathLength={1} className="draw" style={d(0.7)} {...amber} />
      {/* jaws */}
      <g className="claw-jaw" style={{ ["--o" as string]: "left center" }}>
        <path d="M68 30 q22 -8 32 6 q-12 -4 -24 6" pathLength={1} className="draw" style={d(1)} {...line} />
      </g>
      <g className="claw-jaw flip" style={{ ["--o" as string]: "left center" }}>
        <path d="M68 44 q22 8 32 -6 q-12 4 -24 -6" pathLength={1} className="draw" style={d(1.1)} {...line} />
      </g>
      {/* the signal from a muscle */}
      <path d="M8 80 h14 l5 -14 l6 26 l6 -32 l6 28 l5 -8 h22" pathLength={1} className="draw" style={d(1.3)} {...amber} />
    </svg>
  );
}
