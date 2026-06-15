import React, { useRef, useEffect, useState } from "react";
import "./movingInformation.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useMapsLibrary, useApiIsLoaded } from "@vis.gl/react-google-maps";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

// Define libraries outside component to prevent reloading
const LIBRARIES = ["places"];

const MovingInformation2 = ({
  moveDate,
  setMoveDate,
  pickUpDate,
  fullName,
  setFullName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  pickUpAddressNumber,
  setPickUpAddressNumber,
  dropOffAddressNumber,
  setDropOffAddressNumber,
  setPickUpLongitude,
  setPickUpLatitude,
  setDropOffLongitude,
  setDropOffLatitude,
  fromNumberOfFloors,
  setFromNumberOfFloors,
  toNumberOfFloors,
  setToNumberOfFloors,
  fromRemark,
  setFromRemark,
  toRemark,
  setToRemark,
  fromHasElevator,
  setFromHasElevator,
  toHasElevator,
  setToHasElevator,
  fromNeedShuttle,
  setFromNeedShuttle,
  toNeedShuttle,
  setToNeedShuttle,
  fromHasBuildingInsurance,
  setFromHasBuildingInsurance,
  toHasBuildingInsurance,
  setToHasBuildingInsurance,
  fromNeedHelpPacking,
  setFromNeedHelpPacking,
  toNeedHelpPacking,
  setToNeedHelpPacking,
  isEditingFrom,
  setIsEditingFrom,
  isEditingTo,
  setIsEditingTo,
  fromLocation,
  toLocation,
  setFromLocation,
  setToLocation,
  errMessage,
  receivePromotions,
  setReceivePromotions,
  acceptTerms,
  setAcceptTerms,
}) => {
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  const { t } = useTranslation();

  // new states

  const [isContactInfoOpen, setIsContactInfoOpen] = useState(true);
  const toggleContactInfo = () => {
    setIsContactInfoOpen(!isContactInfoOpen);
  };

  const [isRestrictionsOpen, setIsRestrictionsOpen] = useState(true);
  const toggleRestrictions = () => {
    setIsRestrictionsOpen(!isRestrictionsOpen);
  };

  const [isRestrictionsOpen2, setIsRestrictionsOpen2] = useState(true);
  const toggleRestrictions2 = () => {
    setIsRestrictionsOpen2(!isRestrictionsOpen2);
  };

  const [isPickUpDetailsOpen, setIsPickUpDetailsOpen] = useState(true);
  const togglePickUpDetails = () => {
    setIsPickUpDetailsOpen(!isPickUpDetailsOpen);
  };

  const [isDropOffDetailsOpen, setIsDropOffDetailsOpen] = useState(true);
  const toggleDropOffDetails = () => {
    setIsDropOffDetailsOpen(!isDropOffDetailsOpen);
  };

  // Load Google Maps API & Places library
  const isLoaded = useApiIsLoaded();
  const placesLib = useMapsLibrary("places");
  const isPlacesLoaded = isLoaded && !!placesLib;

  // Google Places search states
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [isSearchingFrom, setIsSearchingFrom] = useState(false);
  const [isSearchingTo, setIsSearchingTo] = useState(false);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditingFrom && fromInputRef.current) {
      fromInputRef.current.focus();
    }
  }, [isEditingFrom]);

  useEffect(() => {
    if (isEditingTo && toInputRef.current) {
      toInputRef.current.focus();
    }
  }, [isEditingTo]);

  // Google Places search function
  const searchPlaces = (query, type) => {
    if (query.length < 3) {
      if (type === "from") {
        setFromSuggestions([]);
        setShowFromSuggestions(false);
      } else {
        setToSuggestions([]);
        setShowToSuggestions(false);
      }
      return;
    }

    if (!placesLib) {
      return;
    }

    if (type === "from") {
      setIsSearchingFrom(true);
    } else {
      setIsSearchingTo(true);
    }

    const service = new placesLib.AutocompleteService();

    service.getPlacePredictions({ input: query }, (predictions, status) => {
      if (type === "from") {
        setIsSearchingFrom(false);
        if (
          status === placesLib.PlacesServiceStatus.OK &&
          predictions
        ) {
          setFromSuggestions(predictions);
          setShowFromSuggestions(true);
        } else {
          setFromSuggestions([]);
        }
      } else {
        setIsSearchingTo(false);
        if (
          status === placesLib.PlacesServiceStatus.OK &&
          predictions
        ) {
          setToSuggestions(predictions);
          setShowToSuggestions(true);
        } else {
          setToSuggestions([]);
        }
      }
    });
  };

  // Handle address selection
  const handleAddressSelect = (prediction, type) => {
    if (!placesLib) return;

    const placesService = new placesLib.PlacesService(
      document.createElement("div")
    );

    placesService.getDetails(
      { placeId: prediction.place_id },
      (place, status) => {
        if (
          status === placesLib.PlacesServiceStatus.OK &&
          place &&
          place.geometry
        ) {
          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();
          const address = prediction.description;

          if (type === "from") {
            setFromLocation(address);
            setPickUpLongitude(longitude);
            setPickUpLatitude(latitude);
            setShowFromSuggestions(false);
            setIsEditingFrom(false);
            console.log("From location selected:", {
              address,
              coordinates: { latitude, longitude },
            });
          } else {
            setToLocation(address);
            setDropOffLongitude(longitude);
            setDropOffLatitude(latitude);
            setShowToSuggestions(false);
            setIsEditingTo(false);
            console.log("To location selected:", {
              address,
              coordinates: { latitude, longitude },
            });
          }
        }
      }
    );
  };

  const handleFromChange = () => {
    setIsEditingFrom(true);
    setShowFromSuggestions(false);
  };

  const handleToChange = () => {
    setIsEditingTo(true);
    setShowToSuggestions(false);
  };

  const handleFromBlur = () => {
    setTimeout(() => {
      setShowFromSuggestions(false);
      setIsEditingFrom(false);
    }, 200);
  };

  const handleToBlur = () => {
    setTimeout(() => {
      setShowToSuggestions(false);
      setIsEditingTo(false);
    }, 200);
  };

  const handleFromInputChange = (e) => {
    const value = e.target.value;
    setFromLocation(value);
    searchPlaces(value, "from");
  };

  const handleToInputChange = (e) => {
    const value = e.target.value;
    setToLocation(value);
    searchPlaces(value, "to");
  };

  const handleKeyDown = (e, type) => {
    if (e.key === "Enter") {
      if (type === "from") {
        setIsEditingFrom(false);
        setShowFromSuggestions(false);
      } else {
        setIsEditingTo(false);
        setShowToSuggestions(false);
      }
    } else if (e.key === "Escape") {
      if (type === "from") {
        setShowFromSuggestions(false);
      } else {
        setShowToSuggestions(false);
      }
    }
  };

  // Google Places Suggestion item component
  const SuggestionItem = ({ prediction, onClick }) => {
    return (
      <div
        className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
        onClick={onClick}
      >
        <div className="flex items-start">
          <svg
            className="w-4 h-4 text-blue-500 mr-3 mt-1 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {prediction.structured_formatting.main_text}
            </p>
            <p className="text-xs text-gray-500 line-clamp-2">
              {prediction.structured_formatting.secondary_text}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Suggestion dropdown component
  const SuggestionsDropdown = ({
    suggestions,
    show,
    isLoading,
    onSelect,
    type,
  }) => {
    if (!show) return null;

    return (
      <div className="absolute top-full left-0 right-0 z-50 bg-white border border-[#e3e3e3] rounded-[8px] shadow-lg mt-1 max-h-60 overflow-y-auto">
        {isLoading ? (
          <div className="p-2 text-center text-gray-500">Searching...</div>
        ) : suggestions.length === 0 ? (
          <div className="p-2 text-center text-gray-500">No results found</div>
        ) : (
          suggestions.map((prediction) => (
            <SuggestionItem
              key={prediction.place_id}
              prediction={prediction}
              onClick={() => onSelect(prediction, type)}
            />
          ))
        )}
      </div>
    );
  };

  // FROM UI state handlers
  const [fromElevatorYes, setFromElevatorYes] = useState(null);
  const [fromElevatorNo, setFromElevatorNo] = useState(null);
  const [fromNeedShuttleYes, setFromNeedShuttleYes] = useState(null);
  const [fromNeedShuttleNo, setFromNeedShuttleNo] = useState(null);
  const [fromBuildingInsuranceYes, setFromBuildingInsuranceYes] =
    useState(null);
  const [fromBuildingInsuranceNo, setFromBuildingInsuranceNo] = useState(null);
  const [fromNeedHelpPackingYes, setFromNeedHelpPackingYes] = useState(null);
  const [fromNeedHelpPackingNo, setFromNeedHelpPackingNo] = useState(null);

  const handleFromElevator = (value) => {
    if (value === "yes") {
      setFromElevatorYes(true);
      setFromElevatorNo(false);
    } else {
      setFromElevatorYes(false);
      setFromElevatorNo(true);
    }
  };

  const handleFromNeedShuttle = (value) => {
    if (value === "yes") {
      setFromNeedShuttleYes(true);
      setFromNeedShuttleNo(false);
    } else {
      setFromNeedShuttleYes(false);
      setFromNeedShuttleNo(true);
    }
  };

  const handleFromBuildingInsurance = (value) => {
    if (value === "yes") {
      setFromBuildingInsuranceYes(true);
      setFromBuildingInsuranceNo(false);
    } else {
      setFromBuildingInsuranceYes(false);
      setFromBuildingInsuranceNo(true);
    }
  };

  const handleFromNeedHelpPacking = (value) => {
    if (value === "yes") {
      setFromNeedHelpPackingYes(true);
      setFromNeedHelpPackingNo(false);
    } else {
      setFromNeedHelpPackingYes(false);
      setFromNeedHelpPackingNo(true);
    }
  };

  // TO UI state handlers
  const [toElevatorYes, setToElevatorYes] = useState(null);
  const [toElevatorNo, setToElevatorNo] = useState(null);
  const [toNeedShuttleYes, setToNeedShuttleYes] = useState(null);
  const [toNeedShuttleNo, setToNeedShuttleNo] = useState(null);
  const [toBuildingInsuranceYes, setToBuildingInsuranceYes] = useState(null);
  const [toBuildingInsuranceNo, setToBuildingInsuranceNo] = useState(null);
  const [toNeedHelpPackingYes, setToNeedHelpPackingYes] = useState(null);
  const [toNeedHelpPackingNo, setToNeedHelpPackingNo] = useState(null);

  const handleToElevator = (value) => {
    if (value === "yes") {
      setToElevatorYes(true);
      setToElevatorNo(false);
    } else {
      setToElevatorYes(false);
      setToElevatorNo(true);
    }
  };

  const handleToNeedShuttle = (value) => {
    if (value === "yes") {
      setToNeedShuttleYes(true);
      setToNeedShuttleNo(false);
    } else {
      setToNeedShuttleYes(false);
      setToNeedShuttleNo(true);
    }
  };

  const handleToBuildingInsurance = (value) => {
    if (value === "yes") {
      setToBuildingInsuranceYes(true);
      setToBuildingInsuranceNo(false);
    } else {
      setToBuildingInsuranceYes(false);
      setToBuildingInsuranceNo(true);
    }
  };

  const handleToNeedHelpPacking = (value) => {
    if (value === "yes") {
      setToNeedHelpPackingYes(true);
      setToNeedHelpPackingNo(false);
    } else {
      setToNeedHelpPackingYes(false);
      setToNeedHelpPackingNo(true);
    }
  };

  // Get unique room names from inventory
  const data = useSelector((state) => state.user);

  // Show loading if Google Maps isn't loaded yet
  if (!isPlacesLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  // Calculate dynamic padding based on open sections
  const hasOpenSections =
    isContactInfoOpen || isPickUpDetailsOpen || isDropOffDetailsOpen;

  return (
    <div
      className={`ml-4 movingInfoBox w-full ${hasOpenSections ? " h-fit" : "pb-5"
        }`}
    >
      <div
        className={` moveBox border-[#e3e3e3] border-[1px] rounded-[12px] mb-40 pb-4 h-fit `}
      >
        <div className="flex movingHeader pt-4 pl-4 items-center">
          <h3 className="mr-2 font-sans text-[20px] font-bold text-[#121212] ">
            {t("moveInformation.title1")}
          </h3>
          <p className="font-sans text-[20px] font-semibold italic text-[#9e9e9e]">
            {data?.houseSize}
          </p>
        </div>
        {errMessage && <p className="text-red-600 ml-4 mb-4">{errMessage}</p>}
        <div
          className={`p-[24px] movingInformationContainer w-[600px] h-fit ${hasOpenSections ? "mb-50" : "pb-5"
            }`}
        >
          <div className="mb-6">
            <div className="flex mb-[15px] flex-col">
              <label className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                {t("moveInformation.moveDate")}
                <span className="text-red-500 text-[14px] ml-[4px]">*</span>
              </label>
              <input
                placeholder="Select Move Date"
                type="date"
                value={moveDate}
                min={new Date().toISOString().split("T")[0]} // ⬅️ Prevent past dates
                onChange={(e) => setMoveDate(e.target.value)}
                className="h-[45px] border-[#e3e3e3] w-full font-light border-[1px] outline-none p-[8px] rounded-[8px]"
              />
            </div>
          </div>
          <div className=" border-[#e3e3e3] mb-6 pb-2 border-b-[1px]">
            <p className="font-sans text-[#136AB5] text-[18px] font-bold ">
              {t("moveInformation.contactInfo")}
            </p>

            <div className="mt-[10px]">
              <div className="flex mb-[15px] flex-col">
                <label className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                  {t("moveInformation.fullName")}
                  <span className="text-red-500 text-[14px] ml-[4px]">*</span>
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter Your Full Name"
                  type="text"
                  className="h-[45px] border-[#e3e3e3] font-light w-full border-[1px] outline-none p-[8px] rounded-[8px] "
                />
              </div>
              <div className="flex mb-[10px] flex-col">
                <label className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                  {t("moveInformation.email")}
                  <span className="text-red-500 text-[14px] ml-[4px]">*</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  type="email"
                  className="h-[45px] w-full border-[#e3e3e3] font-light border-[1px] outline-none p-[8px] rounded-[8px] "
                />
              </div>
              <div className="flex mb-[10px] flex-col">
                <label className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                  {t("moveInformation.phone")}
                  <span className="text-red-500 text-[14px] ml-[4px]">*</span>
                </label>
                <input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter Your Phone Number"
                  type="number"
                  className="h-[45px] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-full border-[#e3e3e3] font-light border-[1px] outline-none p-[8px] rounded-[8px] "
                />
              </div>
            </div>
          </div>

          <div>
            <div className="border-[#e3e3e3] mb-6 border-b-[1px] pb-4  ">
              <p className="font-sans text-[#136AB5] text-[18px] font-bold ">
                {t("moveInformation.pickup")}
              </p>

              {/* FROM Address with Photon Search */}
              {isPickUpDetailsOpen && (
                <div className="mt-6">
                  <div className="relative  mb-4">
                    <div className="w-[100%] h-[68px]  locationFrom rounded-[8px] border-[1px] px-[16px] flex items-center justify-between border-[#e3e3e3] ">
                      <div className="flex items-center flex-1">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2C14.3869 2 16.6761 2.94821 18.364 4.63604C20.0518 6.32387 21 8.61305 21 11C21 14.074 19.324 16.59 17.558 18.395C16.6757 19.2871 15.7129 20.0958 14.682 20.811L14.256 21.101L14.056 21.234L13.679 21.474L13.343 21.679L12.927 21.921C12.6446 22.0822 12.3251 22.1669 12 22.1669C11.6749 22.1669 11.3554 22.0822 11.073 21.921L10.657 21.679L10.137 21.359L9.945 21.234L9.535 20.961C8.42283 20.2085 7.3869 19.3491 6.442 18.395C4.676 16.589 3 14.074 3 11C3 8.61305 3.94821 6.32387 5.63604 4.63604C7.32387 2.94821 9.61305 2 12 2ZM12 4C10.1435 4 8.36301 4.7375 7.05025 6.05025C5.7375 7.36301 5 9.14348 5 11C5 13.322 6.272 15.36 7.871 16.996C8.55853 17.692 9.30166 18.3308 10.093 18.906L10.551 19.232C10.699 19.3353 10.8413 19.4313 10.978 19.52L11.368 19.77L11.711 19.979L12 20.148L12.455 19.879L12.822 19.649C13.0173 19.525 13.2263 19.386 13.449 19.232L13.907 18.906C14.6983 18.3308 15.4415 17.692 16.129 16.996C17.728 15.361 19 13.322 19 11C19 9.14348 18.2625 7.36301 16.9497 6.05025C15.637 4.7375 13.8565 4 12 4ZM12 7C13.0609 7 14.0783 7.42143 14.8284 8.17157C15.5786 8.92172 16 9.93913 16 11C16 12.0609 15.5786 13.0783 14.8284 13.8284C14.0783 14.5786 13.0609 15 12 15C10.9391 15 9.92172 14.5786 9.17157 13.8284C8.42143 13.0783 8 12.0609 8 11C8 9.93913 8.42143 8.92172 9.17157 8.17157C9.92172 7.42143 10.9391 7 12 7ZM12 9C11.4696 9 10.9609 9.21071 10.5858 9.58579C10.2107 9.96086 10 10.4696 10 11C10 11.5304 10.2107 12.0391 10.5858 12.4142C10.9609 12.7893 11.4696 13 12 13C12.5304 13 13.0391 12.7893 13.4142 12.4142C13.7893 12.0391 14 11.5304 14 11C14 10.4696 13.7893 9.96086 13.4142 9.58579C13.0391 9.21071 12.5304 9 12 9Z"
                              fill="#12B981"
                            />
                          </svg>
                          <p className="text-[#b8b8b8] ml-2 font-light font-sans text-[16px] leading-[25.6px] ">
                            {t("moveInformation.from")}
                            <span className="text-red-500 text-[14px] ml-[4px]">
                              *
                            </span>
                          </p>
                        </div>
                        <div className="flex w-[80%] flex-1 relative">
                          <p className="text-[#b8b8b8] ml-2 font-light font-sans text-[16px]">
                            -
                          </p>
                          {isEditingFrom ? (
                            <input
                              ref={fromInputRef}
                              type="text"
                              value={fromLocation}
                              onChange={handleFromInputChange}
                              onBlur={handleFromBlur}
                              onKeyDown={(e) => handleKeyDown(e, "from")}
                              className="text-[#707070] ml-2 font-sans text-[16px] fromTxt leading-[25.6px] bg-transparent outline-none flex-1 min-w-0"
                              placeholder="Search places... (min 3 chars)"
                            />
                          ) : (
                            <p className="text-[#707070] ml-2 font-sans text-[16px] fromTxt line-clamp-2 leading-[25.6px] w-[300px] truncate ">
                              {fromLocation}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={handleFromChange}
                        className="text-[#3C82F6]  hover:bg-primary py-1 px-2 hover:text-white rounded-[20px] cursor-pointer text-[10px] text-manrope font-light ml-2"
                      >
                        {t("moveInformation.btn")}
                      </button>
                    </div>

                    <SuggestionsDropdown
                      suggestions={fromSuggestions}
                      show={showFromSuggestions}
                      isLoading={isSearchingFrom}
                      onSelect={handleAddressSelect}
                      type="from"
                    />
                  </div>

                  <div className="flex mt-4 mb-5 justify-between  items-center apartmentNumberContainer ">
                    {/* <div className="flex  w-[35%] mb-[10px] flex-col">
                      <label className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                        {t("moveInformation.apartment1")}
                      </label>
                      <input
                        value={pickUpAddressNumber}
                        onChange={(e) => setPickUpAddressNumber(e.target.value)}
                        placeholder={t("moveInformation.apartment1")}
                        type="number"
                        min={0}
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "e" || e.key === "E") {
                            e.preventDefault();
                          }
                        }}
                        className="h-[45px] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-full border-[#e3e3e3] font-light border-[1px] outline-none p-[8px] rounded-[8px] "
                      />
                    </div> */}
                    <div className="flex w-full mb-[10px] flex-col">
                      <label className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                        {t("moveInformation.remark1")}
                      </label>
                      <input
                        value={fromRemark}
                        onChange={(e) => setFromRemark(e.target.value)}
                        placeholder={t("moveInformation.remark1")}
                        type="text"
                        className="h-[45px]  border-[#e3e3e3] font-light border-[1px] outline-none p-[8px] rounded-[8px] "
                      />
                    </div>
                  </div>

                  <div className="border-[#e3e3e3] border-[1px] rounded-[12px] p-5 ">
                    <div className="flex justify-between items-center ">
                      <div className="flex items-center">
                        <p className="font-sans text-[#136AB5] text-[16px] ">
                          {t("moveInformation.restrictions")}
                        </p>
                        {!isRestrictionsOpen && (
                          <div className="flex contactInfoItems items-center ml-3">
                            <p className="font-sans text-[14px] mr-2 ">
                              Number of Floors
                            </p>{" "}
                            <div className="w-[6px] h-[6px] mr-2 rounded-full bg-[#9E9E9E] " />
                            <p className="font-sans text-[14px] mr-2  ">
                              Elevator etc
                            </p>{" "}
                          </div>
                        )}
                      </div>
                      <div className="flex" onClick={toggleRestrictions}>
                        {!isRestrictionsOpen ? (
                          <div className="group flex items-center border-[#e3e3e3] justify-center border-[1px] rounded-full h-[32px] w-[32px] hover:bg-[#248CD9] cursor-pointer">
                            <IoIosArrowDown className="text-black group-hover:text-white" />
                          </div>
                        ) : (
                          <div className="group flex items-center border-[#e3e3e3] justify-center border-[1px] rounded-full h-[32px] w-[32px] hover:bg-[#248CD9] cursor-pointer">
                            <IoIosArrowUp className="text-black group-hover:text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    {isRestrictionsOpen && (
                      <div className="">
                        <div className="flex mt-4 mb-1 justify-between  items-center apartmentNumberContainer">
                          <div className="flex  w-full mb-[10px] flex-col">
                            <label className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                              {t("moveInformation.floors1")}
                            </label>
                            <input
                              value={fromNumberOfFloors}
                              onChange={(e) =>
                                setFromNumberOfFloors(e.target.value)
                              }
                              placeholder={t("moveInformation.floors1")}
                              type="number"
                              min={0}
                              onKeyDown={(e) => {
                                if (
                                  e.key === "-" ||
                                  e.key === "e" ||
                                  e.key === "+" ||
                                  e.key === "E"
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              className="h-[45px] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-full border-[#e3e3e3] font-light border-[1px] outline-none p-[8px] rounded-[8px] "
                            />
                          </div>
                        </div>
                        <div className="mb-2 elevatorContainer flex">
                          <div className="flex eleInnerBox w-full mb-[10px] mr-4 flex-col">
                            <p className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                              {t("moveInformation.elevator1")}
                            </p>
                            <div className="flex w-full elevatorQuestionBox h-[45px] border-[1px] rounded-[8px] border-[#e3e3e3] items-center">
                              <label
                                htmlFor="yes"
                                className="w-[50%] cursor-pointer h-full"
                                onClick={() => handleFromElevator("yes")}
                              >
                                <div
                                  className={`flex w-[100%] ${fromElevatorYes ? "bg-[#E4F0FC]" : ""
                                    } rounded-tl-[8px] rounded-bl-[8px] h-full border-r-[1px] justify-center border-[#e3e3e3] items-center `}
                                >
                                  <input
                                    type="radio"
                                    name="elevator"
                                    id="yes"
                                    checked={fromHasElevator === true}
                                    onChange={() => setFromHasElevator(true)}
                                  />
                                  <span className=" text-[#136AB5] font-sans ml-1">
                                    {t("moveInformation.yes")}
                                  </span>
                                </div>
                              </label>
                              <label
                                onClick={() => handleFromElevator("no")}
                                htmlFor="no"
                                className="w-[50%] cursor-pointer h-full"
                              >
                                <div
                                  className={`flex items-center justify-center h-full w-[100%] ${fromElevatorNo ? "bg-[#E4F0FC]" : ""
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name="elevator"
                                    id="no"
                                    checked={fromHasElevator === false}
                                    onChange={() => setFromHasElevator(false)}
                                  />
                                  <label className="ml-1">
                                    {t("moveInformation.no")}
                                  </label>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="flex w-[100%] mb-[10px] flex-col">
                            <p className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                              {t("moveInformation.shuttle1")}
                            </p>
                            <div className="flex w-full elevatorQuestionBox h-[45px] border-[1px] rounded-[8px] border-[#e3e3e3] items-center">
                              <label
                                onClick={() => handleFromNeedShuttle("yes")}
                                className="w-full cursor-pointer h-full"
                                htmlFor="needShuttle_yes"
                              >
                                <div
                                  className={`flex w-[100%] ${fromNeedShuttleYes ? "bg-[#E4F0FC]" : ""
                                    } rounded-tl-[8px] rounded-bl-[8px] h-full border-r-[1px] justify-center border-[#e3e3e3] items-center `}
                                >
                                  <input
                                    type="radio"
                                    name="from_shuttle"
                                    id="needShuttle_yes"
                                    checked={fromNeedShuttle === true}
                                    onChange={() => setFromNeedShuttle(true)}
                                  />
                                  <span className=" text-[#136AB5] font-sans ml-1">
                                    {t("moveInformation.yes")}
                                  </span>
                                </div>
                              </label>
                              <label
                                onClick={() => handleFromNeedShuttle("no")}
                                className="w-full cursor-pointer h-full"
                                htmlFor="needShuttle_no"
                              >
                                <div
                                  className={`flex items-center justify-center h-full w-[100%] ${fromNeedShuttleNo ? "bg-[#E4F0FC]" : ""
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name="from_shuttle"
                                    id="needShuttle_no"
                                    checked={fromNeedShuttle === false}
                                    onChange={() => setFromNeedShuttle(false)}
                                  />
                                  <span className="ml-1">
                                    {t("moveInformation.no")}
                                  </span>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3 elevatorContainer flex">
                          <div className="flex w-full eleInnerBox mb-[10px] mr-4 flex-col">
                            <p className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                              {t("moveInformation.insurance1")}
                            </p>
                            <div className="flex w-full elevatorQuestionBox h-[45px] border-[1px] rounded-[8px] border-[#e3e3e3] items-center">
                              <label
                                onClick={() =>
                                  handleFromBuildingInsurance("yes")
                                }
                                htmlFor="insurance_yes"
                                className="w-full cursor-pointer h-full"
                              >
                                <div
                                  className={`flex w-[100%] ${fromBuildingInsuranceYes
                                      ? "bg-[#E4F0FC]"
                                      : ""
                                    } rounded-tl-[8px] rounded-bl-[8px] h-full border-r-[1px] justify-center border-[#e3e3e3] items-center `}
                                >
                                  <input
                                    type="radio"
                                    name="insurance"
                                    id="insurance_yes"
                                    checked={fromHasBuildingInsurance === true}
                                    onChange={() =>
                                      setFromHasBuildingInsurance(true)
                                    }
                                  />
                                  <span className=" text-[#136AB5] font-sans ml-1">
                                    {t("moveInformation.yes")}
                                  </span>
                                </div>
                              </label>
                              <label
                                htmlFor="insurance_no"
                                onClick={() =>
                                  handleFromBuildingInsurance("no")
                                }
                                className="w-[100%] cursor-pointer h-full"
                              >
                                <div
                                  className={`flex items-center justify-center h-full w-[100%] ${fromBuildingInsuranceNo
                                      ? "bg-[#E4F0FC]"
                                      : ""
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name="insurance"
                                    id="insurance_no"
                                    checked={fromHasBuildingInsurance === false}
                                    onChange={() =>
                                      setFromHasBuildingInsurance(false)
                                    }
                                  />
                                  <span className="ml-1">
                                    {t("moveInformation.no")}
                                  </span>
                                </div>
                              </label>
                            </div>
                          </div>
                          <div className="flex w-full mb-[10px] flex-col">
                            <p className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                              {t("moveInformation.needHelp1")}
                            </p>
                            <div className="flex w-full elevatorQuestionBox h-[45px] border-[1px] rounded-[8px] border-[#e3e3e3] items-center">
                              <label
                                onClick={() => handleFromNeedHelpPacking("yes")}
                                htmlFor="need_help_yes"
                                className="w-[50%] cursor-pointer h-full"
                              >
                                <div
                                  className={`flex w-[100%] ${fromNeedHelpPackingYes ? "bg-[#E4F0FC]" : ""
                                    } rounded-tl-[8px] rounded-bl-[8px] h-full border-r-[1px] justify-center border-[#e3e3e3] items-center `}
                                >
                                  <input
                                    type="radio"
                                    name="from_need_help"
                                    id="need_help_yes"
                                    checked={fromNeedHelpPacking === true}
                                    onChange={() =>
                                      setFromNeedHelpPacking(true)
                                    }
                                  />
                                  <span className=" text-[#136AB5] font-sans ml-1">
                                    {t("moveInformation.yes")}
                                  </span>
                                </div>
                              </label>
                              <label
                                onClick={() => handleFromNeedHelpPacking("no")}
                                htmlFor="need_help_no"
                                className="w-[50%] cursor-pointer h-full"
                              >
                                <div
                                  className={`flex items-center justify-center h-full w-[100%] ${fromNeedHelpPackingNo ? "bg-[#E4F0FC]" : ""
                                    }`}
                                >
                                  <input
                                    type="radio"
                                    name="from_need_help"
                                    id="need_help_no"
                                    checked={fromNeedHelpPacking === false}
                                    onChange={() =>
                                      setFromNeedHelpPacking(false)
                                    }
                                  />
                                  <span className="ml-1">
                                    {t("moveInformation.no")}
                                  </span>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* TO Address with Photon Search */}
            <div className="border-[#e3e3e3] border-b-[1px] pb-4 ">
              <p className="font-sans text-[#136AB5] text-[18px] font-bold ">
                {t("moveInformation.dropOffDetails")}
              </p>

              {isDropOffDetailsOpen && (
                <div>
                  <div className="relative mt-4">
                    <div className="w-full h-[68px] rounded-[8px] locationFrom border-[1px] px-[16px] flex items-center justify-between border-[#e3e3e3] ">
                      <div className="flex items-center flex-1">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2C14.3869 2 16.6761 2.94821 18.364 4.63604C20.0518 6.32387 21 8.61305 21 11C21 14.074 19.324 16.59 17.558 18.395C16.6757 19.2871 15.7129 20.0958 14.682 20.811L14.256 21.101L14.056 21.234L13.679 21.474L13.343 21.679L12.927 21.921C12.6446 22.0822 12.3251 22.1669 12 22.1669C11.6749 22.1669 11.3554 22.0822 11.073 21.921L10.657 21.679L10.137 21.359L9.945 21.234L9.535 20.961C8.42283 20.2085 7.3869 19.3491 6.442 18.395C4.676 16.589 3 14.074 3 11C3 8.61305 3.94821 6.32387 5.63604 4.63604C7.32387 2.94821 9.61305 2 12 2ZM12 4C10.1435 4 8.36301 4.7375 7.05025 6.05025C5.7375 7.36301 5 9.14348 5 11C5 13.322 6.272 15.36 7.871 16.996C8.55853 17.692 9.30166 18.3308 10.093 18.906L10.551 19.232C10.699 19.3353 10.8413 19.4313 10.978 19.52L11.368 19.77L11.711 19.979L12 20.148L12.455 19.879L12.822 19.649C13.0173 19.525 13.2263 19.386 13.449 19.232L13.907 18.906C14.6983 18.3308 15.4415 17.692 16.129 16.996C17.728 15.361 19 13.322 19 11C19 9.14348 18.2625 7.36301 16.9497 6.05025C15.637 4.7375 13.8565 4 12 4ZM12 7C13.0609 7 14.0783 7.42143 14.8284 8.17157C15.5786 8.92172 16 9.93913 16 11C16 12.0609 15.5786 13.0783 14.8284 13.8284C14.0783 14.5786 13.0609 15 12 15C10.9391 15 9.92172 14.5786 9.17157 13.8284C8.42143 13.0783 8 12.0609 8 11C8 9.93913 8.42143 8.92172 9.17157 8.17157C9.92172 7.42143 10.9391 7 12 7ZM12 9C11.4696 9 10.9609 9.21071 10.5858 9.58579C10.2107 9.96086 10 10.4696 10 11C10 11.5304 10.2107 12.0391 10.5858 12.4142C10.9609 12.7893 11.4696 13 12 13C12.5304 13 13.0391 12.7893 13.4142 12.4142C13.7893 12.0391 14 11.5304 14 11C14 10.4696 13.7893 9.96086 13.4142 9.58579C13.0391 9.21071 12.5304 9 12 9Z"
                              fill="#DE2527"
                            />
                          </svg>
                          <p className="text-[#b8b8b8] ml-2 font-light font-sans text-[16px] leading-[25.6px] ">
                            {t("moveInformation.to")}
                            <span className="text-red-500 text-[14px] ml-[4px]">
                              *
                            </span>
                          </p>
                        </div>
                        <div className="flex w-[80%] flex-1">
                          <p className="text-[#b8b8b8] ml-2 font-light font-sans text-[16px]">
                            -
                          </p>
                          {isEditingTo ? (
                            <input
                              ref={toInputRef}
                              type="text"
                              value={toLocation}
                              onChange={handleToInputChange}
                              onBlur={handleToBlur}
                              onKeyDown={(e) => handleKeyDown(e, "to")}
                              className="text-[#707070] ml-2 font-sans text-[16px] fromTxt leading-[25.6px] bg-transparent outline-none flex-1 min-w-0"
                              placeholder="Search places... (min 3 chars)"
                            />
                          ) : (
                            <p className="text-[#707070] ml-2 fromLocationText line-clamp-2 truncate font-sans text-[16px] w-[300px] fromTxt leading-[25.6px]">
                              {toLocation}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={handleToChange}
                        className="text-[#3C82F6] hover:bg-primary py-1 px-2 hover:text-white rounded-[20px] cursor-pointer text-[10px] text-manrope font-light ml-2"
                      >
                        {t("moveInformation.btn")}
                      </button>
                    </div>

                    <SuggestionsDropdown
                      suggestions={toSuggestions}
                      show={showToSuggestions}
                      isLoading={isSearchingTo}
                      onSelect={handleAddressSelect}
                      type="to"
                    />
                  </div>

                  <div className="flex mt-4 mb-5 justify-between  items-center apartmentNumberContainer ">
                    {/* <div className="flex  w-[35%] mb-[10px] flex-col">
                      <label className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                        {t("moveInformation.apartment1")}
                      </label>
                      <input
                        value={dropOffAddressNumber}
                        onChange={(e) =>
                          setDropOffAddressNumber(e.target.value)
                        }
                        placeholder={t("moveInformation.apartment1")}
                        type="number"
                        min={0}
                        onKeyDown={(e) => {
                          if (
                            e.key === "-" ||
                            e.key === "e" ||
                            e.key === "+" ||
                            e.key === "E"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        className="h-[45px] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-full border-[#e3e3e3] font-light border-[1px] outline-none p-[8px] rounded-[8px] "
                      />
                    </div> */}
                    <div className="flex w-full mb-[10px] flex-col">
                      <label className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                        {t("moveInformation.remark1")}
                      </label>
                      <input
                        value={toRemark}
                        onChange={(e) => setToRemark(e.target.value)}
                        placeholder={t("moveInformation.remark1")}
                        type="text"
                        className="h-[45px]  border-[#e3e3e3] font-light border-[1px] outline-none p-[8px] rounded-[8px] "
                      />
                    </div>
                  </div>
                  <div>
                    <div className="border-[#e3e3e3] border-[1px] rounded-[12px] p-5 ">
                      <div className="flex justify-between items-center ">
                        <div className="flex items-center">
                          <p className="font-sans text-[#136AB5] text-[16px] ">
                            {t("moveInformation.restrictions")}
                          </p>
                          {!isRestrictionsOpen2 && (
                            <div className="flex contactInfoItems items-center ml-2">
                              <p className="font-sans text-[14px] mr-2 ">
                                Number of Floors
                              </p>{" "}
                              <div className="w-[6px] h-[6px] mr-2 rounded-full bg-[#9E9E9E] " />
                              <p className="font-sans text-[14px] mr-2  ">
                                Elevator etc
                              </p>{" "}
                            </div>
                          )}
                        </div>
                        <div className="flex" onClick={toggleRestrictions2}>
                          {!isRestrictionsOpen2 ? (
                            <div className="group flex items-center border-[#e3e3e3] justify-center border-[1px] rounded-full h-[32px] w-[32px] hover:bg-[#248CD9] cursor-pointer">
                              <IoIosArrowDown className="text-black group-hover:text-white" />
                            </div>
                          ) : (
                            <div className="group flex items-center border-[#e3e3e3] justify-center border-[1px] rounded-full h-[32px] w-[32px] hover:bg-[#248CD9] cursor-pointer">
                              <IoIosArrowUp className="text-black group-hover:text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                      {isRestrictionsOpen2 && (
                        <div className="">
                          <div className="flex mt-4 mb-1 justify-between  items-center apartmentNumberContainer">
                            <div className="flex  w-full mb-[10px] flex-col">
                              <label className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                                {t("moveInformation.floors1")}
                              </label>
                              <input
                                value={toNumberOfFloors}
                                onChange={(e) =>
                                  setToNumberOfFloors(e.target.value)
                                }
                                placeholder={t("moveInformation.floors1")}
                                type="number"
                                min={0}
                                onKeyDown={(e) => {
                                  if (
                                    e.key === "-" ||
                                    e.key === "e" ||
                                    e.key === "+" ||
                                    e.key === "E"
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                                className="h-[45px] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-full border-[#e3e3e3] font-light border-[1px] outline-none p-[8px] rounded-[8px] "
                              />
                            </div>
                          </div>
                          <div className="mb-2  elevatorContainer flex">
                            <div className="flex w-full eleInnerBox mb-[10px] mr-4 flex-col">
                              <p className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                                {t("moveInformation.elevator1")}
                              </p>
                              <div className="flex w-full elevatorQuestionBox h-[45px] border-[1px] rounded-[8px] border-[#e3e3e3] items-center">
                                <label
                                  onClick={() => handleToElevator("yes")}
                                  htmlFor="elevator_yes"
                                  className="w-[50%] cursor-pointer h-full"
                                >
                                  <div
                                    className={`flex w-[100%] ${toElevatorYes ? "bg-[#E4F0FC]" : ""
                                      } rounded-tl-[8px] rounded-bl-[8px] h-full border-r-[1px] justify-center border-[#e3e3e3] items-center `}
                                  >
                                    <input
                                      type="radio"
                                      name="to_elevator"
                                      id="elevator_yes"
                                      checked={toHasElevator === true}
                                      onChange={() => setToHasElevator(true)}
                                    />
                                    <span className=" text-[#136AB5] font-sans ml-1">
                                      {t("moveInformation.yes")}
                                    </span>
                                  </div>
                                </label>
                                <label
                                  onClick={() => handleToElevator("no")}
                                  htmlFor="elevator_no"
                                  className="w-[50%] cursor-pointer h-full"
                                >
                                  <div
                                    className={`flex items-center justify-center h-full w-[100%] ${toElevatorNo ? "bg-[#E4F0FC]" : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="to_elevator"
                                      id="elevator_no"
                                      checked={toHasElevator === false}
                                      onChange={() => setToHasElevator(false)}
                                    />
                                    <span className="ml-1">
                                      {t("moveInformation.no")}
                                    </span>
                                  </div>
                                </label>
                              </div>
                            </div>
                            <div className="flex w-full mb-[10px] flex-col">
                              <p className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                                {t("moveInformation.shuttle1")}
                              </p>
                              <div className="flex w-full elevatorQuestionBox h-[45px] border-[1px] rounded-[8px] border-[#e3e3e3] items-center">
                                <label
                                  onClick={() => handleToNeedShuttle("yes")}
                                  htmlFor="need_to_Shuttle_yes"
                                  className="w-[50%] cursor-pointer h-full"
                                >
                                  <div
                                    className={`flex w-[100%] ${toNeedShuttleYes ? "bg-[#E4F0FC]" : ""
                                      } rounded-tl-[8px] rounded-bl-[8px] h-full border-r-[1px] justify-center border-[#e3e3e3] items-center `}
                                  >
                                    <input
                                      type="radio"
                                      name="to_shuttle"
                                      id="need_to_Shuttle_yes"
                                      checked={toNeedShuttle === true}
                                      onChange={() => setToNeedShuttle(true)}
                                    />
                                    <span className=" text-[#136AB5] font-sans ml-1">
                                      {t("moveInformation.yes")}
                                    </span>
                                  </div>
                                </label>
                                <label
                                  onClick={() => handleToNeedShuttle("no")}
                                  htmlFor="need_to_Shuttle_no"
                                  className="w-[50%] cursor-pointer h-full"
                                >
                                  <div
                                    className={`flex items-center justify-center h-full w-[100%] ${toNeedShuttleNo ? "bg-[#E4F0FC]" : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="to_shuttle"
                                      id="need_to_Shuttle_no"
                                      checked={toNeedShuttle === false}
                                      onChange={() => setToNeedShuttle(false)}
                                    />
                                    <span className="ml-1">
                                      {t("moveInformation.no")}
                                    </span>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="mb-3 elevatorContainer flex">
                            <div className="flex w-full eleInnerBox mb-[10px] mr-4 flex-col">
                              <p className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                                {t("moveInformation.insurance1")}
                              </p>
                              <div className="flex w-full elevatorQuestionBox h-[45px] border-[1px] rounded-[8px] border-[#e3e3e3] items-center">
                                <label
                                  onClick={() =>
                                    handleToBuildingInsurance("yes")
                                  }
                                  htmlFor="to_insurance_yes"
                                  className="w-[50%] cursor-pointer h-full"
                                >
                                  <div
                                    className={`flex w-[100%] ${toBuildingInsuranceYes
                                        ? "bg-[#E4F0FC]"
                                        : ""
                                      } rounded-tl-[8px] rounded-bl-[8px] h-full border-r-[1px] justify-center border-[#e3e3e3] items-center `}
                                  >
                                    <input
                                      type="radio"
                                      name="to_insurance"
                                      id="to_insurance_yes"
                                      checked={toHasBuildingInsurance === true}
                                      onChange={() =>
                                        setToHasBuildingInsurance(true)
                                      }
                                    />
                                    <span className=" text-[#136AB5] font-sans ml-1">
                                      {t("moveInformation.yes")}
                                    </span>
                                  </div>
                                </label>
                                <label
                                  onClick={() =>
                                    handleToBuildingInsurance("no")
                                  }
                                  htmlFor="to_insurance_no"
                                  className="w-[50%] cursor-pointer h-full"
                                >
                                  <div
                                    className={`flex items-center justify-center h-full w-[100%] ${toBuildingInsuranceNo
                                        ? "bg-[#E4F0FC]"
                                        : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="to_insurance"
                                      id="to_insurance_no"
                                      checked={toHasBuildingInsurance === false}
                                      onChange={() =>
                                        setToHasBuildingInsurance(false)
                                      }
                                    />
                                    <span className="ml-1">
                                      {t("moveInformation.no")}
                                    </span>
                                  </div>
                                </label>
                              </div>
                            </div>
                            <div className="flex w-full mb-[10px] flex-col">
                              <p className="text-[#2c2c2c] mb-1 font-sans text-[14px] ">
                                {t("moveInformation.needHelp1")}
                              </p>
                              <div className="flex w-full elevatorQuestionBox h-[45px] border-[1px] rounded-[8px] border-[#e3e3e3] items-center">
                                <label
                                  htmlFor="need_help_to_yes"
                                  onClick={() => handleToNeedHelpPacking("yes")}
                                  className="w-[50%] cursor-pointer h-full"
                                >
                                  <div
                                    className={`flex w-[100%] ${toNeedHelpPackingYes ? "bg-[#E4F0FC]" : ""
                                      } rounded-tl-[8px] rounded-bl-[8px] h-full border-r-[1px] justify-center border-[#e3e3e3] items-center `}
                                  >
                                    <input
                                      type="radio"
                                      name="to_need_help"
                                      id="need_help_to_yes"
                                      checked={toNeedHelpPacking === true}
                                      onChange={() =>
                                        setToNeedHelpPacking(true)
                                      }
                                    />
                                    <span className=" text-[#136AB5] font-sans ml-1">
                                      {t("moveInformation.yes")}
                                    </span>
                                  </div>
                                </label>
                                <label
                                  onClick={() => handleToNeedHelpPacking("no")}
                                  htmlFor="need_help_to_no"
                                  className="w-[50%] cursor-pointer h-full"
                                >
                                  <div
                                    className={`flex items-center justify-center h-full w-[100%] ${toNeedHelpPackingNo ? "bg-[#E4F0FC]" : ""
                                      }`}
                                  >
                                    <input
                                      type="radio"
                                      name="to_need_help"
                                      id="need_help_to_no"
                                      checked={toNeedHelpPacking === false}
                                      onChange={() =>
                                        setToNeedHelpPacking(false)
                                      }
                                    />
                                    <span className="ml-1">
                                      {t("moveInformation.no")}
                                    </span>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-6 ">
          <div className="flex mb-3 items-center">
            <input
              type="checkbox"
              name="termsAndCondition"
              className="h-[20px] w-[20px]"
              id="termsAndConditionLabel"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <label
              id="termsAndConditionLabel"
              className="text-[#2c2c2c] ml-2 font-sans text-[14px]"
            >
              <Link
                className="ml-1 text-[#136AB5] underline font-sans text-[14px]"
                to="/terms"
              >
                {t("moveInformation.termsCondition")}
              </Link>{" "}
              <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsAndCondition"
              className="h-[20px] w-[20px]"
              id="movigTips"
              checked={receivePromotions}
              onChange={(e) => setReceivePromotions(e.target.checked)}
            />
            <label
              id="movigTips"
              className="text-[#2c2c2c] ml-2 font-sans text-[14px]"
            >
              {t("moveInformation.receive")}{" "}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingInformation2;
