"use client";

import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

/**
 * Landing page for TaskFlow.
 * Polished for Milestone 9 with feature highlights and clear CTAs.
 */
export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  // Redirect authenticated users to the app
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/app");
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
          <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 selection:bg-slate-200 dark:selection:bg-slate-800">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center text-white dark:text-slate-900 font-bold text-lg">
              T
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-slate-100">
              TaskFlow
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Features</a>
            <a href="https://docs.convex.dev" target="_blank" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Docs</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              href="/signin" 
              className="text-sm font-bold text-slate-900 dark:text-slate-100 hover:opacity-70 transition-opacity"
            >
              Sign In
            </Link>
            <Link 
              href="/signin" 
              className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-5 py-2 rounded-full text-sm font-bold hover:shadow-lg hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <section className="max-w-7xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
            Simple. Social. Productive.
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-slate-100 tracking-tighter leading-[1.1]">
            Organize your life <br className="hidden md:block" />
            <span className="text-slate-400 dark:text-slate-600">with zero friction.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium">
            The multi-user task manager built for speed. Toggle between List and Kanban, share tasks with friends, and stay focused on what matters.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/signin" 
              className="w-full sm:w-auto bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-xl hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              Start for Free
            </Link>
            <a 
              href="https://github.com/convex-dev/convex-auth" 
              target="_blank"
              className="w-full sm:w-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
            >
              Learn about Convex Auth
            </a>
          </div>

          {/* Mock Preview */}
          <div className="relative mt-20 max-w-5xl mx-auto p-4 bg-slate-100/50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm animate-slide-up">
            <div className="overflow-hidden rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col aspect-video md:aspect-[21/9]">
              <div className="h-10 border-b border-slate-100 dark:border-slate-800 flex items-center px-4 gap-2 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="mx-auto w-1/3 h-4 bg-slate-100 dark:bg-slate-800 rounded-full" />
              </div>
              <div className="flex-1 p-8 grid grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2" />
                  <div className="space-y-2">
                    <div className="h-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl" />
                    <div className="h-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2" />
                  <div className="space-y-2">
                    <div className="h-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl ring-2 ring-slate-200 dark:ring-slate-700 shadow-sm" />
                    <div className="h-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2" />
                  <div className="space-y-2">
                    <div className="h-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl" />
                    <div className="h-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="max-w-7xl mx-auto py-32 grid md:grid-cols-3 gap-12">
          <FeatureCard 
            icon="📋" 
            title="List & Kanban" 
            description="Switch between views seamlessly. Manage tasks your way, whether you prefer structured lists or visual boards." 
          />
          <FeatureCard 
            icon="👥" 
            title="Smart Sharing" 
            description="Collaborate instantly. Share individual tasks with any user in the directory with proper access controls." 
          />
          <FeatureCard 
            icon="🔒" 
            title="Secure by Convex" 
            description="Built on Convex's real-time engine with top-tier security and role-based permissions baked in." 
          />
        </section>

        {/* CTA Footer */}
        <section className="max-w-4xl mx-auto bg-slate-900 dark:bg-slate-100 rounded-[3rem] p-12 md:p-20 text-center space-y-8 shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-black text-white dark:text-slate-900 tracking-tight">
            Ready to get organized?
          </h2>
          <p className="text-slate-400 dark:text-slate-600 font-medium text-lg">
            Join thousands of users who manage their tasks with TaskFlow. <br className="hidden sm:block" />
            Simple setup, zero maintenance.
          </p>
          <div className="pt-4">
            <Link 
              href="/signin" 
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-10 py-4 rounded-2xl text-xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-100 dark:border-slate-900 flex flex-col md:row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-slate-900 dark:bg-slate-100 rounded flex items-center justify-center text-white dark:text-slate-900 font-bold text-xs">
            T
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100">
            TaskFlow
          </span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-500">
          Built with Convex, Next.js, and Tailwind CSS.
        </p>
        <div className="flex gap-6 text-sm font-medium text-slate-400 dark:text-slate-500">
          <Link href="https://convex.dev" target="_blank" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Convex</Link>
          <Link href="https://nextjs.org" target="_blank" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Next.js</Link>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="space-y-4 group">
      <div className="text-4xl">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-slate-500 transition-colors">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
}
