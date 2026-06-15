import React from "react";
import './emptyState.css'
const EmptyState = () => {
    return (
        <div
            className="empty_state_container"
            style={{
                backgroundImage: "url('/images/Background-pattern-decorative.svg')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "50%"
            }}
        >
            <img src="/images/Illustration.svg" alt="" />
        </div>


    )
}

export default EmptyState