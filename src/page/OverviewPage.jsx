import React, { useEffect, useState } from "react";
// import OSMMap from "../components/OsMap";
// import JobsPage from "./JobsPage";
import SideBar from "../components/SideBar";
import movingForwardIcon from "../Assets/Grade Icon.svg"
import notificationBell from "../Assets/Email-verification-icon.svg"
import userIcon from "../Assets/users-icon.svg"
import viewJobs from "../Assets/View Arrow.svg"
import approvedRequestIcon from "../Assets/approved-request-icon.svg"
import paymentMadeIcon from "../Assets/payment-made-icon.svg"
import upcomingIcon from "../Assets/upcoming-event-icon.svg"
import inTransit from "../Assets/in-transit-icon.svg"
import completedIcon from "../Assets/completed-icon.svg"
import cancalledIcon from "../Assets/cancelled-icon.svg"
import completedSignal from "../Assets/completed-signal.svg"
import cancelledSignal from "../Assets/cancelled-signal.svg"
import searchIcon from "../Assets/search-01.svg"
import filterIcon from "../Assets/filter-horizontal.svg"
import refreshIcon from "../Assets/refresh (1).svg"
import arrowDown from "../Assets/arrow-down-02.svg"
import avatar from "../Assets/Gb-Avatar.svg"
import dot from "../Assets/Dot.svg"
import viewMore from "../Assets/Eye.svg"
import "./overviewPage.css"
import ViewLocationMap from "../components/GoogleMap";
// import revenueIcon from "../Assets/dashboard-revenue-logo.svg";
// import addServiceIcon from "../Assets/add-service.svg"
// import configureIcon from "../Assets/configure-icon.svg"
// import settingsIcon from "../Assets/settings.svg"
import { useQuery } from "@tanstack/react-query";
import { moversDashboardAnalytics } from "../api/agentApi";
import Loader from "../components/loader";
import AllJobs from "../components/AllJobs";
import InComing from "../components/InComing";



const OverviewPage = () => {
    const [incomingRequest, setIncomingRequest] = useState(0)
    const [approvedRequest, setApprovedRequest] = useState(0)
    const [paymentMade, setPaymentMade] = useState(0)
    const [upcomingPickup, setUpcomingPickup] = useState(0)
    const [inTransitNumber, setInTransitNumber] = useState(0)
    const [completedMoves, setCompletedMove] = useState(0)
    const [cancelledMoves, setCancelledMove] = useState(0)
    const [showIncomingModal, setShowIncomingModal] = useState(false)


    const handleIncomingModal = () => {
        setShowIncomingModal(true)
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['statistics'],
        queryFn: moversDashboardAnalytics
    })

    useEffect(() => {
        if (data?.result) {
            setIncomingRequest(data.result.incoming)
            setApprovedRequest(data.result.approvedRequest)
            setPaymentMade(data.result.paymentMade)
            setUpcomingPickup(data.result.upcoming)
            setInTransitNumber(data.result.inTransit)
            setCompletedMove(data.result.completed)
            setCancelledMove(data.result.cancelled)
        }
    }, [data])
    return (

        <div className="overview_sidebar">
            <div>
                <SideBar />
            </div>
            <div className="container_overview_all">
                <div className="container_overview">
                    <div className="container_new_jobs">
                        <div className="moving_truck">
                            <div className="notification_user">
                                {/* <img src={notificationBell} alt="" /> */}
                                <img src="/images/Email-verification-icon.svg" alt="" />
                                {/* <img src={userIcon} alt="" /> */}
                                <img src="/images/users-icon.svg" alt="" />
                            </div>


                        </div>
                        <div className="view_jobs_container" onClick={handleIncomingModal} >
                            <div className="view_jobs_header">
                                <span>Incoming</span>
                            </div>
                            <div className="view_jobs_body">
                                <div className="view_jobs_text">
                                    <span>{incomingRequest} New Jobs</span>
                                    <span>Provide accurate quote</span>
                                </div>
                                <div>
                                    {/* <img src={viewJobs} alt="" /> */}
                                    <img src="/images/View Arrow.svg" alt="" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="map_container">
                        <div className="map_revenue">
                            <div className="revenue_container">
                                <div>
                                    {/* <img src={revenueIcon} alt="" /> */}
                                    <img src="/images/dashboard-revenue-logo.svg" alt="" />
                                </div>
                                <div className="revenue_text">
                                    <span>Total Revenue</span>
                                    <span>$123,000</span>
                                </div>
                            </div>

                            <div className="map_image">
                                <ViewLocationMap />
                            </div>
                        </div>
                        <div className="map_btn">
                            <button>
                                {/* <img src={addServiceIcon} alt="" /> */}
                                <span>Add Your Services</span>
                            </button>
                            <button>
                                {/* <img src={configureIcon} alt="" /> */}
                                <span>Configure Pricing</span>
                            </button>
                            <button>
                                {/* <img src={settingsIcon} alt="" /> */}
                                <span>Account Settings</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="calendar_container">
                    <div className="first_step">
                        <div className="first_step_arrow">
                            {/* <img src={movingForwardIcon} alt="" /> */}
                            <img src="/images/Grade Icon.svg" alt="" />
                            {/* <span>--------------</span> */}
                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon">
                                {/* <img src={approvedRequestIcon} alt="" /> */}
                                <img src="/images/approved-request-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>Approved Requests</span>
                                <span> {approvedRequest} </span>
                            </div>
                        </div>
                    </div>
                    <div className="first_step">
                        <div className="first_step_arrow">
                            <img src="/images/Grade Icon.svg" alt="" />
                            {/* <img src={movingForwardIcon} alt="" /> */}
                            {/* <span>-----------</span> */}
                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon">
                                {/* <img src={paymentMadeIcon} alt="" /> */}
                                <img src="/images/payment-made-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>Payments Made</span>
                                <span> {paymentMade}</span>
                            </div>
                        </div>
                    </div>
                    <div className="first_step">
                        <div className="first_step_arrow">
                            <img src="/images/Grade Icon.svg" alt="" />
                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon">
                                {/* <img src={upcomingIcon} alt="" /> */}
                                <img src="upcoming-event-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>Upcoming Pickups</span>
                                <span> {upcomingPickup} </span>
                            </div>
                        </div>
                    </div>
                    <div className="first_step">
                        <div className="first_step_arrow">
                            <img src="/images/Grade Icon.svg" alt="" />
                            {/* <img src={movingForwardIcon} alt="" /> */}
                            {/* <span>---------</span> */}
                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon">
                                {/* <img src={inTransit} alt="" /> */}
                                <img src="/images/in-transit-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>In Transit</span>
                                <span> {inTransitNumber} </span>
                            </div>
                        </div>
                    </div>
                    <div className="first_step">
                        <div className="first_step_arrow">
                            {/* <img src={completedSignal} alt="" /> */}
                            <img src="/images/completed-signal.svg" alt="" />

                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon">
                                {/* <img src={completedIcon} alt="" /> */}
                                <img src="/images/completed-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>Completed Moves</span>
                                <span> {completedMoves} </span>
                            </div>
                        </div>
                    </div>
                    <div className="first_step">
                        <div className="first_step_arrow">
                            {/* <img src={cancelledSignal} alt="" /> */}
                            <img src="/images/cancelled-signal.svg" alt="" />
                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon"  >
                                <img src="/images/cancelled-icon.svg" alt="" />
                                {/* <img src={cancalledIcon} alt="" /> */}
                            </div>
                            <div className="approved_number_text">
                                <span>Cancelled Moves</span>
                                <span> {cancelledMoves} </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table_container">

                    <div className="table_container_all" >
                        {/* <table>
                            <thead>
                                <tr>
                                    <th>
                                        <div>
                                            <span>Name</span>
                                            <img src={arrowDown} alt="" />
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Move Summary</span>
                                            <img src={arrowDown} alt="" />
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Status</span>
                                            <img src={arrowDown} alt="" />
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Progress</span>
                                            <img src={arrowDown} alt="" />
                                        </div>
                                    </th>
                                    <th>
                                        <div className="view_more_thead">
                                        
                                        </div>
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {moveRequests.map((request, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="name_td td">
                                                <div><img src={avatar} alt="user-initials" /></div>
                                                <div className="name_text">
                                                    <span>{request.name}</span>
                                                    <span>{request.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="move_summary td">
                                                <span>3 Bedroom House</span>
                                                <span>Amsterdam (Damrack - Hilversum)</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="status td">
                                                <span><img src={dot} alt="" /></span>
                                                <span>{request.status}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="progress_bar_new">
                                                <div className="progress_bar_moving_new"></div>
                                            </div>
                                        </td>
                                        <td className="view">
                                            <img src={viewMore} alt="view more" />
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table> */}
                        <AllJobs />
                    </div>
                </div>
            </div>
            {showIncomingModal && (
                <div className="blur_background">
                    <InComing onClose={() => setShowIncomingModal(false)} />
                </div>
            )}

        </div>

    )
}

export default OverviewPage