import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@/lib/supabase/client';

export function useLocation() {
  const { user } = useUser();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | 'unknown'>('unknown');
  const supabase = createClient();

  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setPermissionStatus(result.state);
        result.onchange = () => {
          setPermissionStatus(result.state);
        };
      });
    }
  }, []);

  const updateLocation = useCallback(async (lat: number, lng: number) => {
    if (!user) return;
    
    try {
      // PostGIS point format: POINT(lng lat)
      const point = `POINT(${lng} ${lat})`;
      
      const { error } = await supabase
        .from('users')
        .update({ 
          last_location: point,
          updated_at: new Date().toISOString()
        })
        .eq('clerk_user_id', user.id);
        
      if (error) throw error;
    } catch (err) {
      console.error('Error updating location:', JSON.stringify(err, null, 2));
    }
  }, [user, supabase]);

  useEffect(() => {
    if (!user || permissionStatus !== 'granted') return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        updateLocation(latitude, longitude);
      },
      (err) => {
        setError(err.message);
        console.error('Geolocation error:', err);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [user, permissionStatus, updateLocation]);

  return { location, error, permissionStatus };
}
