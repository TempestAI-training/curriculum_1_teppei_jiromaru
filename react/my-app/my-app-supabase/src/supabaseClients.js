import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rrfjjytjfmdaywjepxqw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZmpqeXRqZm1kYXl3amVweHF3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTgxNjk0NSwiZXhwIjoyMDg3MzkyOTQ1fQ.Jgzz1Pu05v2zKu-eyGJlWpev-beHt50J4jePs3Meks4";

export const supabase = createClient(supabaseUrl, supabaseKey);
