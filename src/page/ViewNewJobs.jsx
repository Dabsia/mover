import React, { useEffect, useState } from "react";
import "./viewNewJobs.css"
import RichTextEditor from "../components/RichTextEditor";
import ZinterHeaderPartner from "../components/ZinterHeaderPartner";
import arrowBack from "../Assets/arrow-back-btn.svg"
import dot from "../Assets/Dot.svg"
// import movingFromIcon from "../Assets/point-a.svg"
import MovementMap from "../components/GoogleMapMove";
import displayPicture from "../Assets/avatar-icon.svg"
import sofaIcon from "../Assets/sofa-03.svg"
// import floorLampIcon from "../Assets/lamp.svg"
// import clockIcon from "../Assets/vintage-clock.svg"
// import tableIcon from "../Assets/table-01.svg"
// import poolTable from "../Assets/pool-table.svg"
// import radioIcon from "../Assets/radio.svg"
// import tvStandIcon from "../Assets/television-table.svg"
// import remoteControl from "../Assets/remote-control.svg"
// import magazineRack from "../Assets/bookshelf-02.svg"
// import indoorPlant from "../Assets/flower-pot.svg"
// import kingSizeBed from "../Assets/bed-double.svg"
// import babyBedIcon from "../Assets/baby-bed-02.svg"
// import curtains from "../Assets/curtains.svg"
// import bookShelf from "../Assets/bookshelf-02.svg"
// import monitorIcon from "../Assets/modern-tv.svg"
// import chairIcon from "../Assets/chair-02.svg"
import closeIcon from "../Assets/close-modal-icon.svg"
import locationIcon from "../Assets/location-icon.svg"
import destinationIcon from "../Assets/destination-icon.svg"
import dropdown from "../Assets/arrow-down-dropdown.svg"
import sucessIcon from "../Assets/success-good-tick.svg"

import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { moveDetails } from "../api/moveDetails";
import Loader from "../components/loader";
import { createQuote } from "../api/quote";



const ViewNewJobs = () => {
    const navigate = useNavigate()
    const [moveCode, setMoveCode] = useState(() => sessionStorage.getItem("moveCode") || "");
    const [moveId, setMoveId] = useState(() => Number(sessionStorage.getItem("moveId")) || "")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [moveDate, setMoveDate] = useState("")
    const [moveDay, setMoveDay] = useState("")
    const [moveTime, setMoveTime] = useState("")
    const [numberOfRooms, setNumberOfRooms] = useState("")
    const [amount, setAmount] = useState("")
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [proposedTime, setCombined] = useState("")
    const [moveDetailsArray, setMoveDetailsArray] = useState([])
    const [itemsArray, setItemsArray] = useState([])
    const [additonalInformation, setAddtionalComment] = useState('');
    const [showProvideQuote, setShowProvideQuote] = useState(false)
    const [showSuccessQuote, setshowSuccessQuote] = useState(false)
    // const { data: dataQuote, isLoading: isLoadingQuote, error: errorQuote, refetch } = useQuery({
    //     queryKey: ["createQuote", moveId, amount, proposedTime, additonalInformation],
    //     queryFn: () => createQuote({
    //         moveId, amount, proposedTime, additonalInformation
    //     }),
    //     enabled: false,
    //     refetchOnWindowFocus: false,
    // })

    // const mutation = useMutation({
    //     mutationFn: ({ moveId, amount, proposedTime, additonalInformation }) =>
    //         createQuote({ moveId, amount, proposedTime, additonalInformation }),
    //     onSuccess: (data) => {
    //         if (data?.responseStatus === false) {
    //             console.log(data.responseMessage);
    //         } else {
    //             console.log(data.responseMessage);
    //             setShowProvideQuote(false);
    //             setshowSuccessQuote(true);
    //         }
    //     },
    //     onError: (err) => {
    //         console.error("Quote creation failed", err);
    //     },
    // });

    const { mutate: sendQuote, isPending, errors } = useMutation({
        mutationFn: ({ moveId, amount, proposedTime, additonalInformation }) =>
            createQuote({ moveId, amount, proposedTime, additonalInformation }),

        onSuccess: (data) => {
            if (data?.responseStatus === false) {
                console.log("Error:", data.responseMessage);
                console.log(errors)
            } else {
                console.log("Success:", data.responseMessage);
                setShowProvideQuote(false);
                setshowSuccessQuote(true);
            }
        },

        onError: (err) => {
            console.error("Failed to create quote:", err);
        },
    });

    const { data, isLoading, error } = useQuery({
        queryKey: ["moveDetails", moveCode],
        queryFn: () => moveDetails(moveCode),
        enabled: !!moveCode,
    });



    // useEffect(() => {
    //     if (data?.responseStatus === false && data?.result?.moveItemsDetails) {
    //         setMoveDetailsArray(data.result.moveItemsDetails);
    //         console.log(data.result.responseMessage)
    //     }
    // }, [data]);

    useEffect(() => {
        if (data && !data.responseStatus) {
            console.log(error);
        } else if (data) {
            console.log(data);
            setFullName(data.result.fullName)
            setEmail(data.result.email)
            setPhoneNumber(data.result.phoneNumber)
            setFrom(data.result.from)
            setTo(data.result.to)
            setMoveDate(data.result.moveDate)
            setMoveDay(data.result.moveDay)
            setMoveTime(data.result.moveTime)
            setNumberOfRooms(data.result.numberOfRooms)
            setMoveDetailsArray(data.result.moveItemsDetails);
            const allItems = moveDetailsArray.flatMap(detail => detail.items)
            setItemsArray(allItems)
        }
    }, [data, error]);

    const handdleGoBack = () => {
        navigate("/overview")
    }

    const handleSuccess = () => {
        setShowProvideQuote(true)
    }

    // const handleClose = async () => {
    //     // debugger
    //     if (!date || !time) {
    //         alert('Please select date and time');
    //         return;
    //     }

    //     const newCombined = new Date(`${date}T${time}:00.000Z`).toISOString();
    //     setCombined(newCombined);

    //     if (moveId && amount && newCombined && additonalInformation) {
    //         debugger
    //         const result = await refetch({
    //             queryKey: ["createQuote", moveId, amount, newCombined, additonalInformation],
    //         });
    //         const data = result?.data;
    //         if (data?.responseStatus === false) {
    //             console.log(data.responseMessage);
    //         } else {
    //             console.log(data.responseMessage);
    //             alert('Please select date and time');
    //             setShowProvideQuote(false);
    //             setshowSuccessQuote(true);
    //         }
    //     }
    // };
    const handleClose = () => {
        // debugger
        if ( !time) {
            alert("Please select time");
            return;
        }

        const proposedTime = new Date(`${moveDate.split('T')[0]}T${time}:00.000Z`).toISOString();

        if (moveId && amount && additonalInformation) {
            sendQuote({ moveId, amount, proposedTime, additonalInformation });
        }
    };

    const navigateToOverView = () => {
        navigate("/overview")
    }

    const handleAllClose = () => {
        setShowProvideQuote(false)
        setshowSuccessQuote(false)
    }

    return (
        <div>
            <div>
                <ZinterHeaderPartner />
            </div>
            <div className="new_jobs_container">
                <div className="new_jobs_header">
                    <button onClick={handdleGoBack}>
                        <span>New Jobs</span>
                        <img src="/images/arrow-back-btn.svg" alt="" />
                    </button>
                    <span className="new_jobs_head_text">View Job Details</span>
                </div>
                <div className="user_details_new_job">
                    <div>
                        <div className="header_job_details">
                            <div>
                                {/* <img src="/images/avatar-icon.svg" alt="" /> */}
                            </div>
                            <div className="header_job_details_user">
                                <h2>{fullName}</h2>
                                <div>
                                    <div className="header_job_detail_new">
                                        <span>
                                            <img src="/images/Dot.svg" alt="" />
                                            </span>
                                        <span>New Request</span>
                                    </div>
                                    <span className="header_user_job_email">{email}</span>
                                </div>
                            </div>
                        </div>
                        <div className="location_job_details">
                            <div className="">
                                {/* <img src={movingFromIcon} alt="" /> */}
                                <div className="location_from">
                                    <span>Moving From</span>
                                    <span> {from}</span>
                                </div>
                            </div>
                            <div>
                                {/* <img src={movingFromIcon} alt="" /> */}
                                <div className="location_from">
                                    <span>Moving To</span>
                                    <span>{to}</span>
                                </div>
                            </div>
                        </div>
                        <div className="map_job_details">
                            <MovementMap />
                        </div>
                        <div className="more_jobs_details">
                            <div className="first_tab_job">
                                <div className="move_tab_details">
                                    <span>Move Date</span>
                                    <span>{moveDate.split('T')[0]} </span>
                                </div>
                                <div className="move_tab_details">
                                    <span>Day</span>
                                    <span> {moveDay}</span>
                                </div>
                                <div className="move_tab_details">
                                    <span>Move Time</span>
                                    <span> {moveTime} </span>
                                </div>
                            </div>
                            {moveDetailsArray.map((item) => (
                                <div className="second_tab_job">
                                    <div className="move_tab_details">
                                        <span>Move SIze</span>
                                        <span>House - {numberOfRooms} Bedroom</span>
                                    </div>
                                    <div className="move_tab_details">
                                        <span>{item.roomName}</span>
                                        <span>{item.count} Items Selected</span>
                                    </div>
                                </div>
                            ))}

                            {/* <div className="second_tab_job_sub">
                                <div className="move_tab_details">
                                    <span>Move SIze</span>
                                    <span>House - 3 Bedrooms</span>
                                </div>
                                <div className="move_tab_details">
                                    <span>Living Room</span>
                                    <span>20 Items Selected</span>
                                </div>
                                <div className="move_tab_details">
                                    <span>Bedroom 1</span>
                                    <span>12 Items Selected</span>
                                </div>
                            </div> */}
                            {/* <div className="first_tab_job">
                                <div className="move_tab_details">
                                    <span>Move Date</span>
                                    <span> {moveDate}</span>
                                </div>
                                <div className="move_tab_details">
                                    <span>Day</span>
                                    <span> {moveDay} </span>
                                </div>
                                <div className="move_tab_details">
                                    <span>Move Time</span>
                                    <span> {moveTime} </span>
                                </div>
                            </div> */}
                            {/* {itemsArray.items} */}
                            {moveDetailsArray.map((room, index) => (
                                <div key={index} className="inventory_tab_job">
                                    <div className="inventory_tab_job_head">
                                        <h3>{room.roomName} Inventory List</h3>
                                    </div>
                                    <div className="inventory_display">
                                        {room.items.map((item, index) => (
                                            <div key={index} className="inventory_tab_job_body"  >
                                                <div className="move_tab_details">
                                                    <span>{item}</span>
                                                    {/* <span> <img src={sofaIcon} alt="" /> </span> */}
                                                </div>
                                                <div className="move_tab_details">
                                                    {/* <span>{item}</span> */}
                                                    {/* <span> <img src={floorLampIcon} alt="" /> </span> */}
                                                </div>
                                                <div className="move_tab_details">
                                                    {/* <span>Vintage Clock</span> */}
                                                    {/* <span> <img src={clockIcon} alt="" /> </span> */}
                                                </div>
                                                <div className="move_tab_details">
                                                    {/* <span>Coffee Table</span> */}
                                                    {/* <span> <img src={tableIcon} alt="" /> </span> */}
                                                </div>
                                                <div className="move_tab_details">
                                                    {/* <span>Pool Table</span> */}
                                                    {/* <span> <img src={poolTable} alt="" /> </span> */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* <div className="inventory_tab_job">
                                <div className="inventory_tab_job_head">
                                    <h3>Bedroom Inventory List</h3>
                                </div>
                                <div className="inventory_tab_job_body">
                                    <div className="move_tab_details">
                                        <span>King Size Bed</span>
                                        <span> <img src={kingSizeBed} alt="" /> </span>
                                    </div>
                                    <div className="move_tab_details">
                                        <span>Baby Bed</span>
                                        <span> <img src={babyBedIcon} alt="" /> </span>
                                    </div>
                                    <div className="move_tab_details">
                                        <span>Lamp</span>
                                        <span> <img src={floorLampIcon} alt="" /> </span>
                                    </div>
                                    <div className="move_tab_details">
                                        <span>Curtains</span>
                                        <span> <img src={curtains} alt="" /> </span>
                                    </div>
                                    <div className="move_tab_details">
                                        <span>Book Shelf</span>
                                        <span> <img src={bookShelf} alt="" /> </span>
                                    </div>
                                </div>
                                <div className="inventory_tab_job_body">
                                    <div className="move_tab_details">
                                        <span>Dell Monitor</span>
                                        <span> <img src={monitorIcon} alt="" /> </span>
                                    </div>
                                    <div className="move_tab_details">
                                        <span>Work Chair</span>
                                        <span> <img src={chairIcon} alt="" /> </span>
                                    </div>
                                    <div className="move_tab_details">
                                        <span>FLower Vase</span>
                                        <span> <img src={indoorPlant} alt="" /> </span>
                                    </div>
                                    <div className="move_tab_details">
                                        <span>Magazine Rack</span>
                                        <span> <img src={magazineRack} alt="" /> </span>
                                    </div>
                                    <div className="move_tab_details">
                                        <span>Indoor Plants</span>
                                        <span> <img src={indoorPlant} alt="" /> </span>
                                    </div>
                                </div>
                            </div> */}
                            {/* <table className="table_jobs">
                                <thead>
                                    <tr className="move_jobs_head">
                                        <th>Move Date</th>
                                        <th>Day</th>
                                        <th>Move Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>22 March, 2025</td>
                                        <td> Tuesday </td>
                                        <td>10:00 AM </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <thead>
                                    <tr className="">
                                        <th>Move SIze</th>
                                        <th>Living Room</th>
                                        <th>Bedroom 1</th>
                                    </tr>
                                    <tr>
                                        <th>Bedroom 2</th>
                                        <th>Dining Room</th>
                                        <th>Kitchen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>House - 3 Bedrooms</td>
                                        <td> 20 Items Selected </td>
                                        <td>12 Items Selected</td>
                                    </tr>
                                    <tr>
                                        <td>7 items selected</td>
                                        <td> 6 Items Selected </td>
                                        <td>18 Items Selected  </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <div>Living Room Inventory List</div>
                                <thead>
                                    <tr>
                                        <th>Large Sofa</th>
                                        <th>Elegant Floor Lamp</th>
                                        <th>Vintage Clock</th>
                                        <th> Coffee Table </th>
                                        <th>Pool Table</th>
                                    </tr>
                                    <tr>
                                        <th>Radio</th>
                                        <th>TV Stand</th>
                                        <th>Remote Control</th>
                                        <th>Magazine Rack</th>
                                        <th> Indoor Plants </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> <img src="" alt="" /></td>
                                        <td> <img src="" alt="" /> </td>
                                        <td><img src="" alt="" /></td>
                                        <td><img src="" alt="" /></td>
                                        <td><img src="" alt="" /></td>
                                    </tr>
                                    <tr>
                                        <td><img src="" alt="" /></td>
                                        <td> <img src="" alt="" /> </td>
                                        <td><img src="" alt="" />  </td>
                                        <td><img src="" alt="" />  </td>
                                        <td><img src="" alt="" />  </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <div>Bedroom Inventory List</div>
                                <thead>
                                    <tr>
                                        <th>King Size Bed</th>
                                        <th>Baby Bed</th>
                                        <th>Lamp</th>
                                        <th> Curtains </th>
                                        <th>Book Shelf</th>
                                    </tr>
                                    <tr>
                                        <th>Dell Monitor</th>
                                        <th>Work Chair</th>
                                        <th>FLower Vase</th>
                                        <th>Magazine Rack</th>
                                        <th> Indoor Plants </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> <img src="" alt="" /></td>
                                        <td> <img src="" alt="" /> </td>
                                        <td><img src="" alt="" /></td>
                                        <td><img src="" alt="" /></td>
                                        <td><img src="" alt="" /></td>
                                    </tr>
                                    <tr>
                                        <td><img src="" alt="" /></td>
                                        <td> <img src="" alt="" /> </td>
                                        <td><img src="" alt="" />  </td>
                                        <td><img src="" alt="" />  </td>
                                        <td><img src="" alt="" />  </td>
                                    </tr>
                                </tbody>
                            </table> */}
                        </div>
                    </div>
                </div>
                <div className="footer_view_jobs">
                    <button onClick={handleAllClose}>REJECT</button>
                    <button onClick={handleSuccess}>PROVIDE QUOTE</button>
                </div>
            </div>
            {showProvideQuote &&
                <div className="provide_quote_container">
                    <div className="provide_quote_body">
                        <div className="header_quote">
                            <img onClick={handleAllClose} src="/images/close-modal-icon.svg" alt="" />
                            <span>Provide Quote</span>
                        </div>
                        <div className="body_quote_container">


                            <div className="body_quote">
                                <div className="body_quote_first">
                                    <div>
                                        {/* <img src="/images/arrow-down-dropdown.svg" alt="" /> */}
                                    </div>
                                    <div className="body_quote_details">
                                        <h2>{fullName}</h2>
                                        <div className="body_quote_details_sub">
                                            <span className="">{email}</span>
                                            <span>{phoneNumber}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="body_quote_location_items">
                                    <div className="body_quote_location">
                                        <div className="body_quote_start">
                                            <img src="/images/location-icon.svg" alt="" />
                                            <span>{from}</span>
                                        </div>
                                        <div className="body_quote_start">
                                            <img src="/images/destination-icon.svg" alt="" />
                                            <span>{to}</span>
                                        </div>
                                    </div>
                                    <div className="body_quote_items">
                                        {/* <span>22 miles away</span> */}
                                        <span>{numberOfRooms} Bedroom Apartment</span>
                                        <span>Pickup & delivery included</span>
                                    </div>
                                </div>
                            </div>
                            <div className="body_quote_sub">
                                <div className="input_multiple" >
                                    <span>Availability</span>
                                    <div className="input_date_time">
                                        <input type="date" value={moveDate.split('T')[0]} disabled />
                                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                                    </div>

                                    {/* <div className="tag_input_wrapper_view">
                                        {selectedProvinces.map((province, idx) => (
                                            <div className="tag_item" key={idx}>
                                                <span>{province}</span>
                                                <button className="remove_btn" onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeProvince(province);
                                                }}>×</button>
                                            </div>
                                        ))}
                                    
                                    </div>

                                    <img className="img_view" src={dropdown} alt="" onFocus={() => setShowDropdown(true)} />

                                    {showDropdown && (
                                        <div className="dropdown_list_view">
                                            {allProvinces.map((province, idx) => (
                                                <label className="dropdown_item" key={idx}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedProvinces.includes(province)}
                                                        onChange={() => toggleProvince(province)}
                                                    />
                                                    <span>{province}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )} */}
                                </div>
                                <div className="body_quote_sub_amount">
                                    <span>How much do you want to charge</span>
                                    <input type="number"
                                        onChange={(e) => setAmount(e.target.value)}
                                        name="" id=""
                                        placeholder="Enter a competitive quote" />
                                </div>
                                <div className="body_quote_sub_text">
                                    <span>Additional Comment</span>
                                    <RichTextEditor onChange={setAddtionalComment} />
                                </div>
                            </div>
                        </div>
                        <div className="body_quote_footer">
                            <button onClick={handleAllClose}> GO BACK</button>
                            <button onClick={handleClose}> CONTINUE</button>
                        </div>
                    </div>
                </div>
            }

            {showSuccessQuote &&
                <div className="provide_quote_container">
                    <div className="provide_quote_body">
                        <div className="header_quote">
                            {/* <span>Provide Quote</span> */}
                        </div>
                        <div className="body_quote_container">

                            <div className="success_quote">
                                <img src="/images/success-good-tick.svg" alt="" />
                                <h1>Quote successfully provided</h1>
                                <span>A notification will be sent to the customer’s email to make payment</span>
                            </div>
                            <div className="body_quote">
                                <div className="body_quote_first">
                                    <div>
                                       
                                    </div>
                                    <div className="body_quote_details">
                                        <h2>{fullName}</h2>
                                        <div className="body_quote_details_sub">
                                            <span className="">{email}</span>
                                            <span>{phoneNumber}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="body_quote_location_items">
                                    <div className="body_quote_location">
                                        <div className="body_quote_start">
                                            <img src={locationIcon} alt="" />
                                            <span>{from}</span>
                                        </div>
                                        <div className="body_quote_start">
                                            <img src={destinationIcon} alt="" />
                                            <span>{to}</span>
                                        </div>
                                    </div>
                                    <div className="body_quote_items">
                                        <span>Quote</span>
                                        <span>${amount}</span>
                                        <span>Pickup & delivery included</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="body_quote_footer_success">
                            {/* <button> GO BACK</button> */}
                            <button onClick={navigateToOverView}> CONTINUE</button>
                        </div>
                    </div>
                </div>
            }

            {isPending && <Loader />}

            {isLoading && <Loader />}

        </div>
    )
}

export default ViewNewJobs