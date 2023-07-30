import React, {useEffect, useState} from "react";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, setty} from "./hooks/hooks.js";
import "../App.css";

export function Sorting(list_name) {
    const [prods_list, setProds_list] = useState([]);
    const {prods, setProds} = useProps();
    useEffect(() => {
        if (getty(list_name.list_name) === null) {
            setty(list_name.list_name, prods);
        }
    }, []);

    useEffect(() => {
        setProds_list(getty(list_name.list_name));
    }, [prods]);
    
    function low_high() {
        prods_list.sort((a,b) => (parseFloat(a.price) - parseFloat(b.price)));
        setty(list_name.list_name, prods_list);
        setProds(prods_list);
        // console.log("For testing:", prods_list);
    };
    function high_low() {
        prods_list.sort((a,b) => (parseFloat(b.price) - parseFloat(a.price)));
        setty(list_name.list_name, prods_list);
        setProds(prods_list);
        // console.log("For testing:", prods_list);
    };

    function a_z() {
        prods_list.sort((a,b) => (a.prod_title < b.prod_title ? -1 : a.prod_title > b.prod_title ? 1 : 0));
        setty(list_name.list_name, prods_list);
        setProds(prods_list);
        // console.log("For testing:", prods_list);
    };
    function z_a() {
        prods_list.sort((a,b) => (a.prod_title < b.prod_title ? 1 : a.prod_title > b.prod_title ? -1 : 0));
        setty(list_name.list_name, prods_list);
        setProds(prods_list);
        // console.log("For testing:", prods_list);
    };

    function reset_func() {
        setty(list_name.list_name, getty("revert"));
        setProds(getty("revert"));
        document.getElementById("dropdowns").value = "-Sort By-";
    };

    function sort_func() {
        if (document.getElementById("dropdowns").value === "low-high") {
            low_high();
        } else if (document.getElementById("dropdowns").value === "high-low") {
            high_low();
        } else if (document.getElementById("dropdowns").value === "a-z") {
            a_z();
        } else if (document.getElementById("dropdowns").value === "z-a") {
            z_a();
        };
    };
    return (prods_list.length > 1 ? 
        <>
            <div className="sorting">
                <select onChange={() => sort_func()} id="dropdowns">
                    <option>-Sort By-</option>
                    <option value="low-high">£ Low-High</option>
                    <option value="high-low">£ High-Low</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                </select>
                <button id="reset_button" onClick={() => reset_func()}>Reset</button>
            </div>
        </>
     : <></>)
};
