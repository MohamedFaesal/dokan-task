export function LoginDivider() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <div className="w-full border-t border-zinc-800" />
      </div>
      <div className="relative flex justify-center text-xs uppercase tracking-wide">
        <span className="bg-[#242424] px-3 text-zinc-500">Or login with</span>
      </div>
    </div>
  );
}
