// import React, {useState, useEffect} from "react";
// import {useParams, Link, useLocation} from "react-router-dom";
// import axios from "axios";
// import {Basket} from "./basket.js";
// import {Navbar} from "./navBar.js";
// import {SearchBox} from "./searchBox.js";
// import {Breadcrumb} from "./breadcrumb.js";
// import {Sorting} from "./sorting.js";
// import {useProps} from "./prop-hooks.js";
// import {getty, setty, toTitle} from "./hooks/hooks.js";

import React, {useState, useEffect} from "react";
import {useParams, Link, useLocation} from "react-router-dom";
import axios from "axios";
import {Basket} from "./basket.js";
import {Navbar} from "./navBar.js";
import {SearchBox} from "./searchBox.js";
import {Sorting} from "./sorting.js";
// import {useProps} from "./prop-hooks.js";
import {getty, setty, toTitle} from "./hooks/hooks.js";

export function SearchAgain() {
    // const {setSearched} = useProps();
    var existing_search = getty("searchList");

    useEffect(() => {
        setSearched(false);
    }, []);

    return (
        <>
            <h1>Pan!</h1>
            <Navbar />
            <SearchBox />
            <div>
                {
                    existing_search?.map((i, key) => (
                        <p key={key}>{i.prod_title}</p>
                    ))
                }
            </div>
        </>
    )
};

