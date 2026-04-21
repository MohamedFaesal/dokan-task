"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/lib/auth-storage";

type User = {
  id?: number;
  name?: string;
  email?: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!token || !raw) {
      router.replace("/login");
      setLoading(false);
      return;
    }
    try {
      setUser(JSON.parse(raw) as User);
    } catch {
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        Loading…
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-950 px-4 text-zinc-100">
      <p className="text-lg font-medium">Signed in</p>
      {user.email ? <p className="text-sm text-zinc-400">{user.email}</p> : null}
      <Link
        href="/login/success"
        className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
      >
        Welcome screen
      </Link>
    </div>
  );
}
