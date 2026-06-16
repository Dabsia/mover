import React from "react";

const ZoomingCardAboutUs = () => {
  return (
    <div>
      <div className="w-[] h-[37.5rem] zoomingCardContainer overflow-hidden rounded-[20px]">
        <img src="/assets/about-us-image.svg" alt=""
          className=" w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-125 rounded-[25px]"
          alt="hero"
         />
      </div>
    </div>
  );
};

export default ZoomingCardAboutUs;
