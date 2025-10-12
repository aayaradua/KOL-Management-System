import { useState } from "react";
import { useUser } from "../lib/user-context";

export default function KOLAccountDetails({ accountId, onBack }) {
  const { user } = useUser();
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const accountData = {
    id: "000004",
    country: "Japan",
    name: "Jenny",
    postPrice: "$72",
    inviter: "Jenny",
    xAccount: "@jqwEhi",
    xFollowers: "12134",
    ytAccount: "@jqwEhi",
    ytFollowers: "1402189",
    ttAccount: "kjdhx",
    ttFollowers: "1850687",
    email: "cjdse7@google.com",
    telegram: "@nvujik",
  };

  const postData = [
    {
      index: 1,
      postLink: "https://admin.creatorx.me/creatorx/list",
      views: "12134",
      likes: "56789",
      shares: "56789",
      comments: "56789",
      remarks: "This is the remark content.",
      createdTime: "2025/07/29 10:28:00",
    },
    {
      index: 2,
      postLink: "https://admin.creatorx.me/creatorx/list",
      views: "12134",
      likes: "56789",
      shares: "56789",
      comments: "56789",
      remarks: "This is the remark content.",
      createdTime: "2025/07/29 10:28:00",
    },
    {
      index: 3,
      postLink: "https://admin.creatorx.me/creatorx/list",
      views: "12134",
      likes: "56789",
      shares: "56789",
      comments: "56789",
      remarks: "This is the remark content.",
      createdTime: "2025/07/29 10:28:00",
    },
  ];

  const totalPages = Math.ceil(postData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = postData.slice(startIndex, endIndex);

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        {user?.role !== "KOL" && (
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <button
                onClick={onBack}
                className="text-blue-600 hover:underline"
              >
                KOL Accounts
              </button>
              <span>/</span>
              <span>Account Details</span>
            </div>
          </div>
        )}

        <div className="p-6">
          <h2 className="text-base font-semibold mb-4">Basic Info</h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
            <div className="flex">
              <span className="text-gray-600 w-32">ID</span>
              <span className="text-gray-800">{accountData.id}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32">X Account</span>
              <span className="text-blue-600">{accountData.xAccount}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32">Country</span>
              <span className="text-gray-800">{accountData.country}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32">Followers</span>
              <span className="text-gray-800">{accountData.xFollowers}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32">Name</span>
              <span className="text-gray-800">{accountData.name}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32">YouTube Account</span>
              <span className="text-blue-600">{accountData.ytAccount}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32">Post Price</span>
              <span className="text-gray-800">{accountData.postPrice}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32">Followers</span>
              <span className="text-gray-800">{accountData.ytFollowers}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32">Inviter</span>
              <span className="text-gray-800">{accountData.inviter}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32">TikTok Account</span>
              <span className="text-blue-600">{accountData.ttAccount}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32"></span>
              <span className="text-gray-800"></span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32">Followers</span>
              <span className="text-gray-800">{accountData.ttFollowers}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32"></span>
              <span className="text-gray-800"></span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32">Email</span>
              <span className="text-blue-600">{accountData.email}</span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32"></span>
              <span className="text-gray-800"></span>
            </div>
            <div className="flex">
              <span className="text-gray-600 w-32">Telegram Account</span>
              <span className="text-blue-600">{accountData.telegram}</span>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">Post Data</h2>
            <button
              onClick={() => setShowAddPostModal(true)}
              className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded text-sm hover:bg-blue-50"
            >
              Add New
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-700">
                    Index
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">
                    Post Link
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">
                    Views
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">
                    Likes
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">
                    Shares
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">
                    Comments
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">
                    Remarks
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-gray-700">
                    Created Time
                  </th>
                  {user?.role !== "KOL" && (
                    <th className="text-left py-3 px-2 font-medium text-gray-700">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((post) => (
                  <tr key={post.index} className="border-b border-gray-100">
                    <td className="py-3 px-2 text-gray-800">{post.index}</td>
                    <td className="py-3 px-2 text-blue-600 hover:underline">
                      <a
                        href={post.postLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {post.postLink}
                      </a>
                    </td>
                    <td className="py-3 px-2 text-gray-800">{post.views}</td>
                    <td className="py-3 px-2 text-gray-800">{post.likes}</td>
                    <td className="py-3 px-2 text-gray-800">{post.shares}</td>
                    <td className="py-3 px-2 text-gray-800">{post.comments}</td>
                    <td className="py-3 px-2 text-gray-800">{post.remarks}</td>
                    <td className="py-3 px-2 text-gray-800">
                      {post.createdTime}
                    </td>
                    {user?.role !== "KOL" && (
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:underline">
                            Edit
                          </button>
                          <button className="text-red-600 hover:underline">
                            Delete
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {postData.length > itemsPerPage && (
            <div className="mt-4 flex justify-center">
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
      </div>

      {showAddPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Add New</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Post Link</label>
                <input
                  type="text"
                  placeholder="Please enter"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Views</label>
                <input
                  type="text"
                  placeholder="Please enter"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Likes</label>
                <input
                  type="text"
                  placeholder="Please enter"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Shares</label>
                <input
                  type="text"
                  placeholder="Please enter"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Comments</label>
                <input
                  type="text"
                  placeholder="Please enter"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Remarks</label>
                <textarea
                  placeholder="Please enter"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddPostModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddPostModal(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
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
