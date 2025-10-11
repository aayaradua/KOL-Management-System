"use client";

import { createContext, useContext, useState } from "react";

// interface User {
//   id: string;
//   username: string;
//   role: "KOL" | "Marketing Manager" | "Marketing Director" | "Admin";
// }

// interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: "000002",
    username: "sky",
    role: "KOL",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
