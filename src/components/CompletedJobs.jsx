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
import dot from "../Assets/completed_dot.svg"
import viewMore from "../Assets/Eye.svg"
import "./completedJobs.css"
import { getCompletedJobs } from "../api/province";
import SkeletonLine from "./SkeletonLineLoader";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EmptyState from "./EmptyState";

const CompletedJobs = () => {
    const completedRequests = [
        {
            name: "Chidera Okafor",
            email: "chidera.okafor@mail.com",
            initials: "CO",
            moveSummary: "2 Bedroom Flat",
            route: "Lagos (Yaba - Surulere)",
        },
        {
            name: "Mariam Yusuf",
            email: "mariam.yusuf@mail.com",
            initials: "MY",
            moveSummary: "3 Bedroom Duplex",
            route: "Abuja (Maitama - Asokoro)",
        },
        {
            name: "Emmanuel Bassey",
            email: "emmanuel.bassey@mail.com",
            initials: "EB",
            moveSummary: "1 Bedroom Apartment",
            route: "Calabar (Marian - Ikot Ansa)",
        },
        {
            name: "Zainab Bello",
            email: "zainab.bello@mail.com",
            initials: "ZB",
            moveSummary: "4 Bedroom House",
            route: "Kaduna (Barnawa - Ungwan Rimi)",
        },
        {
            name: "Ifeanyi Nwachukwu",
            email: "ifeanyi.nwachukwu@mail.com",
            initials: "IN",
            moveSummary: "5 Bedroom Mansion",
            route: "Owerri (Douglas - Ikenegbu)",
        },
        {
            name: "Kelechi Umeh",
            email: "kelechi.umeh@mail.com",
            initials: "KU",
            moveSummary: "2 Bedroom Shared Flat",
            route: "Port Harcourt (D-line - GRA)",
        },
        {
            name: "Fatima Sani",
            email: "fatima.sani@mail.com",
            initials: "FS",
            moveSummary: "Luxury Penthouse",
            route: "Kano (Nassarawa - Hotoro)",
        },
        {
            name: "Tope Balogun",
            email: "tope.balogun@mail.com",
            initials: "TB",
            moveSummary: "3 Bedroom Bungalow",
            route: "Ibadan (Molete - Bodija)",
        },
        {
            name: "Grace Enoh",
            email: "grace.enoh@mail.com",
            initials: "GE",
            moveSummary: "2 Bedroom Condo",
            route: "Benin (GRA - Ring Road)",
        },
        {
            name: "Nura Suleiman",
            email: "nura.suleiman@mail.com",
            initials: "NS",
            moveSummary: "Studio Apartment",
            route: "Sokoto (Arkilla - Gawon Nama)",
        },
    ];
    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfRecords, setNumberOfRecords] = useState(5);
    const [completeJobs, setCompleteJobs] = useState([]);
    const navigate = useNavigate();
    const { data, isLoading, error } = useQuery({
        queryKey: ["completed", pageNumber, numberOfRecords],
        queryFn: () => getCompletedJobs(pageNumber, numberOfRecords),
        staleTime: Infinity,              // prevent re-fetching due to stale data
        refetchOnWindowFocus: false,      // don't refetch on tab/window focus
        refetchOnReconnect: false,        // don't refetch on network reconnect
        refetchInterval: false,
    });
    useEffect(() => {
        if (data?.result) {
            sessionStorage.removeItem("totalCompletedJobs")
            setCompleteJobs(data.result.items); // Set actual job data here
            console.log("Fetched jobs:", data.result.items);
            sessionStorage.setItem("totalCompletedJobs", data.result.totalCount)

        } else if (error) {
            console.log("Error fetching jobs:", error);
        }
    }, [data, error]);

    useEffect(() => {
        console.log("Updated allJobs:", completeJobs);
    }, [completeJobs]);

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
                        <h1>Completed Jobs</h1>
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
                            {/* {completeJobs.map((request, index) => (
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
                            {completeJobs.map((job, index) => (
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
                                        <div className="status_completed td">
                                            <span>
                                                <img src="/images/completed_dot.svg" alt="" />
                                                {/* <img src={dot} alt="" /> */}
                                            </span>
                                            <span>Completed</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="progress_bar_complete">
                                            <div className="progress_bar_moving_complete"></div>
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
                    {!isLoading && completeJobs.length === 0 && (
                        <div className="empty_state_overlay">
                            <EmptyState />
                            <p>No Completed jobs right now</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CompletedJobs