import { AppleIcon, FacebookIcon, GoogleIcon } from "./social-icons";

export function LoginSocialButtons() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <button
        type="button"
        className="flex flex-col items-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-800 py-4 text-xs font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-700/80"
      >
        <GoogleIcon />
        Google
      </button>
      <button
        type="button"
        className="flex flex-col items-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-800 py-4 text-xs font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-700/80"
      >
        <FacebookIcon />
        Facebook
      </button>
      <button
        type="button"
        className="flex flex-col items-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-800 py-4 text-xs font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-700/80"
      >
        <AppleIcon />
        Apple
      </button>
    </div>
  );
}
