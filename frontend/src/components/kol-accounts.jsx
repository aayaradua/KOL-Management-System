import { useState, useMemo } from "react";
// import { allAccounts } from "../constants/allAccounts";
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
      (account) =>
        account?.id?.toLowerCase().includes(query) ||
        account?.country?.toLowerCase().includes(query) ||
        account?.name?.toLowerCase().includes(query) ||
        account?.socialMedia?.some((sm) =>
          sm.platform?.toLowerCase().includes(query)
        )
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
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">KOL Accounts</h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded flex-1"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Country</th>
              <th className="p-3 text-left">Socials</th>
              <th className="p-3 text-right">Post ($)</th>
              <th className="p-3 text-left">Inviter</th>
              <th className="p-3 text-left">Created</th>
            </tr>
          </thead>

          <tbody>
            {currentAccounts.map((account) => (
              <tr
                key={account.id}
                onClick={() => router(`/kol/${account.id}`)}
                className="border-t hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <td className="p-3 font-mono text-gray-700">
                  {account.id.slice(0, 10)}...
                </td>
                <td className="p-3">{account.name}</td>
                <td className="p-3">{account.country}</td>
                <td className="p-3">
                  {account.socialMedia?.map((sm) => (
                    <div key={sm._id} className="text-xs">
                      <strong>{sm.platform?.toUpperCase()}:</strong>{" "}
                      {sm.account || "—"}{" "}
                      {sm.followers && (
                        <span className="text-gray-500">({sm.followers})</span>
                      )}
                    </div>
                  ))}
                </td>
                <td className="p-3 text-right">${account.postPrice}</td>
                <td className="p-3">{account.inviter?.username || "—"}</td>
                <td className="p-3">
                  {new Date(account.created).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAccounts.length > itemsPerPage && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
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
