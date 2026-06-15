import React, { useEffect, useState } from "react";
import StaticMoversStepper from "./StaticMoversStepper";
import MoversProgress from "./MoversProgress";
import Payment from "./Payment";
import TrackMove from "./TrackMove";
import MoversHolder from "./MoversHolder";
import PrimaryBtn from "./PrimaryBtn";
import PaymentSuccess from "../modal/PaymentSuccess";
import MoversMobileContainer from "./MoversMobileContainer";
import "./MoversContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { resetMoversInfo, resetPaymentStatus } from "../redux/action";
import GoodProgress from "./GoodProgress";

const MoversContainer = ({ trackingCode }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [isPaymentMade, setIsPaymentMade] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [err, setErr] = useState(false);

  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const moversData = useSelector((state) => state.user.moversData);
  const isPaymentSuccessful = useSelector(
    (state) => state.user.paymentSuccessful
  );

  // screenn size

  const [isWide, setIsWide] = useState(
    typeof window !== "undefined" ? window.innerWidth > 700 : false
  );

  useEffect(() => {
    const onResize = () => setIsWide(window.innerWidth > 700);
    window.addEventListener("resize", onResize);
    // ensure correct initial value (in case of hydration/server)
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (trackingCode) setActiveTab(3);
    else setActiveTab(1);
  }, [trackingCode]);

  let content = (
    <MoversHolder MoversHolder isActive={isActive} setIsActive={setIsActive} />
  );

  // CODE FOR PAYMENT

  switch (activeTab) {
    case 1:
      content = <MoversHolder isActive={isActive} setIsActive={setIsActive} />;

      break;
    case 2:
      content = <Payment />;
      break;
    case 3:
      content = <TrackMove />;
      break;
    default:
      content = (
        <MoversHolder
          MoversHolder
          isActive={isActive}
          setIsActive={setIsActive}
        />
      );
  }

  useEffect(() => {
    if (isPaymentMade) {
      setActiveTab(3);
    }
  }, [isPaymentMade]);
  const sendQuoteData = async () => {
    const response = await axios.get(
      `https://involved-birgit-zinter-cb767b47.koyeb.app/api/Quote/AcceptQuote?id=${moversData?.quoteId}`
    );
    console.log(response.data, "response data");
    return response.data;
  };

  // if all is false, then show movev has ot started yet

  const mutation = useMutation({
    mutationFn: sendQuoteData,
    onSuccess: (data) => {
      if (data.responseStatus) {
        setOpenSuccessModal(true);
        setErr(false);
        setActiveTab(3);
        localStorage.setItem("Code", JSON.stringify(data));
      } else {
        setErr(true);
      }
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });

  const fetchData = () => {
    mutation.mutate();
  };

  // Function to handle moving forward in tabs
  const handleTabs = () => {
    if (activeTab === 2) {
      console.log("Handling tab 2");
      if (!isPaymentMade) {
        setActiveTab(2);
        console.log("Payment not made yet, staying on tab 2");
        return;
      }
    }
    if (activeTab >= 3) return; // Ensure we don't go beyond the last tab
    if (err && activeTab === 2) {
      return;
    } else setActiveTab((prevTab) => prevTab + 1);
  };

  // Function to handle moving backward in tabs
  const handlePrevTabs = () => {
    if (activeTab <= 1) return; // Ensure we don't go below tab 1
    setActiveTab((prevTab) => prevTab - 1);
  };

  const closeSuccessModal = () => {
    setOpenSuccessModal(false);
    dispatch(resetPaymentStatus());
    setActiveTab(3);
  };

  const openModal = () => {
    handleTabs();
    fetchData();
    closeSuccessModal();
  };

  const goBack = () => {
    dispatch(resetMoversInfo());
    setIsActive(false);
  };

  return (
    <div className="relative">
      <div className="w-[90vw] relative h-[calc(100vh-90px)] max-w-[1500px] mx-auto mt-24">
        {activeTab === 1 && (
          <div className="flex mb-3 quoteTop items-center">
            <p
              onClick={goBack}
              className="text-[#9e9e9e] cursor-pointer text-[14px] font-sans leading-[19.6px]"
            >
              Quotes
            </p>{" "}
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
            <div>
              <p className="text-[#525252] moversWebHeader text-[16px] font-bold font-sans  ">
                Quote Breakdown & Moving Company Details
              </p>
              <p className="text-[#525252] moversMobileHeader text-[16px] font-bold font-sans  ">
                Quote Breakdown
              </p>
            </div>
          </div>
        )}
        <div className="w-full moversMainContainer mt-4 flex ">
          <div className="mr-4 stepHolder ">
            <StaticMoversStepper />
            <GoodProgress />
            <MoversMobileContainer activeTab={activeTab} />
            <MoversProgress activeTab={activeTab} />
          </div>
          {content}
        </div>
        {isActive && activeTab !== 3 && (
          <div className="h-[80px] quoteContainerBtns shadow-[0px_-6px_6px_-6px_rgba(0,0,0,0.3)] bg-white fixed bottom-0 max-w-[1500px] mx-auto w-[90vw] flex items-center justify-center  ">
            <div className="w-full flex items-center justify-between">
              {activeTab === 1 ? (
                <p className="text-[#88b5fe]  py-1 px-2 rounded-[20px]  text-[14px] text-manrope font-light ">
                  {t("moversContainer.back")}
                </p>
              ) : (
                <button
                  onClick={() => handlePrevTabs(activeTab)}
                  className="text-[#3C82F6] hover:bg-primary py-1 px-2 hover:text-white rounded-[20px] cursor-pointer text-[14px] text-manrope font-light "
                >
                  {t("moversContainer.back")}
                </button>
              )}
              {
                <div>
                  {activeTab === 2 ? null : (
                    <PrimaryBtn
                      handlePress={() => handleTabs(activeTab)}
                      className={"text-[14px] "}
                    >
                      {t("moversContainer.make")}
                    </PrimaryBtn>
                  )}
                </div>
              }
            </div>
          </div>
        )}

        <div className={`${isWide ? "hidden" : "pb-10"} `}>
          {activeTab > 1 && activeTab !== 3 && (
            <button
              onClick={() => handlePrevTabs(activeTab)}
              className="text-[#3C82F6] w-full quoteContainerPrimaryBtn  py-1 px-2 rounded-[20px] cursor-pointer text-[14px] text-manrope font-light "
            >
              {t("moversContainer.back")}
            </button>
          )}

          <div className={` ${activeTab === 2 && "hidden"}`}>
            <div className={`${activeTab === 2 ? "flex" : ""}`}>
              {isActive && activeTab < 3 && (
                <PrimaryBtn
                  handlePress={() => handleTabs(activeTab)}
                  className={
                    "text-[14px] quoteContainerPrimaryBtn my-3 w-full "
                  }
                >
                  {t("moversContainer.make")}
                </PrimaryBtn>
              )}
            </div>
          </div>
        </div>
      </div>
      {isPaymentSuccessful && (
        <PaymentSuccess
          // closeSuccessModal={closeSuccessModal}
          openModal={openModal}
        />
      )}
    </div>
  );
};

export default MoversContainer;
