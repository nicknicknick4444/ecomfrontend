import React, {useState, useEffect, useLayoutEffect} from "react";
import {useParams, Link, useLocation} from "react-router-dom";
import axios from "axios";
import {Basket} from "./basket.js";
import {Navbar} from "./navBar.js";
import {SearchBox} from "./searchBox.js";
import {Header} from "./header.js";
import {Breadcrumb} from "./breadcrumb.js";
import {Sorting} from "./sorting.js";
import {ProductPagination} from "./pagination.js";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, setty, toTitle} from "./hooks/hooks.js";


export function SearchPage() {
    // const [page, setPage] = useState([0,1]);
    // const [numbers, setNumbers] = useState([]);
    // const [subset, setSubset] = useState([]);
    const {prods, raw, setRaw, setProds, shortlist, setShortlist, 
        searched, setSearched, page, setPage, numbers, setNumbers, 
        subset, setSubset, section, setChecking} = useProps();
    
    // function page_click(page_num) {
    //     var new_page = [page_num * page[1], page[1]];
    //     setPage(new_page);
    //     console.log("Good to be to back! ", new_page);
    //     // section();
    // };

    function search_summary() {
        var view_range_from = ((page[0] + 1));
        // var view_range_to = ((page[0] + 1 * page[1]) - (page[1] > 1 ? page[1] : 0));
        var view_range_to = (view_range_from + subset.length - 1);

        console.log("PAGE! ", page);
        return [view_range_from, view_range_to];
    };



    // useLayoutEffect(() => {
    //     section();
    // }, []);

    useEffect(() => {
        console.log("LIST PAGE! ", shortlist);
        // if (shortlist.length > 0) {
        //     setty("searchList", shortlist);
        // };
        // setShortlist(getty("searchList"));
        if (getty("searchList") === null) {
            setty("searchList", []);
            setty("revert", []);
            setProds([]);
        } else {
            setProds(getty("searchList"));
            setty("revert", getty("searchList"));
        };
        // setSearched(false);
        // setty("revert", getty("searchList"));
        console.log("Stevie Martin is a thoughtful pillow! ", searched);
        setSearched(false);
        // SET NUMBER OF RESULTS PER-PAGE IN 2ND ELEMENT OF setPage!
        setPage([0,1]);
        setChecking(true);
        // section("searchList");
        // if (getty("searchList") !== []) {
        //     setSearched(false);
        // }
    }, []);

    // useEffect(() => {
    //     if (getty("searchList") !== []) {
    //         setty("searchList", shortlist);
    //     }
    // }, [shortlist]);

    useEffect(() => {
        if (searched === true) {
            setSearched(false);
        };
    }, [searched]);

    useEffect(() => {
        section("searchList");
    }, [prods, page]);

    if (getty("searchList") !== null && getty("searchList").length > 0 && getty("searchList")[0] !== "EMPTY!") {

    // console.log("Pagey! ", getty("searchList").slice(0,2));
    // console.log("Pageo! ", getty("searchList").slice(2,4));
    console.log("SUBSET! ", subset, numbers);

    return (
        <>
            <h1>{toTitle("steady as it comes!")}</h1>
            <Basket />
            {/* <Navbar />
            <SearchBox /> */}
            <Header />
            <Breadcrumb />
            <p>Search matches for <b>"{getty("term")}"</b>:</p>
            <p><i>Showing {search_summary()[0]} - {search_summary()[1]} out of {prods.length} products</i></p>
            <Sorting list_name="searchList" />
            <ProductPagination />
            {/* <div>
                {
                    prods?.map((item, key) => (
                        <Link key={key} to={{pathname: `/${item.prod_cat}/${item.prod_subcat}/${item.id}`}}>
                            <div>
                                <p>{item.prod_title}</p>
                                <img src={`${item.image}`} style={{width: 200}} />
                                <p>£{item.price}</p>
                            </div>
                        </Link>
                    ))
                }
            </div> */}
            {/* <b>Cruddas!</b>

            <ProductPagination /> */}
        </>
    );
    } else {
        return (
            <>
                <Basket />
                {/* <Navbar />
                <SearchBox /> */}
                <Header />
                <Breadcrumb />
                <p>Search results for <b>"{getty("term")}"</b>:</p>
                <h3>No words to dis-play.</h3>
            </>
        );
    }

};


