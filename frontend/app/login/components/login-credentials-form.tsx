import { firstFieldError } from "@/lib/form-errors";
import Link from "next/link";
import type { FormEvent } from "react";
import { EyeIcon } from "./social-icons";

export type LoginCredentialsFormProps = {
  email: string;
  password: string;
  showPassword: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  fieldErrors: Record<string, string[]>;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function LoginCredentialsForm({
  email,
  password,
  showPassword,
  isSubmitting,
  submitError,
  fieldErrors,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}: LoginCredentialsFormProps) {
  const emailErr = firstFieldError(fieldErrors, "email");
  const passwordErr = firstFieldError(fieldErrors, "password");

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
      {submitError ? (
        <p
          className="rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-center text-sm text-red-200"
          role="alert"
        >
          {submitError}
        </p>
      ) : null}

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-white">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(ev) => onEmailChange(ev.target.value)}
          className={`w-full rounded-xl border bg-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none ring-indigo-500/0 transition focus:ring-2 focus:ring-indigo-500/30 ${
            fieldErrors.email
              ? "border-red-500/60 focus:border-red-500/50"
              : "border-zinc-700/80 focus:border-indigo-500/50"
          }`}
        />
        {emailErr ? <p className="text-xs text-red-300">{emailErr}</p> : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-semibold text-white">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(ev) => onPasswordChange(ev.target.value)}
            className={`w-full rounded-xl border bg-zinc-800 py-3 pl-4 pr-12 text-sm text-white placeholder:text-zinc-600 outline-none ring-indigo-500/0 transition focus:ring-2 focus:ring-indigo-500/30 ${
              fieldErrors.password
                ? "border-red-500/60 focus:border-red-500/50"
                : "border-zinc-700/80 focus:border-indigo-500/50"
            }`}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-zinc-400 transition hover:bg-zinc-700/60 hover:text-zinc-300"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <EyeIcon off={!showPassword} />
          </button>
        </div>
        {passwordErr ? <p className="text-xs text-red-300">{passwordErr}</p> : null}
      </div>

      <div className="flex justify-end pt-0.5">
        <Link href="/forgot-password" className="text-sm font-medium text-indigo-400 transition hover:text-indigo-300">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !email.trim() || !password}
        className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:brightness-105 enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in…" : "Login"}
      </button>
    </form>
  );
}
