"use client";

import { cn } from "@/app/lib/utils";
import { UserPlus, Mail, Building, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // 擬似的な遅延
    setTimeout(() => {
      setLoading(false);
      router.push("/map");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span>ホームへ</span>
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">
          Create Account
        </h1>
        <p className="text-slate-400 font-medium">CrossBarでオフラインの可能性を広げよう。</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
          <div className="flex justify-center gap-2 mb-8">
            <div className={cn("w-2 h-2 rounded-full", step === 1 ? "bg-primary neon-teal" : "bg-slate-700")} />
            <div className={cn("w-2 h-2 rounded-full", step === 2 ? "bg-primary neon-teal" : "bg-slate-700")} />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {step === 1 ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-left space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="山田 太郎" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 pl-12 pr-4 text-white focus:border-primary transition-colors outline-none"
                    />
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
                  </div>
                </div>
                <div className="text-left space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Work Email</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="name@company.com" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 pl-12 pr-4 text-white focus:border-primary transition-colors outline-none"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full flex items-center justify-center gap-3 bg-primary text-slate-950 h-14 rounded-2xl font-black hover:brightness-110 transition-all active:scale-95 neon-teal"
                >
                  次へ進む
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-left space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-4 text-white focus:border-primary transition-colors outline-none"
                  />
                </div>
                <div className="text-left space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Role</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-4 text-white focus:border-primary transition-colors outline-none appearance-none">
                    <option value="employee">従業員 (Employee)</option>
                    <option value="executive">経営層 (Executive)</option>
                  </select>
                </div>
                <button 
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-primary text-slate-950 h-14 rounded-2xl font-black hover:brightness-110 transition-all active:scale-95 neon-teal disabled:opacity-50"
                >
                  {loading ? "作成中..." : "アカウントを作成"}
                </button>
              </div>
            )}
          </form>
          
          <p className="mt-8 text-[10px] text-slate-500 leading-relaxed uppercase tracking-wider">
            By creating an account, you agree to our <br />
            <span className="text-slate-400">Terms of Service</span> and <span className="text-slate-400">Privacy Policy</span>.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          既にアカウントをお持ちですか？{" "}
          <Link href="/login" className="text-primary hover:underline font-bold">
            ログイン
          </Link>
        </p>
      </div>

      <div className="mt-12 text-center opacity-30">
        <div className="text-2xl font-black text-white tracking-tighter">
          Cross<span className="text-primary">Bar</span>
        </div>
      </div>
    </main>
  );
}

