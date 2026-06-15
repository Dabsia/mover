import React, { useState, useRef, useEffect } from "react";
import LocationIcon from "../Assets/SVG/LocationIcon";
import DownIcon from "../Assets/SVG/DownIcon";
import MoveSize from "../Assets/SVG/MoveSize";
import PrimaryBtn from "./PrimaryBtn";
import { useNavigate } from "react-router-dom";
import { useMapsLibrary, useApiIsLoaded } from "@vis.gl/react-google-maps";
import { useDispatch } from "react-redux";
import { setHouseSize, setUserDetails } from "../redux/action";
import { useTranslation } from "react-i18next";

// Define libraries outside component to prevent reloading
const LIBRARIES = ["places"];

const MoveDetails = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  // State management
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [moveSize, setMoveSize] = useState("");
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState({ from: -1, to: -1 });

  // cords
  const [pickupName, setPickupName] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffName, setDropoffName] = useState("");
  const [dropoffCoords, setDropoffCoords] = useState(null);

  // Google Places suggestions
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  // Refs
  const fromModalRef = useRef(null);
  const toModalRef = useRef(null);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const locationItemsRef = useRef({ from: [], to: [] });
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  // Load Google Maps API & Places library
  const isLoaded = useApiIsLoaded();
  const placesLib = useMapsLibrary("places");
  const isPlacesLoaded = isLoaded && !!placesLib;

  // Size modal close handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        e.target !== inputRef.current
      ) {
        setShowSizeModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const houses = [
    { text: t("movingSize.fewItems"), desc: '(10" Truck)' },
    { text: t("movingSize.onebedroom"), desc: '(17" Truck)' },
    { text: t("movingSize.twobedroom"), desc: '(20" Truck)' },
    { text: t("movingSize.threebedroom"), desc: '(26" Truck)' },
    { text: t("movingSize.fourbedroom"), desc: '(28" Truck)' },
    { text: t("movingSize.fivebedroom"), desc: '(32" Truck)' },
    { text: t("movingSize.sixbedroom"), desc: '(36" Truck)' },
  ];

  const apartments = [
    { text: t("movingSize.fewItems"), desc: '(10" Truck)' },
    { text: t("movingSize.studio"), desc: '(15" Truck)' },
    { text: t("movingSize.onebedroom"), desc: '(17" Truck)' },
    { text: t("movingSize.twobedroom"), desc: '(20" Truck)' },
    { text: t("movingSize.threebedroom"), desc: '(26" Truck)' },
    { text: t("movingSize.fourbedroom"), desc: '(28" Truck)' },
    { text: t("movingSize.fivebedroom"), desc: '(32" Truck)' },
    { text: t("movingSize.sixbedroom"), desc: '(36" Truck)' },
  ];

  const storages = [
    "Small 2 x 4",
    "Small 5 x 5",
    "Small 5 x 10",
    "Small 5 x 15",
    "Small 10 x 20",
    "Small 10 x 30",
  ];

  const [activeMoveSizeTab, setActiveMoveSizeTab] = useState("house");

  // Tab content renderer
  const renderTabContent = () => {
    switch (activeMoveSizeTab) {
      case "house":
        return (
          <div className="p-3 overflow-y-auto h-[300px]">
            {houses.map((house, index) => (
              <div
                key={`house-${index}`}
                className="p-3 flex items-center border-b border-[#E3E2E0] hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setMoveSize(house.text);
                  setShowSizeModal(false);
                }}
              >
                <p className="font-sans text-[16px] leading-[25.6px] text-[#373737]">
                  {house.text}
                </p>
                <p className="text-[16px] ml-1 font-sans text-[#9e9e9e]">
                  {house.desc}
                </p>
              </div>
            ))}
          </div>
        );
      case "apartment":
        return (
          <div className="p-3 overflow-y-auto h-[300px]">
            {apartments.map((apartment, index) => (
              <div
                key={`apartment-${index}`}
                className="p-3 flex items-center border-b border-[#E3E2E0] hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setMoveSize(apartment.text);
                  setShowSizeModal(false);
                }}
              >
                <p className="font-sans text-[16px] leading-[25.6px] text-[#373737]">
                  {apartment.text}
                </p>
                <p className="text-[16px] ml-1 font-sans text-[#9e9e9e]">
                  {apartment.desc}
                </p>
              </div>
            ))}
          </div>
        );
      case "storage":
        return (
          <div className="p-3 overflow-y-auto h-[300px]">
            {storages.map((store, index) => (
              <div
                key={`storage-${index}`}
                className="p-3 flex items-center border-b border-[#E3E2E0] hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setMoveSize(store);
                  setShowSizeModal(false);
                }}
              >
                <p className="font-sans text-[16px] leading-[25.6px] text-[#373737]">
                  {store}
                </p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  // Handle input changes with Google Places autocomplete
  const handleInputChange = (type) => (e) => {
    const value = e.target.value;

    if (type === "from") {
      setFromLocation(value);
      setActiveIndex((prev) => ({ ...prev, from: -1 }));

      // Get Google Places predictions
      if (value.length >= 3 && placesLib) {
        const service = new placesLib.AutocompleteService();
        service.getPlacePredictions({ input: value }, (predictions, status) => {
          if (
            status === placesLib.PlacesServiceStatus.OK &&
            predictions
          ) {
            setFromSuggestions(predictions);
          } else {
            setFromSuggestions([]);
          }
        });
      } else {
        setFromSuggestions([]);
      }
    } else {
      setToLocation(value);
      setActiveIndex((prev) => ({ ...prev, to: -1 }));

      // Get Google Places predictions
      if (value.length >= 3 && placesLib) {
        const service = new placesLib.AutocompleteService();
        service.getPlacePredictions({ input: value }, (predictions, status) => {
          if (
            status === placesLib.PlacesServiceStatus.OK &&
            predictions
          ) {
            setToSuggestions(predictions);
          } else {
            setToSuggestions([]);
          }
        });
      } else {
        setToSuggestions([]);
      }
    }
  };

  const handleSelectLocation = (type) => (prediction) => {
    if (!placesLib) return;
    const service = new placesLib.PlacesService(
      document.createElement("div")
    );

    service.getDetails(
      {
        placeId: prediction.place_id,
        fields: ["name", "geometry", "formatted_address"],
      },
      (place, status) => {
        if (
          status === placesLib.PlacesServiceStatus.OK &&
          place
        ) {
          const locationData = {
            name: place.name,
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };

          console.log("Selected location:", type, locationData);

          if (type === "from") {
            setFromLocation(locationData.address);
            setShowFromModal(false);
            setFromSuggestions([]);

            // Save the name and coordinates
            setPickupName(locationData.name);
            setPickupCoords({ lat: locationData.lat, lng: locationData.lng });
          } else {
            setToLocation(locationData.address);
            setShowToModal(false);
            setToSuggestions([]);

            // Save the name and coordinates
            setDropoffName(locationData.name);
            setDropoffCoords({ lat: locationData.lat, lng: locationData.lng });
          }
        } else {
          console.error("Place details request failed:", status);
        }
      }
    );
  };

  const handleKeyDown = (type) => (e) => {
    const showModal = type === "from" ? showFromModal : showToModal;
    if (!showModal) return;

    const suggestions = type === "from" ? fromSuggestions : toSuggestions;
    const activeIdx = type === "from" ? activeIndex.from : activeIndex.to;
    const setActive = (idx) =>
      setActiveIndex((prev) => ({ ...prev, [type]: idx }));

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive(Math.min(activeIdx + 1, suggestions.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive(Math.max(activeIdx - 1, -1));
        break;
      case "Enter":
        if (activeIdx >= 0) {
          e.preventDefault();
          handleSelectLocation(type)(suggestions[activeIdx]);
        }
        break;
      case "Escape":
        type === "from" ? setShowFromModal(false) : setShowToModal(false);
        break;
    }
  };

  // Scroll active item into view
  useEffect(() => {
    ["from", "to"].forEach((type) => {
      const activeIdx = type === "from" ? activeIndex.from : activeIndex.to;
      if (activeIdx >= 0 && locationItemsRef.current[type][activeIdx]) {
        locationItemsRef.current[type][activeIdx]?.scrollIntoView({
          block: "nearest",
        });
      }
    });
  }, [activeIndex.from, activeIndex.to]);

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showFromModal &&
        fromModalRef.current &&
        !fromModalRef.current.contains(e.target)
      ) {
        if (e.target !== fromInputRef.current) setShowFromModal(false);
      }
      if (
        showToModal &&
        toModalRef.current &&
        !toModalRef.current.contains(e.target)
      ) {
        if (e.target !== toInputRef.current) setShowToModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFromModal, showToModal]);

  // Modal renderer
  const renderLocationModal = (type) => {
    const showModal = type === "from" ? showFromModal : showToModal;
    const suggestions = type === "from" ? fromSuggestions : toSuggestions;
    const activeIdx = type === "from" ? activeIndex.from : activeIndex.to;

    return (
      showModal && (
        <div
          ref={type === "from" ? fromModalRef : toModalRef}
          className="w-[400px] max-h-[300px] fromAndToContainer overflow-y-auto bg-white absolute top-[80px] border border-gray-200 rounded-[12px] left-0 shadow-lg z-50"
        >
          <p className="text-[#3C82F6] px-3 mb-1 pt-3 font-sans text-[12px]">
            Suggested Destinations
          </p>
          {suggestions.length > 0 ? (
            suggestions.map((prediction, index) => (
              <div
                key={prediction.place_id}
                ref={(el) => (locationItemsRef.current[type][index] = el)}
                className={`p-3 border-b-[1px] border-[#E3E2E0] hover:bg-gray-100 cursor-pointer ${index === activeIdx ? "bg-blue-50" : ""
                  }`}
                onClick={() => handleSelectLocation(type)(prediction)}
              >
                <p className="font-sans text-[16px] leading-[25.6px] text-[#373737]">
                  {prediction.structured_formatting.main_text}
                </p>
                <p className="text-[12px] font-sans text-[#9e9e9e]">
                  {prediction.structured_formatting.secondary_text}
                </p>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">
              {type === "from"
                ? fromLocation
                : toLocation
                  ? "No locations found"
                  : "Type at least 3 characters"}
            </div>
          )}
        </div>
      )
    );
  };

  const data = {
    fromLocation,
    toLocation,
    moveSize,
  };

  const handlePress = () => {
    if (
      data.fromLocation === "" ||
      data.toLocation === "" ||
      data.moveSize === ""
    )
      return;

    dispatch(
      setUserDetails({
        pickUpAddress: pickupName,
        pickUpLatitude: pickupCoords?.lat,
        pickUpLongitude: pickupCoords?.lng,
        dropOffAddress: dropoffName,
        dropOffLatitude: dropoffCoords?.lat,
        dropOffLongitude: dropoffCoords?.lng,
      })
    );
    dispatch(setHouseSize(moveSize));
    navigate("/quote", { state: { data } });
  };

  if (!isPlacesLoaded) {
    return <div></div>;
  }

  return (
    <div className="w-[90vw] mt-16 moveDetails bg-gradient-to-br rounded-[20px] flex justify-center items-center p-8 from-[#1A7BC6] to-[#054D96] max-w-[1500px] mx-auto h-fit">
      <div className="md:w-[90%] w-full">
        <div className="bg-[#136AB5] flex justify-center w-fit mx-auto items-center rounded-[100px] p-3">
          <p className="text-white font-sans text-[14px]">
            {t("hero.getQuote")}
          </p>
        </div>
        <h2 className="font-unbounded moveDetailsText text-white text-center font-bold my-2 text-[32px]">
          {t("features.smarterTitle")}
        </h2>
        <p className="font-sans moveDetailsDesc w-[60%] mx-auto text-center text-[18px] text-[#BCDFF6]">
          {t("features.smarterDescription")}
        </p>

        <div className="w-full bg-white my-4 h-[80px] moveDetailsCtaContainer rounded-[10px] flex">
          {/* Moving From Input */}
          <div className="w-[28%] moveDetailsBtnBox relative flex justify-between border-r-2 border-[#E3E2E0] p-3 items-center">
            <div className="flex w-[90%] items-center">
              <div className="mr-[8px]">
                <LocationIcon color="#12B981" />
              </div>
              <input
                ref={fromInputRef}
                value={fromLocation}
                onChange={handleInputChange("from")}
                onFocus={() => setShowFromModal(true)}
                onKeyDown={handleKeyDown("from")}
                placeholder={t("location.from")}
                className="font-sans w-full leading-[25.6px] font-light text-[#707070] border-none outline-none"
              />
            </div>
            <button onClick={() => setShowFromModal(true)}>
              <DownIcon />
            </button>
            {renderLocationModal("from")}
          </div>

          {/* Moving To Input */}
          <div className="w-[28%] moveDetailsBtnBox relative flex justify-between border-r-2 border-[#E3E2E0] p-3 items-center">
            <div className="flex w-[90%] items-center">
              <div className="mr-[8px]">
                <LocationIcon color="#DE2527" />
              </div>
              <input
                ref={toInputRef}
                value={toLocation}
                onChange={handleInputChange("to")}
                onFocus={() => setShowToModal(true)}
                onKeyDown={handleKeyDown("to")}
                placeholder={t("location.to")}
                className="font-sans w-full font-light text-[#707070] leading-[25.6px] border-none outline-none"
              />
            </div>
            <button onClick={() => setShowToModal(true)}>
              <DownIcon />
            </button>
            {renderLocationModal("to")}
          </div>

          {/* Moving Size Input */}
          <div className="w-[28%] moveDetailsBtnBox relative flex justify-between border-r-2 border-[#E3E2E0] p-3 items-center">
            <div className="flex w-[90%] items-center">
              <div className="mr-[8px]">
                <MoveSize />
              </div>
              <input
                ref={inputRef}
                value={moveSize}
                onFocus={() => setShowSizeModal(true)}
                placeholder={t("movingSize.movingSize")}
                className="font-sans w-full font-light text-[#707070] leading-[25.6px] border-none outline-none"
                readOnly
              />
            </div>
            <button onClick={() => setShowSizeModal(true)}>
              <DownIcon />
            </button>

            {showSizeModal && (
              <div
                ref={modalRef}
                className="w-[400px] max-h-[300px] fromAndToContainer overflow-y-auto bg-white absolute top-[80px] border border-gray-200 rounded-[12px] left-0 shadow-lg z-50"
              >
                <div className="p-3 flex items-center border-b-[1px] justify-between">
                  <button
                    onClick={() => setActiveMoveSizeTab("house")}
                    className={`${activeMoveSizeTab === "house"
                        ? "bg-[#F0F9FD] border-[1px]"
                        : ""
                      } w-[100px] p-2 rounded-[8px] border-[#BCDFF6] flex items-center`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <path
                        d="M8.38688 10.9739H13.3869M4.22021 14.1406V9.68389C4.22021 9.23889 4.22021 9.01639 4.27438 8.80889C4.32235 8.62548 4.40126 8.4516 4.50771 8.29473C4.62855 8.11723 4.79605 7.96973 5.13105 7.67723L9.13188 4.17556C9.75355 3.63223 10.0644 3.36056 10.4135 3.25723C10.7219 3.16556 11.051 3.16556 11.3594 3.25723C11.7094 3.36056 12.021 3.63223 12.6427 4.17723L16.6427 7.67723C16.9785 7.97056 17.1452 8.11723 17.266 8.29389C17.3727 8.45334 17.4505 8.625 17.4994 8.80889C17.5535 9.01639 17.5535 9.23889 17.5535 9.68389V14.1439C17.5535 15.0756 17.5535 15.5414 17.3719 15.8981C17.2117 16.2115 16.9565 16.4661 16.6427 16.6256C16.2869 16.8072 15.821 16.8072 14.8894 16.8072H6.88438C5.95271 16.8072 5.48605 16.8072 5.13021 16.6256C4.81675 16.466 4.56181 16.2113 4.40188 15.8981C4.22021 15.5406 4.22021 15.0739 4.22021 14.1406Z"
                        stroke={
                          activeMoveSizeTab === "house" ? "#136AB5" : "#9e9e9e"
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className={`${activeMoveSizeTab === "house"
                          ? "text-[#136AB5]"
                          : "text-[#9e9e9e]"
                        } ml-2 font-sans text-[14px]`}
                    >
                      {t("movingSize.house")}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveMoveSizeTab("apartment")}
                    className={`${activeMoveSizeTab === "apartment"
                        ? "bg-[#F0F9FD] border-[1px]"
                        : ""
                      } w-[150px] p-2 rounded-[8px] border-[#BCDFF6] flex items-center`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M1.88687 16.6406H16.8869M6.88687 5.80729H7.7202M6.88687 9.14062H7.7202M6.88687 12.474H7.7202M11.0535 5.80729H11.8869M11.0535 9.14062H11.8869M11.0535 12.474H11.8869M3.55354 16.6406V3.30729C3.55354 2.86526 3.72913 2.44134 4.04169 2.12878C4.35425 1.81622 4.77818 1.64063 5.2202 1.64062H13.5535C13.9956 1.64063 14.4195 1.81622 14.732 2.12878C15.0446 2.44134 15.2202 2.86526 15.2202 3.30729V16.6406"
                        stroke={
                          activeMoveSizeTab === "apartment"
                            ? "#136AB5"
                            : "#9e9e9e"
                        }
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className={`${activeMoveSizeTab === "apartment"
                          ? "text-[#136AB5]"
                          : "text-[#9e9e9e]"
                        } ml-2 font-sans text-[14px]`}
                    >
                      {t("movingSize.apartment")}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveMoveSizeTab("storage")}
                    className={`${activeMoveSizeTab === "storage"
                        ? "bg-[#F0F9FD] border-[1px]"
                        : ""
                      } w-[100px] p-2 rounded-[8px] border-[#BCDFF6] flex items-center`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="14"
                      viewBox="0 0 18 14"
                      fill="none"
                    >
                      <path
                        d="M8.88686 0.307129C4.30353 0.307129 0.553528 4.05713 0.553528 8.64046V13.6405H17.2202V8.64046C17.2202 4.05713 13.4702 0.307129 8.88686 0.307129ZM8.88686 1.9738C10.9952 1.9738 12.8702 2.9488 14.0952 4.4738H3.68686C4.90353 2.9488 6.77853 1.9738 8.88686 1.9738ZM5.55353 11.9738H2.22019V8.64046C2.22019 7.75713 2.39519 6.91546 2.70353 6.14046H5.55353V11.9738ZM10.5535 11.9738H7.22019V6.14046H10.5535V11.9738ZM15.5535 11.9738H12.2202V6.14046H15.0702C15.3785 6.91546 15.5535 7.75713 15.5535 8.64046V11.9738Z"
                        fill={
                          activeMoveSizeTab === "storage"
                            ? "#136AB5"
                            : "#9e9e9e"
                        }
                      />
                    </svg>
                    <span
                      className={`${activeMoveSizeTab === "storage"
                          ? "text-[#136AB5]"
                          : "text-[#9e9e9e]"
                        } ml-2 font-sans text-[14px]`}
                    >
                      {t("movingSize.storage")}
                    </span>
                  </button>
                </div>
                {renderTabContent()}
              </div>
            )}
          </div>

          {/* Get Quote Button */}
          <div className="w-[16%] flex justify-center p-3 moversBtnContainer items-center">
            <PrimaryBtn
              handlePress={handlePress}
              className="text-[14px] moversBtn"
            >
              {t("features.getStartedBtn")}
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoveDetails;
