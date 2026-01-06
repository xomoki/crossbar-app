"use client";

import { cn } from "@/app/lib/utils";
import { 
  MapPin, 
  Zap, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquareOff,
  Building,
  UserCheck,
  TrendingUp,
  Lock,
  Smartphone
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const features = [
    {
      icon: <MessageSquareOff size={28} />,
      title: "Zero-Text Coordination",
      description: "「なんて誘おう？」という悩みから解放されます。タップ一つで「一杯どう？」「相談したい」の意思表示が完了します。",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "hover:border-primary/50"
    },
    {
      icon: <Zap size={28} />,
      title: "AI Smart Spotlight",
      description: "AIがあなたの興味関心や過去の交流を分析。マップ上で「今会うべき人」をスポットライトで強調表示します。",
      color: "text-teal-400",
      bg: "bg-teal-500/10",
      border: "hover:border-teal-500/50"
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Visibility Matrix",
      description: "関係性に応じて位置情報の精度を自動調整。社外の人には「エリア」で、同僚には「ピンポイント」で。プライバシーも万全。",
      color: "text-secondary",
      bg: "bg-secondary/10",
      border: "hover:border-secondary/50"
    }
  ];

  const enterpriseFeatures = [
    "部署を超えたメンタリングの活性化",
    "若手社員の離職率低下とエンゲージメント向上",
    "社外の経営層との高品質なビジネスマッチング",
    "組織活性化度を可視化する分析ダッシュボード"
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Check Status",
      description: "アプリを開いて、近くにいるメンバーや経営者のステータスを確認。「一杯飲も」「相談受付中」などの気分が一目でわかります。"
    },
    {
      step: "02",
      title: "One-Tap Offer",
      description: "気になる相手にタップでオファー。面倒な日程調整や場所決めチャットは不要。その瞬間の熱量で繋がります。"
    },
    {
      step: "03",
      title: "Offline Match",
      description: "相手がOKすればマッチング成立。24時間限定のチャットで合流場所を決めて、リアルな交流を楽しみましょう。"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-primary/30">
      {/* ナビゲーション */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity">
            Cross<span className="text-primary text-neon-teal">Bar</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">機能</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">使い方</a>
            <a href="#enterprise" className="hover:text-white transition-colors">法人向け</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold hover:text-primary transition-colors">
              ログイン
            </Link>
            <Link 
              href="/signup" 
              className="bg-white text-slate-950 px-6 py-2.5 rounded-full text-sm font-black hover:bg-slate-200 transition-all active:scale-95 shadow-lg shadow-white/10"
            >
              無料で始める
            </Link>
          </div>
        </div>
      </nav>

      {/* ヒーローセクション */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Zap size={14} className="text-amber-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">The Future of Offline Networking</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
            テキスト入力ゼロ。<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-secondary">
              「今近くにいる」
            </span>
            を価値に変える。
          </h1>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            もう「なんて誘おうか」迷う必要はありません。<br />
            CrossBarは、位置情報とAIを組み合わせた、最もスマートなオフライン回帰SNSです。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/signup" 
              className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 neon-teal shadow-xl shadow-primary/20"
            >
              今すぐ登録する <ArrowRight size={20} />
            </Link>
            <Link 
              href="/map" 
              className="w-full sm:w-auto px-10 py-5 bg-slate-900 border border-slate-800 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all"
            >
              マップを試す
            </Link>
          </div>

          {/* 統計データ */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-10 opacity-70">
            {[
              { label: "Active Users", value: "12,000+" },
              { label: "Matches / Night", value: "850+" },
              { label: "Partner Venues", value: "140+" },
              { label: "Retention Rate", value: "94%" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* アプリ画面プレビュー */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-10 pointer-events-none" />
          <div className="flex justify-center gap-8 -rotate-6 scale-90 md:scale-100 opacity-80 hover:opacity-100 transition-opacity duration-700">
            {/* 疑似モックアップ (左) */}
            <div className="w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden relative translate-y-12 opacity-50">
               <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-slate-700">
                 <UserCheck size={48} className="mb-4" />
                 <div className="font-bold">PROFILE VIEW</div>
               </div>
            </div>
            {/* 疑似モックアップ (中央・メイン) */}
            <div className="w-[320px] h-[640px] bg-slate-950 rounded-[3.5rem] border-8 border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden relative z-20 neon-teal">
              <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 rounded-b-2xl z-30 mx-16" />
              {/* マップ画面の簡易再現 */}
              <div className="absolute inset-0 bg-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center text-3xl shadow-[0_0_30px_#2dd4bf]">🍸</div>
                <div className="absolute bottom-8 inset-x-4 flex gap-2 justify-center">
                  {['🍸','👂','🤝','💬'].map(icon => (
                    <div key={icon} className="w-12 h-12 rounded-2xl bg-slate-800/80 backdrop-blur flex items-center justify-center text-xl">{icon}</div>
                  ))}
                </div>
              </div>
            </div>
            {/* 疑似モックアップ (右) */}
            <div className="w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden relative translate-y-12 opacity-50">
               <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-slate-700">
                 <MessageSquareOff size={48} className="mb-4" />
                 <div className="font-bold">CHAT VIEW</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section id="features" className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6">「誘う」ストレスをゼロに。</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              仕事終わりや会食後の「もう一軒」を、もっとスマートに。
              最新の技術が、あなたの夜をよりクリエイティブなものに変えます。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className={`p-8 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] transition-colors group ${feature.border}`}>
                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">3 Steps to Connect</h2>
            <p className="text-slate-400">使い方は驚くほどシンプルです。</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* 連結線 (デスクトップのみ) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 -z-10" />
            
            {howItWorks.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-black text-slate-800 mb-6 opacity-50">{step.step}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 法人向けセクション */}
      <section id="enterprise" className="py-24 px-6 relative overflow-hidden bg-slate-900/20 border-y border-slate-800/50">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full -z-10" />
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full mb-6 border border-secondary/20">
              FOR ENTERPRISE
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
              企業の「縦割り」を<br />
              <span className="text-secondary">偶発的な交流</span>で壊す。
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              リモートワークと組織拡大によって失われた「タテ・ヨコ・ナナメ」のつながりを、
              CrossBarが再構築します。福利厚生としても導入可能です。
            </p>
            <div className="space-y-4 mb-10">
              {enterpriseFeatures.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
                  <CheckCircle2 size={20} className="text-secondary shrink-0" />
                  <span className="text-sm font-bold text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/signup" 
                className="px-8 py-4 bg-white text-slate-950 rounded-xl font-bold hover:bg-slate-200 transition-colors text-center"
              >
                資料を請求する
              </Link>
              <Link 
                href="/signup" 
                className="px-8 py-4 bg-transparent border border-slate-700 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors text-center"
              >
                導入事例を見る
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md aspect-square bg-slate-900 border border-slate-800 rounded-[3rem] p-8 flex flex-col items-center justify-center relative group overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950" />
            
            {/* 簡易ダッシュボードUI */}
            <div className="relative w-full h-full flex flex-col gap-4 opacity-80">
              <div className="flex gap-4 mb-4">
                <div className="flex-1 h-24 bg-slate-800 rounded-2xl border border-slate-700/50 p-4">
                  <TrendingUp className="text-secondary mb-2" size={20} />
                  <div className="text-xs text-slate-500">ENGAGEMENT</div>
                  <div className="text-xl font-bold text-white">+145%</div>
                </div>
                <div className="flex-1 h-24 bg-slate-800 rounded-2xl border border-slate-700/50 p-4">
                  <Users className="text-primary mb-2" size={20} />
                  <div className="text-xs text-slate-500">MATCHES</div>
                  <div className="text-xl font-bold text-white">2,840</div>
                </div>
              </div>
              <div className="flex-1 bg-slate-800 rounded-2xl border border-slate-700/50 p-4 flex items-center justify-center">
                 <div className="text-center">
                   <div className="text-xs text-slate-500 mb-2 font-mono uppercase">Cross-Department Map</div>
                   <div className="w-32 h-32 rounded-full border-4 border-slate-700 flex items-center justify-center relative">
                     <div className="absolute inset-0 rounded-full border-t-4 border-secondary animate-spin duration-3000" />
                     <div className="text-2xl font-black text-slate-600">AI</div>
                   </div>
                 </div>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* セキュリティ信頼性 */}
      <section className="py-20 px-6 bg-black text-center">
        <div className="max-w-3xl mx-auto">
          <Lock className="mx-auto text-slate-500 mb-6" size={40} />
          <h2 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h2>
          <p className="text-slate-400 mb-8">
            CrossBarは、位置情報の暗号化、企業ドメイン認証、24時間ごとのデータ破棄など、
            最高水準のセキュリティとプライバシー保護を徹底しています。
          </p>
          <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            {/* 信頼性ロゴ（プレースホルダー） */}
            <div className="h-8 w-24 bg-slate-800 rounded" />
            <div className="h-8 w-24 bg-slate-800 rounded" />
            <div className="h-8 w-24 bg-slate-800 rounded" />
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-20 px-6 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <div className="text-2xl font-black mb-6">CrossBar</div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed mb-6">
              テキスト入力ゼロで、組織の壁と孤独を越える。
              日本から世界へ、オフライン交流の再定義。
            </p>
            <div className="flex gap-4">
               <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">𝕏</a>
               <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">In</a>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-24">
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-white transition-colors">機能紹介</a></li>
                <li><a href="#" className="hover:text-white transition-colors">料金プラン</a></li>
                <li><a href="#" className="hover:text-white transition-colors">モバイルアプリ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-white transition-colors">ミッション</a></li>
                <li><a href="#" className="hover:text-white transition-colors">キャリア</a></li>
                <li><a href="#" className="hover:text-white transition-colors">お問い合わせ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-white transition-colors">利用規約</a></li>
                <li><a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-white transition-colors">特定商取引法</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">© 2026 CrossBar Inc. All rights reserved.</p>
          <div className="flex gap-2 text-xs text-slate-600">
             <span>Made with 🍸 in Tokyo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
