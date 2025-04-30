import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(90deg, #8360c3, #2ebf91",
        border: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "30px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "24px",
            textDecoration: "none",
          }}
        >
          <img src={assets.logo_white} alt="" width={32} height={32} />
          <span className="fw-bold fs-4 text-light">GateWayz</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
