// import React, {useEffect, useState} from "react";
// import {Link} from "react-router-dom";
// import {useProps} from "./hooks/prop-hooks.js";
// import {setty, getty, toTitle} from "./hooks/hooks.js";
// import {BasketPage} from "./basketList.js";
// import axios from "axios";
// import "../App.css";

import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "../App.css";

export function Topband() {
    return (
        <>
            <div className="top-band">
                <div className="band-words-left1"><img className="icons" src="images/phone.png" />: 00000 111111</div>
                <div className="band-words-left2"><img className="icons" src="images/email.png" />: info@email.com</div>

                <div className="band-words-right">About Us</div>
                <div className="band-words-right">Contact Us</div>
                <div className="logo">
                    <img src="https://i.ibb.co/JsyBjLz/Logo-centre.png" />
                    {/* Use https://imgbb.com/ for image hosting */}
                </div>
                <div className="logo-mob">
                    <img src="https://i.ibb.co/JsyBjLz/Logo-centre.png" />
                </div>
            </div>
        </>
    )
};
