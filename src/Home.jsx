import React from "react";
import "./home.css";
import LoveReact from "./component/reaction/love/Love";

function Home() {
  return (
    <>
      <div>
        <div className="home-container">
          <div className="home-content">
            <h1>Happy Sweet Seventeen</h1>
            <p>Happi Birthday 🥳🎉</p>
            <p>May every day be as special and beautiful as your smile 💖💖</p>
            <p style={{ color: "gray" }}>~eakk~</p>
            <LoveReact />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
