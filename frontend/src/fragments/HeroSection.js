import React, { useEffect } from 'react';
import './HeroSection.css'

function Home(){
  useEffect(() => {
    const left = document.getElementById("left-side");

    const handleMove = e => {
      left.style.width = `${e.clientX / window.innerWidth * 100}%`;
    }

    document.onmousemove = e => handleMove(e);

    document.ontouchmove = e => handleMove(e.touches[0]);

    
    return () => {
      document.onmousemove = null;
      document.ontouchmove = null;
    };
  }, []); 

  return (
    <>
    <div className="hero-container">
      <div id="left-side" className="side">
            <h2 className="title">
            Nourishing Life, Cultivating
            <span className="fancy"> Wellness</span>
            </h2>
        </div>
        <div id="right-side" className="side">
            <h2 className="title">
            Nourishing Life, Cultivating
            <span className="fancy"> Growth </span>
            </h2>
        </div>
      </div>
    </>
  );
}

export default Home;
