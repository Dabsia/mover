import React, { useRef } from "react";
import cancelIcon from "../Assets/cancel-01.svg"
import "./verifyToken.css"

const VerifyTokenModal = ({handleSubmit, closeModal }) => {
    const inputRefs = useRef([]);

    const handleInput = (e, index) => {
        const value = e.target.value;

        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };
 


    return (
        <div className="verify_background">
            <div className="verify_token_container">
                <div className="verify_token_head">
                    <span>Verify Email Address</span>
                    <img onClick={closeModal} src={cancelIcon} alt="" />
                </div>
                <div className="otp_body">
                    <div className="enter_otp_text">
                        <span>Please enter the OTP sent to your email address</span>
                    </div>
                    <div className="token_input">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} >
                                <input
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="number"
                                    placeholder="0"
                                    maxLength={1}
                                    onChange={(e) => handleInput(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                
                                />
                                {index === 2 && (
                                    <span style={{ margin: "0 8px", fontWeight: "bold" }}>-</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="no_code_yet">
                        <span> Didn’t receive the code? </span> <span>Resend code</span>
                    </div>

                </div>
                <div className="border-btn">
                    <button onClick={handleSubmit}>VERIFY EMAIL </button>
                </div>
            </div>
        </div>
    )
}

export default VerifyTokenModal