"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

/**
 * Sign-in and Sign-up page for TaskFlow.
 * Polished for Milestone 9 with consistent branding and UI.
 */
export default function SignIn() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 justify-center items-center px-6 animate-fade-in">
      <Link href="/" className="mb-12 flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95">
        <div className="w-10 h-10 bg-slate-900 dark:bg-slate-100 rounded-xl flex items-center justify-center text-white dark:text-slate-900 font-bold text-xl shadow-lg">
          T
        </div>
        <span className="font-extrabold text-2xl tracking-tighter text-slate-900 dark:text-slate-100">
          TaskFlow
        </span>
      </Link>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {flow === "signIn" ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            {flow === "signIn" 
              ? "Sign in to your account to continue" 
              : "Join the TaskFlow community today"}
          </p>
        </div>

        <form
          className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setError(null);
            const formData = new FormData(e.target as HTMLFormElement);
            formData.set("flow", flow);
            void signIn("password", formData)
              .catch((error) => {
                setError(error.message);
                setLoading(false);
              })
              .then(() => {
                router.push("/app");
              });
          }}
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Email Address</label>
              <input
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl p-4 border-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 outline-none transition-all placeholder:text-slate-400 font-medium"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Password</label>
              <input
                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl p-4 border-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-slate-100 outline-none transition-all placeholder:text-slate-400 font-medium"
                type="password"
                name="password"
                placeholder="••••••••"
                minLength={8}
                required
              />
              {flow === "signUp" && (
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 px-1 uppercase tracking-tighter">
                  Minimum 8 characters required
                </p>
              )}
            </div>
          </div>

          <button
            className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-black rounded-2xl py-4 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : flow === "signIn" ? "Sign In" : "Sign Up"}
          </button>

          <div className="flex flex-row gap-2 text-sm justify-center pt-2 font-medium">
            <span className="text-slate-500">
              {flow === "signIn"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>
            <button
              type="button"
              className="text-slate-900 dark:text-slate-100 font-bold underline decoration-2 underline-offset-4 hover:decoration-slate-400 transition-all cursor-pointer"
              onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
            >
              {flow === "signIn" ? "Sign up" : "Sign in"}
            </button>
          </div>

          {error && (
            <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 rounded-2xl p-4 animate-slide-up">
              <p className="text-rose-600 dark:text-rose-400 font-bold text-xs text-center uppercase tracking-tight">
                {error}
              </p>
            </div>
          )}
        </form>

        <p className="text-center text-[10px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest">
          Secured by Convex Auth
        </p>
      </div>
    </div>
  );
}
