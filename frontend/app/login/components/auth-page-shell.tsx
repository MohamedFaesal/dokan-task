import type { ReactNode } from "react";
import { AuthPageDecorations } from "./auth-page-decorations";

type AuthPageShellProps = {
  children: ReactNode;
};

export function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <AuthPageDecorations />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6">
        {children}
      </div>
    </div>
  );
}
