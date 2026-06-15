// import { useEffect } from "react";
import React, { useEffect, useState } from "react";
import RegisterProgress from "./RegisterProgessBar";
import zinterLogo from "../Assets/logo.svg"
import newZinterLogo from "../Assets/logo.svg"
import newLogo from "../Assets/new-zinter-logo-only.svg"
import trustedMovers from "../Assets/trusted_movers.svg"
import bgImage1 from "../Assets/truck-login.svg"
import bgImage2 from "../Assets/box-login.svg"
import "./firstCardToggle.css"

const FirstCardToggle = () => {
    const [bgImage, setBgImage] = useState(bgImage1);


    useEffect(() => {
        const interval = setInterval(() => {
            setBgImage((prevBg) => (prevBg === bgImage1 ? bgImage2 : bgImage1));
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="container-img" style={{ backgroundImage: `url(${bgImage})`, transition: "background 1s ease-in-out" }}>
            <div className="container_logo_header">
                <img src={newLogo} alt="" />
                <span>Zinter</span>
            </div>
            <div className="our_network">
                <div className="our_network_img">
                    <img src={trustedMovers} alt="" />
                </div>
                <div className="our_network_text">
                    <span>
                        Join our network of trusted movers,
                        reach customers, and boost your revenue
                        with minimal hassle.
                    </span>
                </div>
            </div>
            <div className="container_progress_bar">
                <span className="progress-bar"></span>
                <span className="progress-bar-toggle" style={{ backgroundColor: bgImage === bgImage2 ? 'white' : 'transparent' }} ></span>

            </div>
            <div>
               
            </div>
        </div>
    )
}

export default FirstCardToggle