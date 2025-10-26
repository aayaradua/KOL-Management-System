import { useState } from "react";
import { useUser } from "../lib/user-context";
import { useNavigate, useParams } from "react-router";
import api from "../hooks/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreVertical, Edit, Trash2 } from "lucide-react";

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
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ---------- DATA FETCH ----------
  const { data, isLoading, isError } = useQuery({
    queryKey: ["kol-details", id],
    queryFn: async () => {
      const res = await api.get(`/kol/${id}`, { withCredentials: true });
      console.log("KOL Details:", res.data);
      return res.data;
    },
    enabled: !!id,
  });

  const kol = data?.kol || {};
  const details = kol.otherInfo || {};
  const postData = details.posts || [];

  const addPostMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post(`/kol/create-post`, payload, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["kol-details", id]);
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

  const editPostMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.patch(`/kol/${id}/posts/${payload._id}`, payload, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["kol-details", id]);
      setShowEditModal(false);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (postId) => {
      const res = await api.delete(`/kol/${id}/posts/${postId}`, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["kol-details", id]),
  });

  // ---------- HANDLERS ----------
  const handleAddPost = () => addPostMutation.mutate({ ...newPost, kolId: id });
  const handleEditClick = (post) => {
    setEditPost(post);
    setShowEditModal(true);
    setOpenDropdown(null);
  };
  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostMutation.mutate(postId);
    }
  };
  const onBack = () => router("/kol");

  // ---------- PAGINATION ----------
  const totalPages = Math.ceil(postData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = postData.slice(startIndex, startIndex + itemsPerPage);

  // ---------- RENDER ----------
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6">Failed to load data</div>;
  if (!kol) return <div className="p-6">No data found</div>;

  const x = details.socialMedia?.find((sm) => sm.platform === "x");
  const yt = details.socialMedia?.find((sm) => sm.platform === "youtube");
  const tt = details.socialMedia?.find((sm) => sm.platform === "tiktok");
  const tg = details.socialMedia?.find((sm) => sm.platform === "telegram");

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md">
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

        {/* BASIC INFO */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Basic Info
          </h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
            <Info label="KOL ID" value={kol._id?.slice(0, 10)} />
            <Info label="Name" value={details.name} />
            <Info label="Email" value={kol.email} />
            <Info label="Country" value={details.country} />
            <Info label="Status" value={kol.status} />
            <Info label="Post Price" value={`$${details.postPrice}`} />
            <Info label="Inviter" value={details.inviter} />
            <Info label="X Account" value={x?.account} link />
            <Info label="X Followers" value={x?.followers} />
            <Info label="YouTube" value={yt?.account} link />
            <Info label="YT Followers" value={yt?.followers} />
            <Info label="TikTok" value={tt?.account} link />
            <Info label="TT Followers" value={tt?.followers} />
            <Info label="Telegram" value={tg?.account} link />
            <Info label="TG Followers" value={tg?.followers} />
            <Info
              label="Created At"
              value={new Date(kol.createdAt).toLocaleString()}
            />
            <Info
              label="Last Updated"
              value={
                details.updatedAt
                  ? new Date(details.updatedAt).toLocaleString()
                  : "—"
              }
            />
          </div>
        </div>

        {/* POSTS SECTION */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Post Data</h2>
            <button
              onClick={() => setShowAddPostModal(true)}
              className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded text-sm hover:bg-blue-50 transition"
            >
              Add New
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-gray-700">
                  <th className="py-3 px-2 text-left font-medium">#</th>
                  <th className="py-3 px-2 text-left font-medium">Post Link</th>
                  <th className="py-3 px-2 text-left font-medium">Views</th>
                  <th className="py-3 px-2 text-left font-medium">Likes</th>
                  <th className="py-3 px-2 text-left font-medium">Shares</th>
                  <th className="py-3 px-2 text-left font-medium">Comments</th>
                  <th className="py-3 px-2 text-left font-medium">Remarks</th>
                  {user?.role !== "KOL" && (
                    <th className="py-3 px-2 text-left font-medium">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((post, i) => (
                  <tr
                    key={post._id || i}
                    className="border-b hover:bg-gray-50 transition"
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
                    {user?.role !== "KOL" && (
                      <td className="relative py-3 px-2">
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() =>
                              setOpenDropdown(
                                openDropdown === post._id ? null : post._id
                              )
                            }
                            className="text-gray-600 hover:text-gray-800 focus:outline-none"
                          >
                            <MoreVertical size={18} />
                          </button>

                          {openDropdown === post._id && (
                            <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                              <button
                                onClick={() => handleEditClick(post)}
                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                              >
                                <Edit size={14} /> Edit
                              </button>
                              <button
                                onClick={() => handleDelete(post._id)}
                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
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

      {/* ADD POST MODAL */}
      {showAddPostModal && (
        <Modal onClose={() => setShowAddPostModal(false)} title="Add New Post">
          {Object.keys(newPost).map((key) => (
            <div key={key}>
              <label className="block text-sm mb-1 capitalize">{key}</label>
              <input
                type="text"
                value={newPost[key]}
                onChange={(e) =>
                  setNewPost((prev) => ({ ...prev, [key]: e.target.value }))
                }
                placeholder="Please enter"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          ))}
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
        </Modal>
      )}

      {/* EDIT POST MODAL */}
      {showEditModal && editPost && (
        <Modal onClose={() => setShowEditModal(false)} title="Edit Post">
          {Object.keys(newPost).map((key) => (
            <div key={key}>
              <label className="block text-sm mb-1 capitalize">{key}</label>
              <input
                type="text"
                value={editPost[key] || ""}
                onChange={(e) =>
                  setEditPost((prev) => ({ ...prev, [key]: e.target.value }))
                }
                placeholder="Please enter"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          ))}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setShowEditModal(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => editPostMutation.mutate(editPost)}
              disabled={editPostMutation.isPending}
              className="px-6 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              {editPostMutation.isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Info({ label, value, link = false }) {
  if (!value) return null;
  return (
    <div className="flex">
      <span className="text-gray-600 w-40">{label}</span>
      {link ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {value}
        </a>
      ) : (
        <span className="text-gray-800">{value}</span>
      )}
    </div>
  );
}

function Modal({ children, title, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/30">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}
