export function AuthPageDecorations() {
  return (
    <>
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[min(520px,55vh)] w-[min(520px,70vw)] rounded-full bg-cyan-500/25 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 top-0 h-[min(480px,50vh)] w-[min(480px,65vw)] rounded-full bg-indigo-600/30 blur-[100px]" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] overflow-hidden opacity-70"
        aria-hidden
      >
        <div
          className="absolute left-1/2 h-[140%] w-[180%] max-w-[1400px] -translate-x-1/2 [transform-origin:bottom_center] [transform:perspective(900px)_rotateX(72deg)]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage: "linear-gradient(to bottom, transparent, black 20%)",
          }}
        />
      </div>
    </>
  );
}
