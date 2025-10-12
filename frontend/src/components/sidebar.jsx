import { useUser } from "../lib/user-context";

const Sidebar = ({ currentPage, onNavigate }) => {
  const { user } = useUser();

  const allMenuItems = [
    {
      id: "kol-accounts",
      label: "KOL Accounts",
      parent: null,
      isCategory: false,
      roles: ["Admin", "Marketing Manager", "Marketing Director"],
    },
    {
      id: "profile",
      label: "Profile",
      parent: null,
      isCategory: false,
      roles: ["KOL"],
    },
    {
      id: "post-history",
      label: "Post History",
      parent: null,
      isCategory: false,
      roles: ["KOL"],
    },
    {
      id: "new-post",
      label: "New Post",
      parent: null,
      isCategory: false,
      roles: ["KOL"],
    },
    {
      id: "blocklist",
      label: "Blocklist",
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
      label: "Users Roles",
      parent: "system",
      isCategory: false,
      roles: ["Admin", "Marketing Manager", "Marketing Director", "KOL"],
    },
  ];

  const menuItems = allMenuItems.filter(
    (item) => !user || item.roles.includes(user.role)
  );

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
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
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.isCategory ? (
                <div className="px-3 py-2 text-sm text-gray-400 font-medium">
                  {item.label}
                </div>
              ) : (
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full text-left px-3 py-2 rounded text-sm ${
                    item.parent ? "pl-8" : ""
                  } ${
                    currentPage === item.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
