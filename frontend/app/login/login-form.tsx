"use client";

import { loginRequest } from "@/lib/api";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/lib/auth-storage";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState, type FormEvent } from "react";
import { AuthGlassCard } from "./components/auth-glass-card";
import { AuthPageShell } from "./components/auth-page-shell";
import { LoginCredentialsForm } from "./components/login-credentials-form";
import { LoginDivider } from "./components/login-divider";
import { LoginFormHeader } from "./components/login-form-header";
import { LoginSignupFooter } from "./components/login-signup-footer";
import { LoginSocialButtons } from "./components/login-social-buttons";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (localStorage.getItem(AUTH_TOKEN_KEY)) {
      router.replace("/login/success");
    }
  }, [router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !password) {
      return;
    }
    setSubmitError(null);
    setFieldErrors({});
    setIsSubmitting(true);
    try {
      const result = await loginRequest(email.trim(), password);
      if (!result.ok) {
        if (result.data.errors) {
          setFieldErrors(result.data.errors);
        }
        setSubmitError(result.data.message ?? "Could not sign in.");
        return;
      }
      localStorage.setItem(AUTH_TOKEN_KEY, result.data.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(result.data.user));
      router.replace("/login/success");
      router.refresh();
    } catch {
      setSubmitError("Network error. Is the API running?");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthPageShell>
      <AuthGlassCard className="flex w-full max-w-[464px] min-h-[670px] flex-col gap-6 py-12 px-6">
        <LoginFormHeader />
        <LoginCredentialsForm
          email={email}
          password={password}
          showPassword={showPassword}
          isSubmitting={isSubmitting}
          submitError={submitError}
          fieldErrors={fieldErrors}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onTogglePassword={() => setShowPassword((v) => !v)}
          onSubmit={handleSubmit}
        />
        <LoginDivider />
        <LoginSocialButtons />
        <LoginSignupFooter />
      </AuthGlassCard>
    </AuthPageShell>
  );
}
