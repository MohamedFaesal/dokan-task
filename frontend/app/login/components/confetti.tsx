const BITS = [
  { t: "12%", l: "18%", bg: "bg-violet-400", s: "h-2 w-2" },
  { t: "8%", l: "42%", bg: "bg-amber-300", s: "h-2.5 w-1.5 rotate-12" },
  { t: "14%", l: "68%", bg: "bg-sky-400", s: "h-1.5 w-2.5 -rotate-6" },
  { t: "22%", l: "28%", bg: "bg-fuchsia-400", s: "h-2 w-2 rounded-sm" },
  { t: "18%", l: "78%", bg: "bg-amber-200", s: "h-2 w-2 rotate-45" },
  { t: "26%", l: "52%", bg: "bg-indigo-300", s: "h-1.5 w-3" },
] as const;

export function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 overflow-hidden" aria-hidden>
      {BITS.map((b, i) => (
        <span
          key={i}
          className={`absolute rounded-full opacity-80 ${b.bg} ${b.s}`}
          style={{ top: b.t, left: b.l }}
        />
      ))}
    </div>
  );
}
