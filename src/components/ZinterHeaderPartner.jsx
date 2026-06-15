import React from "react";
import "./zinterHeadPartner.css"
import zinterHead from "../Assets/new-logo-zinter.svg"
import infoIcon from "../Assets/Info-icon.svg"

const ZinterHeaderPartner = () => {
    return (
        <div className="zinter_head">
            <div>
                <img src={zinterHead} alt="" />
            </div>
            <div className="more_assist">
                <span> <img src={infoIcon} alt="" /></span>
                <span>Need more assistance ?</span>
            </div>
        </div>
    )
}

export default ZinterHeaderPartner