import { DokanLogoMark } from "./dokan-logo-mark";

export function LoginFormHeader() {
  return (
    <div className="text-center">
      <DokanLogoMark className="mx-auto" />
      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-[1.65rem]">Welcome Back!</h1>
      <p className="mt-2 text-sm text-zinc-400">Glad to see you again, sign in to continue.</p>
    </div>
  );
}
