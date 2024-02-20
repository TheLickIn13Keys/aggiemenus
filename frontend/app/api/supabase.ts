import { createClient } from "@supabase/supabase-js";
// import * as dotenv from "dotenv";

// dotenv.config();

export default createClient(
  "https://brkxqdgakxwdrgulmsyx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJya3hxZGdha3h3ZHJndWxtc3l4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4NzYyMTQsImV4cCI6MjAyMzQ1MjIxNH0.28o8BT-fgiSzlX6gKLmh20T-5_eKZvpg3DqUjAUp8qU"
);
