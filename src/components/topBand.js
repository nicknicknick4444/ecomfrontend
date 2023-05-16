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
                <div className="band-words-left1"><img className="icons" src="https://i.ibb.co/ts1TSDD/tel-icon1.png" />00000 111111</div>
                <div className="band-words-left2"><img className="icons" src="https://i.ibb.co/3h4vJ4c/email-icon1.png" />info@email.com</div>
                <div className="band-words-right">About Us</div>
                <div className="band-words-right">Contact Us</div>

                <div className="logo-mob">
                    <Link to={{pathname: "/"}} >
                        <img className="logo-mob" src="https://i.ibb.co/fkCNCLv/Main-Logo-Mob.png" />
                    </Link>
                </div>
            </div>
        </>
    )
};
