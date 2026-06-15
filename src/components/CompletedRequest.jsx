import React from "react";
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
import dot from "../Assets/completed_dot.svg"
import viewMore from "../Assets/Eye.svg"
import "./completedJobs.css"

const CompletedRequest = () => {
    const completedRequests = [
        {
            name: "Chidera Okafor",
            email: "chidera.okafor@mail.com",
            initials: "CO",
            moveSummary: "2 Bedroom Flat",
            moveCompany: "Urban Movers",
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Lagos (Yaba - Surulere)",
        },
        {
            name: "Mariam Yusuf",
            email: "mariam.yusuf@mail.com",
            initials: "MY",
            moveSummary: "3 Bedroom Duplex",
            moveCompany: "Urban Movers",
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Abuja (Maitama - Asokoro)",
        },
        {
            name: "Emmanuel Bassey",
            email: "emmanuel.bassey@mail.com",
            initials: "EB",
            moveSummary: "1 Bedroom Apartment",
            moveCompany: "Urban Movers",
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Calabar (Marian - Ikot Ansa)",
        },
        {
            name: "Zainab Bello",
            email: "zainab.bello@mail.com",
            initials: "ZB",
            moveSummary: "4 Bedroom House",
            moveCompany: "Urban Movers",
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Kaduna (Barnawa - Ungwan Rimi)",
        },
        {
            name: "Ifeanyi Nwachukwu",
            email: "ifeanyi.nwachukwu@mail.com",
            initials: "IN",
            moveSummary: "5 Bedroom Mansion",
            moveCompany: "Urban Movers",
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Owerri (Douglas - Ikenegbu)",
        },
        {
            name: "Kelechi Umeh",
            email: "kelechi.umeh@mail.com",
            initials: "KU",
            moveSummary: "2 Bedroom Shared Flat",
            moveCompany: "Urban Movers",
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Port Harcourt (D-line - GRA)",
        },
        {
            name: "Fatima Sani",
            email: "fatima.sani@mail.com",
            initials: "FS",
            moveSummary: "Luxury Penthouse",
            moveCompany: "Urban Movers",
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Kano (Nassarawa - Hotoro)",
        },
        {
            name: "Tope Balogun",
            email: "tope.balogun@mail.com",
            initials: "TB",
            moveSummary: "3 Bedroom Bungalow",
            moveCompany: "Urban Movers",
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Ibadan (Molete - Bodija)",
        },
        {
            name: "Grace Enoh",
            email: "grace.enoh@mail.com",
            initials: "GE",
            moveSummary: "2 Bedroom Condo",
            moveCompany: "Urban Movers",
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Benin (GRA - Ring Road)",
        },
        {
            name: "Nura Suleiman",
            email: "nura.suleiman@mail.com",
            initials: "NS",
            moveSummary: "Studio Apartment",
            moveCompany: "Urban Movers",
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Sokoto (Arkilla - Gawon Nama)",
        },
    ];

    return (
        <div>
            <div className="table_container">
                <div className="table_header">
                    <div className="left_table_head">
                        <h1>Completed Request</h1>
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
                                        <span>User</span>
                                        <img src={arrowDown} alt="" />
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <span>Move Company</span>
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

                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {completedRequests.map((request, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="name_td td">
                                            <div className="avatar_circle">
                                                <span>{request.initials}</span>
                                            </div>
                                            <div className="name_text">
                                                <span>{request.name}</span>
                                                <span>{request.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="move_summary td">
                                            <span>{request.moveCompany}</span>
                                            <span>{request.moveCompanyEmail}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="move_summary td">
                                            <span>{request.moveSummary}</span>
                                            <span>{request.route}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="status_completed td">
                                            <span><img src={dot} alt="" /></span>
                                            <span>Completed</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="progress_bar_complete">
                                            <div className="progress_bar_moving_complete"></div>
                                        </div>
                                    </td>
                                    <td className="view">
                                        <img src={viewMore} alt="view more" />
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CompletedRequest