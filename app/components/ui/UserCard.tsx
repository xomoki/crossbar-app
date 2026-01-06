"use client";

import { cn } from "@/app/lib/utils";
import { User, statusConfig } from "@/app/lib/mock-data";
import { X } from "lucide-react";

interface UserCardProps {
  user: User;
  onClose: () => void;
  onOffer: (type: string) => void;
}

export function UserCard({ user, onClose, onOffer }: UserCardProps) {
  const config = statusConfig[user.status];

  return (
    <div className="fixed inset-x-4 bottom-32 bg-slate-900/95 backdrop-blur-lg border border-slate-700 rounded-3xl p-5 shadow-2xl z-40 animate-in slide-in-from-bottom-8 duration-500 max-w-lg mx-auto">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
      >
        <X size={20} />
      </button>

      <div className="flex items-center gap-4 mb-4">
        <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2",
          config.color,
          user.isRecommended && "neon-teal border-primary shadow-[0_0_15px_rgba(45,212,191,0.5)]"
        )}>
          {config.icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white leading-tight">{user.name}</h3>
          <p className="text-xs text-slate-400">{user.role}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {user.tags.map(tag => (
          <span key={tag} className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg text-[10px] font-bold tracking-wider">
            {tag}
          </span>
        ))}
      </div>

      {user.isRecommended && (
        <div className="mb-5 p-3 bg-teal-500/10 border border-teal-500/30 rounded-2xl">
          <p className="text-[11px] text-teal-400 leading-relaxed font-medium">
            AI推奨: 恵比寿周辺のスタートアップ拠点にいます。共通の興味タグ「#Startup」が見つかりました。
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {(Object.entries(statusConfig) as [keyof typeof statusConfig, any][])
          .filter(([key]) => key !== 'Ghost')
          .map(([key, item]) => (
            <button
              key={key}
              onClick={() => onOffer(item.label)}
              className={cn(
                "flex items-center justify-center gap-2 h-12 rounded-2xl transition-all active:scale-95 border border-white/10",
                item.color.replace('bg-', 'bg-').replace('-500', '-500/20'),
                "hover:brightness-110"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[11px] text-white font-black">{item.label}</span>
            </button>
          ))}
      </div>
    </div>
  );
}
