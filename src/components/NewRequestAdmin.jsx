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
import dot from "../Assets/Dot.svg"
import viewMore from "../Assets/Eye.svg"
import "./newJobs.css"

const NewRequestAdmin = () => {
    const moveRequests = [
        {
            name: "Zara Mensah",
            email: "zara.mensah@mail.com",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            moveSummary: "2 Bedroom Apartment",
            route: "Accra (Osu - East Legon)",
        },
        {
            name: "Michael Adeyemi",
            email: "michael.adeyemi@mail.com",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            moveSummary: "Studio Flat",
            route: "Lagos (Ikeja - Victoria Island)",
        },
        {
            name: "Chinelo Obi",
            email: "chinelo.obi@mail.com",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            moveSummary: "4 Bedroom Duplex",
            route: "Enugu (Independence Layout - GRA)",
        },
        {
            name: "Tariq Hassan",
            email: "tariq.hassan@mail.com",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            moveSummary: "3 Bedroom Flat",
            route: "Kano (Nassarawa - Sabon Gari)",
        },
        {
            name: "Amaka Uche",
            email: "amaka.uche@mail.com",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            moveSummary: "5 Bedroom Mansion",
            route: "Abuja (Asokoro - Maitama)",
        },
        {
            name: "Daniel Ekene",
            email: "daniel.ekene@mail.com",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            moveSummary: "1 Bedroom Studio",
            route: "Port Harcourt (GRA - Trans Amadi)",
        },
        {
            name: "Maya Okonkwo",
            email: "maya.okonkwo@mail.com",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            moveSummary: "3 Bedroom Bungalow",
            route: "Owerri (Ikenegbu - New Owerri)",
        },
        {
            name: "Bolanle Yusuf",
            email: "bolanle.yusuf@mail.com",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            moveSummary: "2 Bedroom Apartment",
            route: "Ibadan (Bodija - Ring Road)",
        },
        {
            name: "Nnamdi Okafor",
            email: "nnamdi.okafor@mail.com",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            moveSummary: "Luxury Penthouse",
            route: "Onitsha (Awka Road - GRA)",
        },
        {
            name: "Fatima Sani",
            email: "fatima.sani@mail.com",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            moveSummary: "Shared Room",
            route: "Zaria (Samaru - Basawa)",
        },
    ];

    return (
        <div>
            <div className="table_container">
                <div className="table_header">
                    <div className="left_table_head">
                        <h1>New Request</h1>
                    </div>
                    <div className="right_table_head">
                        <div className="search_icon">
                            <input type="text" placeholder="Search" />
                            <img src={searchIcon} alt="" />
                        </div>
                        <div className="filter_con">
                            <span>
                                <img src={filterIcon} alt="" />
                            </span>
                            <span>Filter</span>
                        </div>
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
                                        <div className="status td">
                                            <span><img src={dot} alt="" /></span>
                                            <span>New Request</span>
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
                    </table>
                </div>
            </div>
        </div>
    )
}

export default NewRequestAdmin