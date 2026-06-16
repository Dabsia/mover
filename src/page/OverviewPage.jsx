import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import "./overviewPage.css"
import ViewLocationMap from "../components/GoogleMap";
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
                                <img src="/images/Email-verification-icon.svg" loading="lazy" alt="" />
                                {/* <img src={userIcon} alt="" /> */}
                                <img src="/images/users-icon.svg" loading="lazy" alt="" />
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
                                    <img loading="lazy" src="/images/View Arrow.svg" alt="" />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="map_container">
                        <div className="map_revenue">
                            <div className="revenue_container">
                                <div>
                                    {/* <img src={revenueIcon} alt="" /> */}
                                    <img loading="lazy" src="/images/dashboard-revenue-logo.svg" alt="" />
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
                                {/* <img loading="lazy" src={addServiceIcon} alt="" /> */}
                                <span>Add Your Services</span>
                            </button>
                            <button>
                                {/* <img loading="lazy" src={configureIcon} alt="" /> */}
                                <span>Configure Pricing</span>
                            </button>
                            <button>
                                {/* <img loading="lazy" src={settingsIcon} alt="" /> */}
                                <span>Account Settings</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="calendar_container">
                    <div className="first_step">
                        <div className="first_step_arrow">
                            {/* <img loading="lazy" src={movingForwardIcon} alt="" /> */}
                            <img loading="lazy" src="/images/Grade Icon.svg" alt="" />
                            {/* <span>--------------</span> */}
                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon">
                                {/* <img loading="lazy" src={approvedRequestIcon} alt="" /> */}
                                <img loading="lazy" src="/images/approved-request-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>Approved Requests</span>
                                <span> {approvedRequest} </span>
                            </div>
                        </div>
                    </div>
                    <div className="first_step">
                        <div className="first_step_arrow">
                            <img loading="lazy" src="/images/Grade Icon.svg" alt="" />
                            {/* <img loading="lazy" src={movingForwardIcon} alt="" /> */}
                            {/* <span>-----------</span> */}
                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon">
                                {/* <img loading="lazy" src={paymentMadeIcon} alt="" /> */}
                                <img loading="lazy" src="/images/payment-made-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>Payments Made</span>
                                <span> {paymentMade}</span>
                            </div>
                        </div>
                    </div>
                    <div className="first_step">
                        <div className="first_step_arrow">
                            <img loading="lazy" src="/images/Grade Icon.svg" alt="" />
                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon">
                                {/* <img loading="lazy" src={upcomingIcon} alt="" /> */}
                                <img loading="lazy" src="upcoming-event-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>Upcoming Pickups</span>
                                <span> {upcomingPickup} </span>
                            </div>
                        </div>
                    </div>
                    <div className="first_step">
                        <div className="first_step_arrow">
                            <img loading="lazy" src="/images/Grade Icon.svg" alt="" />
                            {/* <img loading="lazy" src={movingForwardIcon} alt="" /> */}
                            {/* <span>---------</span> */}
                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon">
                                {/* <img loading="lazy" src={inTransit} alt="" /> */}
                                <img loading="lazy" src="/images/in-transit-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>In Transit</span>
                                <span> {inTransitNumber} </span>
                            </div>
                        </div>
                    </div>
                    <div className="first_step">
                        <div className="first_step_arrow">
                            {/* <img loading="lazy" src={completedSignal} alt="" /> */}
                            <img loading="lazy" src="/images/completed-signal.svg" alt="" />

                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon">
                                {/* <img loading="lazy" src={completedIcon} alt="" /> */}
                                <img loading="lazy" src="/images/completed-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>Completed Moves</span>
                                <span> {completedMoves} </span>
                            </div>
                        </div>
                    </div>
                    <div className="first_step">
                        <div className="first_step_arrow">
                            {/* <img loading="lazy" src={cancelledSignal} alt="" /> */}
                            <img loading="lazy" src="/images/cancelled-signal.svg" alt="" />
                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon"  >
                                <img loading="lazy" src="/images/cancelled-icon.svg" alt="" />
                                {/* <img loading="lazy" src={cancalledIcon} alt="" /> */}
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
                                            <img loading="lazy" src={arrowDown} alt="" />
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Move Summary</span>
                                            <img loading="lazy" src={arrowDown} alt="" />
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Status</span>
                                            <img loading="lazy" src={arrowDown} alt="" />
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Progress</span>
                                            <img loading="lazy" src={arrowDown} alt="" />
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
                                                <div><img loading="lazy" src={avatar} alt="user-initials" /></div>
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
                                                <span><img loading="lazy" src={dot} alt="" /></span>
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