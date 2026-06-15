import React from "react";

const SecondaryBtn = ({ children, handlePress, className, dummy }) => {
  return (
    <button
      onClick={handlePress}
      className={`bg-white 
        ${dummy && "decorBtn"}
       border-[1px] rounded-[43px] hover:bg-primary hover:text-white px-[20px] py-[10px] font-sans border-primary text-primary ${className} `}
    >
      {children}
    </button>
  );
};

export default SecondaryBtn;
