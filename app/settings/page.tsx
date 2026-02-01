"use client";

import { cn } from "@/app/lib/utils";
import { ChevronLeft, User, Bell, Shield, LogOut, ToggleLeft, ToggleRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@clerk/nextjs";

export default function SettingsPage() {
  const { user } = useUser();
  const supabase = createClient();
  const [settings, setSettings] = useState({
    notifications: true,
    locationSharing: true
  });
  const [profile, setProfile] = useState({
    fullName: "",
    status: "Drink",
    companyName: "",
    position: "",
    bio: "",
    xUrl: "",
    facebookUrl: "",
    linkedinUrl: "",
    youtrustUrl: ""
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchSettings = async () => {
        const { data } = await supabase
          .from('users')
          .select('is_notification_enabled, is_location_sharing_enabled, full_name, status, company_name, position, bio, x_url, facebook_url, linkedin_url, youtrust_url')
          .eq('clerk_user_id', user.id)
          .single();
          
        if (data) {
            setSettings({
                notifications: data.is_notification_enabled ?? true,
                locationSharing: data.is_location_sharing_enabled ?? true
            });
            setProfile({
                fullName: data.full_name ?? user.fullName ?? "",
                status: data.status ?? "Drink",
                companyName: data.company_name ?? "",
                position: data.position ?? "",
                bio: data.bio ?? "",
                xUrl: data.x_url ?? "",
                facebookUrl: data.facebook_url ?? "",
                linkedinUrl: data.linkedin_url ?? "",
                youtrustUrl: data.youtrust_url ?? ""
            });
        }
        setLoading(false);
    };
    fetchSettings();
  }, [user, supabase]);

  const toggleSetting = async (key: 'notifications' | 'locationSharing') => {
      const newVal = !settings[key];
      setSettings(prev => ({ ...prev, [key]: newVal }));
      
      if (!user) return;
      
      const update = key === 'notifications' 
        ? { is_notification_enabled: newVal } 
        : { is_location_sharing_enabled: newVal };
        
      await supabase.from('users').update(update).eq('clerk_user_id', user.id);
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);
    await supabase
      .from('users')
      .update({
        full_name: profile.fullName,
        status: profile.status,
        company_name: profile.companyName,
        position: profile.position,
        bio: profile.bio,
        x_url: profile.xUrl,
        facebook_url: profile.facebookUrl,
        linkedin_url: profile.linkedinUrl,
        youtrust_url: profile.youtrustUrl
      })
      .eq('clerk_user_id', user.id);
    setIsEditingProfile(false);
    setLoading(false);
  };

  const sections = [
    { 
      icon: <User size={20} />, 
      label: "プロフィール設定", 
      color: "text-blue-400",
      action: () => setIsEditingProfile(true) 
    },
    { 
      icon: <Bell size={20} />, 
      label: "通知を受け取る", 
      color: "text-amber-400",
      isToggle: true,
      value: settings.notifications,
      onToggle: () => toggleSetting('notifications')
    },
    { 
      icon: <Shield size={20} />, 
      label: "位置情報を共有する (相手に通知)", 
      color: "text-teal-400",
      isToggle: true,
      value: settings.locationSharing,
      onToggle: () => toggleSetting('locationSharing')
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white pb-24">
      <header className="p-6 flex items-center gap-4">
        <Link href="/map" className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">設定</h1>
      </header>

      <div className="p-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden mb-8">
          {sections.map((section, i) => (
            <div 
              key={i}
              className={cn(
                "w-full flex items-center justify-between p-5 transition-colors",
                !section.isToggle && "hover:bg-slate-800/50 cursor-pointer",
                i !== sections.length - 1 && "border-b border-slate-800"
              )}
              onClick={!section.isToggle ? section.action : undefined}
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center", section.color)}>
                  {section.icon}
                </div>
                <span className="font-medium">{section.label}</span>
              </div>
              
              {section.isToggle ? (
                <button onClick={section.onToggle} className="text-primary transition-all">
                  {section.value ? (
                    <ToggleRight size={40} className="text-green-500" />
                  ) : (
                    <ToggleLeft size={40} className="text-slate-600" />
                  )}
                </button>
              ) : (
                <ChevronLeft size={20} className="rotate-180 text-slate-600" />
              )}
            </div>
          ))}
        </div>

        {isEditingProfile && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                <h2 className="text-xl font-bold">プロフィール編集</h2>
                <button onClick={() => setIsEditingProfile(false)} className="text-slate-400">
                  <ChevronLeft size={24} />
                </button>
              </div>
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">氏名</label>
                  <input 
                    type="text" 
                    value={profile.fullName}
                    onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="名前を入力"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">現在のステータス</label>
                  <select 
                    value={profile.status}
                    onChange={(e) => setProfile(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                  >
                    <option value="Drink">Drink (飲みに行きたい)</option>
                    <option value="Work">Work (仕事中)</option>
                    <option value="Chat">Chat (雑談したい)</option>
                    <option value="Career">Career (キャリア相談)</option>
                    <option value="Ghost">Ghost (非表示)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">会社名</label>
                  <input 
                    type="text" 
                    value={profile.companyName}
                    onChange={(e) => setProfile(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="会社名を入力"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">役職</label>
                  <input 
                    type="text" 
                    value={profile.position}
                    onChange={(e) => setProfile(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="役職を入力"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">一言プロフィール</label>
                  <textarea 
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[100px]"
                    placeholder="自己紹介を入力"
                  />
                </div>
                
                <div className="space-y-4 pt-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">SNSリンク</label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-2">
                      <span className="text-slate-400 font-bold w-12 text-xs">X</span>
                      <input 
                        type="text" 
                        value={profile.xUrl}
                        onChange={(e) => setProfile(prev => ({ ...prev, xUrl: e.target.value }))}
                        className="flex-1 bg-transparent border-none text-white focus:outline-none text-sm"
                        placeholder="https://x.com/..."
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-2">
                      <span className="text-slate-400 font-bold w-12 text-xs">FB</span>
                      <input 
                        type="text" 
                        value={profile.facebookUrl}
                        onChange={(e) => setProfile(prev => ({ ...prev, facebookUrl: e.target.value }))}
                        className="flex-1 bg-transparent border-none text-white focus:outline-none text-sm"
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-2">
                      <span className="text-slate-400 font-bold w-12 text-xs">LinkedIn</span>
                      <input 
                        type="text" 
                        value={profile.linkedinUrl}
                        onChange={(e) => setProfile(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                        className="flex-1 bg-transparent border-none text-white focus:outline-none text-sm"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-2">
                      <span className="text-slate-400 font-bold w-12 text-xs">YOUTRUST</span>
                      <input 
                        type="text" 
                        value={profile.youtrustUrl}
                        onChange={(e) => setProfile(prev => ({ ...prev, youtrustUrl: e.target.value }))}
                        className="flex-1 bg-transparent border-none text-white focus:outline-none text-sm"
                        placeholder="https://youtrust.jp/users/..."
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleUpdateProfile}
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 sticky bottom-0"
                >
                  {loading ? "更新中..." : "保存する"}
                </button>
              </div>
            </div>
          </div>
        )}

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
