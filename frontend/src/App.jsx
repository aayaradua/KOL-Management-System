import Home from "./Home";
import { Route, Routes } from "react-router";
import { Logging } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Logging />} />
    </Routes>
  );
}

export default App;
