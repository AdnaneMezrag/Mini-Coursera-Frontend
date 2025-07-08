// contexts/userContext.tsx
import { createContext, useState,useEffect } from "react";
import type { User } from "../types/UserType";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create the context
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// Create the provider
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // ✅ Define this useEffect here — inside UserProvider
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
