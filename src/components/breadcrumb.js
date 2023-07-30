import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {toTitle} from "./hooks/hooks.js";
import "../App.css";

export function Breadcrumb(product) {
    const [breadcrumb, setBreadcrumb] = useState([]);
    const [crumbstr, setCrumbstr] = useState("");
    const {prods, category} = useProps();
    var bready = [];
    var crumb = window.location.href.split("/");
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
                bready[i] = product.product;
            } else if (bready[i] === "") {
                bready.splice(i, 1);
            } else if (bready[i] === "search-results") {
                bready[i] = "Search Results";
            }
        };
        bready.unshift("Home");
        strbread.unshift("../");
        setBreadcrumb(bready);
        setCrumbstr(strbread);
    }, [prods, category]);

    return (
        <>
            <div>
                <div className="breadcrumb">
                {
                    breadcrumb.map((i, key) => (
                        key === (breadcrumb.length) -1 || i === ""
                        ?
                        <span className="crumb" key={key}><Link to={{pathname: `/${crumbstr[key]}`}}>{toTitle(i.replace(/%20/gi, " "))}</Link></span>
                        :
                        <span className="crumb" key={key}>
                            <Link to={{pathname: `/${crumbstr[key]}`}}>{toTitle(i.replace(/%20/gi, " "))}</Link>
                            <span id="arrow"> > </span>
                        </span>
                    ))
                }
                </div>
            </div>
        </>
    );
};
