import { auth, currentUser } from '@clerk/nextjs/server'
import { createServiceRoleClient } from './service-role'

export async function getSupabaseUserByClerkId() {
  const { userId } = await auth()
  if (!userId) return null

  const supabase = createServiceRoleClient()
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_user_id', userId)
    .maybeSingle()

  return data ?? null
}

export async function ensureSupabaseUser() {
  const { userId } = await auth()
  if (!userId) return null

  const user = await currentUser()
  if (!user) return null

  const supabase = createServiceRoleClient()
  
  // upsert users table
  const { data, error } = await supabase
    .from('users')
    .upsert(
      {
        clerk_user_id: userId,
        email: user.emailAddresses[0].emailAddress,
        full_name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || null,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'clerk_user_id' }
    )
    .select()
    .single()

  if (error) {
    console.error('Error syncing user to Supabase:', JSON.stringify(error, null, 2))
    throw error
  }
  return data
}

