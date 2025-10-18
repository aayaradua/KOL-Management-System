import { Navigate } from "react-router";
import { useUser } from "../lib/user-context";

export function ProtectedRoute({ children }) {
  const { user } = useUser();

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
