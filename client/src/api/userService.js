// import axios from "axios";
// import { supabase } from "../supabaseClient";

// const API_URL = import.meta.env.VITE_API_URL;

// // ✅ Login by user ID
// export const loginUser = async (userId) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, { id: userId });
//     return response;
//   } catch (error) {
//     console.error("Error logging in user:", error);
//     throw error;
//   }
// };

// // ✅ Get school info
// export const getSchoolProfile = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/getSchool/info`);
//     return response;
//   } catch (error) {
//     console.error("Unable to get school info:", error);
//     throw error;
//   }
// };

// // ✅ Get current admin profile
// export const getAdminProfile = async () => {
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) throw new Error("No active session found");

//   const token = session.access_token;

//   try {
//     const res = await axios.get(`${API_URL}/getSchool/adminInfo`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching admin profile:", error);
//     throw error;
//   }
// };

// // ✅ Update school
// export const editSchool = async (formData) => {
//   try {
//     const response = await axios.put(`${API_URL}/updateSchool`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response;
//   } catch (error) {
//     console.error("Error updating school info:", error);
//     throw error;
//   }
// };

// // ✅ Update admin info
// export const editAdmin = async (formData) => {
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session) throw new Error("No active session");

//   const response = await axios.put(`${API_URL}/updateAdminProfile`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Authorization: `Bearer ${session.access_token}`,
//     },
//   });

//   return response;
// };


import axios from "axios";
import { supabase } from "../supabaseClient";

const API_URL = import.meta.env.VITE_API_URL;

// ===============================
// 🔐 AUTHENTICATION & USER CHECK
// ===============================

// ✅ Check if any user exists (before showing School Registration page)
export const checkIfSchoolExists = async () => {
  try {
    const response = await axios.get(`${API_URL}/checkSchool`);
    return response.data; // returns { schoolExists: true/false }
  } catch (error) {
    console.error("Error checking school existence:", error);
    throw error;
  }
};

// ✅ Login by user ID (after Supabase authentication)
export const loginUser = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { id: userId });
    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// ===============================
// 🏫 SCHOOL MANAGEMENT
// ===============================

// ✅ Get school info
export const getSchoolProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/getSchool/info`);
    return response;
  } catch (error) {
    console.error("Unable to get school info:", error);
    throw error;
  }
};

// ✅ Update school information
export const editSchool = async (formData) => {
  try {
    const response = await axios.put(`${API_URL}/updateSchool`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    console.error("Error updating school info:", error);
    throw error;
  }
};

// ===============================
// 👤 ADMIN MANAGEMENT
// ===============================

// ✅ Get current admin profile (requires Supabase token)
export const getAdminProfile = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("No active session found");

  const token = session.access_token;

  try {
    const res = await axios.get(`${API_URL}/getSchool/adminInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    throw error;
  }
};

// ✅ Update admin info (requires authentication)
export const editAdmin = async (formData) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("No active session");

  try {
    const response = await axios.put(`${API_URL}/updateAdminProfile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating admin profile:", error);
    throw error;
  }
};
