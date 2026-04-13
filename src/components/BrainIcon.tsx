import { motion } from "framer-motion";

interface BrainIconProps {
  size?: number;
  className?: string;
  spinning?: boolean;
}

// Neuron coordinates for healthy (left) side
const healthyNeurons = [
  { cx: 90, cy: 120 },
  { cx: 130, cy: 85 },
  { cx: 75, cy: 165 },
  { cx: 145, cy: 150 },
  { cx: 110, cy: 200 },
  { cx: 60, cy: 210 },
  { cx: 155, cy: 110 },
  { cx: 95, cy: 240 },
];

// Connections between healthy neurons (pairs of indices)
const healthyConnections = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 4],
  [4, 5], [1, 6], [4, 7], [2, 5], [3, 6],
];

// Neuron coords for affected (right) side
const affectedNeurons = [
  { cx: 230, cy: 110 },
  { cx: 265, cy: 85 },
  { cx: 245, cy: 160 },
  { cx: 215, cy: 195 },
  { cx: 255, cy: 210 },
];

const affectedConnections = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 2],
];

// Magnifier neuron nodes (clipped inside lens)
const magNeurons = [
  { cx: 195, cy: 155 },
  { cx: 215, cy: 140 },
  { cx: 210, cy: 165 },
  { cx: 225, cy: 160 },
  { cx: 200, cy: 175 },
  { cx: 220, cy: 178 },
];

export default function BrainIcon({ size = 300, className = "", spinning = false }: BrainIconProps) {
  const scale = size / 320;

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
      animate={spinning ? { rotate: 360 } : {}}
      transition={spinning ? { duration: 8, repeat: Infinity, ease: "linear" } : {}}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsla(199,89%,55%,0.12) 0%, hsla(263,55%,60%,0.06) 60%, transparent 80%)",
        }}
      />

      <svg
        viewBox="0 0 320 320"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "relative", zIndex: 1 }}
      >
        <defs>
          {/* Clip path for left brain */}
          <clipPath id="leftBrainClip">
            <rect x="0" y="0" width="160" height="320" />
          </clipPath>
          {/* Clip path for right brain */}
          <clipPath id="rightBrainClip">
            <rect x="160" y="0" width="160" height="320" />
          </clipPath>
          {/* Magnifier clip */}
          <clipPath id="magClip">
            <circle cx="210" cy="162" r="32" />
          </clipPath>

          {/* Healthy gradient */}
          <radialGradient id="healthyGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(199,89%,70%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(199,89%,48%)" stopOpacity="0.08" />
          </radialGradient>

          {/* Affected gradient */}
          <radialGradient id="affectedGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(263,55%,70%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(263,55%,60%)" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* ── BRAIN OUTLINE ────────────────────────────────── */}
        {/* Left half (healthy) */}
        <g clipPath="url(#leftBrainClip)">
          <ellipse cx="160" cy="175" rx="120" ry="130" fill="url(#healthyGrad)" stroke="hsl(199,89%,48%)" strokeWidth="2" />
          {/* Brain fold curves */}
          <path d="M 80 120 Q 115 105 140 125" stroke="hsl(199,89%,55%)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 70 155 Q 110 140 145 158" stroke="hsl(199,89%,55%)" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 75 190 Q 115 175 148 193" stroke="hsl(199,89%,55%)" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M 85 225 Q 120 210 150 228" stroke="hsl(199,89%,55%)" strokeWidth="1.5" fill="none" opacity="0.4" />
        </g>

        {/* Right half (affected) */}
        <g clipPath="url(#rightBrainClip)">
          <ellipse cx="160" cy="175" rx="120" ry="130" fill="url(#affectedGrad)" stroke="hsl(263,55%,60%)" strokeWidth="2" />
          {/* Brain fold curves - fewer, dashed */}
          <path d="M 172 120 Q 205 105 240 120" stroke="hsl(263,55%,60%)" strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="4 3" />
          <path d="M 170 158 Q 208 143 245 158" stroke="hsl(263,55%,60%)" strokeWidth="1.5" fill="none" opacity="0.35" strokeDasharray="4 3" />
          <path d="M 172 195 Q 210 180 245 195" stroke="hsl(263,55%,60%)" strokeWidth="1.5" fill="none" opacity="0.3" strokeDasharray="4 3" />
        </g>

        {/* Center dividing line */}
        <line x1="160" y1="48" x2="160" y2="302" stroke="hsl(var(--border))" strokeWidth="1.5" opacity="0.6" />

        {/* ── HEALTHY NEURONS (LEFT) ───────────────────────── */}
        {healthyConnections.map(([a, b], i) => (
          <motion.line
            key={`hc-${i}`}
            x1={healthyNeurons[a].cx}
            y1={healthyNeurons[a].cy}
            x2={healthyNeurons[b].cx}
            y2={healthyNeurons[b].cy}
            stroke="hsl(199,89%,55%)"
            strokeWidth="1"
            animate={{ strokeOpacity: [0.6, 1, 0.3, 0.9, 0.6] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {healthyNeurons.map((n, i) => (
          <motion.circle
            key={`hn-${i}`}
            cx={n.cx}
            cy={n.cy}
            r="4"
            fill="hsl(199,89%,60%)"
            animate={{ r: [3.5, 5, 3.5], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* ── AFFECTED NEURONS (RIGHT) ─────────────────────── */}
        {affectedConnections.map(([a, b], i) => (
          <motion.line
            key={`ac-${i}`}
            x1={affectedNeurons[a].cx}
            y1={affectedNeurons[a].cy}
            x2={affectedNeurons[b].cx}
            y2={affectedNeurons[b].cy}
            stroke="hsl(263,55%,65%)"
            strokeWidth="1"
            strokeDasharray="3 2"
            animate={{ strokeOpacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {affectedNeurons.map((n, i) => (
          <motion.circle
            key={`an-${i}`}
            cx={n.cx}
            cy={n.cy}
            r="3"
            fill="hsl(263,55%,65%)"
            animate={{ r: [2.5, 3.5, 2.5], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* ── CIRCUIT LINES ────────────────────────────────── */}
        {[
          "M 42 140 L 42 100 L 75 100",
          "M 278 145 L 278 105 L 245 105",
          "M 55 240 L 55 280 L 90 280",
          "M 265 238 L 265 278 L 230 278",
        ].map((d, i) => (
          <motion.path
            key={`cl-${i}`}
            d={d}
            stroke="hsl(174,72%,45%)"
            strokeWidth="1.5"
            fill="none"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {/* Circuit endpoint dots */}
        {[
          { cx: 42, cy: 140 }, { cx: 278, cy: 145 },
          { cx: 55, cy: 240 }, { cx: 265, cy: 238 },
        ].map((p, i) => (
          <motion.circle
            key={`cd-${i}`}
            cx={p.cx}
            cy={p.cy}
            r="3"
            fill="hsl(174,72%,45%)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5 + i * 0.3, repeat: Infinity }}
          />
        ))}

        {/* ── MAGNIFYING GLASS ─────────────────────────────── */}
        <motion.g
          animate={{ rotate: [-3, 3, -3], x: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "210px", originY: "162px" }}
        >
          {/* Lens dark background */}
          <circle cx="210" cy="162" r="32" fill="hsl(var(--background))" opacity="0.85" />
          {/* Magnifier neuron connections inside lens */}
          <g clipPath="url(#magClip)">
            {[
              [0, 1], [1, 2], [2, 3], [3, 5], [4, 5], [0, 4],
            ].map(([a, b], i) => (
              <motion.line
                key={`mg-${i}`}
                x1={magNeurons[a].cx}
                y1={magNeurons[a].cy}
                x2={magNeurons[b].cx}
                y2={magNeurons[b].cy}
                stroke="hsl(174,72%,45%)"
                strokeWidth="1"
                animate={{ strokeOpacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5 + i * 0.2, repeat: Infinity }}
              />
            ))}
            {magNeurons.map((n, i) => (
              <motion.circle
                key={`mn-${i}`}
                cx={n.cx}
                cy={n.cy}
                r="3"
                fill="hsl(174,72%,55%)"
                animate={{ r: [2.5, 4, 2.5] }}
                transition={{ duration: 1.2 + i * 0.15, repeat: Infinity }}
              />
            ))}
          </g>
          {/* Glass ring */}
          <circle
            cx="210"
            cy="162"
            r="32"
            fill="none"
            stroke="hsl(199,89%,55%)"
            strokeWidth="3"
          />
          {/* Handle */}
          <line
            x1="234"
            y1="186"
            x2="252"
            y2="204"
            stroke="hsl(199,89%,55%)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </motion.g>

        {/* ── FLOATING PARTICLES ───────────────────────────── */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const r = 148;
          const cx = 160 + r * Math.cos(angle);
          const cy = 175 + r * Math.sin(angle);
          const isBlue = i % 2 === 0;
          return (
            <motion.circle
              key={`fp-${i}`}
              cx={cx}
              cy={cy}
              r="3"
              fill={isBlue ? "hsl(199,89%,60%)" : "hsl(263,55%,65%)"}
              animate={{ cy: [cy - 6, cy + 6, cy - 6], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2.5 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
          );
        })}

        {/* ── PULSING RINGS ────────────────────────────────── */}
        <motion.circle
          cx="160"
          cy="175"
          r="140"
          fill="none"
          stroke="hsl(199,89%,55%)"
          strokeWidth="1"
          animate={{ r: [130, 148, 130], opacity: [0.15, 0.05, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="160"
          cy="175"
          r="155"
          fill="none"
          stroke="hsl(263,55%,60%)"
          strokeWidth="0.8"
          animate={{ r: [148, 162, 148], opacity: [0.1, 0.03, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}
