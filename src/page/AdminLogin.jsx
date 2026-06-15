import React, { useState } from "react"
import "./adminLogin.css"
import VerifyTokenModal from "../components/VerifyToken";
import SuccessMessage from "../components/SuccessModal";
import SuccessMessageAdmin from "../components/SucessModalAdmin";

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [showVerifyEmail, setShowVerifyEmail] = useState(false)
    const [showSucessModal, setSuccessModal] = useState(false)

    const handleBtnInOtherPage = () => {
        setSuccessModal(true)
        setShowVerifyEmail(false)
    }

    const closeModal = () => {
        setShowVerifyEmail(false)
    }

    const handleContinue = () => {
        setShowVerifyEmail(true)
    }

    return (
        <div className="admin_login_container">
            <div className="admin_login_header">
                <h3>Admin Login</h3>
                <span>Please enter your login credentials</span>
            </div>
            <div className="admin_login_input">
                <div className="admin_login_email">
                    <label>Email Address</label>
                    <input type="text" placeholder="Email Address" />
                </div>
                <div className="admin_login_password">
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} value={password} placeholder="Password" />
                    <span className="admin_forgot_pass" >Password must be at least 8 characters long</span>
                    <span className="admin_login_pass_btn" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? "HIDE" : "SHOW"}
                    </span>
                </div>
            </div>

            <div className="admin_footer_btn">
                <button onClick={handleContinue}>CONTINUE</button>
            </div>

            {showVerifyEmail &&
                <div className="verify_component" >
                    <VerifyTokenModal handleSubmit={handleBtnInOtherPage} closeModal={closeModal} />
                </div>}

            {showSucessModal &&
                <div className="verify_component">
                    <SuccessMessageAdmin />
                </div>}

        </div>
    )
}

export default AdminLogin 