import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuoteProgress from "./QuoteProgress";
import Location from "./Location";
import PrimaryBtn from "./PrimaryBtn";
import InventoryList from "./InventoryList";
import ViewSummary from "./ViewSummary";
import QuoteSuccess from "../modal/QuoteSuccess";
import MobileQuoteProgress from "./MobileQuoteProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUserInfo,
  setHouseSize,
  setUserDetails,
  setUserItems,
  setUserMoreInfo,
} from "../redux/action";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Loader from "./loader";
import { useTranslation } from "react-i18next";
import MovingInformation2 from "./MovingInformation2";

const QuoteContainer = ({ data }) => {
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  // gets the whole data needed and puts in one object
  const user = useSelector((state) => state.user);

  const { t } = useTranslation();

  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const navigate = useNavigate();

  // location details
  const [fromLocation, setFromLocation] = useState(
    user?.userMoveInfo?.pickUpAddress || ""
  );
  const [fromPickupLongitude, setFromPickupLongitude] = useState(
    user?.userMoveInfo?.pickUpLongitude || ""
  );
  const [fromPickupLatitude, setFromPickupLatitude] = useState(
    user?.userMoveInfo?.pickUpLatitude || ""
  );

  const [toLocation, setToLocation] = useState(
    user?.userMoveInfo?.dropOffAddress || ""
  );
  const [toDropOffLongitude, setToDropOffLongitude] = useState(
    user?.userMoveInfo?.dropOffLongitude || ""
  );
  const [toDropOffLatitude, setToDropOffLatitude] = useState(
    user?.userMoveInfo?.dropOffLatitude || ""
  );
  const [isEditingFrom, setIsEditingFrom] = useState(false);
  const [isEditingTo, setIsEditingTo] = useState(false);

  //moving info
  const [moveDate, setMoveDate] = useState("");
  const [moveTime, setMoveTime] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickupTime] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [provinceId, setProvinceId] = useState(0);
  const [pickUpAddress, setPickUpAddress] = useState(fromLocation);
  const [dropOffAddress, setDropOffAddress] = useState(toLocation);
  const [pickUpAddressNumber, setPickUpAddressNumber] = useState("");
  const [dropOffAddressNumber, setDropOffAddressNumber] = useState("");
  const [pickUpLongitude, setPickUpLongitude] = useState(fromPickupLongitude);
  const [pickUpLatitude, setPickUpLatitude] = useState(fromPickupLatitude);
  const [dropOffLongitude, setDropOffLongitude] = useState(toDropOffLongitude);
  const [dropOffLatitude, setDropOffLatitude] = useState(toDropOffLatitude);
  const [toNumberOfFloors, setToNumberOfFloors] = useState("");
  const [toLongCarry, setToLongCarry] = useState("");
  const [toRemark, setToRemark] = useState("");
  const [toHasElevator, setToHasElevator] = useState(null);
  const [toNeedShuttle, setToNeedShuttle] = useState(null);
  const [toHasBuildingInsurance, setToHasBuildingInsurance] = useState(null);
  const [toNeedHelpPacking, setToNeedHelpPacking] = useState(null);
  const [fromNumberOfFloors, setFromNumberOfFloors] = useState("");
  const [fromLongCarry, setFromLongCarry] = useState("");
  const [fromRemark, setFromRemark] = useState("");
  const [fromHasElevator, setFromHasElevator] = useState(null);
  const [fromNeedShuttle, setFromNeedShuttle] = useState(null);
  const [fromHasBuildingInsurance, setFromHasBuildingInsurance] =
    useState(null);
  const [fromNeedHelpPacking, setFromNeedHelpPacking] = useState(null);
  //chheckbox
  const [acceptTerms, setAcceptTerms] = useState(null);
  const [receivePromotions, setReceivePromotions] = useState(null);
  const [provinceName, setProvinceName] = useState("");

  // Error message state
  const [errMessage, setErrMessage] = useState("");

  const [moveSize, setMoveSize] = useState("");

  // console.log("Current state:", {
  //   fromLocation,
  //   toLocation,
  //   fromPickupLatitude,
  //   fromPickupLongitude,
  //   toDropOffLatitude,
  //   toDropOffLongitude,
  //   provinceId,
  // });

  // Sync location state when user data changes
  useEffect(() => {
    if (user?.userMoveInfo) {
      // console.log("Syncing from user data:", user.userMoveInfo);
      setFromLocation(user?.userMoveInfo?.pickUpAddress || "");
      setToLocation(user?.userMoveInfo?.dropOffAddress || "");
      setFromPickupLongitude(user?.userMoveInfo?.pickUpLongitude || "");
      setFromPickupLatitude(user?.userMoveInfo?.pickUpLatitude || "");
      setToDropOffLongitude(user?.userMoveInfo?.dropOffLongitude || "");
      setToDropOffLatitude(user?.userMoveInfo?.dropOffLatitude || "");
    }
  }, [user?.userMoveInfo]);

  // Sync coordinates to moving information
  useEffect(() => {
    setPickUpLongitude(fromPickupLongitude);
    setPickUpLatitude(fromPickupLatitude);
    setDropOffLongitude(toDropOffLongitude);
    setDropOffLatitude(toDropOffLatitude);
    setPickUpAddress(fromLocation);
    setDropOffAddress(toLocation);
  }, [
    fromPickupLongitude,
    fromPickupLatitude,
    toDropOffLongitude,
    toDropOffLatitude,
    fromLocation,
    toLocation,
  ]);

  // Function to format datetime to ISO 8601 format
  const formatToISODateTime = (dateStr) => {
    if (!dateStr) return "";

    // Create date from the selected date
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) return "";

    // Get current time
    const now = new Date();
    date.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );

    return date.toISOString();
  };

  // Function to validate move info data
  const validateMoveInfo = () => {
    // debugger
    const requiredFields = [
      { field: moveDate, name: "Move Date" },
      { field: fullName, name: "Full Name" },
      { field: email, name: "Email" },
      { field: phoneNumber, name: "Phone Number" },
      { field: pickUpAddress, name: "Pick Up Address" },
      { field: dropOffAddress, name: "Drop Off Address" },
      { field: fromLocation, name: "From Location" },
      { field: toLocation, name: "To Location" },
      { field: provinceId, name: "Province" },
      { field: pickUpLongitude, name: "Pick Up Longitude" },
      { field: pickUpLatitude, name: "Pick Up Latitude" },
      { field: dropOffLongitude, name: "Drop Off Longitude" },
      { field: dropOffLatitude, name: "Drop Off Latitude" },
    ];

    const missingFields = requiredFields.filter(({ field }) => {
      //  debugger
      // Handle different data types properly
      if (field === null || field === undefined) {
        return true; // Field is missing
      }

      // For strings, check if empty or only whitespace
      if (typeof field === "string") {
        return field.trim() === "";
      }

      // For numbers, check if it's a valid number (not NaN or 0 if 0 is invalid)
      if (typeof field === "number") {
        return field === 0; // Consider 0 as invalid for provinceId
      }

      return false;
    });

    if (missingFields.length > 0) {
      console.log("Missing fields:", missingFields);
      setErrMessage(`Please fill in all required fields.`);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return false;
    } else {
      setErrMessage("");
    }

    // Additional validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return false;
    }

    return true;
  };

  // Format the datetime when creating moreInfoData
  const formattedMoveDateTime = formatToISODateTime(moveDate, moveTime);
  const formattedPickUpDateTime = formatToISODateTime(pickUpDate, pickUpTime);

  const moreInfoData = {
    moveDate: formattedMoveDateTime,
    pickUpTime: null,
    fullName,
    email,
    phoneNumber,
    provinceId,
    pickUpAddress: fromLocation,
    dropOffAddress: toLocation,
    pickUpAddressNumber: pickUpAddressNumber || null,
    dropOffAddressNumber: dropOffAddressNumber || null,
    pickUpLongitude: String(fromPickupLongitude),
    pickUpLatitude: String(fromPickupLatitude),
    dropOffLongitude: String(toDropOffLongitude),
    dropOffLatitude: String(toDropOffLatitude),
    toNumberOfFloors: toNumberOfFloors || null,
    toLongCarry: toLongCarry || null,
    toRemark: toRemark || null,
    toHasElevator: toHasElevator || null,
    toNeedShuttle: toNeedShuttle || null,
    toHasBuildingInsurance: toHasBuildingInsurance || null,
    toNeedHelpPacking: toNeedHelpPacking || null,
    fromNumberOfFloors: fromNumberOfFloors || null,
    fromLongCarry: fromLongCarry || null,
    fromRemark: fromRemark || null,
    fromHasElevator: fromHasElevator || null,
    fromNeedShuttle: fromNeedShuttle || null,
    fromHasBuildingInsurance: fromHasBuildingInsurance || null,
    fromNeedHelpPacking: fromNeedHelpPacking || null,
  };

  // Ensure your merge function creates the correct structure
  function mergeTwoObjects(items, moreInfo) {
    return {
      items: items, // Should be array of {room, itemName, numberOfItems}
      ...moreInfo, // Should contain all other required fields
    };
  }
  const dataToSend = mergeTwoObjects(user?.items, user?.moreInfo);

  // Remove the wrapper object - send dataToSend directly
  const addUserDetails = async () => {
    const response = await axios.post(
      "https://involved-birgit-zinter-cb767b47.koyeb.app/api/MoveRequest/GetQuote",
      dataToSend // Send directly, not wrapped in an object
    );
    return response.data;
  };

  const {
    mutate: fetchData,
    isPending, // true when the request is running
  } = useMutation({
    mutationFn: addUserDetails,
    onSuccess: (data) => {
      console.log(data);
      if (data.responseStatus) {
        setOpenSuccessModal(true);
        setEmail("");
        localStorage.setItem("Code", JSON.stringify(data));
        setErrMessage("");
      } else {
        setErrMessage(
          data.responseMessage || "An error occurred. Please try again."
        );
      }
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      setErrMessage("An error occurred. Please try again.");
    },
  });

  // Common Location component props to avoid repetition
  const locationProps = {
    fromLocation,
    toLocation,
    setFromLocation,
    setToLocation,
    isEditingFrom,
    isEditingTo,
    setIsEditingFrom,
    setIsEditingTo,
    setFromPickupLongitude,
    setFromPickupLatitude,
    setToDropOffLongitude,
    setToDropOffLatitude,
    fromPickupLongitude,
    fromPickupLatitude,
    toDropOffLongitude,
    toDropOffLatitude,
    setProvinceId,
    moveSize,
    setMoveSize,
    errMessage,
    setErrMessage,
    provinceName,
    setProvinceName,
  };

  let content = <Location {...locationProps} />;

  switch (activeTab) {
    case 1:
      content = <Location {...locationProps} />;
      break;
    case 2:
      content = <InventoryList />;
      break;
    case 3:
      content = (
        <MovingInformation2
          setMoveDate={setMoveDate}
          moveDate={moveDate}
          setPickUpDate={setPickUpDate}
          pickUpDate={pickUpDate}
          moveTime={moveTime}
          setMoveTime={setMoveTime}
          pickUpTime={pickUpTime}
          setPickupTime={setPickupTime}
          fullName={fullName}
          setFullName={setFullName}
          email={email}
          setEmail={setEmail}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          provinceId={provinceId}
          setProvinceId={setProvinceId}
          pickUpAddress={pickUpAddress}
          setPickUpAddress={setPickUpAddress}
          dropOffAddress={dropOffAddress}
          setDropOffAddress={setDropOffAddress}
          pickUpAddressNumber={pickUpAddressNumber}
          setPickUpAddressNumber={setPickUpAddressNumber}
          dropOffAddressNumber={dropOffAddressNumber}
          setDropOffAddressNumber={setDropOffAddressNumber}
          pickUpLongitude={pickUpLongitude}
          setPickUpLongitude={setPickUpLongitude}
          pickUpLatitude={pickUpLatitude}
          setPickUpLatitude={setPickUpLatitude}
          dropOffLongitude={dropOffLongitude}
          setDropOffLongitude={setDropOffLongitude}
          dropOffLatitude={dropOffLatitude}
          setDropOffLatitude={setDropOffLatitude}
          fromNumberOfFloors={fromNumberOfFloors}
          setFromNumberOfFloors={setFromNumberOfFloors}
          toNumberOfFloors={toNumberOfFloors}
          setToNumberOfFloors={setToNumberOfFloors}
          fromLongCarry={fromLongCarry}
          setFromLongCarry={setFromLongCarry}
          toLongCarry={toLongCarry}
          setToLongCarry={setToLongCarry}
          fromRemark={fromRemark}
          setFromRemark={setFromRemark}
          toRemark={toRemark}
          setToRemark={setToRemark}
          fromHasElevator={fromHasElevator}
          setFromHasElevator={setFromHasElevator}
          toHasElevator={toHasElevator}
          setToHasElevator={setToHasElevator}
          fromNeedShuttle={fromNeedShuttle}
          setFromNeedShuttle={setFromNeedShuttle}
          toNeedShuttle={toNeedShuttle}
          setToNeedShuttle={setToNeedShuttle}
          fromHasBuildingInsurance={fromHasBuildingInsurance}
          setFromHasBuildingInsurance={setFromHasBuildingInsurance}
          toHasBuildingInsurance={toHasBuildingInsurance}
          setToHasBuildingInsurance={setToHasBuildingInsurance}
          fromNeedHelpPacking={fromNeedHelpPacking}
          setFromNeedHelpPacking={setFromNeedHelpPacking}
          toNeedHelpPacking={toNeedHelpPacking}
          setToNeedHelpPacking={setToNeedHelpPacking}
          isEditingFrom={isEditingFrom}
          setIsEditingFrom={setIsEditingFrom}
          isEditingTo={isEditingTo}
          setIsEditingTo={setIsEditingTo}
          fromLocation={fromLocation}
          toLocation={toLocation}
          setFromLocation={setFromLocation}
          setToLocation={setToLocation}
          errMessage={errMessage}
          receivePromotions={receivePromotions}
          setReceivePromotions={setReceivePromotions}
          acceptTerms={acceptTerms}
          setAcceptTerms={setAcceptTerms}
        />
      );
      break;
    case 4:
      content = <ViewSummary errMessage={errMessage} />;
      break;
    default:
      content = <Location {...locationProps} />;
  }

  // Function to handle moving forward in tabs
  const handleTabs = () => {
    // console.log("Current state when continuing:", {
    //   moveSize,
    //   provinceId,
    //   toLocation,
    //   fromLocation,
    //   fromPickupLatitude,
    //   fromPickupLongitude,
    //   toDropOffLatitude,
    //   toDropOffLongitude,
    // });

    if (!moveSize) {
      setErrMessage("Please Enter House Size");
      return;
    } else if (!provinceId || provinceId === 0) {
      setErrMessage("Please enter a valid address");
      return;
    } else if (!toLocation) {
      setErrMessage("Please enter a valid address");
      return;
    } else if (!fromLocation) {
      setErrMessage("Please enter a valid address");
      return;
    } else if (fromLocation === toLocation) {
      setErrMessage("Start Address can not be the same as End address");
      return;
    }

    if (activeTab === 1) {
      setErrMessage("");
      dispatch(
        setUserDetails({
          pickUpAddress: fromLocation,
          dropOffAddress: toLocation,
          pickUpLongitude: fromPickupLongitude,
          pickUpLatitude: fromPickupLatitude,
          dropOffLongitude: toDropOffLongitude,
          dropOffLatitude: toDropOffLatitude,
        })
      );
      dispatch(setHouseSize(moveSize));
      dispatch(setUserItems([]));
      localStorage.removeItem("inventory_selections");
    }
    if (activeTab === 2) {
      // if active tab is 2 and user has not added any items, stay on tab 2
      if (user.items.length === 0) {
        setActiveTab(2);
        return;
      }
    }
    if (activeTab === 3) {
      console.log("Validating move info...");

      // Validate move info before proceeding
      if (!validateMoveInfo()) {
        return; // Stop execution if validation fails
      }
      if (!acceptTerms) {
        setErrMessage("Please accept terms and conditions");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }
      dispatch(setUserMoreInfo(moreInfoData));
    }

    if (activeTab >= 5) return; // Ensure we don't go beyond the last tab
    setActiveTab((prevTab) => prevTab + 1);
  };

  // Function to handle moving backward in tabs
  const handlePrevTabs = () => {
    if (activeTab <= 1) return; // Ensure we don't go below tab 1
    setActiveTab((prevTab) => prevTab - 1);
    setErrMessage("");
  };

  const handleSubmit = () => {
    console.log("Submitting data...");
    fetchData();
  };

  const closeSuccessModal = () => {
    navigate("/");
    setOpenSuccessModal(false);
    dispatch(resetUserInfo());
    dispatch(setHouseSize(""));
  };

  useEffect(() => {
    setMoveSize(user?.houseSize);
  }, [user]);

  return (
    <>
      {isPending && <Loader />}
      <div className="relative">
        <div className="w-[90vw] relative h-[calc(100vh-90px)] max-w-[1500px] mx-auto mt-24">
          <div className="w-full  ">
            <div className="flex items-center">
              <Link to="/">
                <p className="text-[#9e9e9e] text-[14px] font-sans leading-[19.6px]">
                  {t("quoteContainer.home")}
                </p>{" "}
              </Link>
              <div className="mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="11"
                  viewBox="0 0 6 11"
                  fill="none"
                >
                  <path
                    d="M0.219801 0.720115C0.0788617 0.861097 -0.000314284 1.05228 -0.000314301 1.25163C-0.000314319 1.45098 0.0788616 1.64217 0.219801 1.78315L3.94119 5.50454L0.219801 9.22592C0.0828549 9.36771 0.00707833 9.55762 0.00879111 9.75474C0.0105039 9.95186 0.0895692 10.1404 0.228958 10.2798C0.368347 10.4192 0.556907 10.4983 0.754025 10.5C0.951143 10.5017 1.14105 10.4259 1.28284 10.289L5.53574 6.03606C5.67668 5.89508 5.75586 5.70389 5.75586 5.50454C5.75586 5.30519 5.67668 5.114 5.53574 4.97302L1.28284 0.720115C1.14186 0.579175 0.950669 0.5 0.75132 0.5C0.551971 0.5 0.360784 0.579175 0.219801 0.720115Z"
                    fill="#E3E3E3"
                  />
                </svg>
              </div>
              <p className="text-[#525252] text-[16px] font-bold font-sans  ">
                {t("quoteContainer.desc")}
              </p>
            </div>
            <div className="mt-4  quoteContainer flex ">
              <MobileQuoteProgress activeTab={activeTab} />
              <QuoteProgress activeTab={activeTab} />
              {content}
            </div>
          </div>
          <div className="h-[80px] quoteContainerBtns shadow-[0px_-6px_6px_-6px_rgba(0,0,0,0.3)] bg-white fixed bottom-0 max-w-[1500px] mx-auto w-[90vw] flex items-center justify-center  ">
            <div className="w-full flex items-center justify-between">
              {activeTab === 1 ? (
                <button
                  onClick={() => navigate(-1)}
                  className="text-[#3C82F6] hover:bg-primary py-1 px-2 hover:text-white rounded-[20px] cursor-pointer text-[14px] text-manrope font-light "
                >
                  {t("quoteContainer.back")}
                </button>
              ) : (
                <button
                  onClick={() => handlePrevTabs(activeTab)}
                  className="text-[#3C82F6] hover:bg-primary py-1 px-2 hover:text-white rounded-[20px] cursor-pointer text-[14px] text-manrope font-light "
                >
                  {t("quoteContainer.back")}
                </button>
              )}
              <div>
                {activeTab === 4 ? (
                  <PrimaryBtn
                    handlePress={handleSubmit}
                    className={"text-[14px] "}
                  >
                    {t("quoteContainer.getQuotes")}
                  </PrimaryBtn>
                ) : (
                  <PrimaryBtn
                    handlePress={() => handleTabs(activeTab)}
                    className={"text-[14px] "}
                  >
                    {t("quoteContainer.continue")}
                  </PrimaryBtn>
                )}
              </div>
            </div>
          </div>
          <div className="pb-[20px] md:hidden ">
            {activeTab > 1 && (
              <button
                onClick={() => handlePrevTabs(activeTab)}
                className="text-[#3C82F6] w-full quoteContainerPrimaryBtn mb-4 py-1 px-2 rounded-[20px] cursor-pointer text-[14px] text-manrope font-light "
              >
                {t("quoteContainer.back")}
              </button>
            )}

            <div>
              {activeTab === 4 ? (
                <PrimaryBtn
                  handlePress={handleSubmit}
                  className={"text-[14px] w-full "}
                >
                  {t("quoteContainer.getQuotes")}
                </PrimaryBtn>
              ) : (
                <PrimaryBtn
                  handlePress={() => handleTabs(activeTab)}
                  className={"text-[14px] w-full"}
                >
                  {t("quoteContainer.continue")}
                </PrimaryBtn>
              )}
            </div>
          </div>
        </div>
        {openSuccessModal && <QuoteSuccess closeModal={closeSuccessModal} />}
      </div>
    </>
  );
};

export default QuoteContainer;
