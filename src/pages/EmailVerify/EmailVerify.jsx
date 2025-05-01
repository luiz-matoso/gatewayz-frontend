import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const EmailVerify = () => {
  return (
    <div
      className="email-verify-container d-flex align-items-center justify-justify-content-center min-vh-100 position-relative"
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
    </div>
  );
};

export default EmailVerify;
