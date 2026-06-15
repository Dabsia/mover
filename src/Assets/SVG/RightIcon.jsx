import * as React from "react";
const RightIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={13}
    fill="none"
    {...props}
  >
    <path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.5 1.5s5 3.682 5 5-5 5-5 5"
    />
  </svg>
);
export default RightIcon;
