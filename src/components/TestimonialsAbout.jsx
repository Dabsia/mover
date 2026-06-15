import React from "react";
import nextBtn from "../Assets/Next.svg"
import backBtn from "../Assets/Back.svg"
import dp from "../Assets/Male.svg"
import "./testimonials.css"


const testimonialsAboutUs = () => {
    return (
        <div className="test_container">
            <div className="test_head">
                <span>TESTIMONIALS</span>
                <div className="text_head_text">
                    <h3>Don't just take our word for it,
                        Here is what our users are saying</h3>
                    <div className="text_head_btn">
                        <img className="img_btn" src={nextBtn} alt="" />
                        <img className="img_btn" src={backBtn} alt="" />
                    </div>
                </div>
            </div>
            <div className="test_people_container">
                <div className="test_people">
                    <span>Lorem ipsum dolor,
                        sit amet consectetur adipisicing elit.
                        Debitis non voluptatum aspernatur
                        doloremque vitae consequuntur ea
                        veritatis maxime! Iste error esse hic
                        quam temporibus eius,
                        quas distinctio nesciunt optio adipisci!
                    </span>
                    <div className="test_people_detail">
                        <div>
                            <img src={dp} alt="" />
                        </div>
                        <div className="test_people_name">
                            <span>Chidozie Usman</span>
                            <span>Zaanstad</span>
                        </div>
                    </div>
                </div>
                <div className="test_people">
                    <span>Lorem ipsum dolor,
                        sit amet consectetur adipisicing elit.
                        Debitis non voluptatum aspernatur
                        doloremque vitae consequuntur ea
                        veritatis maxime! Iste error esse hic
                        quam temporibus eius,
                        quas distinctio nesciunt optio adipisci!
                    </span>
                    <div className="test_people_detail">
                        <div>
                            <img src={dp} alt="" />
                        </div>
                        <div className="test_people_name">
                            <span>Chidozie Usman</span>
                            <span>Zaanstad</span>
                        </div>
                    </div>
                </div>
                <div className="test_people">
                    <span>Lorem ipsum dolor,
                        sit amet consectetur adipisicing elit.
                        Debitis non voluptatum aspernatur
                        doloremque vitae consequuntur ea
                        veritatis maxime! Iste error esse hic
                        quam temporibus eius,
                        quas distinctio nesciunt optio adipisci!
                    </span>
                    <div className="test_people_detail">
                        <div>
                            <img src={dp} alt="" />
                        </div>
                        <div className="test_people_name">
                            <span>Chidozie Usman</span>
                            <span>Zaanstad</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default testimonialsAboutUs