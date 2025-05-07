import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

import "../../i18n";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { userData } = useContext(AppContext);

  const { t, i18n } = useTranslation();

  return (
    <div
      className="text-center d-flex flex-column align-items-center justify-content-center py-5 px-3"
      style={{ minHeight: "80vh" }}
    >
      <img src={assets.header} alt="header" width={120} />

      <h5 className="fw-semibold">
        {t("hey")} {userData ? userData.name : t("developer")}
        <span role="img" aria-label="wave">
          🖐️
        </span>
      </h5>
      <h1 className="fw-bold display-5 mb-3">{t("welcome")}</h1>
      <p className="text-muted fs-5 mb-4" style={{ maxWidth: "500px" }}>
        {t("description")}
      </p>
      <button className="btn btn-outline-dark rounded-pill px-4 py-2">
        {t("setItUp")}
      </button>
    </div>
  );
};

export default Header;
