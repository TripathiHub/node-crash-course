import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Products from "./pages/Products";
import Signupauth from "./pages/Signupauth";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("jwtToken")
  );
  function ProtectedRoute({ element }) {
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <>
      <section id="center">
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signupauth />} />
          <Route path="/products" element={<ProtectedRoute element={<Products setIsAuthenticated={setIsAuthenticated} />} />} />
          <Route path="/" element={<Navigate to="/signup" />} />
        </Routes>
        <ToastContainer />
      </section>
    </>
  )
}

export default App;
