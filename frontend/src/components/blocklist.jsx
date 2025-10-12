import { useState, useMemo } from "react";

const mockBlockedUsers = [
  {
    id: "000004",
    country: "Japan",
    name: "Jenny",
    xAccount: "@jenhu",
    followers: 12134,
    blockedDate: "2025/07/19 10:28:00",
    reason: "Violation of terms",
  },
  {
    id: "000002",
    country: "Africa",
    name: "Bessie",
    xAccount: "@yohud",
    followers: 4050,
    blockedDate: "2025/07/18 15:42:00",
    reason: "Spam activity",
  },
];

export default function Blocklist() {
  const [blockedUsers, setBlockedUsers] = useState(mockBlockedUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUnblockModal, setShowUnblockModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return blockedUsers;

    const query = searchTerm.toLowerCase();
    return blockedUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.xAccount.toLowerCase().includes(query) ||
        user.country.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query)
    );
  }, [searchTerm, blockedUsers]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleUnblockClick = (user) => {
    setSelectedUser(user);
    setShowUnblockModal(true);
  };

  const handleConfirmUnblock = () => {
    if (selectedUser) {
      setBlockedUsers(blockedUsers.filter((u) => u.id !== selectedUser.id));
      setShowUnblockModal(false);
      setSelectedUser(null);
      setCurrentPage(1);
    }
  };

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Blocklist</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Please enter"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No blocked users</p>
            <p className="text-gray-400 text-sm mt-2">
              Users you block will appear here
            </p>
          </div>
        ) : (
          <>
            <div className="p-6">
              <div className="text-sm text-gray-600 mb-4">
                Blocked Users ({filteredUsers.length})
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Country
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      X Account
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Followers
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Blocked Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Reason
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {user.id}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {user.country}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {user.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-blue-600">
                        {user.xAccount}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {user.followers}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {user.blockedDate}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {user.reason}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleUnblockClick(user)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Unblock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
          </>
        )}
      </div>

      {showUnblockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Unblock User</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to unblock{" "}
              <span className="font-medium">{selectedUser?.name}</span>? This
              user will be able to access the platform again.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowUnblockModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUnblock}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
