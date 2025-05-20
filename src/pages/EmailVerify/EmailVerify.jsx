import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

import "../../styles/global.css";

import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const EmailVerify = () => {
  const inputRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const { getUserData, isLoggedIn, userData, backendURL } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    e.target.value = value;
    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = event.clipboardData.getData("text").slice(0, 6).split("");
    paste.forEach((digit, i) => {
      if (inputRef.current[i]) {
        inputRef.current[i].value = digit;
      }
    });
    const next = paste.length < 6 ? paste.length : 5;
    inputRef.current[next].focus();
  };

  const handleVerify = async () => {
    const otp = inputRef.current.map((input) => input.value).join("");
    if (otp.length !== 6) {
      toast.error("Please all 6-digits of the OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(backendURL + "/verify-otp", { otp });
      if (response.status === 200) {
        toast.success("OTP verify successfully.");
        getUserData();
        navigate("/");
      } else {
        toast.error("6-digits OTP is invalid.");
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedIn, userData]);

  useEffect(() => {
    const handleClickOutsite = (event) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target)
      ) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsite);
    return () => document.removeEventListener("mousedown", handleClickOutsite);
  }, []);

  return (
    <div
      className="email-verify-container d-flex align-items-center justify-content-center min-vh-100 position-relative"
      style={{
        background: "linear-gradient(90deg, #8360c3, #2ebf91",
        border: "none",
      }}
    >
      <Link
        to="/"
        className="position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2 text-decoration-none"
      >
        <img src={assets.logo_white} alt="logo" width={32} height={32} />
        <span className="fs-4 fw-bold text-light">GateWayz</span>
      </Link>

      <div className="position-absolute top-0 end-0 p-4" ref={langDropdownRef}>
        <div
          className="bg-light text-dark rounded-circle d-flex justify-content-center align-items-center border"
          style={{
            width: "40px",
            height: "40px",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => {
            setLangDropdownOpen((prev) => !prev);
          }}
        >
          <i className="bi bi-translate"></i>
        </div>
        {langDropdownOpen && (
          <div
            className="position-absolute shadow bg-white rounded p-2"
            style={{ top: "60px", right: "30px", zIndex: 100 }}
          >
            <div
              className="dropdown-item py-1 px-2"
              style={{ cursor: "pointer" }}
              onClick={() => changeLanguage("en")}
            >
              English
            </div>
            <div
              className="dropdown-item py-1 px-2"
              style={{ cursor: "pointer" }}
              onClick={() => changeLanguage("pt")}
            >
              Português
            </div>
          </div>
        )}
      </div>

      <div className="p-5 rounded-4 shadow bg-white" style={{ width: "400px" }}>
        <h4 className="text-center fw-bold mb-2">{t("verifyOtp")}</h4>
        <p className="text-center mb-4">{t("6digitText")}</p>

        <div className="d-flex justify-content-between gap-2 mb-4 text-center text-white-50 mb-2">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="form-control text-center fs-4 otp-input"
              ref={(el) => (inputRef.current[i] = el)}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
            />
          ))}
        </div>

        <button
          className="btn btnGrad text-white w-100 fw-semibold"
          disabled={loading}
          onClick={handleVerify}
        >
          {loading ? t("verifying") : t("verifyEmail")}
        </button>
      </div>
    </div>
  );
};

export default EmailVerify;
