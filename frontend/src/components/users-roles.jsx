import { useState, useMemo } from "react";
import { useUser } from "../lib/user-context";
import api from "../hooks/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function UsersRoles() {
  const { user } = useUser();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [createdUser, setCreatedUser] = useState(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const queryClient = useQueryClient();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "KOL",
    status: "enable",
  });

  const roles = ["KOL", "Marketing Manager", "Marketing Director", "Admin"];
  const statusOptions = ["enable", "disable"];

  const getStatusColor = (status) => {
    if (!status) return "text-gray-500";
    const normalized = status.toLowerCase();
    if (normalized === "enable" || normalized === "active")
      return "text-green-600";
    if (normalized === "disable" || normalized === "inactive")
      return "text-red-600";
    if (normalized === "pending") return "text-yellow-600";
    return "text-gray-600";
  };

  // ✅ Fetch users
  const { data } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await api.get(`user/all`, { withCredentials: true });
      return res.data;
    },
  });

  const filteredUsers = useMemo(() => {
    if (!data?.users) return [];

    const currentRole = user?.role?.toLowerCase();

    let usersList = data.users;

    if (currentRole === "kol") {
      usersList = usersList.filter((u) => {
        const role = u.role?.toLowerCase();
        const isSelf =
          u?.email?.toLowerCase() === user?.email?.toLowerCase() ||
          u?.username?.toLowerCase() === user?.username?.toLowerCase();

        return isSelf || role === "director" || role === "marketing-manager";
      });
    }

    if (!searchQuery.trim()) return usersList;
    const query = searchQuery.toLowerCase();

    return usersList.filter(
      (u) =>
        u?.id?.toLowerCase().includes(query) ||
        u?.username?.toLowerCase().includes(query) ||
        u?.role?.toLowerCase().includes(query) ||
        u?.status?.toLowerCase().includes(query)
    );
  }, [searchQuery, data, user]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const handleSearch = () => setCurrentPage(1);

  const createUserMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("auth/create-user", payload, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success("User created successfully!");
      setCreatedUser({
        username: variables.username,
        email: variables.email,
        password: variables.password,
      });
      setShowAddModal(false);
      setShowSuccessModal(true);
      setNewUser({
        username: "",
        email: "",
        password: "",
        role: "KOL",
        status: "enable",
      });
      queryClient.invalidateQueries(["all-users"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create user");
    },
  });

  // ✅ Edit user mutation
  const editUserMutation = useMutation({
    mutationFn: async ({ id, updates }) => {
      const res = await api.patch(`user/${id}`, updates, {
        withCredentials: true,
      });
      return res.data;
    },

    onSuccess: () => {
      toast.success("User updated successfully!");
      setShowEditModal(false);
      setSelectedUser(null);
      queryClient.invalidateQueries(["all-users"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update user");
    },
  });

  const handleAddUser = () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      toast.error("Please fill all required fields");
      return;
    }

    createUserMutation.mutate({
      username: newUser.username.trim(),
      email: newUser.email.trim().toLowerCase(),
      password: newUser.password.trim(),
      role: newUser.role.trim().toLowerCase(),
      status: newUser.status.trim().toLowerCase() || "enable",
    });
  };

  const handleEditUser = () => {
    if (!selectedUser?.id) return;
    const updates = {
      role: selectedUser.role.trim().toLowerCase(),
      status: selectedUser.status.trim().toLowerCase(),
    };
    editUserMutation.mutate({ id: selectedUser.id, updates });
  };

  const handleCopy = () => {
    if (!createdUser) return;
    const details = `Username: ${createdUser.username}\nEmail: ${createdUser.email}\nPassword: ${createdUser.password}`;
    navigator.clipboard.writeText(details);
    toast.success("User details copied!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCurrentUser = (userItem) => {
    if (!user || !userItem) return false;
    return (
      userItem?.email?.toLowerCase() === user?.email?.toLowerCase() ||
      userItem?.username?.toLowerCase() === user?.user_name?.toLowerCase()
    );
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Users Roles</h1>
          {user?.role === "admin" && (
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setShowAddModal(true)}
            >
              ➕ Add User
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="flex flex-wrap gap-3 p-6 border-b border-gray-100">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-w-[250px]"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {/* Users Table */}
        <div className="p-6">
          <div className="text-sm text-gray-600 mb-3">
            Users ({filteredUsers?.length || 0})
          </div>
          {/* Responsive Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-3 px-2 text-left">User ID</th>
                  <th className="py-3 px-2 text-left">Avatar</th>
                  <th className="py-3 px-2 text-left">Username</th>
                  <th className="py-3 px-2 text-left">Email</th>
                  <th className="py-3 px-2 text-left">Role</th>
                  {user.role.toLowerCase() !== "kol" && (
                    <>
                      <th className="py-3 px-2 text-left">Status</th>
                      <th className="py-3 px-2 text-left">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((userItem) => {
                  const isMe = isCurrentUser(userItem);
                  return (
                    <tr
                      key={userItem?.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-2">
                        {userItem?.id?.slice(0, 10) || "—"}
                      </td>
                      <td className="py-3 px-2">
                        <img
                          src={
                            userItem?.avatar ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${userItem?.username}`
                          }
                          alt={userItem?.username}
                          className="w-8 h-8 rounded-full"
                        />
                      </td>
                      <td className="py-3 px-2">
                        {userItem?.username}{" "}
                        {isMe && <span className="text-blue-600">(Me)</span>}
                      </td>
                      <td className="py-3 px-2">{userItem?.email}</td>
                      <td className="py-3 px-2">{userItem?.role}</td>
                      {user.role.toLowerCase() !== "kol" && (
                        <>
                          <td
                            className={`py-3 px-2 ${getStatusColor(
                              userItem?.status
                            )}`}
                          >
                            {userItem?.status || "—"}
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex gap-2">
                              <button
                                className={`text-blue-600 hover:underline ${
                                  isMe ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                onClick={() => {
                                  if (isMe) return;
                                  setSelectedUser({
                                    id: userItem.id,
                                    role: userItem.role,
                                    status: userItem.status,
                                  });
                                  setShowEditModal(true);
                                }}
                                disabled={isMe}
                              >
                                Edit
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredUsers.map((userItem) => {
              const isMe = isCurrentUser(userItem);
              return (
                <div
                  key={userItem?.id}
                  className="border rounded-lg p-4 bg-white shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={
                        userItem?.avatar ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${userItem?.username}`
                      }
                      alt={userItem?.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {userItem?.username}{" "}
                        {isMe && (
                          <span className="text-blue-600 text-sm">(Me)</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">{userItem?.email}</p>
                    </div>
                  </div>

                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-medium text-gray-600">Role:</span>{" "}
                      {userItem?.role}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">Status:</span>{" "}
                      <span className={getStatusColor(userItem?.status)}>
                        {userItem?.status || "—"}
                      </span>
                    </p>
                    <p className="text-gray-500 text-xs">
                      ID: {userItem?.id?.slice(0, 10)}...
                    </p>
                  </div>

                  {user.role.toLowerCase() !== "kol" && (
                    <div className="mt-3">
                      <button
                        className={`text-blue-600 hover:underline text-sm ${
                          isMe ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={() => {
                          if (isMe) return;
                          setSelectedUser({
                            id: userItem.id,
                            role: userItem.role,
                            status: userItem.status,
                          });
                          setShowEditModal(true);
                        }}
                        disabled={isMe}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <Input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <Select
              value={newUser.role}
              onValueChange={(value) => setNewUser({ ...newUser, role: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddUser}
              disabled={createUserMutation.isPending}
            >
              {createUserMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Created Successfully 🎉</DialogTitle>
          </DialogHeader>
          {createdUser && (
            <div className="mt-4 space-y-2">
              <p>
                <strong>Username:</strong> {createdUser.username}
              </p>
              <p>
                <strong>Email:</strong> {createdUser.email}
              </p>
              <p>
                <strong>Password:</strong> {createdUser.password}
              </p>

              <Button className="w-full mt-4" onClick={handleCopy}>
                {copied ? "Copied ✅" : "Copy Details"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 mt-4">
              <Select
                value={selectedUser.role}
                onValueChange={(value) =>
                  setSelectedUser({ ...selectedUser, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedUser.status}
                onValueChange={(value) =>
                  setSelectedUser({ ...selectedUser, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEditUser}
                  disabled={editUserMutation.isPending}
                >
                  {editUserMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
