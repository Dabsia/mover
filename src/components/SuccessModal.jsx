import React from "react";
import "./successModal.css"
import sucessIcon from "../Assets/success-good-tick.svg"
import { useNavigate } from "react-router-dom";


const SuccessMessage = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/profile-setup')
    }
    return (
        <div className="success_modal_background">
            <div className="success_modal_container">
                <div className="success_modal_upper">
                    <div>
                        <img src={sucessIcon} alt="" />
                    </div>
                    <div className="success_modal_upper_text">
                        <h2>Account Successfully Verified</h2>
                        <span>Setup your company KYC details to
                            start making money using Zinter</span>
                    </div>
                </div>
                <div className="border-btn">
                    <button onClick={handleContinue}>OK, GOT IT</button>
                </div>
            </div>
        </div>
    )
}

export default SuccessMessage