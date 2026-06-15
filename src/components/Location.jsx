import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import LocationMap from "./LocationMap";
import { useMapsLibrary, useApiIsLoaded } from "@vis.gl/react-google-maps";
import { useQuery } from "@tanstack/react-query";
import { fetchProvince } from "../api/agentApi";
import MoveSize from "../Assets/SVG/MoveSize";
import DownIcon from "../Assets/SVG/DownIcon";
import { useDispatch } from "react-redux";
import { setUserItems } from "../redux/action";

// Define libraries outside component to prevent reloading
const LIBRARIES = ["places"];

const Location = ({
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
  setProvinceName,
  setErrMessage,
}) => {
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const { t } = useTranslation();

  const isLoaded = useApiIsLoaded();
  const placesLib = useMapsLibrary("places");
  const geocodingLib = useMapsLibrary("geocoding");
  const isMapLoaded = isLoaded && !!placesLib && !!geocodingLib;

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

  const [allProvinces, setAllProvinces] = useState([]);

  const { data: provinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: fetchProvince,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (provinces) {
      setAllProvinces(provinces);
    }
  }, [provinces]);

  // Create stable callback functions for address validation
  const validateAddress = useCallback(
    (address) => {
      if (!geocodingLib || !placesLib) {
        console.log("Google Maps not loaded yet");
        return;
      }

      console.log("Starting address validation for:", address);

      // Clear error if address is being validated
      setErrMessage("");

      const geocoder = new geocodingLib.Geocoder();

      geocoder.geocode({ address: address }, (results, status) => {
        console.log("Geocoding results:", { results, status });

        if (
          status === geocodingLib.GeocoderStatus.OK &&
          results &&
          results[0]
        ) {
          const place = results[0];
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          console.log("Setting coordinates:", { lat, lng });

          // Set coordinates first
          setFromPickupLatitude(lat);
          setFromPickupLongitude(lng);

          const addressComponents = place.address_components || [];
          let extractedProvinceName = "";

          const provinceComponent = addressComponents.find((component) =>
            component.types.includes("administrative_area_level_1")
          );

          if (provinceComponent) {
            extractedProvinceName = provinceComponent.long_name;
            console.log("Setting province name:", extractedProvinceName);
            setProvinceName(extractedProvinceName);

            if (allProvinces?.result?.length > 0) {
              const matchedProvince = allProvinces.result.find(
                (p) =>
                  p.provinceName.toLowerCase() ===
                  extractedProvinceName.toLowerCase()
              );

              if (matchedProvince) {
                console.log("Setting province ID:", matchedProvince.provinceId);
                setProvinceId(matchedProvince.provinceId);
                setErrMessage("");
              } else {
                console.log("No matching province found");
                setProvinceId(null);
                setErrMessage(
                  "Invalid address entered - province not supported"
                );
              }
            } else {
              console.log("No provinces data available");
            }
          } else {
            console.log("No province component found");
            setProvinceName("");
            setProvinceId(null);
            setErrMessage("Invalid address entered - no province detected");
          }

          console.log("Validation completed successfully");
        } else {
          console.log("Geocoding failed, trying places service");
          // If geocoding fails, try to find the address using places service
          findAddressUsingPlaces(address);
        }
      });
    },
    [
      geocodingLib,
      placesLib,
      allProvinces,
      setErrMessage,
      setProvinceName,
      setProvinceId,
      setFromPickupLatitude,
      setFromPickupLongitude,
    ]
  );

  // Fallback method using Places Service if Geocoding fails
  const findAddressUsingPlaces = useCallback(
    (address) => {
      if (!placesLib) return;

      const service = new placesLib.AutocompleteService();

      service.getPlacePredictions({ input: address }, (predictions, status) => {
        console.log("Places predictions:", { predictions, status });

        if (
          status === placesLib.PlacesServiceStatus.OK &&
          predictions &&
          predictions.length > 0
        ) {
          // Use the first prediction to get details
          const prediction = predictions[0];
          getPlaceDetails(prediction.place_id, address);
        } else {
          console.log("Places service also failed");
          setProvinceId(null);
          setErrMessage("Invalid address entered - unable to validate address");
        }
      });
    },
    [placesLib, setErrMessage, setProvinceId]
  );

  // Get place details for validation
  const getPlaceDetails = useCallback(
    (placeId, originalAddress) => {
      if (!placesLib) return;

      const placesService = new placesLib.PlacesService(
        document.createElement("div")
      );

      placesService.getDetails({ placeId: placeId }, (place, status) => {
        console.log("Place details:", { place, status });

        if (
          status === placesLib.PlacesServiceStatus.OK &&
          place
        ) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          console.log("Setting coordinates from places:", { lat, lng });

          setFromPickupLatitude(lat);
          setFromPickupLongitude(lng);

          const addressComponents = place.address_components || [];
          let extractedProvinceName = "";

          const provinceComponent = addressComponents.find((component) =>
            component.types.includes("administrative_area_level_1")
          );

          if (provinceComponent) {
            extractedProvinceName = provinceComponent.long_name;
            console.log(
              "Setting province name from places:",
              extractedProvinceName
            );
            setProvinceName(extractedProvinceName);

            if (allProvinces?.result?.length > 0) {
              const matchedProvince = allProvinces.result.find(
                (p) =>
                  p.provinceName.toLowerCase() ===
                  extractedProvinceName.toLowerCase()
              );

              if (matchedProvince) {
                console.log(
                  "Setting province ID from places:",
                  matchedProvince.provinceId
                );
                setProvinceId(matchedProvince.provinceId);
                setErrMessage("");
              } else {
                setProvinceId(null);
                setErrMessage(
                  "Invalid address entered - province not supported"
                );
              }
            }
          } else {
            setProvinceName("");
            setProvinceId(null);
            setErrMessage("Invalid address entered - no province detected");
          }
        } else {
          setProvinceId(null);
          setErrMessage("Invalid address entered - unable to validate address");
        }
      });
    },
    [
      placesLib,
      allProvinces,
      setErrMessage,
      setProvinceName,
      setProvinceId,
      setFromPickupLatitude,
      setFromPickupLongitude,
    ]
  );

  // Validate fromLocation when it changes and user is not editing
  useEffect(() => {
    if (!fromLocation || fromLocation.trim() === "") {
      return;
    }

    if (
      fromLocation &&
      fromLocation.length >= 3 &&
      !isEditingFrom &&
      isMapLoaded
    ) {
      console.log("Triggering validation for:", fromLocation);
      validateAddress(fromLocation);
    }
  }, [fromLocation, isEditingFrom, isMapLoaded, validateAddress]);

  const handleFromChange = () => {
    setIsEditingFrom(true);
    setShowFromSuggestions(true);
  };

  const handleToChange = () => {
    setIsEditingTo(true);
    setShowToSuggestions(true);
  };

  const handleFromBlur = () => {
    setTimeout(() => {
      setIsEditingFrom(false);
      setShowFromSuggestions(false);

      // Validate address when user finishes editing
      if (!fromLocation || fromLocation.trim() === "") {
        setErrMessage("Please enter a valid address");
        return;
      }

      if (fromLocation && fromLocation.length >= 3 && isMapLoaded) {
        console.log("Triggering validation on blur for:", fromLocation);
        validateAddress(fromLocation);
      }
    }, 200);
  };

  const handleToBlur = () => {
    setTimeout(() => {
      setIsEditingTo(false);
      setShowToSuggestions(false);
    }, 200);
  };

  const handleFromInputChange = (e) => {
    const value = e.target.value;
    console.log("Setting from location to:", value);
    setFromLocation(value);
    setErrMessage("");

    // Clear error when user starts typing
    if (value.trim() !== "") {
      setErrMessage("");
    }

    if (value.length >= 3 && placesLib) {
      const service = new placesLib.AutocompleteService();

      service.getPlacePredictions({ input: value }, (predictions, status) => {
        if (
          status === placesLib.PlacesServiceStatus.OK &&
          predictions
        ) {
          setFromSuggestions(predictions);
          setShowFromSuggestions(true);
        } else {
          setFromSuggestions([]);
        }
      });
    } else {
      setFromSuggestions([]);
    }
  };

  const handleToInputChange = (e) => {
    const value = e.target.value;
    console.log("Setting to location to:", value);
    setToLocation(value);
    setErrMessage("");
    if (value.length >= 3 && placesLib) {
      const service = new placesLib.AutocompleteService();

      service.getPlacePredictions({ input: value }, (predictions, status) => {
        if (
          status === placesLib.PlacesServiceStatus.OK &&
          predictions
        ) {
          setToSuggestions(predictions);
          setShowToSuggestions(true);
        } else {
          setToSuggestions([]);
        }
      });
    } else {
      setToSuggestions([]);
    }
  };

  const handleKeyDown = (e, type) => {
    if (e.key === "Enter") {
      if (type === "from") {
        setIsEditingFrom(false);
        setShowFromSuggestions(false);

        // Validate address when user presses Enter
        if (!fromLocation || fromLocation.trim() === "") {
          setErrMessage("Please enter a valid address");
          return;
        }

        if (fromLocation && fromLocation.length >= 3 && isMapLoaded) {
          validateAddress(fromLocation);
        }
      } else {
        setIsEditingTo(false);
        setShowToSuggestions(false);
      }
    }
  };

  const selectFromSuggestion = (prediction) => {
    console.log("Selecting from suggestion:", prediction.description);
    setFromLocation(prediction.description);
    setErrMessage("");
    setIsEditingFrom(false);
    setShowFromSuggestions(false);
    setFromSuggestions([]);

    if (!placesLib) return;

    const placesService = new placesLib.PlacesService(
      document.createElement("div")
    );

    placesService.getDetails(
      { placeId: prediction.place_id },
      (place, status) => {
        if (
          status === placesLib.PlacesServiceStatus.OK &&
          place
        ) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          console.log("Setting coordinates from suggestion:", { lat, lng });

          setFromPickupLatitude(lat);
          setFromPickupLongitude(lng);

          const addressComponents = place.address_components || [];
          let extractedProvinceName = "";

          const provinceComponent = addressComponents.find((component) =>
            component.types.includes("administrative_area_level_1")
          );

          if (provinceComponent) {
            extractedProvinceName = provinceComponent.long_name;
            console.log(
              "Setting province name from suggestion:",
              extractedProvinceName
            );
            setProvinceName(extractedProvinceName);

            if (allProvinces?.result?.length > 0) {
              const matchedProvince = allProvinces.result.find(
                (p) =>
                  p.provinceName.toLowerCase() ===
                  extractedProvinceName.toLowerCase()
              );

              if (matchedProvince) {
                console.log(
                  "Setting province ID from suggestion:",
                  matchedProvince.provinceId
                );
                setProvinceId(matchedProvince.provinceId);
                setErrMessage("");
              } else {
                setProvinceId(null);
                setErrMessage(
                  "Invalid address entered - province not supported"
                );
              }
            }
          } else {
            setProvinceName("");
            setProvinceId(null);
            setErrMessage("Invalid address entered - no province detected");
          }
        }
      }
    );
  };

  const selectToSuggestion = (prediction) => {
    console.log("Selecting to suggestion:", prediction.description);
    setToLocation(prediction.description);
    setErrMessage("");
    setIsEditingTo(false);
    setShowToSuggestions(false);
    setToSuggestions([]);

    if (!placesLib) return;

    const placesService = new placesLib.PlacesService(
      document.createElement("div")
    );

    placesService.getDetails(
      { placeId: prediction.place_id },
      (place, status) => {
        if (
          status === placesLib.PlacesServiceStatus.OK &&
          place
        ) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          console.log("Setting to coordinates from suggestion:", { lat, lng });

          setToDropOffLatitude(lat);
          setToDropOffLongitude(lng);
        }
      }
    );
  };

  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const [showSizeModal, setShowSizeModal] = useState(false);
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
  const dispatch = useDispatch();

  const renderTabContent = () => {
    switch (activeMoveSizeTab) {
      case "house":
        return (
          <div className="p-3 overflow-y-auto h-[300px]">
            {houses.map((house, index) => (
              <div
                key={`house-${index}`}
                className="p-3 flex items-center border-b border-[#E3E2E0] hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setMoveSize(house.text);
                  setErrMessage("");
                  setShowSizeModal(false);
                  inputRef.current?.blur();
                  // dispatch(setUserItems([]));
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
                onClick={(e) => {
                  e.stopPropagation();
                  setMoveSize(apartment.text);
                  setErrMessage("");
                  setShowSizeModal(false);
                  inputRef.current?.blur();
                  // dispatch(setUserItems([]));
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
                onClick={(e) => {
                  e.stopPropagation();
                  setMoveSize(store);
                  setErrMessage("");
                  setShowSizeModal(false);
                  inputRef.current?.blur();
                  // dispatch(setUserItems([]));
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

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowSizeModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isMapLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-4 locationParentContainer w-full">
      <div className="justify-between locationDetailsContainer flex">
        <div className="w-[69%] locationContainer">
          {errMessage && (
            <p className="text-red-600 text-[12px] mb-2">{errMessage}</p>
          )}
          <h2 className="font-sans text-[20px] text-[#121212] font-bold">
            {t("location.title")}
          </h2>
          <div className="w-full flex flex-col gap-[16px]">
            <div className="relative">
              <div className="w-full h-[68px] locationFrom rounded-[8px] border-[1px] px-[16px] flex items-center justify-between border-[#e3e3e3]">
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
                    <p className="text-[#b8b8b8] ml-2 font-light font-sans text-[16px] leading-[25.6px]">
                      {t("location.from")}
                    </p>
                  </div>
                  <div className="flex flex-1 items-center">
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
                        placeholder="Search places... (min 3 chars)"
                        className="text-[#707070] ml-2 font-sans text-[16px] leading-[25.6px] bg-transparent outline-none flex-1 min-w-0"
                      />
                    ) : (
                      <p className="text-[#707070] ml-2 font-sans text-[16px] line-clamp-2 leading-[25.6px] fromLocationText truncate">
                        {fromLocation || "Enter pickup location"}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleFromChange}
                  className="text-[#3C82F6] hover:bg-primary py-1 px-2 hover:text-white rounded-[20px] cursor-pointer text-[10px] text-manrope font-light ml-2"
                >
                  {t("location.btn")}
                </button>
              </div>

              {showFromSuggestions && fromSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-50 bg-white border border-[#e3e3e3] rounded-[8px] shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {fromSuggestions.map((prediction) => (
                    <div
                      key={prediction.place_id}
                      onClick={() => selectFromSuggestion(prediction)}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
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
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="w-full h-[68px] rounded-[8px] locationFrom border-[1px] px-[16px] flex items-center justify-between border-[#e3e3e3]">
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
                    <p className="text-[#b8b8b8] ml-2 font-light font-sans text-[16px] leading-[25.6px]">
                      {t("location.to")}
                    </p>
                  </div>
                  <div className="flex flex-1 items-center">
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
                        placeholder="Search places... (min 3 chars)"
                        className="text-[#707070] ml-2 font-sans text-[16px] leading-[25.6px] bg-transparent outline-none flex-1 min-w-0"
                      />
                    ) : (
                      <p className="text-[#707070] ml-2 fromLocationText line-clamp-2 truncate font-sans text-[16px] leading-[25.6px]">
                        {toLocation || "Enter drop-off location"}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleToChange}
                  className="text-[#3C82F6] hover:bg-primary py-1 px-2 hover:text-white rounded-[20px] cursor-pointer text-[10px] text-manrope font-light ml-2"
                >
                  {t("location.btn")}
                </button>
              </div>

              {showToSuggestions && toSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-50 bg-white border border-[#e3e3e3] rounded-[8px] shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {toSuggestions.map((prediction) => (
                    <div
                      key={prediction.place_id}
                      onClick={() => selectToSuggestion(prediction)}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
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
                  ))}
                </div>
              )}
              <div
                onClick={() => setShowSizeModal(true)}
                className="moveDetailsBtnBox mt-[16px] relative flex justify-between border-r-2 border-[#E3E2E0] p-3 items-center w-full h-[68px] rounded-[8px] border-[1px] px-[16px]"
              >
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
                <button>
                  <DownIcon />
                </button>
                {showSizeModal && (
                  <div
                    ref={modalRef}
                    className="w-[400px] max-h-[300px] fromAndToContainer overflow-y-auto bg-white absolute top-[60px] border border-gray-200 rounded-[12px] left-0 shadow-lg z-50"
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
                              activeMoveSizeTab === "house"
                                ? "#136AB5"
                                : "#9e9e9e"
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
            </div>
          </div>
        </div>
        <div>
          <LocationMap
            fromPickupLongitude={fromPickupLongitude}
            fromPickupLatitude={fromPickupLatitude}
            toDropOffLongitude={toDropOffLongitude}
            toDropOffLatitude={toDropOffLatitude}
          />
        </div>
      </div>
    </div>
  );
};

export default Location;
