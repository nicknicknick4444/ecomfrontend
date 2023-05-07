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
                <span className="band-words-left">00000 111111</span>
                <span className="band-words-left">info@email.com</span>

                <span className="band-words-right">About Us</span>
                <span className="band-words-right">Contact Us</span>
                <div className="logo">
                    <img src="https://i.ibb.co/JsyBjLz/Logo-centre.png" />
                    {/* Use https://imgbb.com/ for image hosting */}
                </div>
            </div>
        </>
    )
};
