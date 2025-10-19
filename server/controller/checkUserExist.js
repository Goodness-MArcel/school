import pool from "../db/dbconfig.js";
// import { supabase } from "../supabase.js";
export const userChecker = async (req, res) => {
  try {
    // Count how many schools exist in the system
    const result = await pool.query("SELECT COUNT(*) AS school_count FROM schools");

    const schoolCount = parseInt(result.rows[0].school_count, 10);
    const schoolExists = schoolCount > 0;

    res.status(200).json({ schoolExists });
  } catch (error) {
    console.error("Error checking school existence:", error);
    res.status(500).json({
      success: false,
      message: "Server error while checking school existence.",
    });
  }
};