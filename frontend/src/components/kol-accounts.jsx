import { useState, useMemo } from "react";

export default function KOLAccounts({ onViewAccount }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allAccounts = [
    {
      id: "000004",
      country: "Japan",
      name: "Jenny",
      xAccount: "@jqwEhi",
      xFollowers: "12134",
      ytAccount: "@jqwEhi",
      ytFollowers: "12134",
      ttAccount: "qwerty",
      ttFollowers: "27",
      postPrice: "872",
      inviter: "Jenny",
      createdTime: "2025/07/29 10:28:00",
    },
    {
      id: "000003",
      country: "Asia",
      name: "Cody",
      xAccount: "@hjuEw",
      xFollowers: "1232",
      ytAccount: "@hjuEw",
      ytFollowers: "1232",
      ttAccount: "vhxiu",
      ttFollowers: "7463",
      postPrice: "6271",
      inviter: "Cody",
      createdTime: "2025/07/29 10:28:00",
    },
    {
      id: "000002",
      country: "Africa",
      name: "Bessie",
      xAccount: "@hjxjsuiF",
      xFollowers: "4020",
      ytAccount: "@hjxjsuiF",
      ytFollowers: "4020",
      ttAccount: "bxhsiv",
      ttFollowers: "192",
      postPrice: "80800",
      inviter: "Bessie",
      createdTime: "2025/07/29 10:28:00",
    },
    {
      id: "000001",
      country: "Hong Kong",
      name: "Esanu",
      xAccount: "@iukjh",
      xFollowers: "7777",
      ytAccount: "@iukjh",
      ytFollowers: "7777",
      ttAccount: "cjdse7",
      ttFollowers: "36",
      postPrice: "852",
      inviter: "Esanu",
      createdTime: "2025/07/14 10:28:00",
    },
    {
      id: "000005",
      country: "USA",
      name: "Michael",
      xAccount: "@mikeus",
      xFollowers: "45000",
      ytAccount: "@mikeus",
      ytFollowers: "45000",
      ttAccount: "mikeus",
      ttFollowers: "3200",
      postPrice: "1500",
      inviter: "Admin",
      createdTime: "2025/07/20 14:30:00",
    },
    {
      id: "000006",
      country: "UK",
      name: "Sarah",
      xAccount: "@sarahuk",
      xFollowers: "23000",
      ytAccount: "@sarahuk",
      ytFollowers: "23000",
      ttAccount: "sarahuk",
      ttFollowers: "1800",
      postPrice: "950",
      inviter: "Jenny",
      createdTime: "2025/07/21 09:15:00",
    },
    {
      id: "000007",
      country: "Canada",
      name: "David",
      xAccount: "@davidca",
      xFollowers: "67000",
      ytAccount: "@davidca",
      ytFollowers: "67000",
      ttAccount: "davidca",
      ttFollowers: "5400",
      postPrice: "2200",
      inviter: "Cody",
      createdTime: "2025/07/22 11:45:00",
    },
    {
      id: "000008",
      country: "Australia",
      name: "Emma",
      xAccount: "@emmaau",
      xFollowers: "34000",
      ytAccount: "@emmaau",
      ytFollowers: "34000",
      ttAccount: "emmaau",
      ttFollowers: "2900",
      postPrice: "1300",
      inviter: "Bessie",
      createdTime: "2025/07/23 16:20:00",
    },
    {
      id: "000009",
      country: "Germany",
      name: "Hans",
      xAccount: "@hansde",
      xFollowers: "18000",
      ytAccount: "@hansde",
      ytFollowers: "18000",
      ttAccount: "hansde",
      ttFollowers: "1200",
      postPrice: "800",
      inviter: "Admin",
      createdTime: "2025/07/24 13:10:00",
    },
    {
      id: "000010",
      country: "France",
      name: "Marie",
      xAccount: "@mariefr",
      xFollowers: "29000",
      ytAccount: "@mariefr",
      ytFollowers: "29000",
      ttAccount: "mariefr",
      ttFollowers: "2100",
      postPrice: "1100",
      inviter: "Jenny",
      createdTime: "2025/07/25 10:30:00",
    },
    {
      id: "000011",
      country: "Spain",
      name: "Carlos",
      xAccount: "@carloses",
      xFollowers: "41000",
      ytAccount: "@carloses",
      ytFollowers: "41000",
      ttAccount: "carloses",
      ttFollowers: "3500",
      postPrice: "1600",
      inviter: "Cody",
      createdTime: "2025/07/26 15:45:00",
    },
  ];

  const filteredAccounts = useMemo(() => {
    if (!searchQuery.trim()) return allAccounts;

    const query = searchQuery.toLowerCase();
    return allAccounts.filter(
      (account) =>
        account.id.toLowerCase().includes(query) ||
        account.country.toLowerCase().includes(query) ||
        account.name.toLowerCase().includes(query) ||
        account.xAccount.toLowerCase().includes(query) ||
        account.inviter.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAccounts = filteredAccounts.slice(startIndex, endIndex);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleRevoke = (id) => {
    setSelectedAccount(id);
    setShowBlockModal(true);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            KOL Accounts
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
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50"
            >
              Add New
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="text-sm text-gray-600 mb-4">
            KOL Account List ({filteredAccounts.length})
          </div>
          <div className="overflow-x-auto max-w-[1200px] mx-auto">
            <table className="w-full text-sm border-collapse table-fixed">
              <thead className="bg-gray-50 sticky top-0">
                <tr className="border-b border-gray-200">
                  <th className="w-[60px] py-3 px-4 text-left font-medium text-gray-700">
                    ID
                  </th>
                  <th className="w-[100px] py-3 px-4 text-left font-medium text-gray-700">
                    Country
                  </th>
                  <th className="w-[100px] py-3 px-4 text-left font-medium text-gray-700">
                    Name
                  </th>
                  <th className="w-[220px] py-3 px-4 text-left font-medium text-gray-700">
                    Socials
                  </th>
                  <th className="w-[80px] py-3 px-4 text-right font-medium text-gray-700">
                    Post ($)
                  </th>
                  <th className="w-[90px] py-3 px-4 text-left font-medium text-gray-700">
                    Inviter
                  </th>
                  <th className="w-[140px] py-3 px-4 text-left font-medium text-gray-700 whitespace-nowrap">
                    Created
                  </th>
                  <th className="w-[110px] py-3 px-4 text-left font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentAccounts.map((account) => (
                  <tr
                    key={account.id}
                    className="border-b border-gray-100 hover:bg-gray-50 even:bg-gray-50/30"
                  >
                    <td className="py-3 px-4 text-gray-800">{account.id}</td>
                    <td className="py-3 px-4 text-gray-800 truncate">
                      {account.country}
                    </td>
                    <td className="py-3 px-4 text-gray-800 truncate">
                      {account.name}
                    </td>
                    <td className="py-3 px-4 text-gray-800">
                      <div className="space-y-1 text-xs">
                        <div>
                          <span className="font-medium text-gray-600">X:</span>{" "}
                          <span className="text-blue-600">
                            {account.xAccount}
                          </span>{" "}
                          <span className="text-gray-500">
                            ({account.xFollowers})
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">YT:</span>{" "}
                          <span className="text-blue-600">
                            {account.ytAccount}
                          </span>{" "}
                          <span className="text-gray-500">
                            ({account.ytFollowers})
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">TT:</span>{" "}
                          <span className="text-blue-600">
                            {account.ttAccount}
                          </span>{" "}
                          <span className="text-gray-500">
                            ({account.ttFollowers})
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-800">
                      ${account.postPrice}
                    </td>
                    <td className="py-3 px-4 text-gray-800">
                      {account.inviter}
                    </td>
                    <td className="py-3 px-4 text-gray-800 whitespace-nowrap">
                      {account.createdTime}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 whitespace-nowrap">
                        <button
                          onClick={() => onViewAccount(account.id)}
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </button>
                        <button className="text-blue-600 hover:underline">
                          Edit
                        </button>
                        <button
                          onClick={() => handleRevoke(account.id)}
                          className="text-gray-400 hover:underline"
                        >
                          Block
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {filteredAccounts.length > itemsPerPage && (
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add New</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Country</label>
                <input
                  type="text"
                  placeholder="Please select"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Please enter"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm mb-1">X Account</label>
                  <input
                    type="text"
                    placeholder="Please enter"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm mb-1">Followers</label>
                  <input
                    type="text"
                    placeholder="Please enter"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm mb-1">YouTube Account</label>
                  <input
                    type="text"
                    placeholder="Please enter"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm mb-1">Followers</label>
                  <input
                    type="text"
                    placeholder="Please enter"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm mb-1">TikTok Account</label>
                  <input
                    type="text"
                    placeholder="Please enter"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm mb-1">Followers</label>
                  <input
                    type="text"
                    placeholder="Please enter"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="text"
                  placeholder="Please enter"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Instagram Account</label>
                <input
                  type="text"
                  placeholder="Please enter"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Post Price ($)</label>
                <input
                  type="text"
                  placeholder="Please enter"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showBlockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-base font-semibold mb-4">Block Reason</h2>
            <div className="mb-4">
              <label className="block text-sm mb-2">Select Reason</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-400">
                <option>Please select</option>
              </select>
            </div>
            <p className="text-xs text-red-600 mb-4">
              **Please confirm if you want to block this account. Once blocked,
              it will be added to the Blocklist.**
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowBlockModal(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
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
