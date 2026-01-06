"use client";

import { cn } from "@/app/lib/utils";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-12">
        <h1 className="text-6xl font-black text-white mb-2 tracking-tighter">
          Cross<span className="text-primary text-neon-teal">Bar</span>
        </h1>
        <p className="text-slate-400 font-medium">テキスト入力ゼロ。組織の壁を越える。</p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Welcome Back</h2>
          
          <form className="space-y-4" action="/map">
            <div className="text-left space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Email</label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-4 text-white focus:border-primary transition-colors outline-none"
              />
            </div>
            <div className="text-left space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl h-14 px-4 text-white focus:border-primary transition-colors outline-none"
              />
            </div>
            <button className="w-full flex items-center justify-center gap-3 bg-primary text-slate-950 h-14 rounded-2xl font-black hover:brightness-110 transition-all active:scale-95 neon-teal mb-4">
              <LogIn size={20} />
              ログイン
            </button>
          </form>
          
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest"><span className="bg-slate-950 px-2 text-slate-600">OR</span></div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 bg-white text-slate-950 h-14 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95 mb-4">
            企業アカウントでSSOログイン
          </button>
          
          <p className="text-[10px] text-slate-500 leading-relaxed">
            このアプリは法人契約済みの企業および招待された経営者のみ利用可能です。
          </p>
        </div>

        <p className="text-sm text-slate-500">
          アカウントをお持ちでないですか？{" "}
          <Link href="/signup" className="text-primary hover:underline font-bold">
            新規登録
          </Link>
        </p>
      </div>

      <Link 
        href="/"
        className="mt-8 text-sm text-slate-500 hover:text-white transition-colors"
      >
        ホームへ戻る
      </Link>
    </main>
  );
}

