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

    return(
        <>
                <Topband />
                <div className="mid">
                    <div className="search-box"><SearchBox /></div>
                    <div className="click-search" onClick={() => {setMag(true); setBurger(false)}}>
                        <div className="search-box-mob" style={{display: !mag ? "none" : "block"}}><SearchBox /></div>
                        <div style={{display: !mag ? "block" : "none"}}><img src="https://i.ibb.co/BnmP5Qq/glass.png" className="glass" /></div>
                    </div>
                    <Link to={{pathname: "/"}}>
                    <div className="logo">
                        <img src="https://i.ibb.co/Qbwywck/Main-Logo3.png" />
                        {/* Use https://imgbb.com/ for image hosting */}
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

