import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-zinc-300">
      <p className="text-lg text-white">Forgot password</p>
      <p className="mt-2 text-sm text-zinc-500">This page is a placeholder.</p>
      <Link href="/login" className="mt-6 text-sm font-medium text-indigo-400 hover:text-indigo-300">
        Back to login
      </Link>
    </div>
  );
}
