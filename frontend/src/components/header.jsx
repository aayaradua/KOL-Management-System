import { useUser } from "../lib/user-context";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-end gap-4">
      <div className="flex items-center gap-2">
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.user_name}`}
          alt={`User-${user?.user_name}`}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm text-gray-700">
          {user?.username || "Guest"}
        </span>
        {user && (
          <div className="relative">
            <button
              className={`text-xs px-2 py-0.5 rounded flex items-center gap-1
        ${(() => {
          switch (user.role?.toLowerCase()) {
            case "admin":
              return "bg-indigo-100 text-indigo-700 hover:bg-indigo-200";
            case "marketing manager":
              return "bg-green-100 text-green-700 hover:bg-green-200";
            case "marketing director":
              return "bg-purple-100 text-purple-700 hover:bg-purple-200";
            case "kol":
              return "bg-blue-100 text-blue-700 hover:bg-blue-200";
            default:
              return "bg-gray-100 text-gray-700 hover:bg-gray-200";
          }
        })()}`}
            >
              {user.role}
            </button>
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
