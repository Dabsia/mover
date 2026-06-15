import React, { useState } from "react";
import SideBar from "../components/SideBar";
import AllJobs from "../components/AllJobs";
import NewJobs from "../components/NewJobs";
import InTransitJobs from "../components/InTransitJobs";
// import CompletedJobs from "../components/CompletedJobs";
import CompletedJobs from "../components/CompletedJobs"
import CancelJobs from "../components/CancelledJobs"
import "./jobsPage.css"

const JobsPage = () => {
    const [activeTab, setActiveTab] = useState("all")
    return (
        <div className="sidebar_jobs">
            <div>
                <SideBar />
            </div>
            <div className="jobs_container">
                <div className="job_header">
                    <div className={activeTab === "all" ? "job_header_text_active" : "job_header_text"}
                        onClick={() => setActiveTab("all")}>
                        <span>All Jobs</span>
                        <span> {sessionStorage.getItem("totalAllJobs")} </span>
                    </div>
                    <div className={activeTab === "new" ? "job_header_text_active" : "job_header_text"}
                        onClick={() => setActiveTab("new")}>
                        <span>New Jobs</span>
                        <span> {sessionStorage.getItem("totalNewJobs")} </span>
                    </div>
                    <div className={activeTab === "transit" ? "job_header_text_active" : "job_header_text"}
                        onClick={() => setActiveTab("transit")}>
                        <span>In Transit Jobs</span>
                        <span> {sessionStorage.getItem("totalInTransit")} </span>
                    </div>
                    <div className={activeTab === "complete" ? "job_header_text_active" : "job_header_text"}
                        onClick={() => setActiveTab("complete")}>
                        <span>Completed Jobs</span>
                        <span> {sessionStorage.getItem("totalCompletedJobs")} </span>
                    </div>
                    <div className={activeTab === "cancel" ? "job_header_text_active" : "job_header_text"}
                        onClick={() => setActiveTab("cancel")}>
                        <span>Cancelled Jobs</span>
                        <span> {sessionStorage.getItem("totalCancelledJobs")} </span>
                    </div>
                </div>
                <div>
                    {activeTab === "all" && <AllJobs />}
                    {activeTab === "new" && <NewJobs />}
                    {activeTab === "transit" && <InTransitJobs />}
                    {activeTab === "complete" && <CompletedJobs />}
                    {activeTab === "cancel" && <CancelJobs />}
                </div>
            </div>
        </div>
    )
}

export default JobsPage