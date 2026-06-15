import React from "react";
import moniePoint from "../Assets/Moniepoint Logo 1.png";
import spikk from "../Assets/Spikk Logo.png";
import jumia from "../Assets/j-group.67a6140 2.png";
import konga from "../Assets/Konga Logo 1.png";
import nestle from "../Assets/Nestle Logo 1.png";
import netflix from "../Assets/images-removebg-preview 1.png";

const TrustedBy = () => {
  return (
    <div className="my-12 max-w-[1500px] mx-auto w-[90vw]  ">
      <p className="text-[#9E9E9E] font-sans text-[18px] trustedText text-center">
        Trusted Partners
      </p>
      <div className="flex mt-3 justify-between items-center trustedImageContainer mx-auto w-[85%]">
        <img className="trustedImage" src={moniePoint} alt="trustedBy" />
        <img className="trustedImage" src={spikk} alt="trustedBy" />
        <img className="trustedImage" src={jumia} alt="trustedBy" />
        <img className="trustedImage" src={konga} alt="trustedBy" />
        <img className="trustedImage" src={nestle} alt="trustedBy" />
        <img className="trustedImage" src={netflix} alt="trustedBy" />
      </div>
    </div>
  );
};

export default TrustedBy;
