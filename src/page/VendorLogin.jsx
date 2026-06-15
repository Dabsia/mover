import React, { useEffect, useState } from "react"
import "./adminLogin.css"
import VerifyTokenModal from "../components/VerifyToken";
import SuccessMessage from "../components/SuccessModal";
import SuccessMessageAdmin from "../components/SucessModalAdmin";
import { useQuery } from "@tanstack/react-query";
import { loginAgent } from "../api/agentApi";
import { useNavigate } from "react-router-dom";
import Toast from "../components/toast";
import Loader from "../components/loader";
import FirstCardToggle from "../components/FirstCardToggle";
// import "../components/toast.css"

const VendorLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [user, setEmail] = useState("")
    const [showVerifyEmail, setShowVerifyEmail] = useState(false)
    const [showSucessModal, setSuccessModal] = useState(false)
    const [toast, setToast] = useState(null);
    const navigate = useNavigate()
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["loginVendor", user, password],
        queryFn: () => loginAgent({ user, password }),
        enabled: false,
        refetchOnWindowFocus: false,
    });

    // useEffect(() => {
    //     if(data?.result) {
    //         console.log(data.result.responseMessage)
    //     } else {
    //         console.log(data.result.responseMessage)
    //     }
    // })

    useEffect(() => {
        if (error) {
            console.error('Couldn\'t login', error)
        }
        // if(data.responseStatus === false ) {
        //     console.log(data.responseMessage)
        // } else {
        //     console.log(data.responseMessage)

        // }
    })

    const handleBtnInOtherPage = () => {
        setSuccessModal(true)
        setShowVerifyEmail(false)
    }

    const closeModal = () => {
        setShowVerifyEmail(false)
    }

    const handleContinue = async () => {
        // debugger

        if (user && password) {
            const result = await refetch()
            const data = result?.data
            if (data?.responseStatus === false) {
                console.log(data.responseMessage)
                setToast({
                    message: data.responseMessage || "Something went wrong",
                    type: "error"
                });
            } else {
                console.log(data.responseMessage)
                console.log(data.result)
                sessionStorage.setItem('token', data.result.jwtToken)
                sessionStorage.setItem('name', data.result.name)
                navigate("/overview")
            }
        } else {
            setToast({
                message: "Please enter email and password",
                type: "warning"
            });
        }
    }

    const handleSignUp = async () => {
        navigate("/get-started")
    }



    return (
        <div className="container_firstStep">
            <div className="card_toggle">
                <FirstCardToggle />
            </div>
            <div className="admin_login_container_vendor">
                <div className="admin_login_header">
                    <h3>Vendor Login</h3>
                    <span>Please enter your login credentials</span>
                </div>
                <div className="admin_login_input">
                    <div className="admin_login_email">
                        <label>Email Address</label>
                        <input type="text" value={user} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                    </div>
                    <div className="admin_login_password">
                        <label>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} value={password} placeholder="Password" />
                        <span className="admin_forgot_pass" ></span>
                        <span className="admin_login_pass_btn" onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? "HIDE" : "SHOW"}
                        </span>
                    </div>
                    <div className="no_account_section">
                        <span>Don't have an account?</span>   <a onClick={handleSignUp} href="#">Sign up</a>
                    </div>
                </div>

                <div className="admin_footer_btn_vendor">
                    <button onClick={() => handleContinue()}>CONTINUE</button>
                </div>

                {isLoading && <Loader />}

                {toast && (
                    <Toast
                        className="toast-container"
                        message={toast.message}
                        type={toast.type}
                        duration={5000}
                        onClose={() => setToast(null)}
                    />
                )}

            </div>
        </div>
    )
}

export default VendorLogin 