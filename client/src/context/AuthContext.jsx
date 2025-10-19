import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Load existing session when the app starts
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log("AuthProvider: initial session", session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    loadSession();

    // ✅ Listen for Supabase auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state change event:", _event);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // ✅ Periodic token refresh (every 15 mins)
  useEffect(() => {
    if (!user) return;

    const refreshSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session refresh error:", error);
        return;
      }

      if (session?.user?.id !== user?.id) {
        setUser(session?.user ?? null);
      }
    };

    const intervalId = setInterval(refreshSession, 15 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [user]);

  // ✅ Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      navigate('/');
      console.log("User logged out successfully");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };
  return (
    <AuthContext.Provider value={{ user, setUser, loading , logout}}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


