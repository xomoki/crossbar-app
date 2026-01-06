"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/app/lib/utils";
import { Match, Message } from "@/app/lib/mock-data";
import { X, Send, Clock, ChevronLeft } from "lucide-react";

interface ChatOverlayProps {
  match: Match;
  onClose: () => void;
}

export function ChatOverlay({ match, onClose }: ChatOverlayProps) {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>(match.messages);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 24時間タイマーの表示用
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const diff = match.expiresAt.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("期限切れ");
        return;
      }
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`残り ${h}時間${m}分`);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 60000);
    return () => clearInterval(timer);
  }, [match.expiresAt]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      text: inputText,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <div className="fixed inset-0 bg-slate-950 z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      {/* ヘッダー */}
      <header className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 p-4 pt-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 text-slate-400">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="font-bold text-white">{match.userName}</h2>
            <div className="flex items-center gap-1 text-[10px] text-pink-400 font-bold">
              <Clock size={10} />
              <span>{timeLeft}でメッセージが消去されます</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-2 text-slate-400">
          <X size={24} />
        </button>
      </header>

      {/* メッセージエリア */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900/50 to-slate-950"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "max-w-[80%] flex flex-col",
              msg.senderId === "me" ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            <div
              className={cn(
                "px-4 py-2.5 rounded-2xl text-sm font-medium",
                msg.senderId === "me"
                  ? "bg-primary text-slate-950 rounded-tr-none shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                  : "bg-slate-800 text-white rounded-tl-none"
              )}
            >
              {msg.text}
            </div>
            <span className="text-[9px] text-slate-600 mt-1 px-1">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>

      {/* 入力エリア */}
      <form 
        onSubmit={handleSend}
        className="p-4 pb-10 bg-slate-900/50 backdrop-blur-md border-t border-slate-800 flex gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="メッセージを入力..."
          className="flex-1 bg-slate-800 border-none rounded-2xl px-4 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="w-12 h-12 bg-primary text-slate-950 rounded-full flex items-center justify-center disabled:opacity-50 transition-all active:scale-90 shadow-lg shadow-primary/20"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

