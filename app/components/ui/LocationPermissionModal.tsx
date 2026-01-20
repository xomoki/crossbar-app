"use client";

import { useEffect, useState } from "react";
import { MapPin, X } from "lucide-react";

interface LocationPermissionModalProps {
  onPermissionGranted: () => void;
  onPermissionDenied: () => void;
}

export function LocationPermissionModal({ onPermissionGranted, onPermissionDenied }: LocationPermissionModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if permission is already determined
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "prompt") {
          setIsOpen(true);
        } else if (result.state === "granted") {
          onPermissionGranted();
        } else {
          // denied
          onPermissionDenied();
        }
      });
    } else {
      // Fallback for browsers that don't support permissions API
      setIsOpen(true);
    }
  }, [onPermissionGranted, onPermissionDenied]);

  const handleAllow = () => {
    navigator.geolocation.getCurrentPosition(
      () => {
        setIsOpen(false);
        onPermissionGranted();
      },
      (error) => {
        console.error(error);
        setIsOpen(false);
        onPermissionDenied();
      }
    );
  };

  const handleDeny = () => {
    setIsOpen(false);
    onPermissionDenied();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in duration-300">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mx-auto mb-4 text-blue-500">
          <MapPin size={32} />
        </div>
        <h2 className="text-xl font-bold text-white text-center mb-2">位置情報の許可</h2>
        <p className="text-slate-400 text-center text-sm mb-6">
          近くのユーザーとマッチングするために、<br />
          位置情報の利用を許可してください。
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleDeny}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 text-slate-400 font-bold text-sm hover:bg-slate-700 transition-colors"
          >
            許可しない
          </button>
          <button
            onClick={handleAllow}
            className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
          >
            許可する
          </button>
        </div>
      </div>
    </div>
  );
}
