import React, { useState } from "react";
// import SideBar from "../components/SideBar";
import SideBarAdmin from "../components/SideBarAdmin";
import AllJobs from "../components/AllJobs";
import NewJobs from "../components/NewJobs";
import InTransitJobs from "../components/InTransitJobs";
// import CompletedJobs from "../components/CompletedJobs";
import CompletedJobs from "../components/CompletedJobs"
import CancelJobs from "../components/CancelledJobs"
import "./jobsPage.css"
import AllPartner from "../components/AllPartner";
import ActivePartner from "../components/ActivePartner";
import SuspendedPartner from "../components/SuspendedPartner";

const UsersPage = () => {
    const [activeTab, setActiveTab] = useState("all")
    return (
        <div className="sidebar_jobs">
            <div>
                <SideBarAdmin />
            </div>
            <div className="jobs_container">
                <div className="job_header">
                    <div className={activeTab === "all" ? "job_header_text_active" : "job_header_text"}
                        onClick={() => setActiveTab("all")}>
                        <span>All Partners</span>
                        <span>175</span>
                    </div>
                    <div className={activeTab === "new" ? "job_header_text_active" : "job_header_text"}
                        onClick={() => setActiveTab("new")}>
                        <span>Active Partners</span>
                        <span>18</span>
                    </div>
                    <div className={activeTab === "transit" ? "job_header_text_active" : "job_header_text"}
                        onClick={() => setActiveTab("transit")}>
                        <span>Suspended Partners</span>
                        <span>12</span>
                    </div>
                    {/* <div className={activeTab === "complete" ? "job_header_text_active" : "job_header_text"}
                        onClick={() => setActiveTab("complete")}>
                        <span>Completed Request</span>
                        <span>98</span>
                    </div>
                    <div className={activeTab === "cancel" ? "job_header_text_active" : "job_header_text"}
                        onClick={() => setActiveTab("cancel")}>
                        <span>Cancelled Request</span>
                        <span>2</span>
                    </div> */}
                </div>
                <div>
                    {activeTab === "all" && <AllPartner />}
                    {activeTab === "new" && <ActivePartner />}
                    {activeTab === "transit" && <SuspendedPartner />}
                    {activeTab === "complete" && <CompletedJobs />}
                    {activeTab === "cancel" && <CancelJobs />}
                </div>
            </div>
        </div>
    )
}

export default UsersPage