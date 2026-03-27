import React, { useState, useEffect } from "react";
import "./quotes.css";

const fullText = `Happy 17th birthday! 🥳🥳 Welcome to "Sweet Seventeen" which is said to be sweet. Well, hopefully it's really sweet. In my opinion, now is the 'golden hour' of life, where there are many things you can try without fear of failure. They say, "no risk, no Ferrari", just assume that behind great risk, there is equally great fortune. Consider all challenges as opportunities to learn many new things and become stronger to continue pursuing your dreams. At the age of 17, which is a transition from adolescence to adulthood, I hope you become a better person (although you are already very good 🙄🙄), dare to try many things (even though you can already do many things 👌), be wise in every decision you make, and become a more open person to yourself and others. I also hope that all the days you live are filled with happiness, ease, and success.`;

function Quotes() {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 15); // kecepatan mengetik (ms)
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="quote-container">
        <div className="board">
          <h1>This is real, this is my heart hehe</h1>
          <div className="quote">
            <p>{displayedText}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quotes;
