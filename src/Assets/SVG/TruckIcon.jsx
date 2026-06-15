import * as React from "react"
const TruckIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <circle
      cx={14.167}
      cy={15.141}
      r={1.667}
      stroke="#141B34"
      strokeWidth={1.5}
    />
    <circle
      cx={5.833}
      cy={15.141}
      r={1.667}
      stroke="#141B34"
      strokeWidth={1.5}
    />
    <path
      stroke="#141B34"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.167 14.307H12.5m-1.25-8.333h.786c1.092 0 1.638 0 2.1.262.464.262.772.746 1.39 1.714.433.679.887 1.171 1.526 1.61.643.44.949.656 1.119 1.002.162.332.162.725.162 1.51 0 1.035 0 1.553-.29 1.882a1.074 1.074 0 0 1-.039.041c-.306.313-.788.313-1.752.313h-.419"
    />
    <path
      stroke="#141B34"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m10.833 5.974.829 2.071c.406 1.015.609 1.523 1.032 1.81.423.286.97.286 2.063.286H17.5M4.058 14.307c-1.127 0-1.691 0-2.041-.366-.35-.366-.35-.955-.35-2.134V5.974c0-1.178 0-1.768.35-2.134.35-.366.914-.366 2.04-.366h4.385c1.127 0 1.69 0 2.041.366.35.366.35.956.35 2.134v8.333H7.246"
    />
  </svg>
)
export default TruckIcon
