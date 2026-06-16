import React from "react";
import "./successModal.css"

import { useNavigate } from "react-router-dom";

const SuccessMessageAdmin = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/overview-admin')
    }
    return (
        <div className="success_modal_background">
            <div className="success_modal_container">
                <div className="success_modal_upper">
                    <div>
                        <img src="/assets/success-good-tick.svg" alt="" />
                    </div>
                    <div className="success_modal_upper_text">
                        <h2>Login Sucessful</h2>
                    </div>
                </div>
                <div className="border-btn">
                    <button onClick={handleContinue}>GO TO DASHBOARD</button>
                </div>
            </div>
        </div>
    )
}

export default SuccessMessageAdmin