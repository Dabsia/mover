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
import searchIcon from "../Assets/search-01.svg"
import filterIcon from "../Assets/filter-horizontal.svg"
import refreshIcon from "../Assets/refresh (1).svg"
import arrowDown from "../Assets/arrow-down-02.svg"
import avatar from "../Assets/Gb-Avatar.svg"
import dot from "../Assets/Dot.svg"
import dotActive from "../Assets/completed_dot.svg"
import dotSuspended from "../Assets/canceled_dot.svg"
import viewMore from "../Assets/Eye.svg"

import "./allJobs.css"




const AllPartner = () => {
    const navigate = useNavigate()

    const handleViewMore = () => {

        navigate("/view-new-jobs")
    }

    return (
        <div>
            <div className="table_container">
                <div className="table_header">
                    <div className="left_table_head">
                        <h1>All Partners</h1>
                    </div>
                    <div className="right_table_head">
                        <div className="search_icon">
                            <input type="text" placeholder="Search" />
                            <img src={searchIcon} alt="" />
                        </div>
                        {/* <div className="filter_con">
                            <span>
                                <img src={filterIcon} alt="" />
                            </span>
                            <span>Filter</span>
                        </div> */}
                        <div className="refresh">
                            <img src={refreshIcon} alt="" />
                        </div>
                    </div>
                </div>
                <div >
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <div>
                                        <span>Moving Company</span>
                                        <img src={arrowDown} alt="" />
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <span>All Jobs</span>
                                        <img src={arrowDown} alt="" />
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <span>Total Revenue</span>
                                        <img src={arrowDown} alt="" />
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <span>Date Registration</span>
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

                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="name_td td">
                                        {/* <div>
                                            <img src={avatar} alt="user-initials" />
                                        </div> */}
                                        <div className="name_text">
                                            <span>Urban Movers</span>
                                            <span>urbanmovers@gmail.com</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="move_summary_partner td">
                                        <span> 50 </span>
                                        <span></span>
                                    </div>
                                </td>
                                <td>
                                    <div className="move_summary_partner td">
                                        <span> $134 </span>
                                        <span></span>
                                    </div>
                                </td>
                                <td>
                                    <div className="move_summary_partner td">
                                        <span> 29/03/2025 06:34PM </span>
                                        <span></span>
                                    </div>
                                </td>
                                <td>
                                    <div className="status_active td">
                                        <span>
                                            <img src={dotActive} alt="" />
                                        </span>
                                        <span>
                                            Active
                                        </span>
                                    </div>
                                </td>
                                <td className="view" onClick={handleViewMore}>
                                    <img src={viewMore} alt="view more" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="name_td td">
                                        {/* <div>
                                            <img src={avatar} alt="user-initials" />
                                        </div> */}
                                        <div className="name_text">
                                            <span>Urban Movers</span>
                                            <span>urbanmovers@gmail.com</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="move_summary_partner td">
                                        <span> 10 </span>
                                        <span></span>
                                    </div>
                                </td>
                                <td>
                                    <div className="move_summary_partner td">
                                        <span> $25 </span>
                                        <span></span>
                                    </div>
                                </td>
                                <td>
                                    <div className="move_summary_partner td">
                                        <span> 29/03/2025 06:34PM </span>
                                        <span></span>
                                    </div>
                                </td>
                                <td>
                                    <div className="status_suspended td">
                                        <span>
                                            <img src={dotSuspended} alt="" />
                                        </span>
                                        <span>
                                            Suspended
                                        </span>
                                    </div>
                                </td>
                                <td className="view" onClick={handleViewMore}>
                                    <img src={viewMore} alt="view more" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllPartner