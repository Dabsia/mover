import React from "react";
import Logo from "./Logo";
import miniLogo from "../Assets/Group 1.svg";

const Invoice = () => {
  return (
    <div>
      <div className="mx-auto w-[100vw]">
        <div className="w-[90vw] mx-auto max-w-[1500px]">
          <div className="flex items-center mt-10 justify-between">
            <h1 className="font-unbounded text-[32px] ">Payment Invoice</h1>
            <Logo />
          </div>
          <div className="mt-6">
            <h2 className="font-unbounded text-[20px] ">Dasola Awoye</h2>
            <p>Date Period: 30th April, 2025</p>
            <p>Invoice No.: 2</p>
          </div>
          <div className="mt-10">
            <p className="font-unbounded">Move Description</p>
            <div className="border-y-[1px] py-5 ">
              <div className="flex mb-5 items-center justify-between">
                <p>From</p>
                <p>Keizersgracht 123, 1015 CJ Amsterdam</p>
              </div>
              <div className="flex items-center justify-between">
                <p>To</p>
                <p>Rozengracht 55, 1016 LZ Amsterdam</p>
              </div>
            </div>
            <div className="mt-20">
              <p className="font-unbounded text-right">Rate</p>
              <div className="border-t-[1px] py-5">
                <p className="font-unbounded text-right">€345.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#054d96] w-full h-fit ">
        <div className="w-[90vw] py-14  max-w-[1500px] mx-auto">
          <div className="flex mb-2 items-center justify-between">
            <p className="text-white font-manrope text-[12px] ">
              Additional Information
            </p>
            <p className="text-white font-manrope text-[12px] ">VAT 5.5%</p>
          </div>
          <div className="border-y-[1px] py-5 ">
            <div className="flex items-center justify-between">
              <p className="text-white font-manrope text-[14px] ">
                Payment made to: Urban Movers
              </p>
              <p className="text-white font-manrope text-[12px] ">
                Total payment due{" "}
              </p>
            </div>
            <div className="flex mt-4 items-center justify-between">
              <p className="text-white font-manrope text-[14px] ">
                Payment method: Debit Card
              </p>
              <p className="text-white font-unbounded text-[36px] font-bold ">
                €345.00
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex">
              <img src={miniLogo} alt="" />
              <p className="text-white ml-2 font-sora text-[12px]">
                Thank you! — zinter.co
              </p>
            </div>
            <p className="text-white text-[12px] font-sora ">€EUR</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
