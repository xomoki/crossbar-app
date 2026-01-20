export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          domain: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          domain: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          domain?: string
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          clerk_user_id: string
          email: string
          full_name: string | null
          company_id: string | null
          role: 'Executive' | 'Employee' | null
          tags: string[] | null
          preferences: Json | null
          last_location: any | null
          is_notification_enabled: boolean
          is_location_sharing_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_user_id: string
          email: string
          full_name?: string | null
          company_id?: string | null
          role?: 'Executive' | 'Employee' | null
          tags?: string[] | null
          preferences?: Json | null
          last_location?: any | null
          is_notification_enabled?: boolean
          is_location_sharing_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_user_id?: string
          email?: string
          full_name?: string | null
          company_id?: string | null
          role?: 'Executive' | 'Employee' | null
          tags?: string[] | null
          preferences?: Json | null
          last_location?: any | null
          is_notification_enabled?: boolean
          is_location_sharing_enabled?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      location_logs: {
        Row: {
          id: string
          user_id: string
          location: any // PostGIS types are complex to type manually
          recorded_at: string
        }
        Insert: {
          id?: string
          user_id: string
          location: any
          recorded_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          location?: any
          recorded_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          status: 'pending' | 'accepted' | 'ignored'
          venue_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          status?: 'pending' | 'accepted' | 'ignored'
          venue_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          status?: 'pending' | 'accepted' | 'ignored'
          venue_id?: string | null
          created_at?: string
        }
      }
      venues: {
        Row: {
          id: string
          name: string
          address: string | null
          location: any
          category: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          address?: string | null
          location?: any
          category?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string | null
          location?: any
          category?: string | null
          created_at?: string
        }
      }
    }
  }
}

