import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { data, Link, useNavigate } from "react-router-dom";

import "../../styles/global.css";

import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);

    try {
      if (isCreateAccount) {
        //sign up
        const response = await axios.post(`${backendURL}/register`, {
          name,
          email,
          password,
        });
        if (response.status === 201) {
          navigate("/");
          toast.success("Account create successfully");
        } else {
          toast.error("Email already exists.");
        }
      } else {
        //login
        const response = await axios.post(`${backendURL}/login`, {
          email,
          password,
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error("Email or password is incorrect.");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

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

      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">
          {isCreateAccount ? t("signUpPage") : t("loginPage")}
        </h2>
        <form onSubmit={onSubmitHandler}>
          {isCreateAccount && (
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                {t("fullName")}
              </label>
              <input
                type="text"
                id="fullName"
                className="form-control"
                placeholder={t("placeholder.fullName")}
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder={t("placeholder.email")}
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              {t("password")}
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder={t("placeholder.password")}
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {!isCreateAccount && (
            <div className="d-flex justify-content-between mb-3">
              <Link to="/reset-password" className="text-decoration-none">
                {t("forgotPassword")}
              </Link>
            </div>
          )}

          <button
            type="submit"
            className="btn btnGrad text-white w-100"
            disabled={loading}
          >
            {loading
              ? t("loading")
              : isCreateAccount
              ? t("signUpPage")
              : t("loginPage")}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0">
            {isCreateAccount ? (
              <>
                {t("alreadyHaveAccount")}{" "}
                <span
                  onClick={() => setIsCreateAccount(false)}
                  className="text-decoration-underline"
                  style={{ cursor: "pointer" }}
                >
                  {t("login")}
                </span>
              </>
            ) : (
              <>
                {t("dontHaveAccount")}{" "}
                <span
                  onClick={() => setIsCreateAccount(true)}
                  className="text-decoration-underline"
                  style={{ cursor: "pointer" }}
                >
                  {t("signUpPage")}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
