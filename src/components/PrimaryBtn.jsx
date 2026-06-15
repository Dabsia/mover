import React from "react";

const PrimaryBtn = ({ children, className, handlePress, dummy }) => {
  return (
    <button
      onClick={handlePress}
      className={`bg-primary
        ${dummy && "decorBtn"}
         ${className} font-sans hover:bg-white hover:text-primary hover:border-[1px] border-primary text-white rounded-[43px] px-[20px] py-[10px]`}
    >
      {children}
    </button>
  );
};

export default PrimaryBtn;
