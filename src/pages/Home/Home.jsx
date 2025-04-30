import React from "react";
import MenuBar from "../../components/MenuBar/MenuBar";
import Header from "../../components/Header/Header";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-content-center min-vh-100">
      <MenuBar />
      <Header />
    </div>
  );
};

export default Home;
