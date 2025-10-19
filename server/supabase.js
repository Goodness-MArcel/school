

import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv'
dotenv.config();
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY// use service role for backend
);
export const verifySupabaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid authorization header" });
    }

    const token = authHeader.split(" ")[1];
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = data.user; // ✅ attach user info to request
    next();
  } catch (err) {
    console.error("Error verifying Supabase token:", err);
    res.status(500).json({ message: "Server error during authentication" });
  }
};