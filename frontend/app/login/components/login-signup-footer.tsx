import Link from "next/link";

export function LoginSignupFooter() {
  return (
    <p className="text-center text-sm text-zinc-400">
      Don&apos;t have an account?{" "}
      <Link href="/signup" className="font-medium text-indigo-400 transition hover:text-indigo-300">
        Sign Up
      </Link>
    </p>
  );
}
