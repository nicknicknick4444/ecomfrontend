import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, toTitle} from "./hooks/hooks.js";
import axios from "axios";
import "../App.css";

export function Breadcrumb(product) {
    const [breadcrumb, setBreadcrumb] = useState([]);
    const [crumbstr, setCrumbstr] = useState("");
    const {prods, setProds, category, setCategory} = useProps();
    var bready = [];
    var crumb = window.location.href.split("/");
    // var crumb2 = crumb[3];
    var strbread = [];
    var inner = "";
    var page = useParams();

    useEffect(() => {
        for (let i in crumb) {
            if (i > 2) {
                    inner += crumb[i] + "/";
                    strbread.push(inner);
                bready.push(crumb[i]);
            }
        };
        for (let i in bready) {
            if (bready[i] === page.id) {
                console.log("BASHU!");
                bready[i] = product.product;
                console.log("Basp! ", product.product);
            } else if (bready[i] === "") {
                console.log("GUMPTION!");
                bready.splice(i, 1);
            } else if (bready[i] === "search-results") {
                bready[i] = "Search Results";
            }
        };
        console.log("Breadcrumbs! ", bready);
        console.log("Gasomatic! ", breadcrumb, page.id, bready);
        bready.unshift("Home");
        strbread.unshift("../");
        setBreadcrumb(bready);
        setCrumbstr(strbread);
        console.log("Prozac Beats: ", category);
    }, [prods, category]);

    return (
        <>
            <div>
                <div className="breadcrumb">
                {
                    breadcrumb.map((i, key) => (
                        key === (breadcrumb.length) -1 || i === ""
                        ? 
                        <span key={key}><Link to={{pathname: `/${crumbstr[key]}`}}>{toTitle(i.replace("%20", ""))}</Link></span>
                        :
                        <span key={key}><Link to={{pathname: `/${crumbstr[key]}`}}>{toTitle(i.replace("%20", "")) + " > "}</Link></span>
                    ))
                }
                </div>
            </div>
        </>
    );
};

