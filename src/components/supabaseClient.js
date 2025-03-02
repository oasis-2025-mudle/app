import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qwslipquestgentqajnj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3c2xpcHF1ZXN0Z2VudHFham5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMzMzNDgsImV4cCI6MjA1NTkwOTM0OH0.b-CWwUH46-oGGjakpCXA18NEdJfqJv7f28KCF4liCvk";

export const supabase = createClient(supabaseUrl, supabaseKey);
