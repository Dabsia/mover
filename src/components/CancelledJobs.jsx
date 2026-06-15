import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SkeletonLine from "./SkeletonLineLoader";
import { getCancelledJobs } from "../api/province";
import EmptyState from "./EmptyState";

const CompletedJobs = () => {
    const netherlandsMoves = [
        {
            name: "Anna van Dijk",
            email: "AnnaVanDijk@gmail.com",
            moveType: "3 Bedroom House",
            route: "Amsterdam (Damrak - Hilversum)",
        },
        {
            name: "Tom Jansen",
            email: "TomJansen@hotmail.com",
            moveType: "2 Bedroom Apartment",
            route: "Rotterdam (Blaak - Kralingen)",
        },
        {
            name: "Lisa de Vries",
            email: "LisaDeVries@ziggo.nl",
            moveType: "4 Bedroom Villa",
            route: "Utrecht (Leidsche Rijn - Wittevrouwen)",
        },
        {
            name: "Sophie van Leeuwen",
            email: "SophieVanLeeuwen@gmail.com",
            moveType: "Studio Apartment",
            route: "Den Haag (Scheveningen - Centrum)",
        },
        {
            name: "Joris Bakker",
            email: "JorisBakker@ziggo.nl",
            moveType: "5 Bedroom Mansion",
            route: "Eindhoven (Woensel - Centrum)",
        },
        {
            name: "Kees de Jong",
            email: "KeesdeJong@yahoo.com",
            moveType: "2 Bedroom House",
            route: "Groningen (Stadspark - Noorderstation)",
        },
        {
            name: "Maaike Meijer",
            email: "MaaikeMeijer@outlook.com",
            moveType: "3 Bedroom House",
            route: "Leiden (Binnenstad - Merenwijk)",
        },
        {
            name: "Pieter Smit",
            email: "PieterSmit@live.nl",
            moveType: "2 Bedroom Apartment",
            route: "Arnhem (Centrum - Geitenkamp)",
        },
        {
            name: "Diana Mulder",
            email: "DianaMulder@gmail.com",
            moveType: "3 Bedroom House",
            route: "Zwolle (Dieze - Stadshagen)",
        },
        {
            name: "Ruben van der Meer",
            email: "RubenVanderMeer@me.com",
            moveType: "4 Bedroom House",
            route: "Rotterdam (Noord - Spangen)",
        },
    ];
    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfRecords, setNumberOfRecords] = useState(5);
    const [cancelledJobs, setCancelledJobs] = useState([]);
    const navigate = useNavigate();
    const { data, isLoading, error } = useQuery({
        queryKey: ["cancelledJobs", pageNumber, numberOfRecords],
        queryFn: () => getCancelledJobs(pageNumber, numberOfRecords),
        staleTime: Infinity,              // prevent re-fetching due to stale data
        refetchOnWindowFocus: false,      // don't refetch on tab/window focus
        refetchOnReconnect: false,        // don't refetch on network reconnect
        refetchInterval: false,
    });
    useEffect(() => {
        if (data?.result) {
            sessionStorage.removeItem("totalCancelledJobs")
            setCancelledJobs(data.result.items);
            // setAllCount(data.result.totalCount)// Set actual job data here
            console.log("Fetched jobs:", data.result.items);
            sessionStorage.setItem("totalCancelledJobs", data.result.totalCount)
        } else if (error) {
            console.log("Error fetching jobs:", error);
        }
    }, [data, error]);

    useEffect(() => {
        console.log("Updated allJobs:", cancelledJobs);
    }, [cancelledJobs]);

    const handleViewMore = (moveCode, moveId) => {
        sessionStorage.setItem('moveCode', moveCode)
        sessionStorage.setItem('moveId', moveId)
        navigate("/view-new-jobs");
    };

    return (
        <div>
            <div className="table_container">
                <div className="table_header">

                    <div className="left_table_head">
                        <h1>Cancelled Jobs</h1>
                    </div>
                    <div className="right_table_head">
                        <div className="search_icon">
                            <input type="text" placeholder="Search" />
                            {/* <img src={searchIcon} alt="" /> */}
                            <img src="/images/search-01.svg" alt="" />
                        </div>
                        <div className="filter_con">
                            <span>
                                <img src="/images/filter-horizontal.svg" alt="" />
                                {/* <img src={filterIcon} alt="" /> */}
                            </span>
                            <span>Filter</span>
                        </div>
                        <div className="refresh">
                            <img src="/images/refresh (1).svg" alt="" />
                            {/* <img src={refreshIcon} alt="" /> */}
                        </div>
                    </div>
                </div>
                <div className="table_wrapper" >
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
                            {/* <EmptyState /> */}

                            {isLoading &&
                                <tr>
                                    <td>
                                        <SkeletonLine />
                                    </td>
                                    <td>
                                        <SkeletonLine />
                                    </td>
                                    <td>
                                        <SkeletonLine />
                                    </td>
                                    <td>
                                        <SkeletonLine />
                                    </td>

                                </tr>

                            }
                            {isLoading &&
                                <tr>
                                    <td>
                                        <SkeletonLine />
                                    </td>
                                    <td>
                                        <SkeletonLine />
                                    </td>
                                    <td>
                                        <SkeletonLine />
                                    </td>
                                    <td>
                                        <SkeletonLine />
                                    </td>

                                </tr>

                            }
                            {isLoading &&
                                <tr>
                                    <td>
                                        <SkeletonLine />
                                    </td>
                                    <td>
                                        <SkeletonLine />
                                    </td>
                                    <td>
                                        <SkeletonLine />
                                    </td>
                                    <td>
                                        <SkeletonLine />
                                    </td>

                                </tr>

                            }

                            {cancelledJobs.map((job, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="name_td td">
                                            <div>
                                                <img src="/images/Gb-Avatar.svg" alt="" />
                                                {/* <img src={avatar} alt="user-initials" /> */}
                                            </div>
                                            <div className="name_text">
                                                <span>{job.fullName}</span>
                                                <span>{job.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="move_summary td">
                                            <span>{job.numberOfRooms} Bedroom House</span>
                                            <span>{job.address}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="status_cancel td">
                                            <span>
                                                <img src="/images/canceled_dot.svg" alt="" />
                                                {/* <img src={dot} alt="" /> */}
                                            </span>
                                            <span>Cancelled</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="progress_bar_cancel">
                                            <div className="progress_bar_moving_cancel"></div>
                                        </div>
                                    </td>
                                    <td className="view" onClick={() => handleViewMore(job.moveCode, job.moveId)}>
                                        {/* <img src={viewMore} alt="view more" /> */}
                                        <img src="/images/Eye.svg" alt="" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!isLoading && cancelledJobs.length === 0 && (
                        <div className="empty_state_overlay">
                            <EmptyState />
                            <p>No Cancelled jobs right now</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CompletedJobs