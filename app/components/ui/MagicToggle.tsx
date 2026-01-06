"use client";

import { cn } from "@/app/lib/utils";
import { statusConfig } from "@/app/lib/mock-data";

type Status = keyof typeof statusConfig;

interface MagicToggleProps {
  currentStatus: Status;
  onStatusChange: (status: Status) => void;
}

export function MagicToggle({ currentStatus, onStatusChange }: MagicToggleProps) {
  return (
    <div className="fixed bottom-6 inset-x-4 flex justify-center z-50">
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-2 rounded-[2rem] flex gap-2 shadow-2xl overflow-x-auto no-scrollbar max-w-full">
        {(Object.entries(statusConfig) as [Status, typeof statusConfig.Drink][]).map(([key, config]) => (
          <button
            key={key}
            onClick={() => onStatusChange(key)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 rounded-2xl transition-all active:scale-95 whitespace-nowrap",
              currentStatus === key 
                ? cn("ring-2 ring-white/50 shadow-lg", config.color) 
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-800"
            )}
          >
            <span className="text-xl">{config.icon}</span>
            <span className={cn(
              "text-xs font-bold",
              currentStatus === key ? "text-white" : "text-slate-400"
            )}>
              {config.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
