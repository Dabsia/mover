import React, { useEffect, useState } from "react";
import QuoteHeader from "../components/QuoteHeader";
import { Link, useNavigate } from "react-router-dom";
import SelectImage from "../components/SelectImage";
import PrimaryBtn from "../components/PrimaryBtn";
import ReportSuccess from "../modal/ReportSuccess";
import ReportCard from "../components/ReportCard";

const MakeAReport = () => {
  const [isDamagedActive, setIsDamagedActive] = useState(true);

  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const openSuccess = () => {
    setIsSuccess(true);
  };

  const closeModal = () => {
    setIsSuccess(false);
    navigate(-1);
  };

  const data = [1, 2, 3];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const makeDamagedTabActive = () => setIsDamagedActive(false);
  const makeMissingTabActive = () => setIsDamagedActive(true);
  return (
    <div>
      <div className="w-[90vw] relative max-w-[1500px] mx-auto mt-24">
        <div className="w-full mt-4 ">
          <QuoteHeader />
          <div className="w-full h-[1200px] bg-white">
            <div className="flex items-center">
              <Link to="/">
                <p className="text-[#9e9e9e] text-[14px] font-sans leading-[19.6px]">
                  Home
                </p>{" "}
              </Link>
              <div className="mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="11"
                  viewBox="0 0 6 11"
                  fill="none"
                >
                  <path
                    d="M0.219801 0.720115C0.0788617 0.861097 -0.000314284 1.05228 -0.000314301 1.25163C-0.000314319 1.45098 0.0788616 1.64217 0.219801 1.78315L3.94119 5.50454L0.219801 9.22592C0.0828549 9.36771 0.00707833 9.55762 0.00879111 9.75474C0.0105039 9.95186 0.0895692 10.1404 0.228958 10.2798C0.368347 10.4192 0.556907 10.4983 0.754025 10.5C0.951143 10.5017 1.14105 10.4259 1.28284 10.289L5.53574 6.03606C5.67668 5.89508 5.75586 5.70389 5.75586 5.50454C5.75586 5.30519 5.67668 5.114 5.53574 4.97302L1.28284 0.720115C1.14186 0.579175 0.950669 0.5 0.75132 0.5C0.551971 0.5 0.360784 0.579175 0.219801 0.720115Z"
                    fill="#E3E3E3"
                  />
                </svg>
              </div>
              <p className="text-[#525252] text-[16px] font-bold font-sans  ">
                Make a Report
              </p>
            </div>
            <div className="w-[80%] h-[800px]  mt-8 mx-auto ">
              <div className="w-[274px] flex items-center bg-[#F6F8FA] border-[1px] border-[#e3e8ef] h-[50px] p-[4px] rounded-[8px] ">
                <div
                  onClick={makeMissingTabActive}
                  className={`h-full w-[50%] cursor-pointer rounded-[5px] {${
                    isDamagedActive && "bg-red-500 shadow-md"
                  } items-center flex justify-center `}
                >
                  <p
                    className={`text-[14px] ${
                      isDamagedActive ? "text-black" : "text-[#707070]"
                    } font-medium `}
                  >
                    Damaged Item
                  </p>
                </div>
                <div
                  onClick={makeDamagedTabActive}
                  className={`h-full w-[50%] cursor-pointer rounded-[5px] {${
                    !isDamagedActive && "bg-white shadow-md"
                  } items-center flex justify-center `}
                >
                  <p
                    className={`text-[14px] ${
                      !isDamagedActive ? "text-black" : "text-[#707070]"
                    } font-medium `}
                  >
                    Missing Items
                  </p>
                </div>
              </div>
              <div className="w-full border-[1px] border-[#e3e3e3] my-7 " />
              <div>
                <div className="flex w-full mb-5 justify-between items-center">
                  <div className="flex w-[48%] mb-[15px] flex-col">
                    <label className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                      Your Name
                    </label>
                    <input
                      placeholder="Enter Your Full Name"
                      type="text"
                      className="h-[45px] border-[#e3e3e3] font-light w-full border-[1px] outline-none p-[8px] rounded-[8px] "
                    />
                  </div>
                  <div className="flex w-[48%] mb-[10px] flex-col">
                    <label className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                      Email Address
                    </label>
                    <input
                      placeholder="Enter Your Email Address"
                      type="text"
                      className="h-[45px] w-full border-[#e3e3e3] font-light border-[1px] outline-none p-[8px] rounded-[8px] "
                    />
                  </div>
                </div>
                <div className="w-full border-[1px] border-[#e3e3e3] my-7 " />
                <div className="flex w-full mb-5 justify-between items-center">
                  <div className="flex w-[48%] mb-[15px] flex-col">
                    <label className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                      Item Name
                    </label>
                    <input
                      placeholder="Enter the name of the item you are reporting"
                      type="text"
                      className="h-[45px] border-[#e3e3e3] font-light w-full border-[1px] outline-none p-[8px] rounded-[8px] "
                    />
                  </div>
                  <div className="flex w-[48%] mb-[10px] flex-col">
                    <label className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                      Email Address
                    </label>
                    <div className="w-full border-[#e3e3e3] items-center px-2 rounded-[8px] border-[1px] flex">
                      <span className="text-black font-bold mr-1 text-[18px] ">
                        $
                      </span>
                      <input
                        placeholder="How much did you buy the item"
                        type="text"
                        className="h-[45px] w-full  font-light  outline-none p-[8px]  "
                      />
                    </div>
                  </div>
                </div>
                <div className="flex w-full mb-5 justify-between ">
                  <div className="flex w-[48%] mb-[15px] flex-col">
                    <label className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                      Description
                    </label>
                    <textarea
                      placeholder="Describe accurately the incident you are reporting"
                      type=""
                      className="h-[300px]  border-[#e3e3e3] font-light w-full border-[1px] outline-none p-[8px] rounded-[8px] "
                    ></textarea>
                  </div>
                  <div className="flex w-[48%] gap-x-4">
                    <div className="w-full ">
                      <p className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                        Image of damaaged Item
                      </p>
                      <SelectImage />
                    </div>
                    <div className="w-full">
                      <p className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                        Upload purchase receipt
                      </p>
                      <SelectImage />
                    </div>
                  </div>
                </div>
                <div className=" mt-4 border-t-[#B8B8B8] border-t-[1px] pt-5 w-full ">
                  <p className=" font-sans font-[18px] text-black ">
                    Recent Moves
                  </p>
                  <p className="text-[14px] text-[#9e9e9e] font-sans my-3 ">
                    Select a move you are making report on
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {data?.map((report, id) => {
                      return <ReportCard report={report} key={id} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSuccess && <ReportSuccess closeModal={closeModal} />}
      <div className="h-[80px] quoteContainerBtns shadow-[0px_-6px_6px_-6px_rgba(0,0,0,0.3)] bg-white fixed bottom-0 max-w-[1500px] mx-auto w-[100%] flex items-center justify-center  ">
        <div className="w-[80%] mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-[#3C82F6]  w-fit quoteContainerPrimaryBtn  py-1 px-2 rounded-[20px] cursor-pointer text-[14px] text-manrope font-light "
          >
            GO BACK
          </button>

          <PrimaryBtn
            handlePress={openSuccess}
            className={"text-[14px] my-3 w-fit "}
          >
            SUBMIT REPORT
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
};

export default MakeAReport;
