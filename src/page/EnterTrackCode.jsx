import React, { useState, useRef, useEffect } from "react";
import Footer from "../components/Footer";
import QuoteHeader from "../components/QuoteHeader";
import { Link, useNavigate } from "react-router-dom";
import PrimaryBtn from "../components/PrimaryBtn";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Loader from "../components/loader";

const EnterTrackCode = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const inputRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-character code
  const [err, setErr] = useState("");

  // React Query mutation for tracking move
  const trackMoveMutation = useMutation({
    mutationFn: async (code) => {
      const response = await fetch(
        `https://involved-birgit-zinter-cb767b47.koyeb.app/api/MoveRequest/TrackMove?code=${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (!data?.responseStatus) {
        setErr(data?.responseMessage || "Invalid tracking code");
        return;
      }
      setErr("");
      // Navigate with the API response data
      navigate(`/movers/${otp.join("")}`, { state: { data: data } });
    },
    onError: (error) => {
      console.error("Error tracking move:", error);
      setErr(
        "Unable to track move. Please check your tracking code and try again."
      );
    },
  });

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    // Allow alphanumeric characters only (letters and numbers)
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value; // Convert to uppercase for consistency
    setOtp(updatedOtp);

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
    }

    // Clear any previous errors
    setErr("");

    // Make the API call
    trackMoveMutation.mutate(fullCode);
  };

  return (
    <div>
      {trackMoveMutation.isPending && <Loader />}
      <div className="w-[90vw] relative max-w-[1500px] mx-auto mt-24">
        <div className="w-full mt-4 ">
          <QuoteHeader />
          <div className="w-full h-[70vh] bg-white">
            <div className="flex items-center">
              <Link to="/">
                <p className="text-[#9e9e9e] text-[14px] font-sans leading-[19.6px]">
                  {t("trackCode.home")}
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
                {t("trackCode.track")}
              </p>
            </div>
            <div className="flex flex-col  items-center justify-center w-full h-[60vh] my-auto mt-5">
              <div className="flex border-[1px] trackCodeBox flex-col rounded-[12px] bg-white w-[450px] justify-center">
                <div className="flex flex-col  justify-center items-center px-[24px] pt-[24px] ">
                  <h2 className="my-3 text-center trackCodeBoxText font-sans text-[24px] text-[#121212] font-bold ">
                    {t("trackCode.enterCode")}
                  </h2>
                  <div className="flex gap-x-3 mb-[16px] trackBoxInputContainer items-center">
                    <div className="flex items-center gap-x-3">
                      {[...Array(3)].map((_, i) => (
                        <input
                          key={i}
                          ref={(el) => (inputRefs.current[i] = el)}
                          placeholder="0"
                          type="text"
                          maxLength={1}
                          value={otp[i]}
                          onFocus={(e) => {
                            setFocusedIndex(i);
                            e.target.select(); // Selects the value so it gets replaced on typing
                          }}
                          onBlur={() => setFocusedIndex(null)}
                          onChange={(e) => handleInputChange(e, i)}
                          onKeyDown={(e) => handleKeyDown(e, i)}
                          className="trackCodeBoxInput outline-none text-[28px] h-[44px] text-center w-[44px] border-[1px] rounded-[8px] border-[#BCDFF6]"
                          disabled={trackMoveMutation.isPending}
                        />
                      ))}
                    </div>
                    <p className="font-sora text-[30px] font-bold text-[#BCDFF6] ">
                      -
                    </p>
                    <div className="flex items-center gap-x-3">
                      {[...Array(3)].map((_, i) => (
                        <input
                          key={i + 3}
                          ref={(el) => (inputRefs.current[i + 3] = el)}
                          placeholder="0"
                          type="text"
                          onFocus={(e) => {
                            setFocusedIndex(i);
                            e.target.select(); // Selects the value so it gets replaced on typing
                          }}
                          onBlur={() => setFocusedIndex(null)}
                          maxLength={1}
                          value={otp[i + 3]}
                          onChange={(e) => handleInputChange(e, i + 3)}
                          onKeyDown={(e) => handleKeyDown(e, i + 3)}
                          className="trackCodeBoxInput outline-none text-[28px] h-[44px] text-center w-[44px] border-[1px] rounded-[8px] border-[#BCDFF6]"
                          disabled={trackMoveMutation.isPending}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-[#e3e3e3] flex items-center justify-center p-[16px] border-t-[1px]">
                  <PrimaryBtn
                    handlePress={handlePress}
                    className={`text-[14px] ${
                      trackMoveMutation.isPending
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={trackMoveMutation.isPending}
                  >
                    {t("trackCode.btn")}
                  </PrimaryBtn>
                </div>
              </div>
              <p className="text-red-500 mt-3 text-[14px] font-sans ">{err}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EnterTrackCode;
