"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";
import { mockUsers, statusConfig, User, mockMatches, Match } from "@/app/lib/mock-data";
import { MagicToggle } from "@/app/components/ui/MagicToggle";
import { UserCard } from "@/app/components/ui/UserCard";
import { ChatOverlay } from "@/app/components/ui/ChatOverlay";
import { LocationPermissionModal } from "@/app/components/ui/LocationPermissionModal";
import { useLocation } from "@/app/hooks/useLocation";
import { useNearbyUsers } from "@/app/hooks/useNearbyUsers";
import { cn } from "@/app/lib/utils";
import { Search, Map as MapIcon, Settings, MessageCircle, Clock, X } from "lucide-react";
import Link from "next/link";

// Google Map styles (dark mode)
const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#1e293b" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#0f172a" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#111827" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#334155" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#020617" }] },
  { featureType: "poi", elementType: "labels.icon", stylers: [{ visibility: "off" }] } // Hide default icons
];

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 35.6467,
  lng: 139.7101
};

export default function MapPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  });

  const { location, permissionStatus } = useLocation();
  const { nearbyUsers } = useNearbyUsers(location);

  const [currentStatus, setCurrentStatus] = useState<keyof typeof statusConfig>("Drink");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showOfferAnimation, setShowOfferAnimation] = useState<{show: boolean, type: string}>({show: false, type: ""});
  const [showMatchList, setShowMatchList] = useState(false);
  const [activeChat, setActiveChat] = useState<Match | null>(null);

  // Merge mock users with real nearby users
  const displayUsers = useMemo(() => {
    const realUsers = nearbyUsers.map(u => ({
        id: u.id,
        name: u.full_name,
        role: 'Employee' as const,
        status: (u.status as any) || 'Drink',
        tags: ['#Nearby'],
        location: u.location,
        isRecommended: false
    }));
    return [...mockUsers, ...realUsers];
  }, [nearbyUsers]);

  const mapCenter = location || defaultCenter;

  const handleOffer = (type: string) => {
    setShowOfferAnimation({show: true, type});
    setTimeout(() => {
      setShowOfferAnimation({show: false, type: ""});
      setSelectedUser(null);
    }, 2000);
  };

  const onPermissionGranted = useCallback(() => {
    // Permission handled by hook
  }, []);

  const onPermissionDenied = useCallback(() => {
    // Handle denial
  }, []);

  return (
    <main className="relative w-full h-[100dvh] bg-slate-950 overflow-hidden select-none touch-none">
      
      <LocationPermissionModal 
        onPermissionGranted={onPermissionGranted}
        onPermissionDenied={onPermissionDenied}
      />

      {/* Google Map */}
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={17}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            gestureHandling: 'greedy',
            minZoom: 15,
            maxZoom: 20,
          }}
        >
          {/* OverlayView ensures markers move with the map */}
          {currentStatus !== 'Ghost' && displayUsers.map((user) => (
            <OverlayView
              key={user.id}
              position={user.location}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent map click
                  setSelectedUser(user);
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 hover:scale-110 active:scale-90 group z-10 cursor-pointer"
              >
                {user.isRecommended && (
                  <div className="absolute -inset-4 bg-primary/20 rounded-full animate-pulse blur-md pointer-events-none" />
                )}
                <div className={cn(
                  "w-11 h-11 rounded-full flex items-center justify-center text-xl border-2 transition-all shadow-lg",
                  statusConfig[user.status as keyof typeof statusConfig]?.color || 'bg-gray-500',
                  user.isRecommended ? "neon-teal border-primary shadow-[0_0_10px_rgba(45,212,191,0.6)]" : "border-white/20",
                  selectedUser?.id === user.id && "ring-4 ring-white scale-110"
                )}>
                  {statusConfig[user.status as keyof typeof statusConfig]?.icon || '?'}
                </div>
              </button>
            </OverlayView>
          ))}

          {/* Self Marker */}
          {location && (
             <OverlayView 
               position={location} 
               mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
             >
                <div className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
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
             </OverlayView>
          )}
        </GoogleMap>
      ) : (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
          <div className="text-slate-500 animate-pulse font-bold">MAP LOADING...</div>
        </div>
      )}

      {/* Header, UI Overlays - Note: These must be outside GoogleMap to be clickable if map captures events, 
          but usually OK if z-index is high. GoogleMap traps some events. */}
      
      {/* Header */}
      <div className="absolute top-0 inset-x-4 pt-10 flex justify-between items-center z-30 pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-2xl flex items-center gap-2 border border-slate-700 shadow-xl pointer-events-auto">
          <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center">
            <Search className="text-primary" size={16} />
          </div>
          <span className="text-[11px] text-slate-300 font-bold pr-2 uppercase">
             {location ? "Current Location" : "Ebisu Area"}
          </span>
        </div>
        <div className="flex gap-2 pointer-events-auto">
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

      {/* Match List Overlay */}
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

      {/* Chat Screen */}
      {activeChat && (
        <ChatOverlay 
          match={activeChat} 
          onClose={() => setActiveChat(null)} 
        />
      )}

      {/* User Details */}
      {selectedUser && (
        <UserCard 
          user={selectedUser} 
          onClose={() => setSelectedUser(null)}
          onOffer={handleOffer}
        />
      )}

      {/* Magic Toggle - Fixed to bottom */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center z-40 pointer-events-none">
        <div className="pointer-events-auto">
          <MagicToggle 
            currentStatus={currentStatus} 
            onStatusChange={setCurrentStatus} 
          />
        </div>
      </div>

      {/* Offer Animation */}
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
