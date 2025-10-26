import { Route, Routes } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";
import KOLAccountDetails from "./components/kol-account-details";
import KOLAccounts from "./components/kol-accounts";
import Sidebar from "./components/sidebar";
import Blocklist from "./components/blocklist";
import UsersRoles from "./components/users-roles";
import Profile from "./components/profile";
import NewPost from "./components/new-post";
import PostHistory from "./components/post-history";
import Logging from "./components/Login";
import KolOnboarding from "./components/Onboading";
import Header from "./components/header";

export default function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-50 p-6 overflow-auto">
        <Header />
        <Routes>
          <Route path="/login" element={<Logging />} />
          <Route path="/onboarding" element={<KolOnboarding />} />
          <Route
            path="/kol"
            element={
              <ProtectedRoute>
                <KOLAccounts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kol/:id"
            element={
              <ProtectedRoute>
                <KOLAccountDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blocklist"
            element={
              <ProtectedRoute>
                <Blocklist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roles"
            element={
              <ProtectedRoute>
                <UsersRoles />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-post"
            element={
              <ProtectedRoute>
                <NewPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post-history"
            element={
              <ProtectedRoute>
                <PostHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<h1 className=" text-5xl text-red-400">404 Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
}
