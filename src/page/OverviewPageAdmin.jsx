import React from "react";
// import OSMMap from "../components/OsMap";
// import JobsPage from "./JobsPage";
// import SideBar from "../components/SideBar";
import SideBarAdmin from "../components/SideBarAdmin";

import "./overviewPage.css"
import ViewLocationMap from "../components/GoogleMap";

const OverviewPageAdmin = () => {
    const moveRequests = [
        { name: "Anna van Dijk", email: "AnnaVanDijk@gmail.com", status: "New Request" },
        // { name: "David Osei", email: "davidosei@mail.com", status: "In Transit" },
        // { name: "Fatima Bello", email: "fatimabello@mail.com", status: "Completed" },
        // { name: "John Park", email: "johnpark@fastmail.com", status: "New Request" },
        // { name: "Lina Chukwu", email: "linachuks@mail.com", status: "In Transit" },
        // { name: "James Okoro", email: "okorojames@gmail.com", status: "Completed" },
        // { name: "Sara Müller", email: "sara.mueller@email.com", status: "In Transit" },
        // { name: "Peter Mensah", email: "mensahpeter@yahoo.com", status: "New Request" },
        // { name: "Grace Kim", email: "gracekim@outlook.com", status: "Completed" },
        // { name: "Ali Jibril", email: "alijibril@mail.com", status: "In Transit" },
    ];
    return (

        <div className="overview_sidebar">
            <div>
                <SideBarAdmin />
            </div>
            <div className="container_overview_all">
                Admin Overview
            </div>
            {/* <div className="container_overview_all">
                <div className="container_overview">
                    <div className="container_new_jobs">
                        <div className="moving_truck">
                            <div className="notification_user">
                                <img src="/assets/Email-verification-icon.svg" alt="" />
                                <img src="/assets/users-icon.svg" alt="" />
                            </div>

                        </div>
                        <div className="view_jobs_container" >
                            <div className="view_jobs_header">
                                <span>Incoming</span>
                            </div>
                            <div className="view_jobs_body">
                                <div className="view_jobs_text">
                                    <span>12 New Jobs</span>
                                    <span>Provide accurate quote</span>
                                </div>
                                <div>
                                    <img src="/assets/View Arrow.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="map_container">
                        <div className="map_revenue">
                            <div className="revenue_container">
                                <div>
                                    <img src="/assets/dashboard-revenue-logo.svg" alt="" />
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
                                <img src="/assets/add-service.svg" alt="" />
                                <span>Add Your Services</span>
                            </button>
                            <button>
                                <img src="/assets/configure-icon.svg" alt="" />
                                <span>Configure Pricing</span>
                            </button>
                            <button>
                                <img src="/assets/settings.svg" alt="" />
                                <span>Account Settings</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="calendar_container">
                    <div className="first_step">
                        <div className="first_step_arrow">
                            <img src="/assets/Grade Icon.svg" alt="" />
                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon">
                                <img src="/assets/approved-request-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>Approved Requests</span>
                                <span>122</span>
                            </div>
                        </div>
                    </div>
                    <div className="first_step">
                        <div className="first_step_arrow">
                            <img src="/assets/Grade Icon.svg" alt="" />
                           
                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon">
                                <img src="/assets/payment-made-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>Payments Made</span>
                                <span>98</span>
                            </div>
                        </div>
                    </div>
                    <div className="first_step">
                        <div className="first_step_arrow">
                            <img src="/assets/Grade Icon.svg" alt="" />
                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon">
                                <img src="/assets/upcoming-event-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>Upcoming Pickups</span>
                                <span>25</span>
                            </div>
                        </div>
                    </div>
                    <div className="first_step">
                        <div className="first_step_arrow">
                            <img src="/assets/Grade Icon.svg" alt="" />
                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon">
                                <img src="/assets/in-transit-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>In Transit</span>
                                <span>15</span>
                            </div>
                        </div>
                    </div>
                    <div className="first_step">
                        <div className="first_step_arrow">
                            <img src="/assets/completed-signal.svg" alt="" />

                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon">
                                <img src="/assets/completed-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>Completed Moves</span>
                                <span>122</span>
                            </div>
                        </div>
                    </div>
                    <div className="first_step">
                        <div className="first_step_arrow">
                            <img src="/assets/cancelled-signal.svg" alt="" />

                        </div>
                        <div className="approved_number_text_container">
                            <div className="approved_icon"  >
                                <img src="/assets/cancelled-icon.svg" alt="" />
                            </div>
                            <div className="approved_number_text">
                                <span>Cancelled Moves</span>
                                <span>12</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table_container">
                    <div className="table_header">
                        <div className="left_table_head">
                            <h1>All Request</h1>
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
                                <span className="filter_con_text">Filter</span>
                            </div>
                            <div className="refresh">
                                <img src="/assets/refresh (1).svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="table_container_all" >
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <div>
                                            <span>Name</span>
                                            <img src="/assets/arrow-down-02.svg" alt="" />
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Move Company</span>
                                            <img src="/assets/arrow-down-02.svg" alt="" />
                                        </div>
                                    </th>
                                    <th>
                                        <div>
                                            <span>Move Summary</span>
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
                                            <span>Progress</span>
                                            <img src="/assets/arrow-down-02.svg" alt="" />
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
                                                <div><img src="/assets/Gb-Avatar.svg" alt="user-initials" /></div>
                                                <div className="name_text">
                                                    <span>{request.name}</span>
                                                    <span>{request.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="name_text">
                                                <span>Urban Movers</span>
                                                <span>urbanmovers@gmail.com</span>
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
                                                <span><img src="/assets/Dot.svg" alt="" /></span>
                                                <span>{request.status}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="progress_bar_new">
                                                <div className="progress_bar_moving_new"></div>
                                            </div>
                                        </td>
                                        <td className="view">
                                            <img src="/assets/Eye.svg" alt="view more" />
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div> */}
        </div>

    )
}

export default OverviewPageAdmin