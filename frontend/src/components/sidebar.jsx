import { useNavigate } from "react-router";
import { useUser } from "../lib/user-context";

import { useLocation } from "react-router";
import api from "../hooks/axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  const allMenuItems = [
    {
      id: "kol-accounts",
      label: "KOL Accounts",
      path: "/kol",
      parent: null,
      isCategory: false,
      roles: ["Admin", "Marketing Manager", "Marketing Director"],
    },
    {
      id: "profile",
      label: "Profile",
      path: "/profile",
      parent: null,
      isCategory: false,
      roles: ["KOL"],
    },
    {
      id: "post-history",
      label: "Post History",
      path: "/post-history",
      parent: null,
      isCategory: false,
      roles: ["KOL"],
    },
    {
      id: "new-post",
      label: "New Post",
      path: "/new-post",
      parent: null,
      isCategory: false,
      roles: ["KOL"],
    },
    {
      id: "blocklist",
      label: "Blocklist",
      path: "/blocklist",
      parent: null,
      isCategory: false,
      roles: ["Admin", "Marketing Manager", "Marketing Director"],
    },
    {
      id: "system",
      label: "System",
      parent: null,
      isCategory: true,
      roles: ["Admin", "Marketing Manager", "Marketing Director", "KOL"],
    },
    {
      id: "users-roles",
      label: "Roles",
      path: "/roles",
      parent: "system",
      isCategory: false,
      roles: ["Admin", "Marketing Manager", "Marketing Director", "KOL"],
    },
  ];

  if (!user) return null;

  const menuItems = allMenuItems.filter((item) =>
    item.roles
      .map((role) => role.toLowerCase())
      .includes(user.role?.toLowerCase())
  );

  const handleNavigate = (path) => {
    if (path) {
      navigate(path);
      setIsOpen(false); // close menu on mobile after navigation
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      {/* ===== MOBILE HEADER ===== */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-between px-4 py-3 z-50 shadow">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 10a2 2 0 114 0 2 2 0 01-4 0z" />
            </svg>
          </div>
          <span className="font-semibold text-lg">CreatorX</span>
        </div>

        <button
          className="p-2 rounded-md hover:bg-gray-800 transition"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* ===== SIDEBAR (DESKTOP + MOBILE MENU) ===== */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen md:h-auto bg-gray-900 text-white flex flex-col w-64 transform transition-transform duration-300 z-40 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="hidden md:flex p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 10a2 2 0 114 0 2 2 0 01-4 0z" />
              </svg>
            </div>
            <span className="font-semibold text-lg">CreatorX</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 mt-14 md:mt-0">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.isCategory ? (
                  <div className="px-3 py-2 text-xs uppercase tracking-wide text-gray-400 font-medium mt-4">
                    {item.label}
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-150 ${
                      item.parent ? "pl-8" : ""
                    } ${
                      location.pathname === item.path
                        ? "bg-blue-600 text-white font-medium"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className={`w-full text-sm py-2 px-4 rounded-md transition-colors ${
              logoutMutation.isPending
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
