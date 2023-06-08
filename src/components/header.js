import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {setty, getty, empty} from "./hooks/hooks.js";
import {useProps} from "./hooks/prop-hooks.js";
import {Basket} from "./basket.js";
import {Navbar} from "./navBar.js";
import {SearchBox} from "./searchBox.js";
import {Topband} from "./topBand.js";
import "../App.css";

export function Header() {
    const [belb, setBelb] = useState("");
    const [widthy, setWidthy] = useState(window.innerWidth);
    // const [mag, setMag] = useState(false);
    const {bought, setBought, setDis, updateTotal, setFillingdeets, 
        burger, setBurger, mag, setMag} = useProps();

    useEffect(() => {
        if (mag) {
            setMag(false);
        }
    }, []);
    
    useEffect(() => {
        if (bought) {
            setBelb("BOUGHT!")
        } else {
            setBelb("NOT BOUGHT!")
        }
    }, [bought]);


    useEffect(() => {
        function resizeListen() {
            console.log("YEG!", widthy);
            setWidthy(window.innerWidth);
            return window.innerWidth;
        };
        window.addEventListener("resize", resizeListen);
    });

    return(
        <>
                <Topband />
                <div className="mid">
                    <div className="search-box"><SearchBox /></div>

                    <div className="click-search" onClick={() => {setMag(true); setBurger(false)}}>
                        <div className="search-box-mob" style={{display: !mag ? "none" : "block"}}><SearchBox /></div>
                        <div style={{display: !mag ? "block" : "none"}}><img src="https://i.ibb.co/BnmP5Qq/glass.png" className="glass" /></div>
                    </div>
                    
                    {/* CSS HERE */}
                    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&family=Kameron:wght@700&family=Trispace:wght@700&family=VT323&display=swap" rel="stylesheet">
                    </link>


                    <Link to={{pathname: "/"}}>
                    <div className="logo">
                        <img src="https://i.ibb.co/SV4RNV5/Main-Logo5.png" />
                        {/* Use https://imgbb.com/ for image hosting */}
                        {/* https://i.ibb.co/wN5mz6D/Main-Logo5.png */}
                    </div>
                    <div className="logo2" id="logo2" style={{ width: widthy / 4.5 }}>
                        <img src="https://i.ibb.co/SV4RNV5/Main-Logo5.png" style={{ width: widthy / 4.5}} />
                    </div>
                    </Link>
                    {/* <div><img src="https://i.ibb.co/G31Vcrk/basket.png" className="basket" /></div> */}
                    <Basket />
                </div>
                <div>
                {!bought ? 
                <span onClick={() => setBelb("NOt BOUGHT!")}><Navbar /></span> : 
                <span onClick={() => {setBought(false); empty(setDis, updateTotal, setFillingdeets); setBurger(true)}}><Navbar/></span>}
                </div>
                {/* <div className="nav-edge"></div> */}
                {/* <div className="search-box"><SearchBox /></div> */}
                <p>{belb}</p>
        </>
    );
};

