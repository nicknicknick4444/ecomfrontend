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
    const {bought, setBought, setDis, updateTotal, setFillingdeets, 
        setBurger, mag, setMag} = useProps();

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
            setWidthy(window.innerWidth);
            return window.innerWidth;
        };
        window.addEventListener("resize", resizeListen);
    });

    return(
        <>
            <div id="header">
                <Topband />
                <div className="mid">
                    <div className="search-box"><SearchBox /></div>

                    <div className="click-search" onClick={() => {setMag(true); setBurger(false)}}>
                        <div className="search-box-mob" style={{display: !mag ? "none" : "block"}}><SearchBox /></div>
                        <div style={{display: !mag ? "block" : "none"}}><img src="https://i.ibb.co/BnmP5Qq/glass.png" className="glass" /></div>
                    </div>
                    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&family=Kameron:wght@700&family=Trispace:wght@700&family=VT323&display=swap" rel="stylesheet">
                    </link>


                    <Link onClick={bought ? () => {empty(setDis, updateTotal, setFillingdeets)} : null} to={{pathname: "/"}}>
                    <div className="logo">
                        <img src="https://i.ibb.co/SV4RNV5/Main-Logo5.png" />
                    </div>
                    <div className="logo2" id="logo2" style={{ width: widthy / 4.5 }}>
                        <img src="https://i.ibb.co/SV4RNV5/Main-Logo5.png" style={{ width: widthy / 4.5}} />
                    </div>
                    </Link>
                    
                    <Basket />
                </div>
                <div>
                    {!bought ? 
                        <span onClick={() => setBelb("NOt BOUGHT!")}><Navbar /></span> : 
                        <span onClick={() => {setBought(false); empty(setDis, updateTotal, setFillingdeets); setBurger(true)}}>
                            <Navbar/>
                        </span>
                    }
                </div>
            </div>
            <div id="header-overflow"></div>
        </>
    );
};

