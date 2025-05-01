import React, { useContext, useRef, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

import "../../styles/global.css";

import { toast } from "react-toastify";

const ResetPassword = () => {
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const { getUserData, isLoggedIn, userData, backendURL } =
    useContext(AppContext);

  axios.defaults.withCredentials = true;

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        backendURL + "/send-reset-otp?email=" + email
      );
      if (response.status === 200) {
        toast.success("Password reset OTP sent successfully.");
        setEmailSent(true);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = () => {
    const otp = inputRef.current.map((input) => input.value).join("");
    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP.");
      return;
    }

    setOtp(otp);
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(backendURL + "/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (response.status === 200) {
        toast.success("Password reset sucessfully.");
        navigate("/login");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(90deg, #8360c3, #2ebf91",
        border: "none",
      }}
    >
      <Link
        to="/"
        className="position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2 text-decoration-none"
      >
        <img src={assets.logo_white} alt="" width={32} height={32} />
        <span className="fw-bold fs-4 text-light">GateWayz</span>
      </Link>

      {/* Reset passwor d cart */}
      {!isEmailSent && (
        <div
          className="rounded-4 p-5 text-center bg-white "
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h4 className="mb-2">Reset Password</h4>
          <p className="mb-4">Enter your registered email address.</p>
          <form onSubmit={onSubmitEmail}>
            <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill">
              <span className="input-group-text bg-transparent border-0 ps-4">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control bg-transparent border-0 ps-1 pe-4 rounded-end"
                placeholder="Enter your email address."
                style={{ height: "50px" }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <button
              className="btn btnGrad text-white w-100 py-2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      )}

      {/* OTP Card */}
      {!isOtpSubmitted && isEmailSent && (
        <div
          className="p-5 rounded-4 shadow bg-white"
          style={{ width: "400px" }}
        >
          <h4 className="text-center fw-bold mb-2">Verify OTP</h4>
          <p className="text-center mb-4">
            Enter 6-digit code sent to your email.
          </p>

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
            {loading ? "Verifying..." : "Verify email"}
          </button>
        </div>
      )}

      {/* New password form */}
      {isOtpSubmitted && isEmailSent && (
        <div
          className="rounded-4 p-4 text-center bg-white"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h4>New Password</h4>
          <p className="mb-4">Enter your new password below.</p>
          <form onSubmit={onSubmitNewPassword}>
            <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill">
              <span className="input-group-text bg-transparent border-0 ps-4">
                <i className="bi bi-person-fill-lock"></i>
              </span>
              <input
                type="password"
                className="form-control border-0 bg-transparent ps-1 pe-4 rounded-end"
                placeholder="Enter your new password"
                style={{ height: "50px" }}
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btnGrad w-100"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
