import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../hooks/axios";
import { useNavigate } from "react-router";

const getAllKol = async () => {
  const response = await api.get("/kol/all");
  return response.data;
};

export function useKolList() {
  return useQuery({
    queryKey: ["kol-list"],
    queryFn: getAllKol,
  });
}

const KOLAccounts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useNavigate();

  const { data, isPending } = useKolList();
  const Kols = data?.kols || [];

  const filteredAccounts = useMemo(() => {
    if (!searchQuery.trim()) return Kols;

    const query = searchQuery.toLowerCase();
    return Kols.filter(
      (kol) =>
        kol._id?.toLowerCase().includes(query) ||
        kol.username?.toLowerCase().includes(query) ||
        kol.email?.toLowerCase().includes(query) ||
        kol.status?.toLowerCase().includes(query)
    );
  }, [searchQuery, Kols]);

  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAccounts = filteredAccounts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        KOL Accounts
      </h1>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or status..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded flex-1 text-sm sm:text-base"
        />
      </div>

      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm sm:text-base border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {currentAccounts.map((kol) => (
              <tr
                key={kol._id}
                onClick={() => router(`/kol/${kol._id}`)}
                className="border-t hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="p-3 font-mono text-gray-700">
                  {kol._id.slice(0, 10)}...
                </td>
                <td className="p-3">{kol.username}</td>
                <td className="p-3 capitalize">{kol.role}</td>
                <td className="p-3">{kol.email}</td>
                <td
                  className={`p-3 font-semibold ${
                    kol.status === "enable" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {kol.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="grid md:hidden gap-4">
        {currentAccounts.map((kol) => (
          <div
            key={kol._id}
            onClick={() => router(`/kol/${kol._id}`)}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>ID:</span>
              <span className="font-mono text-gray-700">
                {kol._id.slice(0, 10)}...
              </span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Username:</span>
              <span className="font-medium">{kol.username}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Role:</span>
              <span className="capitalize">{kol.role}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Email:</span>
              <span>{kol.email}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Status:</span>
              <span
                className={`font-semibold ${
                  kol.status === "enable" ? "text-green-600" : "text-red-600"
                }`}
              >
                {kol.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredAccounts.length > itemsPerPage && (
        <div className="mt-6 flex justify-center flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded text-sm sm:text-base transition-colors ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default KOLAccounts;
