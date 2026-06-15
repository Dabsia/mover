import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryBtn from "../components/PrimaryBtn";

const TrackCodeModal = ({ closeModal }) => {
  const inputRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP
  const [token, setToken] = useState(0);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    // Only allow numbers
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    setToken(updatedOtp.join(""));

    // Move to next input if value exists
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePress = () => {
    const fullCode = otp.join("");

    if (fullCode.length === 0) return;

    if (fullCode.length < 6) {
      setErr("Please enter the correct tracking code");
      return;
    } else {
      setErr("");
      navigate("/track-report", { state: { data: fullCode } });
    }
  };
  return (
    <div className="fixed top-0 z-50 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.10)] h-full w-full flex justify-center items-center ">
      <div className="bg-white flex flex-col justify-between w-[30%] rounded-[16px] h-fit">
        <div className="flex items-center w-full justify-between p-[28px] border-b-[1px] border-[#E3E8EF] ">
          <div className="flex inventoryListHeader items-center">
            <h3 className="font-sans text-[20px] font-bold text-[#121212] ">
              Track Report
            </h3>
          </div>
          <div
            onClick={closeModal}
            className="h-[32px] cursor-pointer w-[32px] rounded-full  flex items-center border-[1px] border-[#f7f7f7] justify-center "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3.68 14L8 9.68L12.32 14L14 12.32L9.68 8L14 3.68L12.32 2L8 6.32L3.68 2L2 3.68L6.32 8L2 12.32L3.68 14Z"
                fill="#DE2527"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col  justify-center items-center px-[24px] pt-[12px] ">
          <h2 className="my-3 text-center trackCodeBoxText font-sans text-[24px] text-[#121212] font-bold ">
            Enter Code to Track Report
          </h2>
          <div className="flex gap-x-3 mb-[16px] trackBoxInputContainer items-center">
            <div className="flex items-center gap-x-3">
              {[...Array(3)].map((_, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  placeholder="0"
                  type="number"
                  maxLength={1}
                  value={otp[i]}
                  onFocus={(e) => {
                    setFocusedIndex(i);
                    e.target.select(); // Selects the value so it gets replaced on typing
                  }}
                  onBlur={() => setFocusedIndex(null)}
                  onChange={(e) => handleInputChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="[appearance:textfield] trackCodeBoxInput [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none text-[28px] h-[44px] text-center w-[44px] border-[1px] rounded-[8px] border-[#BCDFF6]"
                />
              ))}
            </div>
            <p className="font-sora text-[30px] font-bold text-[#BCDFF6] ">-</p>
            <div className="flex items-center gap-x-3">
              {[...Array(3)].map((_, i) => (
                <input
                  key={i + 3}
                  ref={(el) => (inputRefs.current[i + 3] = el)}
                  placeholder="0"
                  type="number"
                  onFocus={(e) => {
                    setFocusedIndex(i);
                    e.target.select(); // Selects the value so it gets replaced on typing
                  }}
                  onBlur={() => setFocusedIndex(null)}
                  maxLength={1}
                  value={otp[i + 3]}
                  onChange={(e) => handleInputChange(e, i + 3)}
                  onKeyDown={(e) => handleKeyDown(e, i + 3)}
                  className="[appearance:textfield] trackCodeBoxInput [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none text-[28px] h-[44px] text-center w-[44px] border-[1px] rounded-[8px] border-[#BCDFF6]"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="border-[#e3e3e3] flex items-center justify-center p-[16px] border-t-[1px]">
          <PrimaryBtn handlePress={handlePress} className={"text-[14px] "}>
            TRACK REPORT
          </PrimaryBtn>
        </div>
        {err && (
          <p className="text-red-500 mb-3 text-[14px] text-center font-sans ">
            {err}
          </p>
        )}
      </div>
    </div>
  );
};

export default TrackCodeModal;
