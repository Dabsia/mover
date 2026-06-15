import React, { useEffect, useState } from "react";
import "./allJobs.css"
import PaginationComponent from "./Pagination";
import EmptyState from "./EmptyState";
import SkeletonLine from "./SkeletonLineLoader";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getIncomingJobs } from "../api/province";


const InComing = ({onClose}) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [numberOfRecords, setNumberOfRecords] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    // const [allCount, setAllCount] =
    const [allJobs, setAllJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryKey: ["getIncomingJobs", pageNumber, numberOfRecords],
        queryFn: () => getIncomingJobs({pageNumber, numberOfRecords}),
        staleTime: Infinity,              // prevent re-fetching due to stale data
        refetchOnWindowFocus: false,      // don't refetch on tab/window focus
        refetchOnReconnect: false,        // don't refetch on network reconnect
        refetchInterval: false,
    });





    const filteredJobs = allJobs.filter((job) =>
        job.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (isLoading) {
            setAllJobs([]); // clear jobs while fetching
        }
    }, [isLoading]);


    useEffect(() => {
        if (data?.result) {
            // setAllJobs([])
            sessionStorage.removeItem("totalAllJobs")
            setAllJobs(data.result.items);
            // setAllCount(data.result.totalCount) // Set actual job data here
            console.log("Fetched jobs:", data.result.items);
            sessionStorage.setItem("totalAllJobs", data.result.totalCount)
            setTotalCount(data.result.totalCount);

        } else if (error) {
            console.log("Error fetching jobs:", error);
        }
    }, [data, error]);



    useEffect(() => {
        console.log("Updated allJobs:", allJobs);
    }, [allJobs]);

    const handleViewMore = (moveCode, moveId) => {
        sessionStorage.setItem('moveCode', moveCode)
        sessionStorage.setItem('moveId', moveId)
        navigate("/view-new-jobs");
    };

    return (
        <div className="table_all">
            <div className="table_container_modal">
                <div className="table_header">
                    <div className="left_table_head">
                        <h1>Incoming jobs</h1>
                    </div>
                    <div className="right_table_head">
                        <div className="search_icon">
                            <input value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search" />
                            {/* <img src={searchIcon} alt="" /> */}
                            <img src="/images/search-01.svg" alt="" />
                        </div>
                        {/* <div className="filter_con">
                            <span>
                                <img src="/images/filter-horizontal.svg" alt="" />
                            </span>
                            <span>Filter</span>
                        </div> */}
                        {/* <div className="refresh">
                            <img src={refreshIcon} alt="" />
                            <img src="/images/refresh (1).svg" alt="" />
                        </div> */}
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
                            <p>No jobs right now</p>
                        </div>
                    )}
                </div>
            </div>
            {/* {true && <Loader />} */}
            <div className="close_btn">
                <img src="/images/cta - Cancel.svg" alt="" onClick={onClose} />
            </div>
        </div>
    )
}

export default InComing