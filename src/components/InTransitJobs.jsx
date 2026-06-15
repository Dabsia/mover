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
import dot from "../Assets/intransit_dot.svg"
import viewMore from "../Assets/Eye.svg"
import "./inTransitJobs.css"
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getInProgressJobs } from "../api/province";
import SkeletonLine from "./SkeletonLineLoader";
import EmptyState from "./EmptyState";

const InTransitJobs = () => {
    const inTransitRequests = [
        {
            name: "Leila Bakari",
            email: "leila.bakari@mail.com",
            initials: "LB",
            moveSummary: "1 Bedroom Apartment",
            route: "Nairobi (Westlands - Kilimani)",
        },
        {
            name: "Samuel Adekunle",
            email: "samuel.adekunle@mail.com",
            initials: "SA",
            moveSummary: "3 Bedroom Duplex",
            route: "Abuja (Wuse - Garki)",
        },
        {
            name: "Blessing Eze",
            email: "blessing.eze@mail.com",
            initials: "BE",
            moveSummary: "2 Bedroom Flat",
            route: "Enugu (New Haven - Uwani)",
        },
        {
            name: "Tunde Afolabi",
            email: "tunde.afolabi@mail.com",
            initials: "TA",
            moveSummary: "4 Bedroom Mansion",
            route: "Lagos (Ajah - Ikoyi)",
        },
        {
            name: "Adama Diallo",
            email: "adama.diallo@mail.com",
            initials: "AD",
            moveSummary: "Studio Apartment",
            route: "Dakar (Plateau - Almadies)",
        },
        {
            name: "Yemi Okoro",
            email: "yemi.okoro@mail.com",
            initials: "YO",
            moveSummary: "5 Bedroom House",
            route: "Owerri (Orji - Irete)",
        },
        {
            name: "Fatou Jallow",
            email: "fatou.jallow@mail.com",
            initials: "FJ",
            moveSummary: "2 Bedroom Shared",
            route: "Banjul (Fajara - Bakau)",
        },
        {
            name: "Chris Nwankwo",
            email: "chris.nwankwo@mail.com",
            initials: "CN",
            moveSummary: "3 Bedroom Terrace",
            route: "Onitsha (Nkpor - Odoakpu)",
        },
        {
            name: "Halima Bello",
            email: "halima.bello@mail.com",
            initials: "HB",
            moveSummary: "Luxury Condo",
            route: "Kano (Tarauni - Gwarzo)",
        },
        {
            name: "Victor Essien",
            email: "victor.essien@mail.com",
            initials: "VE",
            moveSummary: "4 Bedroom Townhouse",
            route: "Calabar (State Housing - Marian)",
        },
    ];
    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfRecords, setNumberOfRecords] = useState(5);
    const [inProgressJobs, setInProgressJobs] = useState([]);
    const navigate = useNavigate();
    const { data, isLoading, error } = useQuery({
        queryKey: ["intransitJobs", pageNumber, numberOfRecords],
        queryFn: () => getInProgressJobs(pageNumber, numberOfRecords),
        staleTime: Infinity,              // prevent re-fetching due to stale data
        refetchOnWindowFocus: false,      // don't refetch on tab/window focus
        refetchOnReconnect: false,        // don't refetch on network reconnect
        refetchInterval: false,
    });
    useEffect(() => {
        if (data?.result) {
            sessionStorage.removeItem("totalInTransit")
            setInProgressJobs(data.result.items); // Set actual job data here
            console.log("Fetched jobs:", data.result.items);
            sessionStorage.setItem("totalInTransit", data.result.totalCount)

        } else if (error) {
            console.log("Error fetching jobs:", error);
        }
    }, [data, error]);

    useEffect(() => {
        console.log("Updated allJobs:", inProgressJobs);
    }, [inProgressJobs]);

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
                        <h1>In Transit</h1>
                    </div>
                    <div className="right_table_head">
                        <div className="search_icon">
                            <input type="text" placeholder="Search" />
                            {/* <img src={searchIcon} alt="" /> */}
                            <img src="/images/search-01.svg" alt="" />
                        </div>
                        <div className="filter_con">
                            <span>
                                {/* <img src={filterIcon} alt="" /> */}
                                <img src="/images/filter-horizontal.svg" alt="" />
                            </span>
                            <span>Filter</span>
                        </div>
                        <div className="refresh">
                            {/* <img src={refreshIcon} alt="" /> */}
                            <img src="/images/refresh (1).svg" alt="" />
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
                                        <img src="/images/arrow-down-02.svg" alt="" />
                                        {/* <img src={arrowDown} alt="" /> */}
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <span>Move Summary</span>
                                        <img src="/images/arrow-down-02.svg" alt="" />
                                        {/* <img src={arrowDown} alt="" /> */}
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <span>Status</span>
                                        <img src="/images/arrow-down-02.svg" alt="" />
                                        {/* <img src={arrowDown} alt="" /> */}
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <span>Progress</span>
                                        <img src="/images/arrow-down-02.svg" alt="" />
                                        {/* <img src={arrowDown} alt="" /> */}
                                    </div>
                                </th>
                                <th>

                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* {inTransitRequests.map((request, index) => (
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
                                            <span>{request.moveSummary}</span>
                                            <span>{request.route}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="status_transit td">
                                            <span><img src={dot} alt="" /></span>
                                            <span>In Transit</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="progress_bar_transit">
                                            <div className="progress_bar_moving_transit"></div>
                                        </div>
                                    </td>
                                    <td className="view">
                                        <img src={viewMore} alt="view more" />
                                    </td>
                                </tr>
                            ))} */}
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
                            {inProgressJobs.map((job, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="name_td td">
                                            <div>
                                                <img src="/images/Gb-Avatar.svg" alt="" />
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
                                        <div className="status_transit td">
                                            <span>
                                                <img src="/images/intransit_dot.svg" alt="" />
                                                {/* <img src={dot} alt="" /> */}
                                            </span>
                                            <span>In Transit</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="progress_bar_transit">
                                            <div className="progress_bar_moving_transit"></div>
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
                    {!isLoading && inProgressJobs.length === 0 && (
                        <div className="empty_state_overlay">
                            <EmptyState />
                            <p>No in transit jobs right now</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default InTransitJobs