import { useState, useMemo } from "react";
import { useUser } from "../lib/user-context";

export default function UsersRoles() {
  const { user } = useUser();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "KOL",
  });

  const users = [
    {
      id: "000004",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sqhd",
      username: "sqhd",
      role: "Marketing Manager",
      status: "Enable",
      statusColor: "text-green-600",
    },
    {
      id: "000003",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      username: "lisa",
      role: "Marketing Director",
      status: "Disable",
      statusColor: "text-red-600",
    },
    {
      id: "000002",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sky",
      username: "sky",
      role: "KOL",
      status: "Enable",
      statusColor: "text-green-600",
    },
    {
      id: "000001",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jone",
      username: "jone",
      role: "Admin",
      status: "Enable",
      statusColor: "text-green-600",
    },
  ];

  const roles = ["KOL", "Marketing Manager", "Marketing Director", "Admin"];

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;

    const query = searchQuery.toLowerCase();
    return users.filter(
      (userItem) =>
        userItem.id.toLowerCase().includes(query) ||
        userItem.username.toLowerCase().includes(query) ||
        userItem.role.toLowerCase().includes(query) ||
        userItem.status.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleAddUser = () => {
    console.log("Adding user:", newUser);
    setShowAddModal(false);
    setNewUser({ username: "", password: "", role: "KOL" });
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Users Roles
          </h1>
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Please enter"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded text-sm flex-1 min-w-[300px]"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Search
            </button>
            {user?.role === "Admin" && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50"
              >
                Add New
              </button>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="text-sm text-gray-600 mb-3">
            Users ({filteredUsers.length})
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-700">
                    User ID
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">
                    Avatar
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">
                    Username
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">
                    Role
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">
                    Status
                  </th>
                  {user?.role !== "KOL" && (
                    <th className="text-left py-3 px-2 font-medium text-gray-700">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((userItem) => (
                  <tr key={userItem.id} className="border-b border-gray-100">
                    <td className="py-3 px-2 text-gray-800">{userItem.id}</td>
                    <td className="py-3 px-2">
                      <img
                        src={userItem.avatar || "/placeholder.svg"}
                        alt={userItem.username}
                        className="w-8 h-8 rounded-full"
                      />
                    </td>
                    <td className="py-3 px-2 text-gray-800">
                      {userItem.username}
                    </td>
                    <td className="py-3 px-2 text-gray-800">{userItem.role}</td>
                    <td className={`py-3 px-2 ${userItem.statusColor}`}>
                      {userItem.status}
                    </td>
                    {user?.role !== "KOL" && (
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:underline">
                            Edit
                          </button>
                          {user?.role === "Admin" && (
                            <button className="text-red-600 hover:underline">
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {filteredUsers.length > itemsPerPage && (
          <div className="p-4 border-t border-gray-200 flex justify-center">
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/5 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add New User</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Please enter"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Please enter"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Role (Default: KOL)
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
