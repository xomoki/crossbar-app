import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@clerk/nextjs';
import { getDistanceFromLatLonInKm } from '@/app/lib/utils';
import { useNotifications } from './useNotifications';

export interface NearbyUser {
  id: string;
  clerk_user_id: string;
  full_name: string;
  location: { lat: number; lng: number };
  distance: number;
  status: string;
}

export function useNearbyUsers(currentLocation: { lat: number; lng: number } | null) {
  const { user } = useUser();
  const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([]);
  const supabase = createClient();
  const { sendNotification } = useNotifications();
  const notifiedUserIds = useRef<Set<string>>(new Set());
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  // Fetch current user's notification setting
  useEffect(() => {
    if (!user) return;
    const fetchSettings = async () => {
      const { data } = await supabase
        .from('users')
        .select('is_notification_enabled')
        .eq('clerk_user_id', user.id)
        .single();
      if (data) {
        setIsNotificationEnabled(data.is_notification_enabled ?? true);
      }
    };
    fetchSettings();
  }, [user, supabase]);

  useEffect(() => {
    if (!currentLocation || !user) return;

    const fetchUsers = async () => {
      // Fetch only users who allow location sharing
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .neq('clerk_user_id', user.id)
        .eq('is_location_sharing_enabled', true);

      if (error) {
        console.error('Error fetching users:', JSON.stringify(error, null, 2));
        return;
      }

      if (!data) return;

      const users: NearbyUser[] = data.map((u: any) => {
        let lat: number | undefined, lng: number | undefined;
        
        if (typeof u.last_location === 'string' && u.last_location.startsWith('POINT')) {
            const matches = u.last_location.match(/POINT\(([^ ]+) ([^ ]+)\)/);
            if (matches) {
                lng = parseFloat(matches[1]);
                lat = parseFloat(matches[2]);
            }
        }
        
        if (lat === undefined || lng === undefined) return null;

        const distance = getDistanceFromLatLonInKm(currentLocation.lat, currentLocation.lng, lat, lng);
        
        return {
          id: u.id,
          clerk_user_id: u.clerk_user_id,
          full_name: u.full_name || 'Unknown User',
          location: { lat, lng },
          distance,
          status: 'Drink' // Default status
        };
      }).filter((u): u is NearbyUser => u !== null && u.distance <= 2);

      setNearbyUsers(users);

      // Check for notifications
      if (isNotificationEnabled) {
        users.forEach(u => {
            if (!notifiedUserIds.current.has(u.id)) {
                sendNotification(`${u.full_name} is nearby!`, {
                    body: `Within ${u.distance.toFixed(1)}km`
                });
                notifiedUserIds.current.add(u.id);
            }
        });
      }
    };

    const interval = setInterval(fetchUsers, 10000); // Poll every 10s
    fetchUsers();

    return () => clearInterval(interval);
  }, [currentLocation, user, supabase, sendNotification, isNotificationEnabled]);

  return { nearbyUsers };
}
