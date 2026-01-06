"use client";

import { cn } from "@/app/lib/utils";
import { ChevronLeft, User, Bell, Shield, LogOut } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const sections = [
    { icon: <User size={20} />, label: "プロファイル設定", color: "text-blue-400" },
    { icon: <Bell size={20} />, label: "通知設定", color: "text-amber-400" },
    { icon: <Shield size={20} />, label: "プライバシー設定", color: "text-teal-400" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white pb-24">
      <header className="p-6 flex items-center gap-4">
        <Link href="/" className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">設定</h1>
      </header>

      <div className="p-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden mb-8">
          {sections.map((section, i) => (
            <button 
              key={i}
              className={cn(
                "w-full flex items-center justify-between p-5 hover:bg-slate-800/50 transition-colors",
                i !== sections.length - 1 && "border-b border-slate-800"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center", section.color)}>
                  {section.icon}
                </div>
                <span className="font-medium">{section.label}</span>
              </div>
              <ChevronLeft size={20} className="rotate-180 text-slate-600" />
            </button>
          ))}
        </div>

        <button className="w-full flex items-center gap-4 p-5 bg-pink-500/10 border border-pink-500/20 rounded-3xl text-pink-500 font-bold">
          <LogOut size={20} />
          ログアウト
        </button>
      </div>

      <div className="fixed bottom-0 inset-x-0 p-8 text-center bg-gradient-to-t from-slate-950 to-transparent">
        <p className="text-[10px] text-slate-600 font-mono tracking-widest">
          CROSSBAR v0.1.0-ALPHA
        </p>
      </div>
    </main>
  );
}

