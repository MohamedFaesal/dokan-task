export type AuthUserLite = {
  name?: string;
  email?: string;
};

export function userFirstNameOrHandle(user: AuthUserLite | null): string {
  if (!user) {
    return "there";
  }
  if (user.name?.trim()) {
    const first = user.name.trim().split(/\s+/)[0];
    return first ?? "there";
  }
  if (user.email) {
    return user.email.split("@")[0] ?? "there";
  }
  return "there";
}
