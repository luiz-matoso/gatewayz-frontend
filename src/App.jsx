import { ToastContainer } from "react-toastify";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import EmailVerify from "./pages/EmailVerify/EmailVerify";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  return (
    <>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
