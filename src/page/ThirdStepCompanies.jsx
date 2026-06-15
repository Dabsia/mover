import React, { useEffect, useRef, useState } from "react";
import "./thirdStepCompanies.css"
import FirstCardToggle from "../components/FirstCardToggle";
import RichTextEditor from "../components/RichTextEditor";
import AccountSuccessMessage from "../components/AccountSuccessModal";
import stepperIconSecond from "../Assets/third-stepper-icon.svg"
import stepperMobileThird from "../Assets/mobile-stepper-icon-third.svg"
import dropdown from "../Assets/arrow-down-dropdown.svg"
import imageUpload from "../Assets/image-upload.svg"
import coverPhotoIcon from "../Assets/album-02.svg"
import cancelIcon from "../Assets/cancel-01.svg"
import firstPhoto from "../Assets/cover-photo.svg"
import secondPhoto from "../Assets/cover-photo-second.svg"
import thirdPhoto from "../Assets/cover-photo-third.svg"
import fourthPhoto from "../Assets/cover-photo-four.svg"
import fifthPhoto from "../Assets/cover-photo-five.svg"
import sixthPhoto from "../Assets/cover-photo-six.svg"
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProvince } from "../api/agentApi";
import { registerAgent } from "../api/agentApi"
import Loader from "../components/loader";

const ThirdStepCompanies = () => {

    const navigate = useNavigate()
    const dropdownRef = useRef(null);
    const fileInputRef = useRef(null);
    const [showMoreOptions, setShowOptions] = useState(false)
    const [showCoverPhoto, setShowCoverPhoto] = useState(false)
    const [submitErr, showSubmitErr] = useState(false)
    const [resMsg, showResMsg] = useState(false)
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [kvkNumber, setKvkNumber] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [image, setImage] = useState("");
    const [provinces, setProvinces] = useState("");
    const [companyOverView, setCompanyOverView] = useState("");

    const [selectedProvinces, setSelectedProvinces] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [allProvinces, setAllProvinces] = useState([]);

    const { data, isLoading, error } = useQuery({
        queryKey: ["province"],
        queryFn: fetchProvince,
    });
    const { data: dataReg, isLoading: isLoadingReg, error: errorReg, refetch } = useQuery({
        queryKey: ["register-agent", email, kvkNumber, companyName, password, image, provinces, companyOverView],
        queryFn: () => registerAgent({
            email,
            kvkNumber,
            companyName,
            password,
            image: coverPhoto,
            provinces: selectedProvinces.map((provinceName) => {
                const match = allProvinces.find(p => p.provinceName === provinceName);
                return match.provinceId;
            }),
            companyOverView
        }),
        enabled: false,
        refetchOnWindowFocus: false,
        // enabled: regNumber.length === 8,
    });

    useEffect(() => {
        if (errorReg) {
            console.error("Error from registration query:", errorReg);
        }
    }, [errorReg]);


    useEffect(() => {
        if (data?.result) {
            setAllProvinces(data.result);
        }
    }, [data]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        const storedPassword = sessionStorage.getItem("password");
        const storedKvkNumber = sessionStorage.getItem("kvkNumber");
        const storedCompanyName = sessionStorage.getItem("companyName");

        if (storedEmail) setEmail(storedEmail);
        if (storedPassword) setPassword(storedPassword);
        if (storedKvkNumber) setKvkNumber(storedKvkNumber);
        if (storedCompanyName) setCompanyName(storedCompanyName);
    }, []);

    // console.log('Dataaa', data)
    // if (isLoading) return <p>Loading...</p>;
    // if (error) return <p>Error loading provinces</p>;

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverPhoto(reader.result);
                setShowOptions(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleProvince = (province) => {
        if (selectedProvinces.includes(province)) {
            setSelectedProvinces(selectedProvinces.filter(p => p !== province));
        } else {
            setSelectedProvinces([...selectedProvinces, province]);
        }
    };

    const removeProvince = (province) => {
        setSelectedProvinces(selectedProvinces.filter(p => p !== province));
    };

    const openMoreOptions = () => {
        setShowOptions(prev => !prev);
    }

    const openCoverPhoto = () => {
        setShowCoverPhoto(true)

    }

    const hideCoverPhoto = () => {
        setShowCoverPhoto(false)
    }

    const handleCover = (photo) => {
        setCoverPhoto(photo)
        setShowCoverPhoto(false)
        setShowOptions(false)
    }


    const handleCloseModal = () => {
        showSubmitErr(false)
    }



    const openSuccessMessage = async () => {
        if (
            email &&
            kvkNumber &&
            companyName &&
            password &&
            coverPhoto &&
            selectedProvinces.length > 0 &&
            companyOverView.trim() !== ""
        ) {

            // setShowSuccessModal(true); 
            const result = await refetch();

            const data = result?.data;

            if (data?.responseStatus === false) {
                console.log(data.responseMessage);
                showSubmitErr(true)
                showResMsg(data.responseMessage)
                // Optionally show error modal/message here
            } else {
                console.log(data);
                setShowSuccessModal(true);
            }

            if (result?.error) {
                console.error(result.error);
            }
        } else {
            alert("Please fill in all required fields.");
        }
    };

    return (
        <div className="container_firstStep">
            <div className="card_toggle">
                <FirstCardToggle />
            </div>
            <div className="first_company_card">
                {/* <ul>
                    {data.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul> */}
                <div className="stepper_icon">
                    {/* <img className="mobile_only_stepper_icon" src={stepperMobileThird} alt="" /> */}
                    <img className="mobile_only_stepper_icon" src="/images/mobile-stepper-icon-third.svg" alt="" />
                    {/* <img className="laptop_only_stepper_icon" src={stepperIconSecond} alt="" /> */}
                    <img className="laptop_only_stepper_icon" src="/images/third-stepper-icon.svg" alt="" />

                </div>
                <div className="company_header">
                    <h1>Profile Setup</h1>
                    <p>Set up your profile details</p>
                </div>
                <div className="upload_container_all">
                    <div className="upload_container"
                        style={{
                            backgroundImage: coverPhoto
                                ? `url(${coverPhoto})`
                                : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundColor: coverPhoto ? 'transparent' : 'rgba(240, 249, 253, 1)',
                        }}>
                        {!coverPhoto && <button onClick={openMoreOptions}>
                            {/* <img src={imageUpload} alt="" /> */}
                            <img src="/images/image-upload.svg" alt="" />
                            <span>Upload cover photo</span>

                        </button>}

                        {showMoreOptions &&
                            <div className="choose_photo_container">
                                <div className="choose_photo_btn" onClick={openCoverPhoto}>
                                    {/* <img src={coverPhotoIcon} alt="" /> */}
                                    <img src="/images/album-02.svg" alt="" />
                                    <span>Choose cover photo</span>
                                </div>
                                <div className="choose_photo_btn" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                                    {/* <img src={imageUpload} alt="" /> */}
                                    <img src="/images/image-upload.svg" alt="" />
                                    <span>Upload from device</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        style={{ display: "none" }}
                                    />
                                </div>
                            </div>}
                        {coverPhoto && <div className="inner_upload_section">
                            <button onClick={openMoreOptions}>
                                <img src="/images/image-upload.svg" alt="" />
                               
                                <span>Change Image</span>
                            </button>

                        </div>}


                    </div>
                    <div className="upload_container_note" >
                        <span>This is the photo users see when you send them a quote</span>
                    </div>
                </div>
                <div
                    className="input_multiple"
                    ref={dropdownRef}
                    onClick={() => {
                        if (!showDropdown) {
                            setShowDropdown(true);
                        }
                    }}
                >
                    <span>Provinces Covered</span>

                    <div className="tag_input_wrapper">
                        {selectedProvinces.map((province, idx) => (
                            <div className="tag_item" key={idx}>
                                <span>{province}</span>
                                <button
                                    className="remove_btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeProvince(province);
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    <img className="dropdown_icon" src="/images/arrow-down-dropdown.svg" alt="" onClick={(e) => {
                        e.stopPropagation();
                        setShowDropdown((prev) => !prev);
                    }} />

                    {showDropdown && (
                        <div className="dropdown_list">
                            {allProvinces.map((province, idx) => (
                                <label className="dropdown_item" key={idx}>
                                    <input
                                        type="checkbox"
                                        checked={selectedProvinces.includes(province.provinceName)}
                                        onChange={() => toggleProvince(province.provinceName)}
                                    />
                                    <span>{province.provinceName}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>


                <div className="input_multiple_sub">
                    <span>Company Overview</span>
                    <div className="rich_text">
                        <RichTextEditor onChange={(val) => setCompanyOverView(val)} />
                    </div>
                </div>

                <div className="company_firststep_btn_second">
                    <button ></button>
                    <button onClick={openSuccessMessage}>Continue</button> {/* Add onClick */}
                </div>
            </div>
            {showCoverPhoto &&
                <div className="cover_photo_background">
                    <div className="cover_photo_container">
                        <div className="cover_photo_head">
                            <h2>Select cover photo</h2>
                            <img onClick={hideCoverPhoto} src="/images/cancel-01.svg" alt="" />
                        </div>
                        <div className="cover_photo_body">
                            <div>
                                <img src="/images/cover-photo.svg" alt="" onClick={() => handleCover(firstPhoto)} />
                            </div>
                            <div>
                                <img src="/images/cover-photo-second.svg" alt="" onClick={() => handleCover(secondPhoto)} />
                            </div>
                            <div>
                                <img src="/images/cover-photo-third.svg" alt="" onClick={() => handleCover(thirdPhoto)} />
                            </div>
                            <div>
                                <img src="/images/cover-photo-four.svg" alt="" onClick={() => handleCover(fourthPhoto)} />
                            </div>
                            <div>
                                <img src="/images/cover-photo-five.svg" alt="" onClick={() => handleCover(fifthPhoto)} />
                            </div>
                            <div>
                                <img src="/images/cover-photo-six.svg" alt="" onClick={() => handleCover(sixthPhoto)} />
                            </div>
                        </div>
                    </div>
                </div>}
            {showSuccessModal &&
                <div className="account_component">
                    <AccountSuccessMessage />
                </div>}
            {submitErr &&
                <div className="error_message_background">
                    <div className="error_message_container_third">
                        <div className="error_message">
                            <span>An Error Occurred!</span>
                            <span>
                                {resMsg}
                            </span>
                        </div>
                        <div className="close-button" onClick={handleCloseModal}>
                            &times;
                        </div>
                    </div>
                </div>
            }




            {isLoadingReg && <Loader />}
            {isLoading && <Loader />}
        </div>
    )
}

export default ThirdStepCompanies