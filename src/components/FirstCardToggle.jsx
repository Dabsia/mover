// import { useEffect } from "react";
import React, { useEffect, useState } from "react";
import RegisterProgress from "./RegisterProgessBar";

import "./firstCardToggle.css"

const FirstCardToggle = () => {
    const [bgImage, setBgImage] = useState("/assets/residential-moving.svg");

    useEffect(() => {
        const interval = setInterval(() => {
            setBgImage((prevBg) => (prevBg === "/assets/residential-moving.svg" ? "/assets/customize-moving.svg" : "/assets/residential-moving.svg"));
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="container-img" style={{ backgroundImage: `url(${bgImage})`, transition: "background 1s ease-in-out" }}>
            <div className="container_logo_header">
                <img src="/assets/new-zinter-logo-only.svg" alt="" />
                <span>Zinter</span>
            </div>
            <div className="our_network">
                <div className="our_network_img">
                    <img src="/assets/trusted_movers.svg" alt="" />
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
                <span className="progress-bar-toggle" style={{ backgroundColor: bgImage === "/assets/customize-moving.svg" ? 'white' : 'transparent' }} ></span>

            </div>
            <div>
               
            </div>
        </div>
    )
}

export default FirstCardToggle