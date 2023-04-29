import React, {useState, useEffect} from "react";
import {setty, getty, empty} from "./hooks/hooks.js";
import {useProps} from "./hooks/prop-hooks.js";
import {Navbar} from "./navBar.js";
import {SearchBox} from "./searchBox.js";
import "../App.css";

export function Header() {
    const [belb, setBelb] = useState("");
    const {bought, setBought, setDis, updateTotal, setFillingdeets} = useProps();

    useEffect(() => {
        if (bought) {
            setBelb("BOUGHT!")
        } else {
            setBelb("NOT BOUGHT!")
        }
    }, [bought]);

    return(
        <>
            {!bought ? 
            <span onClick={() => setBelb("NOt BOUGHT!")}><Navbar /></span> : 
            <span onClick={() => {setBought(false); empty(setDis, updateTotal, setFillingdeets)}}><Navbar/></span>}
            <SearchBox />
            <p>{belb}</p>
        </>
    );
};

