import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ioapweubdokjpwsimeky.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvYXB3ZXViZG9ranB3c2ltZWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyOTI4OTQsImV4cCI6MjA1Nzg2ODg5NH0.wE_42hf1D3kNdju9N_8si4UMAF8pv0o49MrrGU1oqVc";
export const supabase = createClient(supabaseUrl, supabaseKey);
