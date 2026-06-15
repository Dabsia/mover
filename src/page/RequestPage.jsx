import React, { useState } from "react";
// import SideBar from "../components/SideBar";
import SideBarAdmin from "../components/SideBarAdmin";
import AllJobs from "../components/AllJobs";
import AllRequest from "../components/AllRequest"
import AllRequestAdmin from "../components/AllRequestAdmin";
import NewJobs from "../components/NewJobs";
import InTransitJobs from "../components/InTransitJobs";
// import CompletedJobs from "../components/CompletedJobs";
import CompletedJobs from "../components/CompletedJobs"
import CancelJobs from "../components/CancelledJobs"
import "./jobsPage.css"
import NewRequestAdmin from "../components/NewRequestAdmin";
import InTransitRequests from "../components/InTransitRequest";
import CompletedRequest from "../components/CompletedRequest";
import CancelledJobs from "../components/CancelledRequest";

const RequestPage = () => {
    const [activeTab, setActiveTab] = useState("all-request")
    return (
        <div className="sidebar_jobs">
            <div>
                <SideBarAdmin />
            </div>
            <div className="jobs_container">
                <div className="job_header">
                    <div className={activeTab === "all-request" ? "job_header_text_active" : "job_header_text"}
                        onClick={() => setActiveTab("all-request")}>
                        <span>All Requests</span>
                        <span>175</span>
                    </div>
                    <div className={activeTab === "new" ? "job_header_text_active" : "job_header_text"}
                        onClick={() => setActiveTab("new")}>
                        <span>New Requests</span>
                        <span>18</span>
                    </div>
                    <div className={activeTab === "transit" ? "job_header_text_active" : "job_header_text"}
                        onClick={() => setActiveTab("transit")}>
                        <span>In Transit Requests</span>
                        <span>12</span>
                    </div>
                    <div className={activeTab === "complete" ? "job_header_text_active" : "job_header_text"}
                        onClick={() => setActiveTab("complete")}>
                        <span>Completed Requests</span>
                        <span>98</span>
                    </div>
                    <div className={activeTab === "cancel" ? "job_header_text_active" : "job_header_text"}
                        onClick={() => setActiveTab("cancel")}>
                        <span>Cancelled Requests</span>
                        <span>2</span>
                    </div>
                </div>
                <div>
                    {activeTab === "all-request" && <AllRequestAdmin />}
                    {activeTab === "new" && <NewRequestAdmin />}
                    {activeTab === "transit" && <InTransitRequests />}
                    {activeTab === "complete" && <CompletedRequest />}
                    {activeTab === "cancel" && <CancelledJobs />}
                </div>
            </div>
        </div>
    )
}

export default RequestPage