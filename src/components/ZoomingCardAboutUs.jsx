import React from "react";
import img from "../Assets/about-us-image.svg";

const ZoomingCardAboutUs = () => {
  return (
    <div>
      <div className="w-[] h-[37.5rem] zoomingCardContainer overflow-hidden rounded-[20px]">
        <img
          src={img}
          className=" w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-125 rounded-[25px]"
          alt="hero"
        />
      </div>
    </div>
  );
};

export default ZoomingCardAboutUs;
