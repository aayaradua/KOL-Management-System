import { useState } from "react";
import { useUser } from "../lib/user-context";
import { useNavigate, useParams } from "react-router";
import api from "../hooks/axios";
import { useQuery } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function KOLAccountDetails() {
  const { user } = useUser();
  const router = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    postUrl: "",
    views: "",
    likes: "",
    shares: "",
    comments: "",
    remarks: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["kol", id],
    queryFn: async () => {
      const res = await api.get(`/kol/view/${id}`, { withCredentials: true });
      return res.data;
    },
    enabled: !!id,
  });

  const accountData = data?.kol || {};
  const postData = data?.posts || [];

  const addPostMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post(`/kol/add-post`, payload, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["kol", id]);
      setShowAddPostModal(false);
      setNewPost({
        postUrl: "",
        views: "",
        likes: "",
        shares: "",
        comments: "",
        remarks: "",
      });
    },
  });

  const handleAddPost = () => {
    addPostMutation.mutate(newPost);
  };

  const totalPages = Math.ceil(postData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = postData.slice(startIndex, startIndex + itemsPerPage);

  const onBack = () => router("/kol");

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6">Failed to load data</div>;
  if (!accountData) return <div className="p-6">No data found</div>;

  const x = accountData.socialMedia?.find((sm) => sm.platform === "x");
  const yt = accountData.socialMedia?.find((sm) => sm.platform === "youtube");
  const tt = accountData.socialMedia?.find((sm) => sm.platform === "tiktok");

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
            <Info label="ID" value={accountData.id?.slice(0, 10)} />
            <Info label="X Account" value={x?.account} link />
            <Info label="Country" value={accountData.country} />
            <Info label="Followers" value={x?.followers} />
            <Info label="Name" value={accountData.name} />
            <Info label="YouTube Account" value={yt?.account} link />
            <Info label="Post Price" value={`$${accountData.postPrice}`} />
            <Info label="Followers" value={yt?.followers} />
            <Info label="Inviter" value={accountData.inviter?.username} />
            <Info label="TikTok Account" value={tt?.account} link />
            <Info label="Followers" value={tt?.followers} />
            <Info label="Email" value={accountData.email} link />
            <Info label="Telegram Account" value={accountData.telegram} link />
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
                  <th className="py-3 px-2 text-left font-medium">#</th>
                  <th className="py-3 px-2 text-left font-medium">Post Link</th>
                  <th className="py-3 px-2 text-left font-medium">Views</th>
                  <th className="py-3 px-2 text-left font-medium">Likes</th>
                  <th className="py-3 px-2 text-left font-medium">Shares</th>
                  <th className="py-3 px-2 text-left font-medium">Comments</th>
                  <th className="py-3 px-2 text-left font-medium">Remarks</th>
                  <th className="py-3 px-2 text-left font-medium">Created</th>
                  {user?.role !== "KOL" && (
                    <th className="py-3 px-2">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((post, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-3 px-2">{i + 1}</td>
                    <td className="py-3 px-2 text-blue-600 hover:underline">
                      <a
                        href={post.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {post.postUrl}
                      </a>
                    </td>
                    <td className="py-3 px-2">{post.views}</td>
                    <td className="py-3 px-2">{post.likes}</td>
                    <td className="py-3 px-2">{post.shares}</td>
                    <td className="py-3 px-2">{post.comments}</td>
                    <td className="py-3 px-2">{post.remarks}</td>
                    <td className="py-3 px-2">
                      {post.createdTime
                        ? new Date(post.createdTime).toLocaleString()
                        : "—"}
                    </td>
                    {user?.role !== "KOL" && (
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => router(`/edit-post/${post._id}`)}
                            className="text-blue-600 hover:underline"
                          >
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
            <div className="mt-4 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded text-sm ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {showAddPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Add New Post</h2>
            <div className="space-y-4">
              {Object.keys(newPost).map((key) => (
                <div key={key}>
                  <label className="block text-sm mb-1 capitalize">{key}</label>
                  <input
                    type="text"
                    value={newPost[key]}
                    onChange={(e) =>
                      setNewPost((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    placeholder="Please enter"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddPostModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPost}
                disabled={addPostMutation.isPending}
                className="px-6 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                {addPostMutation.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ label, value, link = false }) {
  if (!value) return null;
  return (
    <div className="flex">
      <span className="text-gray-600 w-32">{label}</span>
      {link ? (
        <a href="#" className="text-blue-600 hover:underline">
          {value}
        </a>
      ) : (
        <span className="text-gray-800">{value}</span>
      )}
    </div>
  );
}
