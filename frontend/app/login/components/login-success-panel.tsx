import type { AuthUserLite } from "@/lib/user-display-name";
import { userFirstNameOrHandle } from "@/lib/user-display-name";
import Link from "next/link";
import { Confetti } from "./confetti";
import { SuccessCheckIcon } from "./success-check-icon";

type LoginSuccessPanelProps = {
  user: AuthUserLite | null;
  loggingOut: boolean;
  onLogout: () => void;
};

export function LoginSuccessPanel({ user, loggingOut, onLogout }: LoginSuccessPanelProps) {
  const name = userFirstNameOrHandle(user);

  return (
    <>
      <Confetti />
      <div className="relative flex flex-col items-center gap-6 text-center">
        <SuccessCheckIcon />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.65rem]">
            Welcome back, {name} 👋
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
            You&apos;ve successfully signed in. Let&apos;s get you back to your dashboard.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:brightness-105"
        >
          Go to My Dashboard
        </Link>
        <button
          type="button"
          onClick={onLogout}
          disabled={loggingOut}
          className="text-sm font-medium text-zinc-400 underline-offset-4 transition hover:text-white hover:underline disabled:opacity-50"
        >
          {loggingOut ? "Signing out…" : "Log out"}
        </button>
      </div>
    </>
  );
}
