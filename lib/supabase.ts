import { createClient } from "@supabase/supabase-js";

/**
 * Browser/client-side client — safe to use in components.
 * Uses the public anon key, restricted by Row Level Security policies
 * you define in Supabase (not included here — add before going to prod).
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Server-only client — use ONLY inside app/api/* route handlers.
 * Uses the service role key, which bypasses RLS. Never import this
 * into a client component or it'll leak the key to the browser.
 */
export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
