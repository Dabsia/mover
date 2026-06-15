import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import FirstCardToggle from "../components/FirstCardToggle";
import stepperIcon from "../Assets/Progress minimal icons connected.svg"
import mobileStepperIcon from "../Assets/mobile-stepper-icon.svg"
import "./firstStepCompanies.css";
import { useState } from "react";
import goodTick from "../Assets/tick-01.svg"
import companyImage from "../Assets/Content.svg"
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/loader";
import { getCompanyDetailsByNumber } from "../api/agentApi";

const FirstStepCompanies = () => {



    const [regNumber, setRegNumber] = useState("");
    const [companyName, setCompanyName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [registrationDate, setRegistrationDate] = useState("")
    const [address, setAddress] = useState("")
    const [showError, setShowError] = useState(false);
    const [showErrorInvalid, setShowErrorInvalid] = useState(false)
    const [showTick, setShowTick] = useState(false);
    const [showLoader, setShowLoader] = useState(false)
    const handleInputChanges = (e) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/\D/g, "").slice(0, 8);
        setRegNumber(sanitizedValue);
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["province", regNumber],
        queryFn: () => getCompanyDetailsByNumber(regNumber),
        enabled: regNumber.length === 8,
    });

    useEffect(() => {
        if (regNumber.length !== 8) {
            setShowTick(false);
            setShowError(false);
            setShowErrorInvalid(false)
            return
        }
        if (data) {
            if (!data.responseStatus) {
                setShowTick(false);
                setShowError(true);
            } else {
                setShowTick(true);
                setShowError(false);
                // console.log("Company Data:", data);
                setCompanyName(data.result.companyName)
                setPhoneNumber(data.result.phoneNumber)
                setRegistrationDate(data.result.registerationDate)
                setAddress(data.result.address)


            }
        }
    }, [data]);
    // const sanitizedValue = value.replace(/\D/g, "").slice(0, 8);
    // setRegNumber(sanitizedValue);
    // const { data, isLoading, error } = useQuery({
    //     queryKey: ["province"],
    //     queryFn: getCompanyDetailsByNumber(regNumber),
    //   });

    //   useEffect(() => {
    //     if (!data.responseStatus) {
    //         setShowTick(false);
    //         setShowError(true);
    //     } else {

    //     }
    //   }, [data]);


    const navigate = useNavigate();

    // const handleInputChange = (e) => {
    //     const value = e.target.value;

    //     // Only digits & max 8 characters
    //     const sanitizedValue = value.replace(/\D/g, "").slice(0, 8);
    //     setRegNumber(sanitizedValue);

    //     if (sanitizedValue.length === 8) {
    //         if (sanitizedValue === "23456789") {
    //             setShowTick(true);
    //             setShowError(false);
    //         } else {
    //             setShowTick(false);
    //             setShowError(true);
    //         }
    //     } else {
    //         setShowTick(false);
    //         setShowError(false);
    //     }
    // };

    const handleContinue = () => {
        if (regNumber.length !== 8) {
            setShowError(false);
            setShowErrorInvalid(true)
            setTimeout(() => {
                setShowErrorInvalid(false)
            }, 5000);
            return
        } else if (showError === true) {
            setShowError(true)
            return
        } else if (showTick === true) {
            sessionStorage.setItem('kvkNumber', regNumber)
            sessionStorage.setItem('companyName', companyName)
            navigate("/email-verification");
        }


    };

    const handleLogin = () => {
        navigate("/vendor-login")
    }

    const handlePrivacyPolicy = () => {
        window.open("/privacy-policy", "_blank");
    };

    const handleTermsAndCondition = () => {
        window.open("/terms", "_blank");
    };


    return (
        <div className="container_firstStep">
            <div className="card_toggle">
                <FirstCardToggle />
            </div>
            <div className="first_company_card">
                <div className="stepper_icon">
                    {/* <img className="mobile_only_stepper_icon" src={mobileStepperIcon} alt="" /> */}
                    <img className="mobile_only_stepper_icon" src="/images/mobile-stepper-icon.svg" alt="" />
                    {/* <img className="laptop_only_stepper_icon" src={stepperIcon} alt="" /> */}
                    <img className="laptop_only_stepper_icon" src="/images/Progress minimal icons connected.svg" alt="" />
                </div>
                <div className="company_header">
                    <h1>Company Information</h1>
                    <p>Please provide company details and list of services you offer</p>
                </div>
                <div className="company_input_reg">
                    <label>Company Registration Number</label>
                    <input type="text"
                        value={regNumber}
                        onChange={handleInputChanges}
                        placeholder="Enter Registration Number" />
                    {showTick && <img src="/images/tick-01.svg" alt="Valid" />}
                </div>
                {showError && (
                    <div className="error_message_container">
                        <div className="error_message">
                            <span>Company does not exist</span>
                            <span>
                                Please check if the number inputted is correct or visit the
                                registration body to register your company
                            </span>
                        </div>
                    </div>
                )}
                {showErrorInvalid && (
                    <div className="error_message_container">
                        <div className="error_message">
                            <span>Invalid number</span>
                            <span>
                                Please check if the number inputted is correct or visit the
                                registration body to register your company
                            </span>
                        </div>
                    </div>
                )}
                {showTick && (
                    <div className="good_tick_container">
                        <div className="first_card_good_tick" >
                            <div>
                                <img src="/images/Content.svg" alt="" />
                                {/* <img src={companyImage} alt="" /> */}
                            </div>
                            <div className="movers_details">
                                <div className="movers_details_text"> {companyName} </div>
                                <div className="movers_details_sub">
                                    <span>Registered Company</span>
                                    {/* <span>+31 20-1234567</span> */}
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="mover_details_container">
                                <div className="mover_details_upper">
                                    <div className="user_success_phone">
                                        <span>Phone</span>
                                        <span> {phoneNumber ? phoneNumber : 'N/A'} </span>
                                    </div>
                                    <div className="user_success_phone">
                                        <span>Date of registeration</span>
                                        <span>{registrationDate.split('T')[0]} </span>
                                    </div>
                                </div>
                                <div className="user_success_phone_last">
                                    <span>Company Address</span>
                                    <span> {address} </span>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                )}
                <div className="company_policy">
                    <span>
                        By creating an account, you accept our <a onClick={handleTermsAndCondition} href="#">Terms of Use</a> and <a onClick={handlePrivacyPolicy} href="#">Privacy Policy</a>
                    </span>
                    <span>
                        Already have an account? <a onClick={handleLogin} href="#">Login</a>
                    </span>
                </div>
                <div className="company_firststep_btn">
                    <button>Go Back</button>
                    <button onClick={handleContinue}>Continue</button> {/* Add onClick */}
                </div>
            </div>

            {isLoading && <Loader />}
        </div>
    );
};

export default FirstStepCompanies;
