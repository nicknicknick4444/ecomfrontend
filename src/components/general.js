import React, {useEffect, useState} from "react";
import {useParams, Link, useLocation} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {toTitle, rand_parag, get_parags} from "./hooks/hooks.js";
import {Header} from "./header.js";
import {Footer} from "./footer.js";

export function General() {
    
    const {checking, setChecking, setBurger} = useProps();
    var loc = useLocation();
    const [parags, setParags] = useState([]);

    function get_title() {
        var loc_clean = loc.pathname;
        var loc_clean = loc_clean.replace("-", " ").replace("/", "");
        return loc_clean;
    };

    useEffect(() => {
        rand_parag();
        setChecking(true);
        setParags(get_parags());
        setBurger(false);
    }, [loc]);
    
    return(
        <>
            <Header />
                <div className="general-words">
                    <h1>{toTitle(get_title())}</h1>
                    <p>{parags[0]}</p>
                    <p>{parags[1]}</p>
                </div>
            <Footer />
        </>
    );
};
