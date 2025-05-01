import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MenuBar = () => {
  const navigate = useNavigate();
  const { userData, backendURL, setUserData, setIsLoggedIn } =
    useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutsite = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsite);
    return () => document.removeEventListener("mousedown", handleClickOutsite);
  }, []);

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(backendURL + "/logout");
      if (response.status === 200) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(backendURL + "/send-otp");
      if (response.status === 200) {
        navigate("/email-verify");
        toast.success("OTP has been sent successfully.");
      } else {
        toast.error("Unable to send OTP.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav className="navbar bg-white px-5 py-4 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-2">
        <img src={assets.logo} alt="logo" width={32} height={32} />
        <span className="fw-bold fs-4 text-dark">GateWayz</span>
      </div>

      {userData ? (
        <div className="position-relative" ref={dropdownRef}>
          <div
            className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => {
              setDropdownOpen((prev) => !prev);
            }}
          >
            {userData.name[0].toUpperCase()}
          </div>
          {dropdownOpen && (
            <div
              className="position-absolute shadow bg-white rounded p-2"
              style={{ top: "50px", right: 0, zIndex: 100 }}
            >
              {!userData.isAccountVerified && (
                <div
                  className="dropdown-item py-1 px-2"
                  style={{ cursor: "pointer" }}
                  onClick={sendVerificationOtp}
                >
                  Verify email
                </div>
              )}
              <div
                className="dropdown-item text-danger py-1 px-2"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                Log out
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className="btn btn-outline-dark rounded-pill px-3"
          onClickCapture={() => navigate("/login")}
        >
          Login <i className="bi bi-arrow-right ms-2"></i>
        </div>
      )}
    </nav>
  );
};

export default MenuBar;
