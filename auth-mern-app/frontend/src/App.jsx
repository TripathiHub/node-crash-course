import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Products from "./pages/Products";
import Signupauth from "./pages/Signupauth";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <section id="center">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signupauth/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/" element={<Navigate to="/signup" />} />
        </Routes>
        <ToastContainer />
      </section>
    </>
  )
}

export default App;
