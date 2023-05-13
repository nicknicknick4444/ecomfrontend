import React, {useState, useEffect, useLayoutEffect} from "react";
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
    const {prods, raw, setRaw, setProds, shortlist, setShortlist, 
        searched, setSearched, page, setPage, numbers, setNumbers, 
        subset, setSubset, section, setChecking, setMag} = useProps();
    
    function search_summary() {
        var view_range_from = ((page[0] + 1));
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
        setPage([0,4]);
        setChecking(true);
    }, []);

    useEffect(() => {
        if (searched === true) {
            setSearched(false);
        };
    }, [searched]);

    useEffect(() => {
        section("searchList");
    }, [prods, page]);

    if (getty("searchList") !== null && getty("searchList").length > 0 && getty("searchList")[0] !== "EMPTY!") {

    console.log("SUBSET! ", subset, numbers);

    return (
        <>
            <h1>{toTitle("steady as it comes!")}</h1>
            {/* <Basket /> */}
            {/* <Navbar />
            <SearchBox /> */}
            <Header />
            <Breadcrumb />
            <div onClick={() => setMag(false)}>
                <p>Search matches for <b>"{getty("term")}"</b>:</p>
                <p><i>Showing {search_summary()[0]} - {search_summary()[1]} out of {prods.length} products</i></p>
                <Sorting list_name="searchList" />
            </div>
            <ProductPagination />
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


