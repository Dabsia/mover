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
import searchIcon from "../Assets/search-01.svg";
import filterIcon from "../Assets/filter-horizontal.svg";
import refreshIcon from "../Assets/refresh (1).svg";
import arrowDown from "../Assets/arrow-down-02.svg";
import avatar from "../Assets/Gb-Avatar.svg";
import dot from "../Assets/Dot.svg";
import viewMore from "../Assets/Eye.svg";
import "./newJobs.css";
import { useNavigate } from "react-router-dom";
import { getNewRequestJobs } from "../api/province";
import SkeletonLine from "./SkeletonLineLoader";
import { useQuery } from "@tanstack/react-query";
import PaginationComponent from "./Pagination";
import EmptyState from "./EmptyState";

const NewJobs = () => {
    const moveRequests = [
        {
            name: "Zara Mensah",
            email: "zara.mensah@mail.com",
            moveSummary: "2 Bedroom Apartment",
            route: "Accra (Osu - East Legon)",
        },
        {
            name: "Michael Adeyemi",
            email: "michael.adeyemi@mail.com",
            moveSummary: "Studio Flat",
            route: "Lagos (Ikeja - Victoria Island)",
        },
        {
            name: "Chinelo Obi",
            email: "chinelo.obi@mail.com",
            moveSummary: "4 Bedroom Duplex",
            route: "Enugu (Independence Layout - GRA)",
        },
        {
            name: "Tariq Hassan",
            email: "tariq.hassan@mail.com",
            moveSummary: "3 Bedroom Flat",
            route: "Kano (Nassarawa - Sabon Gari)",
        },
        {
            name: "Amaka Uche",
            email: "amaka.uche@mail.com",
            moveSummary: "5 Bedroom Mansion",
            route: "Abuja (Asokoro - Maitama)",
        },
        {
            name: "Daniel Ekene",
            email: "daniel.ekene@mail.com",
            moveSummary: "1 Bedroom Studio",
            route: "Port Harcourt (GRA - Trans Amadi)",
        },
        {
            name: "Maya Okonkwo",
            email: "maya.okonkwo@mail.com",
            moveSummary: "3 Bedroom Bungalow",
            route: "Owerri (Ikenegbu - New Owerri)",
        },
        {
            name: "Bolanle Yusuf",
            email: "bolanle.yusuf@mail.com",
            moveSummary: "2 Bedroom Apartment",
            route: "Ibadan (Bodija - Ring Road)",
        },
        {
            name: "Nnamdi Okafor",
            email: "nnamdi.okafor@mail.com",
            moveSummary: "Luxury Penthouse",
            route: "Onitsha (Awka Road - GRA)",
        },
        {
            name: "Fatima Sani",
            email: "fatima.sani@mail.com",
            moveSummary: "Shared Room",
            route: "Zaria (Samaru - Basawa)",
        },
    ];
    const [pageNumber, setPageNumber] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [numberOfRecords, setNumberOfRecords] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [newJobs, setNewJobs] = useState([]);
    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryKey: ["newJobs", pageNumber, numberOfRecords],
        queryFn: () => getNewRequestJobs(pageNumber, numberOfRecords),
        staleTime: Infinity,              // prevent re-fetching due to stale data
        refetchOnWindowFocus: false,      // don't refetch on tab/window focus
        refetchOnReconnect: false,        // don't refetch on network reconnect
        refetchInterval: false,
    });
    useEffect(() => {
        if (data?.result) {
            sessionStorage.removeItem("totalNewJobs")
            setNewJobs(data.result.items); // Set actual job data here
            console.log("Fetched jobs:", data.result.items);
            sessionStorage.setItem("totalNewJobs", data.result.totalCount)
            setTotalCount(data.result.totalCount);
        } else if (error) {
            console.log("Error fetching jobs:", error);
        }
    }, [data, error]);

    const filteredJobs = newJobs.filter((job) =>
        job.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (isLoading) {
            setNewJobs([]);
        }
    }, [isLoading]);

  useEffect(() => {
    console.log("Updated allJobs:", newJobs);
  }, [newJobs]);

  const handleViewMore = (moveCode, moveId) => {
    sessionStorage.setItem("moveCode", moveCode);
    sessionStorage.setItem("moveId", moveId);
    navigate("/view-new-jobs");
  };

  return (
    <div>
      <div className="table_container">
        <div className="table_header">
          <div className="left_table_head">
            <h1>New Jobs</h1>
          </div>
          <div className="right_table_head">
            <div className="search_icon">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search"
              />
              {/* <img src={searchIcon} alt="" /> */}
              <img src="/images/search-01.svg" alt="" />
            </div>
            {/* <div className="filter_con">
                            <span>
                                <img src="/images/filter-horizontal.svg" alt="" />
                            </span>
                            <span>Filter</span>
                        </div> */}
                        <div className="refresh">
                            <img src="/images/refresh (1).svg" alt="" />
                            {/* <img src={refreshIcon} alt="" /> */}
                        </div>
                    </div>
                </div>
                <div className="table_wrapper">
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
                            {filteredJobs.map((job, index) => (
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
                                        <div className="status td">
                                            <span>
                                                <img src="/images/Dot.svg" alt="" />
                                                {/* <img src={dot} alt="" /> */}
                                            </span>
                                            <span>New Request</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="progress_bar_new">
                                            <div className="progress_bar_moving_new"></div>
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
                    <PaginationComponent
                        totalCount={totalCount}
                        pageSize={numberOfRecords}
                        currentPage={pageNumber}
                        onPageChange={(page) => setPageNumber(page)}
                    />
                    {!isLoading && filteredJobs.length === 0 && (
                        <div className="empty_state_overlay">
                            <EmptyState />
                            <p>No new jobs right now</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewJobs;
