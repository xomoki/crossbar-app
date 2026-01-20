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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchSettings = async () => {
        const { data } = await supabase
          .from('users')
          .select('is_notification_enabled, is_location_sharing_enabled')
          .eq('clerk_user_id', user.id)
          .single();
          
        if (data) {
            setSettings({
                notifications: data.is_notification_enabled ?? true,
                locationSharing: data.is_location_sharing_enabled ?? true
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

  const sections = [
    { 
      icon: <User size={20} />, 
      label: "プロファイル設定", 
      color: "text-blue-400",
      action: () => {} 
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
        <Link href="/" className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800">
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
