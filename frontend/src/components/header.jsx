import { useUser } from "../lib/user-context";

import { useState } from "react";

export default function Header() {
  const { user, setUser } = useUser();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const availableRoles = [
    "Admin",
    "Marketing Manager",
    "Marketing Director",
    "KOL",
  ];

  const handleRoleChange = (role) => {
    if (user) {
      setUser({ ...user, role });
    }
    setShowRoleDropdown(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-end gap-4">
      <div className="flex items-center gap-2">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
            user?.username || "Admin"
          }`}
          alt="User"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm text-gray-700">
          {user?.username || "Guest"}
        </span>
        {user && (
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center gap-1"
            >
              {user?.role || "Guest"}
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showRoleDropdown && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50 min-w-[160px]">
                {availableRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleChange(role)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      user.role === role
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <button className="p-2 hover:bg-gray-100 rounded">
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      </button>
      <button className="px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-1">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>
    </header>
  );
}
