import React from "react";
import { useNavigate } from "react-router-dom";
// import OSMMap from "../components/OsMap";
// import JobsPage from "./JobsPage";
// import SideBar from "../components/SideBar";
// import movingForwardIcon from "../Assets/Grade Icon.svg"
// import notificationBell from "../Assets/Email-verification-icon.svg"
// import userIcon from "../Assets/users-icon.svg"
// import viewJobs from "../Assets/View Arrow.svg"
// import approvedRequestIcon from "../Assets/approved-request-icon.svg"
// import paymentMadeIcon from "../Assets/payment-made-icon.svg"
// import upcomingIcon from "../Assets/upcoming-event-icon.svg"
// import inTransit from "../Assets/in-transit-icon.svg"
// import completedIcon from "../Assets/completed-icon.svg"
// import cancalledIcon from "../Assets/cancelled-icon.svg"
// import completedSignal from "../Assets/completed-signal.svg"
// import cancelledSignal from "../Assets/cancelled-signal.svg"

// import dot from "../Assets/Dot.svg"

import "./allJobs.css"

const NewIssues = () => {
    const navigate = useNavigate()

    const handleViewMore = () => {

        navigate("/view-new-jobs")
    }

    return (
        <div>
            <div className="table_container">
                <div className="table_header">
                    <div className="left_table_head">
                        <h1>New Issues</h1>
                    </div>
                    <div className="right_table_head">
                        <div className="search_icon">
                            <input type="text" placeholder="Search" />
                            <img src="/assets/search-01.svg" alt="" />
                        </div>
                        <div className="filter_con">
                            <span>
                                <img src="/assets/filter-horizontal.svg" alt="" />
                            </span>
                            <span>Filter</span>
                        </div>
                        <div className="refresh">
                            <img src="/assets/refresh (1).svg" alt="" />
                        </div>
                    </div>
                </div>
                <div >
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <div>
                                        <span>Reporting User</span>
                                        <img src="/assets/arrow-down-02.svg" alt="" />
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <span>Report Types</span>
                                        <img src="/assets/arrow-down-02.svg" alt="" />
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <span>Status</span>
                                        <img src="/assets/arrow-down-02.svg" alt="" />
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <span>Date Registration</span>
                                        <img src="/assets/arrow-down-02.svg" alt="" />
                                    </div>
                                </th>

                                <th>

                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="name_td td">
                                        {/* <div>
                                            <img src="/assets/Gb-Avatar.svg" alt="user-initials" />
                                        </div> */}
                                        <div className="name_text">
                                            <span>Anna van Dijk</span>
                                            <span>annaVanDijk@gmail.com</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="move_summary_partner td">
                                        <span> Damaged Item </span>
                                        <span></span>
                                    </div>
                                </td>
                                <td>
                                    <div className="status_transit td">
                                        <span>
                                            {/* <img src="/assets/completed_dot.svg" alt="" /> */}
                                            <img src="/assets/intransit_dot.svg" alt="" />
                                        </span>
                                        <span>
                                            Pending Merchant Action
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="move_summary_partner td">
                                        <span> 29/03/2025 06:34PM </span>
                                        <span></span>
                                    </div>
                                </td>

                                <td className="view" onClick={handleViewMore}>
                                    <img src="/assets/Eye.svg" alt="view more" />
                                </td>
                            </tr>
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default NewIssues