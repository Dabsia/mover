import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useState, useEffect } from "react";
import QuoteSuccessIcon from "../Assets/SVG/QuoteSuccess";
import PrimaryBtn from "../components/PrimaryBtn";
import { formattedItems, countMap } from "../utils";

const UploadImageSuccess = ({
  closeUploadImageModal,
  closeUploadSuccessModal,
}) => {
  const words = [
    "Please Wait...",
    "Analyzing Images...",
    "Checking inventory database...",
    "Matching images to inventory list...",
    "Generating List...",
  ];

  const allInventories = [
    "Smart TV",
    "3 Seater Sofa",
    "Area Rug",
    "Tables x2",
    "Bookshelf",
  ];

  const newFormattedData = formattedItems(countMap(allInventories));

  const [index, setIndex] = useState(0);

  //   const [data, setData] = useState([]);
  const [isScannedSuccessful, setIsScannedSuccessful] = useState(false);

  const getData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await res.json();
    if (res.ok) {
      setIsScannedSuccessful(true);
    }
    console.log(data);
  };

  useEffect(() => {
    if (index === words.length - 1) return; // Stop when reaching the last word

    const interval = setInterval(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, 2000); // Change every 3 seconds
    // Fetch data after 7 seconds

    return () => {
      clearInterval(interval); // Cleanup interval
    };
  }, [index, words.length]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     getData();
  //   }, 9000);

  //   return () => clearTimeout(timeout); // Cleanup
  // }, []); // Empty dependency array ensures it runs once

  return (
    <div className="fixed top-0 z-50 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.10)] h-full w-full flex justify-center items-center">
      {isScannedSuccessful ? (
        <div className="flex flex-col rounded-[12px] bg-white w-[470px] h-fit pb-5 justify-center">
          <div className="flex flex-col  justify-center items-center px-[24px] pt-[24px] ">
            <div>
              <QuoteSuccessIcon />
            </div>
            <h2 className="my-3 text-center font-sans text-[24px] w-[90%] text-[#121212] font-bold ">
              Image Recognition Successful
            </h2>
            <p className="text-[16px] mb-3 font-light leading-[25.6px] text-[#525252] font-sans ">
              Inventory list successfully generated
            </p>
            <div className="w-[80%] mx-auto rounded-[8px] border-[1px] p-4 border-[#e3e3e3] h-fit mb-4 ">
              <div className="flex bg-[#F0F9FF] mb-2 w-fit px-2 border-[1px] mx-auto  left-[65px] border-[#E0F2FE] rounded-[4px] p-1 items-center">
                <p className="font-sans text-[14px] text-[#3C82F6] ml-2 leading-[25.6px] ">
                  20 Items Recognised
                </p>
              </div>
              <div className="flex flex-wrap w-[90%] items-center mx-auto ">
                {newFormattedData.map((item, index) => (
                  <div key={index} className="flex ml-2 items-center">
                    <p className="mr-2 text-[14px] font-sans justify-center leading-[18.2px] text-[#707070] ">
                      {item}
                    </p>
                    {index !== newFormattedData.length - 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="4"
                        height="4"
                        viewBox="0 0 4 4"
                        fill="none"
                      >
                        <circle cx="2" cy="2" r="2" fill="#D1D1D1" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-[#e3e3e3] flex items-center justify-between p-[16px] pb-0 border-t-[1px]">
            <button
              onClick={closeUploadSuccessModal}
              className="text-[#3C82F6] self-center hover:bg-primary py-2 px-4 hover:text-white rounded-[20px] cursor-pointer text-[14px] text-manrope font-light "
            >
              REUPLOAD IMAGES
            </button>
            <PrimaryBtn
              handlePress={closeUploadImageModal}
              className={"text-[14px] "}
            >
              OK, GOT IT
            </PrimaryBtn>
          </div>
        </div>
      ) : (
        <div className="flex flex-col rounded-[12px] bg-white w-[470px] h-fit pb-5 justify-center">
          <div className="flex items-center justify-center w-full">
            <DotLottieReact
              src="https://lottie.host/8a1356cd-c3df-4dce-902d-104214fc1010/EMiygNRLOW.lottie"
              loop
              autoplay
              style={{ width: 100, height: 75 }}
            />
          </div>
          <p className="font-sans text-[18px] mb-2 font-bold text-center ">
            {words[index]}
          </p>
          <p className="font-sans text-[16px] text-center text-[#525252] leading-[25.6px] ">
            Running image recognition
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadImageSuccess;
