import { createClient } from "@supabase/supabase-js";

const supUrl = import.meta.env.VITE_SUPABASE_URL;
const supKey = import.meta.env.VITE_SUPABASE_KEY;

export const db = createClient(supUrl , supKey)