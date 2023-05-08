import React, {useState, useEffect} from "react";
import {setty, getty, empty} from "./hooks/hooks.js";
import {useProps} from "./hooks/prop-hooks.js";
import {Basket} from "./basket.js";
import {Navbar} from "./navBar.js";
import {SearchBox} from "./searchBox.js";
import {Topband} from "./topBand.js";
import "../App.css";

export function Header() {
    const [belb, setBelb] = useState("");
    const {bought, setBought, setDis, updateTotal, setFillingdeets, 
        burger, setBurger} = useProps();

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
            <SearchBox />
            <Basket />
            <div className="nav-edge">
            {!bought ? 
            <span onClick={() => setBelb("NOt BOUGHT!")}><Navbar /></span> : 
            <span onClick={() => {setBought(false); empty(setDis, updateTotal, setFillingdeets); setBurger(true)}}><Navbar/></span>}
            </div>
            <div className="nav-edge"></div>
            {/* <div className="search-box"><SearchBox /></div> */}
            <p>{belb}</p>
        </>
    );
};

