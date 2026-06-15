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
import dot from "../Assets/canceled_dot.svg"
import viewMore from "../Assets/Eye.svg"
import "./cancelledJobs.css"

const CancelledJobs = () => {
    const netherlandsMoves = [
        {
            name: "Anna van Dijk",
            email: "AnnaVanDijk@gmail.com",
            moveType: "3 Bedroom House",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Amsterdam (Damrak - Hilversum)",
        },
        {
            name: "Tom Jansen",
            email: "TomJansen@hotmail.com",
            moveType: "2 Bedroom Apartment",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Rotterdam (Blaak - Kralingen)",
        },
        {
            name: "Lisa de Vries",
            email: "LisaDeVries@ziggo.nl",
            moveType: "4 Bedroom Villa",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Utrecht (Leidsche Rijn - Wittevrouwen)",
        },
        {
            name: "Sophie van Leeuwen",
            email: "SophieVanLeeuwen@gmail.com",
            moveType: "Studio Apartment",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Den Haag (Scheveningen - Centrum)",
        },
        {
            name: "Joris Bakker",
            email: "JorisBakker@ziggo.nl",
            moveType: "5 Bedroom Mansion",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Eindhoven (Woensel - Centrum)",
        },
        {
            name: "Kees de Jong",
            email: "KeesdeJong@yahoo.com",
            moveType: "2 Bedroom House",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Groningen (Stadspark - Noorderstation)",
        },
        {
            name: "Maaike Meijer",
            email: "MaaikeMeijer@outlook.com",
            moveType: "3 Bedroom House",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Leiden (Binnenstad - Merenwijk)",
        },
        {
            name: "Pieter Smit",
            email: "PieterSmit@live.nl",
            moveType: "2 Bedroom Apartment",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Arnhem (Centrum - Geitenkamp)",
        },
        {
            name: "Diana Mulder",
            email: "DianaMulder@gmail.com",
            moveType: "3 Bedroom House",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Zwolle (Dieze - Stadshagen)",
        },
        {
            name: "Ruben van der Meer",
            email: "RubenVanderMeer@me.com",
            moveType: "4 Bedroom House",
            moveCompany: "Urban Movers", 
            moveCompanyEmail: "urbanmovers@gmail.com",
            route: "Rotterdam (Noord - Spangen)",
        },
    ];

    return (
        <div>
            <div className="table_container">
                <div className="table_header">
                    <div className="left_table_head">
                        <h1>Cancelled Request</h1>
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
                                        <span>Name</span>
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
                            {netherlandsMoves.map((move, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="name_td td">
                                            <div>
                                                <img src={avatar} alt="user-initials" />
                                            </div>
                                            <div className="name_text">
                                                <span>{move.name}</span>
                                                <span>{move.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="move_summary td">
                                            <span>{move.moveCompany}</span>
                                            <span>{move.moveCompanyEmail}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="move_summary td">
                                            <span>{move.moveType}</span>
                                            <span>{move.route}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="status_cancel td">
                                            <span>
                                                <img src={dot} alt="" />
                                            </span>
                                            <span>Cancelled</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="progress_bar_cancel">
                                            <div className="progress_bar_moving_cancel"></div>
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

export default CancelledJobs