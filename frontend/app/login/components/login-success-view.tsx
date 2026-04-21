"use client";

import { logoutRequest } from "@/lib/api";
import { AUTH_USER_KEY, clearAuth, getAuthToken } from "@/lib/auth-storage";
import type { AuthUserLite } from "@/lib/user-display-name";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { AuthGlassCard } from "./auth-glass-card";
import { AuthPageShell } from "./auth-page-shell";
import { LoginSuccessPanel } from "./login-success-panel";

export function LoginSuccessView() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUserLite | null>(null);
  const [ready, setReady] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useLayoutEffect(() => {
    const token = getAuthToken();
    const raw = typeof window !== "undefined" ? localStorage.getItem(AUTH_USER_KEY) : null;
    if (!token || !raw) {
      router.replace("/login");
      return;
    }
    try {
      setUser(JSON.parse(raw) as AuthUserLite);
    } catch {
      clearAuth();
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);
    const token = getAuthToken();
    if (token) {
      await logoutRequest(token).catch(() => {});
    }
    clearAuth();
    router.replace("/login");
    router.refresh();
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        Loading…
      </div>
    );
  }

  return (
    <AuthPageShell>
      <AuthGlassCard className="relative w-full max-w-[464px] px-8 py-12 sm:px-10 sm:py-14">
        <LoginSuccessPanel user={user} loggingOut={loggingOut} onLogout={handleLogout} />
      </AuthGlassCard>
    </AuthPageShell>
  );
}
