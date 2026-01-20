import { SignIn } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span>ホームへ</span>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">
          Welcome Back
        </h1>
        <p className="text-slate-400 font-medium">CrossBarにサインインして再開しましょう。</p>
      </div>

      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary hover:brightness-110 text-slate-950 font-black rounded-2xl h-12 transition-all active:scale-95 neon-teal",
            card: "bg-slate-900/50 border border-slate-800 rounded-[2.5rem] backdrop-blur-xl shadow-2xl",
            headerTitle: "text-white font-black",
            headerSubtitle: "text-slate-400",
            socialButtonsBlockButton: "bg-slate-950 border border-slate-800 text-white hover:bg-slate-900 transition-colors rounded-2xl h-12",
            formFieldLabel: "text-xs font-bold text-slate-500 uppercase tracking-widest pl-2",
            formFieldInput: "bg-slate-950 border border-slate-800 rounded-2xl h-12 px-4 text-white focus:border-primary transition-colors outline-none",
            footerActionLink: "text-primary hover:text-teal-400 font-bold",
            identityPreviewText: "text-white",
            identityPreviewEditButtonIcon: "text-primary",
            footer: "hidden" // 独自のフッターを使いたい場合はここを隠す
          }
        }}
      />

      <div className="mt-12 text-center opacity-30">
        <div className="text-2xl font-black text-white tracking-tighter">
          Cross<span className="text-primary">Bar</span>
        </div>
      </div>
    </main>
  );
}
