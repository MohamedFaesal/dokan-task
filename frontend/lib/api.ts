/** Laravel API base (no trailing slash). */
export const API_BASE =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
    : "http://127.0.0.1:8000";

export type LoginSuccess = {
  user: Record<string, unknown>;
  token: string;
  token_type?: string;
};

export type LoginErrorBody = {
  message?: string;
  errors?: Record<string, string[]>;
};

export async function loginRequest(
  email: string,
  password: string
): Promise<{ ok: true; data: LoginSuccess } | { ok: false; status: number; data: LoginErrorBody }> {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = (await res.json().catch(() => ({}))) as LoginSuccess & LoginErrorBody;

  if (!res.ok) {
    return { ok: false, status: res.status, data };
  }

  return { ok: true, data: data as LoginSuccess };
}

export async function logoutRequest(token: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/api/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.ok;
}
