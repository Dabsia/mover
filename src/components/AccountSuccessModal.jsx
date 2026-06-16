import React from "react";
import "./successModal.css"

import { useNavigate } from "react-router-dom";

const AccountSuccessMessage = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/vendor-login')
    }
    return (
        <div className="success_modal_background">
            <div className="success_modal_container">
                <div className="success_modal_upper">
                    <div>
                        <img src="/assets/success-good-tick.svg" alt="" />
                    </div>
                    <div className="success_modal_upper_text">
                        <h2>Partner Account Created Successfully</h2>
                        <span>Start accepting jobs, process orders and send quotes</span>
                    </div>
                </div>
                <div className="border-btn">
                    <button onClick={handleContinue}>PROCEED TO LOGIN</button>
                </div>
            </div>
        </div>
    )
}

export default AccountSuccessMessage