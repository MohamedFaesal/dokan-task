import type { ReactNode } from "react";
import { authGlassCardStyle } from "./auth-glass-surface";

type AuthGlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function AuthGlassCard({ children, className = "" }: AuthGlassCardProps) {
  return (
    <div className={`shadow-2xl shadow-black/40 ${className}`.trim()} style={authGlassCardStyle}>
      {children}
    </div>
  );
}
