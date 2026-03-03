import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../libs/database";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [profile, setProfile] = useState(null);

  // optionally pass the role value that may already be available
  const fetchProfile = async (userId, metadataRole = null) => {
    console.log("fetchProfile start", { userId, metadataRole });
    try {
      const { data, error } = await db
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      if (error) {
        // If the profile doesn't exist, `maybeSingle` will not throw for no rows,
        // but other errors (like 406) may occur — log and treat as no profile.
        console.warn("no profile row for user", userId, error.message);
        setProfile(null);
        return;
      }
      setProfile(data);
      // prefer whatever is stored in the profile row, but fall back to metadataRole
      setRole(data?.role ?? metadataRole ?? null);
      console.log("Fetched profile for user", { userId, profile: data });
    } catch (err) {
      console.error("fetchProfile error", err);
    } finally {
      console.log("fetchProfile finally - setting loading false");
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      console.log("AuthContext load start");
      try {
        const { data } = await db.auth.getSession();
        const currentUser = data.session?.user ?? null;
        console.log("AuthContext initial session", currentUser);
        setUser(currentUser);

        if (currentUser) {
          // if we have metadata for role, set it immediately (before profile row exists)
          const metadataRole = currentUser.user_metadata?.role ?? null;
          setRole(metadataRole);
          // start fetching profile but don't await — avoid blocking `loading` if profile fetch hangs
          fetchProfile(currentUser.id, metadataRole).catch((err) => console.error("fetchProfile background error", err));
        }
      } catch (err) {
        console.error("session initialisation failed", err);
      } finally {
        console.log("AuthContext load finally - setting loading false");
        setLoading(false);
      }
    };

    load();

    const { data: listener } = db.auth.onAuthStateChange(async (_, session) => {
      const currentUser = session?.user ?? null;
      console.log("AuthContext auth state changed", currentUser);
      setUser(currentUser);

      if (currentUser) {
        const metadataRole = currentUser.user_metadata?.role ?? null;
        setRole(metadataRole);
        // fetch profile in background; do not await so onAuthStateChange handler won't hang
        fetchProfile(currentUser.id, metadataRole).catch((err) => console.error("failed to fetch profile", err));
      } else {
        setProfile(null);
        setRole(null);
      }

      console.log("onAuthStateChange handler - setting loading false");
      setLoading(false);
    });

    return () => listener?.subscription?.unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading, role, profile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const UseAuth = () => {
  return useContext(AuthContext);
};
