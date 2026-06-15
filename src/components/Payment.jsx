import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
// Emmanuel's code
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "../page/Stripe";
import { Elements } from "@stripe/react-stripe-js";
import { stripPTags } from "../utils";
// Load your publishable key (from Stripe Dashboard)
const stripePromise = loadStripe(
  "pk_test_51O2JovLw5fKJMXx3zvARABxAlQpptJi9aO6gPkcbH9lFFCfJXV8rgAw170q4wt3CHz00uDfGtPqKmvdvPFWQqNMc00c3Dqphpr"
);

const Payment = () => {
  const moversData = useSelector((state) => state.user.moversData);

  console.log(moversData);
  const { t } = useTranslation();

  const additionalInfo = stripPTags(moversData?.additionalInformation);

  return (
    <div className="ml-4 h-fit movingCompanyDetailBox w-full">
      <div className="overflow-y-scroll pb-[20px] custom-scroll ">
        <p className="font-sans text-[20px] text-[#121212] font-bold ">
          {t("payment.complete")}
        </p>
        <div className="my-5 border-[1px] w-full h-[146px] flex justify-center moveDetailsMainiContainer items-center rounded-[20px] border-[#136AB5] ">
          <div className=" w-[95%] moveDetailsOptionsContainer flex items-center justify-between h-[75%]">
            <div className="flex moveCompanyDirectionContainer flex-col relative h-full justify-between">
              <div
                className={`absolute top-10 movingCompanyDetailsIconXCoontainer left-[15px]
             bg-[#E3E8EF] h-[28px] w-[2px] rounded-[2px] `}
              ></div>
              <div className="flex items-center  ">
                <div className="movingCompanyDetailsIconXCoontainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="30"
                      height="30"
                      rx="15"
                      fill="#E4F0FC"
                    />
                    <rect
                      x="1"
                      y="1"
                      width="30"
                      height="30"
                      rx="15"
                      stroke="#248CD9"
                      stroke-width="2"
                    />
                    <circle cx="16" cy="16" r="5" fill="#075DB2" />
                  </svg>
                </div>
                <div className="bg-[#f7f7f7] w-[400px] ml-3 movingCompanyDirection flex items-center rounded-[10px] p-[10px] ">
                  <div className="flex items-center">
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2C14.3869 2 16.6761 2.94821 18.364 4.63604C20.0518 6.32387 21 8.61305 21 11C21 14.074 19.324 16.59 17.558 18.395C16.6757 19.2871 15.7129 20.0958 14.682 20.811L14.256 21.101L14.056 21.234L13.679 21.474L13.343 21.679L12.927 21.921C12.6446 22.0822 12.3251 22.1669 12 22.1669C11.6749 22.1669 11.3554 22.0822 11.073 21.921L10.657 21.679L10.137 21.359L9.945 21.234L9.535 20.961C8.42283 20.2085 7.3869 19.3491 6.442 18.395C4.676 16.589 3 14.074 3 11C3 8.61305 3.94821 6.32387 5.63604 4.63604C7.32387 2.94821 9.61305 2 12 2ZM12 4C10.1435 4 8.36301 4.7375 7.05025 6.05025C5.7375 7.36301 5 9.14348 5 11C5 13.322 6.272 15.36 7.871 16.996C8.55853 17.692 9.30166 18.3308 10.093 18.906L10.551 19.232C10.699 19.3353 10.8413 19.4313 10.978 19.52L11.368 19.77L11.711 19.979L12 20.148L12.455 19.879L12.822 19.649C13.0173 19.525 13.2263 19.386 13.449 19.232L13.907 18.906C14.6983 18.3308 15.4415 17.692 16.129 16.996C17.728 15.361 19 13.322 19 11C19 9.14348 18.2625 7.36301 16.9497 6.05025C15.637 4.7375 13.8565 4 12 4ZM12 7C13.0609 7 14.0783 7.42143 14.8284 8.17157C15.5786 8.92172 16 9.93913 16 11C16 12.0609 15.5786 13.0783 14.8284 13.8284C14.0783 14.5786 13.0609 15 12 15C10.9391 15 9.92172 14.5786 9.17157 13.8284C8.42143 13.0783 8 12.0609 8 11C8 9.93913 8.42143 8.92172 9.17157 8.17157C9.92172 7.42143 10.9391 7 12 7ZM12 9C11.4696 9 10.9609 9.21071 10.5858 9.58579C10.2107 9.96086 10 10.4696 10 11C10 11.5304 10.2107 12.0391 10.5858 12.4142C10.9609 12.7893 11.4696 13 12 13C12.5304 13 13.0391 12.7893 13.4142 12.4142C13.7893 12.0391 14 11.5304 14 11C14 10.4696 13.7893 9.96086 13.4142 9.58579C13.0391 9.21071 12.5304 9 12 9Z"
                          fill="#12B981"
                        />
                      </svg>
                    </div>
                    <p className="text-[#b8b8b8] ml-2 font-light font-sans text-[16px] leading-[25.6px] ">
                      {t("payment.from")}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-[#b8b8b8] ml-2 font-light font-sans text-[16px]">
                      -
                    </p>
                    <p className="ml-2 max-w-[280px] overflow-hidden movingContainerFromLocation text-ellipsis whitespace-nowrap text-[#707070] font-sans text-[16px] leading-[25.6px]">
                      {moversData?.moveDetails?.from}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center  ">
                <div className="movingCompanyDetailsIconXCoontainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="30"
                      height="30"
                      rx="15"
                      fill="#E4F0FC"
                    />
                    <rect
                      x="1"
                      y="1"
                      width="30"
                      height="30"
                      rx="15"
                      stroke="#248CD9"
                      stroke-width="2"
                    />
                    <circle cx="16" cy="16" r="5" fill="#075DB2" />
                  </svg>
                </div>
                <div className="bg-[#f7f7f7] w-[400px] ml-3 movingCompanyDirection flex items-center rounded-[10px] p-[10px] ">
                  <div className="flex items-center">
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 2C14.3869 2 16.6761 2.94821 18.364 4.63604C20.0518 6.32387 21 8.61305 21 11C21 14.074 19.324 16.59 17.558 18.395C16.6757 19.2871 15.7129 20.0958 14.682 20.811L14.256 21.101L14.056 21.234L13.679 21.474L13.343 21.679L12.927 21.921C12.6446 22.0822 12.3251 22.1669 12 22.1669C11.6749 22.1669 11.3554 22.0822 11.073 21.921L10.657 21.679L10.137 21.359L9.945 21.234L9.535 20.961C8.42283 20.2085 7.3869 19.3491 6.442 18.395C4.676 16.589 3 14.074 3 11C3 8.61305 3.94821 6.32387 5.63604 4.63604C7.32387 2.94821 9.61305 2 12 2ZM12 4C10.1435 4 8.36301 4.7375 7.05025 6.05025C5.7375 7.36301 5 9.14348 5 11C5 13.322 6.272 15.36 7.871 16.996C8.55853 17.692 9.30166 18.3308 10.093 18.906L10.551 19.232C10.699 19.3353 10.8413 19.4313 10.978 19.52L11.368 19.77L11.711 19.979L12 20.148L12.455 19.879L12.822 19.649C13.0173 19.525 13.2263 19.386 13.449 19.232L13.907 18.906C14.6983 18.3308 15.4415 17.692 16.129 16.996C17.728 15.361 19 13.322 19 11C19 9.14348 18.2625 7.36301 16.9497 6.05025C15.637 4.7375 13.8565 4 12 4ZM12 7C13.0609 7 14.0783 7.42143 14.8284 8.17157C15.5786 8.92172 16 9.93913 16 11C16 12.0609 15.5786 13.0783 14.8284 13.8284C14.0783 14.5786 13.0609 15 12 15C10.9391 15 9.92172 14.5786 9.17157 13.8284C8.42143 13.0783 8 12.0609 8 11C8 9.93913 8.42143 8.92172 9.17157 8.17157C9.92172 7.42143 10.9391 7 12 7ZM12 9C11.4696 9 10.9609 9.21071 10.5858 9.58579C10.2107 9.96086 10 10.4696 10 11C10 11.5304 10.2107 12.0391 10.5858 12.4142C10.9609 12.7893 11.4696 13 12 13C12.5304 13 13.0391 12.7893 13.4142 12.4142C13.7893 12.0391 14 11.5304 14 11C14 10.4696 13.7893 9.96086 13.4142 9.58579C13.0391 9.21071 12.5304 9 12 9Z"
                          fill="#DE2527"
                        />
                      </svg>
                    </div>
                    <p className="text-[#b8b8b8] ml-2 font-light font-sans text-[16px] leading-[25.6px] ">
                      {t("payment.to")}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-[#b8b8b8] ml-2 font-light font-sans text-[16px]">
                      -
                    </p>
                    <p className="ml-2 max-w-[280px] overflow-hidden text-ellipsis whitespace-nowrap movingContainerFromLocation text-[#707070] font-sans text-[16px] leading-[25.6px]">
                      {moversData?.moveDetails?.to}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[42%] movingCompanyMoreDetails h-full flex flex-col justify-between  ">
              <div className="webOptionsContainer">
                <p className="text-[#9e9e9e] font-normal text-[16px] leading-[25.6px] font-sans ">
                  22 {t("payment.miles")}
                </p>
                <p className="font-unbounded text-[36px] leading-[38.5px] text-[#136AB5] font-semibold ">
                  {" "}
                  €{moversData?.amount}
                </p>
                <p className="text-[16px] leading-[25.6px] font-light text-[#373737] font-sans ">
                  {additionalInfo}
                </p>
              </div>
              <div className="mobileOptionsContainer">
                <p className="font-unbounded mobileOptionsContainerAmount text-[36px] leading-[38.5px] text-[#136AB5] font-semibold ">
                  {" "}
                  €{moversData?.amount}
                </p>
                <div>
                  <p className="text-[#9e9e9e] mobileOptionsContainerDistance font-normal text-[16px] leading-[25.6px] font-sans ">
                    22 {t("payment.miles")}
                  </p>
                  <p className="text-[16px] leading-[25.6px] mobileOptionsContainerOptions font-light text-[#373737] font-sans ">
                    {additionalInfo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Elements stripe={stripePromise}>
            <Stripe amount={moversData?.amount || 2000} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
