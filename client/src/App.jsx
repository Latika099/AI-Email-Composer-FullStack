import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateEmail from "./pages/CreateEmail";
import ProtectedRoute from "./components/ProtectedRoute";
import EmailHistory from "./pages/EmailHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/email-history"
          element={
            <ProtectedRoute>
              <EmailHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-email"
          element={
            <ProtectedRoute>
              <CreateEmail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
