import React, { useEffect, useState } from 'react'
import "./upcomingJobView.css"
import ZinterHeaderPartner from "../components/ZinterHeaderPartner";
import arrowBack from "../Assets/arrow-back-btn.svg"
// import dot from "../Assets/Dot.svg"
import dotCompleted from "../Assets/completed_dot.svg"
import movingFromIcon from "../Assets/point-a.svg"
import MovementMap from "../components/GoogleMapMove";
// import displayPicture from "../Assets/avatar-icon.svg"
// import sofaIcon from "../Assets/sofa-03.svg"
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
import calendarIcon from "../Assets/calendar-minus-02.svg"
import messageIcon from "../Assets/icon-park-outline_message.svg"
import closeIcon from "../Assets/close-modal-icon.svg"
import locationIcon from "../Assets/location-icon.svg"
import destinationIcon from "../Assets/destination-icon.svg"
import doubleCheckIcon from "../Assets/double-checked.svg"
import clickedRadioIcon from "../Assets/clicked-radio-btn.svg"
import dropdown from "../Assets/arrow-down-dropdown.svg"
import sucessIcon from "../Assets/success-good-tick.svg"
import { useQuery } from "@tanstack/react-query";
import calendarBlackAndWhite from "../Assets/calendar-black-icon.svg"
import checkedBoxIcon from "../Assets/Gb-Checkbox.svg"
import movingTruckIcon from "../Assets/moving_truck_icon.svg"
import { useNavigate } from "react-router-dom";
import { moveDetails } from '../api/moveDetails';
import Loader from '../components/loader';
import { endMove, logArrival } from '../api/tracking';
import { startMove } from '../api/tracking';
import Toast from '../components/toast';
import { trackMove } from '../api/moveDetails';



const UpcomingJobView = () => {
    const [showMoveChecklist, setShowMoveChecklist] = useState(false)
    const [showMoveSuccess, setShowMoveSuccess] = useState(false)
    const [showMoveDetails, setShowMoveDetails] = useState(true)
    const [showMoveTimeline, setShowMoveTimeline] = useState(false)
    const [currentStep, setCurrentStep] = useState(0);

    const [activeTab, setActiveTab] = useState('details');
    const [moveCode, setMoveCode] = useState(() => sessionStorage.getItem("moveCodeSub") || "");
    const [moveId, setMoveId] = useState(() => Number(sessionStorage.getItem("moveIdSub")) || "")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [moveDate, setMoveDate] = useState("")
    const [moveDay, setMoveDay] = useState("")
    const [moveTime, setMoveTime] = useState("")
    const [numberOfRooms, setNumberOfRooms] = useState("")
    const [startMoveValue, setStartMoveValue] = useState("")
    const [endMoveValue, setEndMoveValue] = useState("")
    const [amount, setAmount] = useState("")
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [moveDetailsArray, setMoveDetailsArray] = useState([])
    const [itemsArray, setItemsArray] = useState([])
    const [toast, setToast] = useState(null)

    const [loading, setLoader] = useState(false)
    const { data, isLoading, error } = useQuery({
        queryKey: ["moveDetails", moveCode],
        queryFn: () => moveDetails(moveCode),
        enabled: !!moveCode,
    });
    const { data: dataLoginArrival, isLoading: isLoadingLoginArrival, error: errorLoginArrival, refetch } = useQuery({
        queryKey: ["logArrival", moveCode],
        queryFn: () => logArrival(moveCode),
        enabled: false,
        onSuccess: (data) => {
            console.log("Fresh success data:", data);
            if (data?.responseStatus) {
                setCurrentStep((prev) => prev + 1);
                setToast({
                    message: data.responseMessage,
                    type: "success"
                });
                setShowMoveChecklist(true);
            } else {
                setToast({
                    message: data.responseMessage || "Something went wrong",
                    type: "error"
                });
            }
        },
        onError: (error) => {
            console.error(error);
        }

    })
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
            // setMoveFrom(data.result.from)
            // setMoveTo(data.result.to)
            setNumberOfRooms(data.result.numberOfRooms)
            setMoveDetailsArray(data.result.moveItemsDetails);
            // const allItems = moveDetailsArray.flatMap(detail => detail.items)
            // setItemsArray(allItems)
        }
    }, [data, error]);

    // const openMoveCheckList = () => {
    //     setShowMoveChecklist(true);
    // }

    const handleStepComplete = (stepIndex) => {
        if (stepIndex === currentStep) {
            setCurrentStep(stepIndex + 1);
        }
    };


    const logArrivalBtn = () => {
        if (moveCode) {
            // debugger
            refetch();


        }

    }

    const openMoveSuccess = async () => {
        try {
            setLoader(true)
            const response = await endMove(endMoveValue)
            setLoader(false)
            if (response.responseStatus === false) {
                setToast({
                    message: response.responseMessage || "Something went wrong",
                    type: "error"
                });
                setShowMoveSuccess(true)
                setShowMoveChecklist(false)
            } else {
                setToast({
                    message: response.responseMessage,
                    type: "success"
                });
                setShowMoveSuccess(true)
                setShowMoveChecklist(false)
            }


        }
        catch (e) {
            console.log(e)
        }

    }

    const startMoveBtn = async () => {
        // debugger
        try {
            setLoader(true)
            const response = await startMove(startMoveValue)
            setLoader(false)
            console.log(response)
            if (response.responseStatus === false) {
                setToast({
                    message: response.responseMessage || "Something went wrong",
                    type: "error"
                });
            } else {
                setToast({
                    message: response.responseMessage || "Sucessful",
                    type: "success"
                });
                setCurrentStep((prev) => prev + 1);
            }

        } catch (e) {
            console.log(e)
        }
    }

    const openMoveCheckList = async () => {
        try {
            setLoader(true)
            const response = await trackMove(moveCode)
            setLoader(false)
            if (response.responseStatus === false) {
                setToast({
                    message: response.responseMessage || "Something went wrong",
                    type: "error"
                });
            } else {
                // debugger
                setToast({
                    message: response.responseMessage || "Sucessful",
                    type: "success"
                });
                if (response?.result) {
                    const { hasArrived, inTransit, isCompleted } = response.result;

                    if (hasArrived && inTransit && isCompleted) {
                        setCurrentStep(4);
                        setStartMoveValue('*******')
                        setEndMoveValue('*******')
                    } else if (hasArrived && inTransit) {
                        setCurrentStep(3);
                    } else if (hasArrived) {
                        setCurrentStep(2);
                    } else {
                        setCurrentStep(0); // fallback
                    }
                } else {
                    setCurrentStep(0);
                }


                setShowMoveChecklist(true);

            }

        } catch (e) {
            console.log(e)
        }
    }

    const openMoveDetails = () => {
        setShowMoveDetails(true)
        setShowMoveTimeline(false)
        setActiveTab('details');
    }

    const openMoveTimeline = () => {
        setShowMoveDetails(false)
        setShowMoveTimeline(true)
        setActiveTab('timeline');
    }

    const closeAllModal = () => {
        setShowMoveSuccess(false)
        setShowMoveChecklist(false)
        setActiveTab('details');
        setShowMoveDetails(true)
        setShowMoveTimeline(false)
    }

    const okGotIt = () => {
        navigate("/calendar")
    }
    const navigate = useNavigate()
    const handdleGoBack = () => {
        navigate("/calendar")
    }

    // const 


    return (
        <div>
            <div>
                <ZinterHeaderPartner />
            </div>

            <div className="new_jobs_container">
                <div className="new_jobs_header">
                    <button onClick={handdleGoBack}>
                        <span>Upcoming Move</span>
                        <img src={arrowBack} alt="" />
                    </button>
                    <span className="new_jobs_head_text">View Job Details</span>
                </div>
                <div className="user_details_new_job">
                    <div>
                        <div className="user_sub_heading">
                            <span className={activeTab === 'details' ? 'active' : ''}
                                onClick={openMoveDetails}>Move Details</span>
                            <span className={activeTab === 'timeline' ? 'active' : ''}
                            >Move Timeline</span>
                        </div>
                        {showMoveDetails && <div className="header_upcoming_details">
                            <div className='upcoming_details_view'>
                                <div>
                                    {/* <img src={displayPicture} alt="" /> */}
                                </div>
                                <div className="header_job_details_user">
                                    <h2>{fullName}</h2>
                                    <div className="">
                                        <div className="header_upcoming_detail_new">
                                            <span><img src={calendarIcon} alt="" /></span>
                                            <span>Upcoming</span>
                                        </div>
                                        <span className="header_upcoming_date">  {moveDate.split("T")[0]}</span>
                                        <span className="header_upcoming_time">{moveTime}</span>
                                        <span className="header_user_job_email">Apartment - {moveDetailsArray.numberOfRooms} Bedroom</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="msg_btn">
                                    {/* <span><img src={messageIcon} alt="" /></span>
                                    <span className='msg_btn_text'>MESSAGE</span> */}
                                </button>
                            </div>
                        </div>}
                        {showMoveDetails && <div className="map_job_details">
                            <MovementMap />
                        </div>}
                        {showMoveDetails && <div className="more_jobs_details">
                            <div className="first_tab_job">
                                <div className="move_tab_details">
                                    <span>Move Date</span>
                                    <span>   {moveDate.split("T")[0]}</span>
                                </div>
                                <div className="move_tab_details">
                                    <span>Day</span>
                                    <span> {moveDay}</span>
                                </div>
                                <div className="move_tab_details">
                                    <span>Move Time</span>
                                    <span>  {moveDate.split("T")[1]}</span>
                                </div>
                            </div>
                            {/* <div className="second_tab_job">
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
                            </div>
                            <div className="first_tab_job">
                                <div className="move_tab_details">
                                    <span>Move Date</span>
                                    <span> 22 March, 2025</span>
                                </div>
                                <div className="move_tab_details">
                                    <span>Day</span>
                                    <span> Tuesday</span>
                                </div>
                                <div className="move_tab_details">
                                    <span>Move Time</span>
                                    <span>10:00 AM</span>
                                </div>
                            </div> */}
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
                                    <h3>Living Room Inventory List</h3>
                                </div>
                                <div className="inventory_tab_job_body">
                                    <div className="move_tab_details">
                                        <span>Large Sofa</span>
                                        <span> <img src={sofaIcon} alt="" /> </span>
                                    </div>
                                    <div className="move_tab_details">
                                        <span>Elegant Floor Lamp</span>
                                        <span> <img src={floorLampIcon} alt="" /> </span>
                                    </div>
                                    <div className="move_tab_details">
                                        <span>Vintage Clock</span>
                                        <span> <img src={clockIcon} alt="" /> </span>
                                    </div>
                                    <div className="move_tab_details">
                                        <span>Coffee Table</span>
                                        <span> <img src={tableIcon} alt="" /> </span>
                                    </div>
                                    <div className="move_tab_details">
                                        <span>Pool Table</span>
                                        <span> <img src={poolTable} alt="" /> </span>
                                    </div>
                                </div>
                                <div className="inventory_tab_job_body">
                                    <div className="move_tab_details">
                                        <span>Radio</span>
                                        <span> <img src={radioIcon} alt="" /> </span>
                                    </div>
                                    <div className="move_tab_details">
                                        <span>TV Stand</span>
                                        <span> <img src={tvStandIcon} alt="" /> </span>
                                    </div>
                                    <div className="move_tab_details">
                                        <span>Remote Control</span>
                                        <span> <img src={remoteControl} alt="" /> </span>
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
                            </div>
                            <div className="inventory_tab_job">
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
                        </div>}

                        {showMoveTimeline &&
                            <div className="header_upcoming_details">
                                <div className='upcoming_details_view'>
                                    <div>
                                        {/* <img src={displayPicture} alt="" /> */}
                                    </div>
                                    <div className="header_job_details_user">
                                        <h2>{fullName}</h2>
                                        <div className="header_upcoming">
                                            <div className="header_upcoming_detail_timeline">
                                                <span><img src={dotCompleted} alt="" /></span>
                                                <span>Completed</span>
                                            </div>
                                            <div className='header_progress_bar'>
                                                <div className="progress_bar_complete">
                                                    <div className="progress_bar_moving_complete"></div>
                                                </div>
                                                <div>100%</div>
                                            </div>
                                            <span className="header_upcoming_date">{moveDate}</span>
                                            <span className="header_upcoming_time">{moveTime}</span>
                                            <span className="header_user_job_email">Apartment - {numberOfRooms} Bedroom</span>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        {showMoveTimeline && <div className='body_timeline_container'>
                            <div className='body_timeline_first'>
                                <img src={clickedRadioIcon} alt="" />
                                <img src={doubleCheckIcon} alt="" />
                                <div className='body_timeline_head'>
                                    <h1>Payment Made</h1>
                                    <span>Payment confirmed and tracking code generated </span>
                                </div>
                            </div>
                            <div className='body_timeline_first'>
                                <img src={clickedRadioIcon} alt="" />
                                <img src={calendarBlackAndWhite} alt="" />
                                <div className='body_timeline_head'>
                                    <h1>Pickup & Move Start</h1>
                                    <span>Mover navigates to pickup location on schedule. </span>
                                </div>
                            </div>
                            <div className='body_timeline_second'>
                                <img src={checkedBoxIcon} alt="" />
                                <span>Arrived at pickup location</span>
                            </div>
                            <div className='body_timeline_second'>
                                <img src={checkedBoxIcon} alt="" />
                                <span>Loaded Inventory into truck</span>
                            </div>
                            <div className='body_timeline_second_sub'>
                                <div className='body_timeline_second'>
                                    <img src={checkedBoxIcon} alt="" />
                                    <span><span className="bolder_text" > Move Started </span >using customer tracking code</span>
                                </div>
                                <div className='body_timeline_code'>
                                    {startMoveValue}
                                </div>
                            </div>
                            <div className='body_timeline_first'>
                                <img src={clickedRadioIcon} alt="" />
                                <img src={movingTruckIcon} alt="" />
                                <div className='body_timeline_head'>
                                    <h1>Mover In Transit</h1>
                                    <span>Driver moving from pickup location to drop-off location</span>
                                </div>
                            </div>
                            <div className='body_timeline_second'>
                                <img src={checkedBoxIcon} alt="" />
                                <span>Arrived Drop-off Location</span>
                            </div>
                            <div className='body_timeline_second_sub'>
                                <div className='body_timeline_second'>
                                    <img src={checkedBoxIcon} alt="" />
                                    <span><span className='bolder_text' > Move Completed </span >Move Confirmed with tracking code</span>
                                </div>
                                <div className='body_timeline_code'>
                                    {startMoveValue}
                                </div>
                            </div>
                        </div>}

                    </div>
                </div>
                {showMoveDetails && <div className="footer_upcoming_jobs">
                    {/* <button>REJECT</button> */}
                    <button onClick={openMoveCheckList} >START MOVE</button>
                </div>}

            </div>
            {showMoveChecklist && <div className="provide_quote_container">
                <div className="provide_quote_body">
                    <div className="header_quote">
                        <img onClick={closeAllModal} src={closeIcon} alt="" />
                        <span>Move Checklist</span>
                    </div>
                    <div className="body_quote_container">


                        <div className="body_quote">
                            <div className="body_quote_first">
                                <div>
                                    {/* <img src={displayPicture} alt="" /> */}
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
                                <div className="body_quote_location_upcoming">
                                    <div className="body_quote_start">
                                        <img src={locationIcon} alt="" />
                                        <span>{from}</span>
                                    </div>
                                    <div className="body_quote_start">
                                        <img src={destinationIcon} alt="" />
                                        <span>{to}</span>
                                    </div>
                                </div>
                                {/* <div className="body_quote_items">
                                      <span>22 miles away</span>
                                      <span>2 Bedroom Apartment</span>
                                      <span>Pickup & delivery included</span>
                                  </div> */}
                            </div>
                        </div>
                        <div className="body_checklist_container">
                            {/* Step 0 */}
                            <div className="body_checklist">
                                <input
                                    type="checkbox"
                                    checked={currentStep >= 0}
                                    disabled={currentStep !== 0 || currentStep === 4}
                                    onChange={() => handleStepComplete(0)}
                                    onClick={logArrivalBtn}
                                />
                                <span className={currentStep !== 0 ? "disabled-text" : ""}>
                                    Arrived at pickup location
                                </span>
                            </div>

                            {/* Step 1 */}
                            <div className="body_checklist">
                                <input
                                    type="checkbox"
                                    checked={currentStep >= 1}
                                    disabled={currentStep !== 1 || currentStep === 4}
                                    onChange={() => handleStepComplete(1)}
                                />
                                <span className={currentStep !== 1 ? "disabled-text" : ""}>
                                    Loaded Inventory into truck
                                </span>
                            </div>

                            {/* Step 2 – Start Move */}
                            <div className="body_checklist">
                                <input
                                    type="checkbox"
                                    checked={currentStep >= 2}
                                    disabled={currentStep !== 2 || currentStep === 4}
                                />
                                <span className={currentStep !== 2 ? "disabled-text" : ""}>
                                    <strong>Start Move</strong> using customer tracking code
                                </span>
                            </div>
                            <div className="body_checklist_input">
                                <input
                                    type="text"
                                    disabled={currentStep !== 2 || currentStep === 4}
                                    onChange={(e) => setStartMoveValue(e.target.value)}
                                    placeholder="-----"
                                    value={startMoveValue}
                                />
                                <button
                                    className="end_move_btn"
                                    onClick={startMoveBtn}
                                    disabled={currentStep !== 2 || currentStep === 4}
                                >
                                    Start move
                                </button>
                            </div>

                            {/* Step 3 */}
                            <div className="body_checklist">
                                <input
                                    type="checkbox"
                                    checked={currentStep >= 3}
                                    disabled={currentStep !== 3 || currentStep === 4}
                                    onChange={() => handleStepComplete(3)}
                                />
                                <span className={currentStep !== 3 ? "disabled-text" : ""}>
                                    Arrived Drop-off Location
                                </span>
                            </div>

                            {/* Step 4 – End Move */}
                            <div className="body_checklist">
                                <input
                                    type="checkbox"
                                    checked={currentStep >= 3}
                                   
                                />
                                <span className={currentStep !== 4 ? "disabled-text" : ""}>
                                    <strong>End Move</strong> using customer tracking code
                                </span>
                            </div>
                            <div className="body_checklist_input">
                                <input
                                    type="text"
                                   
                                    onChange={(e) => setEndMoveValue(e.target.value)}
                                    placeholder="-----"
                                    value={endMoveValue}
                                />
                                <button
                                    className="end_move_btn"
                                    onClick={openMoveSuccess}
                                   
                                >
                                    End move
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>}
            {showMoveSuccess && <div className='provide_quote_container'>
                <div className='provide_quote_body'>
                    <div className="body_quote_first">
                        <div className="header_quote_sucess">
                            <img onClick={closeAllModal} src={closeIcon} alt="" />
                            {/* <span>Move Checklist</span> */}
                        </div>
                    </div>
                    <div className='body_quote_success'>
                        <img src={sucessIcon} alt="" />
                        <h1>Move Completed</h1>
                        <span>A notification will be sent to the customer’s containing move receipt</span>
                    </div>
                    <div className="body_quote_sucess_modal">
                        <div className="body_quote_first">
                            <div>
                                {/* <img src={displayPicture} alt="" /> */}
                            </div>
                            <div className="body_quote_details">
                                <h2>{fullName}</h2>
                                <div className="body_quote_details_sub">
                                    <span className="">{email}</span>
                                    <span>{phoneNumber}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="body_quote_success_footer">
                        {/* <button>REJECT</button> */}
                        <button onClick={okGotIt}>OK, Got It</button>
                    </div>
                </div>
            </div>}
            {isLoading && <Loader />}
            {isLoadingLoginArrival && <Loader />}
            {loading && <Loader />}
            {toast && (
                <div className='toast_move'>
                    <Toast
                        style={{
                            position: "fixed",
                            top: "20px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 99999,
                        }}

                        message={toast.message}
                        type={toast.type}
                        duration={5000}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

        </div>
    )
}

export default UpcomingJobView