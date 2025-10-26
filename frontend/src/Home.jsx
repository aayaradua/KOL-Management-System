"use client";

import { useState, useEffect } from "react";
import { useUser } from "./lib/user-context";
import Header from "./components/header";
import KOLAccounts from "./components/kol-accounts";
import UsersRoles from "./components/users-roles";
import KOLAccountDetails from "./components/kol-account-details";
import Blocklist from "./components/blocklist";
import Sidebar from "./components/sidebar";
import Profile from "./components/profile";
import PostHistory from "./components/post-history";
import NewPost from "./components/new-post";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto"></main>
    </div>
  );
}
