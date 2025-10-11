"use client";

import { useState, useEffect } from "react";
import { useUser } from "./lib/user-context";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import KOLAccounts from "./components/kol-accounts";
import UsersRoles from "./components/users-roles";
import KOLAccountDetails from "./components/kol-account-details";
import Blocklist from "./components/blocklist";

export default function Home() {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState("kol-accounts");
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  useEffect(() => {
    if (user?.role === "KOL") {
      setCurrentPage("kol-account-details");
      setSelectedAccountId(user.id);
    }
  }, [user]);

  const handleViewAccount = (id) => {
    setSelectedAccountId(id);
    setCurrentPage("kol-account-details");
  };

  const handleBackToList = () => {
    setSelectedAccountId(null);
    setCurrentPage("kol-accounts");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <div className="flex-1 flex flex-col max-w-[1200px] mx-auto">
        <Header />
        <main className="flex-1 overflow-auto">
          {currentPage === "kol-accounts" && (
            <KOLAccounts onViewAccount={handleViewAccount} />
          )}
          {currentPage === "kol-account-details" && (
            <KOLAccountDetails
              accountId={selectedAccountId}
              onBack={handleBackToList}
            />
          )}
          {currentPage === "blocklist" && <Blocklist />}
          {currentPage === "users-roles" && <UsersRoles />}
        </main>
      </div>
    </div>
  );
}
