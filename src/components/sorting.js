import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, setty, toTitle} from "./hooks/hooks.js";
import axios from "axios";
import "../App.css";

export function Sorting(list_name) {
    console.log("HEY JUPITER! ", list_name.list_name);

    // const getty = (place) => {
    //     return JSON.parse(localStorage.getItem(place));
    // };

    const parcy = useLocation();

    // const setty = (place, val) => {
    //     return localStorage.setItem(place, JSON.stringify(val));
    // };

    var example_num = [5,1,3,7,8,3,5,6,2,4,10,3,11,9];
    var example_word = ["d","b","f","c","g","a","e"];
    const [prods_list, setProds_list] = useState([]);
    const [reset, setReset] = useState([]);
    const {prods, setProds} = useProps();

    function resetProds() {
        setProds_list(getty("revert"));
        // // const reGet = () => {
        // axios
        //     .get(`https://polar-coast-39563.herokuapp.com/api/products/`)
        //     .then((res) => setReset(res.data))
        //     .catch(err => console.log("Error: ", err));
        // // };
        // console.log("CATTO ", subcat_name);
        // // return reGet();
        // // reGet();
    };

    // NEW. DELETE?
    useEffect(() => {
        if (getty(list_name.list_name) === null) {
            setty(list_name.list_name, prods);
        }
    }, []);

    useEffect(() => {
        setProds_list(getty(list_name.list_name));
        console.log("BLUR! ", list_name.list_name);
    }, [prods]);
    
    function low_high() {
        // console.log("Belky ", typeof prods_sort);
        prods_list.sort((a,b) => (parseFloat(a.price) - parseFloat(b.price)));
        // console.log(example_num);
        console.log("Sorted! ", prods_list);
        setty(list_name.list_name, prods_list);
        setProds(prods_list);
        console.log("Mulder? ", window.location.href);
    };
    function high_low() {
        example_num.sort((a, b) => (b - a));
        console.log(example_num);
        // var prods_list = getty("disp");
        prods_list.sort((a,b) => (parseFloat(b.price) - parseFloat(a.price)));
        setty(list_name.list_name, prods_list);
        setProds(prods_list);
        console.log("CUNTS! ", prods_list);
    };

    function a_z() {
        example_word.sort();
        console.log(example_word);
        prods_list.sort((a,b) => (a.prod_title < b.prod_title ? -1 : a.prod_title > b.prod_title ? 1 : 0));
        setty(list_name.list_name, prods_list);
        setProds(prods_list);
        console.log("A-Z ", prods_list);
    };
    function z_a() {
        example_word.sort().reverse();
        console.log(example_word);
        prods_list.sort((a,b) => (a.prod_title < b.prod_title ? 1 : a.prod_title > b.prod_title ? -1 : 0));
        setty(list_name.list_name, prods_list);
        setProds(prods_list);
        console.log("Z-A", prods_list);
        console.log("All things remain the same: ", parcy);
    };

    function reset_func() {
        // setProdsList()resetProds();
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
        {/* <div>
        {
            window.location.href.split().map((n, key) => (
                <p key={key}>{n}<br /></p>
            ))
            
        }
        </div> */}
        <select onChange={() => sort_func()} id="dropdowns">
            <option>-Sort By-</option>
            <option value="low-high">Low-High</option>
            <option value="high-low">High-Low</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
        </select>
        {/* <span>parcy.map</span> */}
            <button onClick={() => reset_func()}>Reset</button>
        </>
     : <></>)
};
