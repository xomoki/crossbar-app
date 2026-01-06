"use client";

import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { mockUsers, statusConfig, User, mockMatches, Match } from "@/app/lib/mock-data";
import { MagicToggle } from "@/app/components/ui/MagicToggle";
import { UserCard } from "@/app/components/ui/UserCard";
import { ChatOverlay } from "@/app/components/ui/ChatOverlay";
import { cn } from "@/app/lib/utils";
import { Search, Map as MapIcon, Settings, MessageCircle, Clock } from "lucide-react";
import Link from "next/link";

// Google Map のスタイル定義 (ダークモード)
const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#1e293b" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#0f172a" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#111827" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#0f172a" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#334155" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#020617" }] },
];

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 35.6467,
  lng: 139.7101
};

export default function MapPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "" // APIキーがない場合は透かしが入ります
  });

  const [currentStatus, setCurrentStatus] = useState<keyof typeof statusConfig>("Drink");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showOfferAnimation, setShowOfferAnimation] = useState<{show: boolean, type: string}>({show: false, type: ""});
  const [showMatchList, setShowMatchList] = useState(false);
  const [activeChat, setActiveChat] = useState<Match | null>(null);

  const handleOffer = (type: string) => {
    setShowOfferAnimation({show: true, type});
    setTimeout(() => {
      setShowOfferAnimation({show: false, type: ""});
      setSelectedUser(null);
    }, 2000);
  };

  return (
    <main className="relative w-full h-[100dvh] bg-slate-950 overflow-hidden select-none touch-none">
      {/* Google Map 背景 */}
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            gestureHandling: 'greedy'
          }}
        >
          {/* ユーザーピンをMarkerとして配置 */}
          {currentStatus !== 'Ghost' && mockUsers.map((user) => (
            <div key={user.id}>
              {/* カスタムピンの代わりに OverlayView を使うのが理想的ですが、
                  簡易化のため、ピンのレンダリングは既存の方式（絶対配置）を継続し、
                  GoogleMap は背景として機能させます。
                  ※本来は Google Maps の OverlayView を使って座標同期させます。
              */}
            </div>
          ))}
        </GoogleMap>
      ) : (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
          <div className="text-slate-500 animate-pulse font-bold">MAP LOADING...</div>
        </div>
      )}

      {/* 既存のピン表示ロジック (Google Map の上にオーバーレイ) */}
      {/* 本来は Google Map の座標系と同期させる必要がありますが、
          プロトタイプとして、恵比寿駅中心の固定座標系でオーバーレイします。 */}
      <div className="absolute inset-0 pointer-events-none">
        {currentStatus !== 'Ghost' && mockUsers.map((user) => (
          <button
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className="absolute transition-all duration-700 hover:scale-110 active:scale-90 group z-10 pointer-events-auto"
            style={{
              top: `${50 + (35.6467 - user.location.lat) * 2500}%`,
              left: `${50 + (user.location.lng - 139.7101) * 2500}%`,
            }}
          >
            {user.isRecommended && (
              <div className="absolute -inset-4 bg-primary/20 rounded-full animate-pulse blur-md" />
            )}
            <div className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center text-xl border-2 transition-all shadow-lg",
              statusConfig[user.status].color,
              user.isRecommended ? "neon-teal border-primary shadow-[0_0_10px_rgba(45,212,191,0.6)]" : "border-white/20",
              selectedUser?.id === user.id && "ring-4 ring-white scale-110"
            )}>
              {statusConfig[user.status].icon}
            </div>
          </button>
        ))}

        {/* 自分自身のピン */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center text-3xl border-4 border-white shadow-[0_0_30px_rgba(255,255,255,0.3)]",
            statusConfig[currentStatus].color,
            currentStatus === 'Drink' && "neon-teal",
            currentStatus === 'Career' && "neon-pink",
            currentStatus === 'Work' && "neon-amber",
            currentStatus === 'Chat' && "shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          )}>
            {statusConfig[currentStatus].icon}
          </div>
        </div>
      </div>

      {/* ヘッダー */}
      <div className="absolute top-0 inset-x-4 pt-10 flex justify-between items-center z-30">
        <div className="bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-2xl flex items-center gap-2 border border-slate-700 shadow-xl">
          <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center">
            <Search className="text-primary" size={16} />
          </div>
          <span className="text-[11px] text-slate-300 font-bold pr-2 uppercase">Ebisu Area</span>
        </div>
        <div className="flex gap-2">
          {/* マッチ・チャット一覧ボタン */}
          <button 
            onClick={() => setShowMatchList(true)}
            className="w-10 h-10 bg-slate-900/80 backdrop-blur-md rounded-xl flex items-center justify-center border border-slate-700 text-slate-400 relative"
          >
            <MessageCircle size={18} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full border-2 border-slate-900 text-[8px] font-black text-white flex items-center justify-center">
              2
            </div>
          </button>
          <Link href="/settings" className="w-10 h-10 bg-slate-900/80 backdrop-blur-md rounded-xl flex items-center justify-center border border-slate-700 text-slate-400">
            <Settings size={18} />
          </Link>
        </div>
      </div>

      {/* マッチ一覧オーバーレイ */}
      {showMatchList && (
        <div className="fixed inset-0 bg-slate-950/95 z-50 animate-in slide-in-from-right duration-300 flex flex-col">
          <header className="p-6 pt-12 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-xl font-black text-white">Matches</h2>
            <button onClick={() => setShowMatchList(false)} className="p-2 text-slate-400">
              <X size={24} />
            </button>
          </header>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-2 mb-2">Active Matches (Expires in 24h)</p>
            {mockMatches.map((match) => (
              <button
                key={match.id}
                onClick={() => {
                  setActiveChat(match);
                  setShowMatchList(false);
                }}
                className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-xl border border-slate-700">
                    👤
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{match.userName}</h3>
                    <p className="text-xs text-slate-500 truncate max-w-[180px]">{match.lastMessage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-[9px] text-pink-400 font-bold mb-1">
                    <Clock size={10} />
                    <span>あと18時間</span>
                  </div>
                  <div className="text-[9px] text-slate-600 font-mono">21:45</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* チャット画面 */}
      {activeChat && (
        <ChatOverlay 
          match={activeChat} 
          onClose={() => setActiveChat(null)} 
        />
      )}

      {/* ユーザー詳細カード */}
      {selectedUser && (
        <UserCard 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)}
          onOffer={handleOffer}
        />
      )}

      {/* マジック・トグル */}
      <MagicToggle 
        currentStatus={currentStatus} 
        onStatusChange={setCurrentStatus} 
      />

      {/* オファー送信アニメーション */}
      {showOfferAnimation.show && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="text-center animate-in zoom-in duration-500">
            <div className="text-7xl mb-6">✨</div>
            <h2 className="text-2xl font-black text-white tracking-tighter">
              {showOfferAnimation.type.toUpperCase()} SENT!
            </h2>
            <p className="text-slate-400 mt-2 text-sm">街のどこかで、出会いが生まれます。</p>
          </div>
        </div>
      )}
    </main>
  );
}
