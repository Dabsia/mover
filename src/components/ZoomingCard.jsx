import React, { useState, useEffect } from "react";
import img from "../Assets/photo_1.jpg";
import img1 from "../Assets/photo_2.jpg";
import img2 from "../Assets/photo_3.jpg";
import img3 from "../Assets/photo_4.jpg";
import avatar1 from "../Assets/Avatar.png";
import avatar2 from "../Assets/Avatar (1).png";
import avatar3 from "../Assets/Avatar (2).png";
import avatar4 from "../Assets/Avatar (3).png";

const ZoomingCard = () => {
  const ComponentOne = () => (
    <div className="w-[450px] zoomingCard h-[476px] overflow-hidden rounded-[20px] relative">
      <img
        src={img}
        className=" w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-125 rounded-[25px]"
        alt="hero"
      />
      <div className="absolute bottom-[20px] flex justify-center items-center left-[5] w-full  ">
        <div className="w-full px-[23px] ">
          <div className="bg-[#d9d9d9] w-[98px] flex items-center  p-[10px] rounded-t-[10px] bg-opacity-70 backdrop-blur-sm h-[50px]">
            <div className="relative flex ">
              <img
                src={avatar1}
                className=" rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
              <img
                src={avatar2}
                className="absolute left-[17px] rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
              <img
                src={avatar3}
                className="absolute left-[32px] rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
              <img
                src={avatar4}
                className="absolute left-[52px] rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
            </div>
          </div>
          <div className="bg-[#d9d9d9] w-[100%] rounded-tr-[10px] zoomcardTextBox py-[10px] bg-opacity-70 backdrop-blur-sm rounded-b-[10px] pl-[14px] ">
            <span className="mr-1 font-sans text-[#121212] font-bold leading-[25.6px] ">
              20,000+
            </span>
            <span className="font-sans text-[#262626] leading-[25.6px] text-[16px] zoomCardDesc ">
              Moves completed in 2024 alone
            </span>
          </div>
        </div>
      </div>
    </div>
  );
  const ComponentTwo = () => (
    <div className="w-[450px] zoomingCard h-[476px] overflow-hidden rounded-[20px] relative">
      <img
        src={img1}
        className=" w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-125 rounded-[25px]"
        alt="hero"
      />
      <div className="absolute bottom-[20px] flex justify-center items-center left-[5] w-full  ">
        <div className="w-full px-[23px] ">
          <div className="bg-[#d9d9d9] w-[98px] flex items-center  p-[10px] rounded-t-[10px] bg-opacity-70 backdrop-blur-sm h-[50px]">
            <div className="relative flex ">
              <img
                src={avatar1}
                className=" rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
              <img
                src={avatar2}
                className="absolute left-[17px] rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
              <img
                src={avatar3}
                className="absolute left-[32px] rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
              <img
                src={avatar4}
                className="absolute left-[52px] rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
            </div>
          </div>
          <div className="bg-[#d9d9d9] w-[100%] rounded-tr-[10px] zoomcardTextBox py-[10px] bg-opacity-70 backdrop-blur-sm rounded-b-[10px] pl-[14px] ">
            <span className="mr-1 font-sans text-[#121212] font-bold leading-[25.6px] ">
              20,000+
            </span>
            <span className="font-sans text-[#262626] leading-[25.6px] text-[16px] zoomCardDesc ">
              Moves completed in 2024 alone
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const ComponentThree = () => (
    <div className="w-[450px] zoomingCard h-[476px] overflow-hidden rounded-[20px] relative">
      <img
        src={img2}
        className=" w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-125 rounded-[25px]"
        alt="hero"
      />
      <div className="absolute bottom-[20px] flex justify-center items-center left-[5] w-full  ">
        <div className="w-full px-[23px] ">
          <div className="bg-[#d9d9d9] w-[98px] flex items-center  p-[10px] rounded-t-[10px] bg-opacity-70 backdrop-blur-sm h-[50px]">
            <div className="relative flex ">
              <img
                src={avatar1}
                className=" rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
              <img
                src={avatar2}
                className="absolute left-[17px] rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
              <img
                src={avatar3}
                className="absolute left-[32px] rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
              <img
                src={avatar4}
                className="absolute left-[52px] rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
            </div>
          </div>
          <div className="bg-[#d9d9d9] w-[100%] rounded-tr-[10px] zoomcardTextBox py-[10px] bg-opacity-70 backdrop-blur-sm rounded-b-[10px] pl-[14px] ">
            <span className="mr-1 font-sans text-[#121212] font-bold leading-[25.6px] ">
              6000+
            </span>
            <span className="font-sans text-[#262626] leading-[25.6px] text-[16px] zoomCardDesc ">
              active users are happy with Zinter
            </span>
          </div>
        </div>
      </div>
    </div>
  );
  const ComponentFour = () => (
    <div className="w-[450px] zoomingCard h-[476px] overflow-hidden rounded-[20px] relative">
      <img
        src={img3}
        className=" w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-125 rounded-[25px]"
        alt="hero"
      />
      <div className="absolute bottom-[20px] flex justify-center items-center left-[5] w-full  ">
        <div className="w-full px-[23px] ">
          <div className="bg-[#d9d9d9] w-[98px] flex items-center  p-[10px] rounded-t-[10px] bg-opacity-70 backdrop-blur-sm h-[50px]">
            <div className="relative flex ">
              <img
                src={avatar1}
                className=" rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
              <img
                src={avatar2}
                className="absolute left-[17px] rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
              <img
                src={avatar3}
                className="absolute left-[32px] rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
              <img
                src={avatar4}
                className="absolute left-[52px] rounded-full h-[24px] w-[24px] "
                alt="hero"
              />
            </div>
          </div>
          <div className="bg-[#d9d9d9] w-[100%] rounded-tr-[10px] zoomcardTextBox py-[10px] bg-opacity-70 backdrop-blur-sm rounded-b-[10px] pl-[14px] ">
            <span className="mr-1 font-sans text-[#121212] font-bold leading-[25.6px] ">
              800+
            </span>
            <span className="font-sans text-[#262626] leading-[25.6px] text-[16px] zoomCardDesc ">
              Moving companies fully verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const components = [
    ComponentOne,
    ComponentTwo,
    ComponentThree,
    ComponentFour,
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % components.length);
    }, 3000); // Change every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [components.length]);

  const ActiveComponent = components[index];

  return (
    <div>
      <ActiveComponent />
    </div>
  );
};

export default ZoomingCard;
