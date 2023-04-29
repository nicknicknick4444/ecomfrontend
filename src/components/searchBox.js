import React, {useState, useEffect} from "react";
import {useParams, Link, useLocation} from "react-router-dom";
import axios from "axios";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, setty, toTitle, dedupe, empty} from "./hooks/hooks.js";

export function SearchBox() {
    // const [searchTyping, setSearchtyping] = useState("");

    // const [raw, setRaw] = useState({});
    const {searchTyping, setSearchtyping, raw, setRaw, shortlist, setShortlist, 
        searched, setSearched, section, bought, setDis, updateTotal, 
        setFillingdeets} = useProps();
    var beatty = useLocation();
    // var counto = 0;

    function handleChange(e) {
        var word = e.target.value;
        setSearchtyping(word);
        console.log("Spring Haze! ", searchTyping, word, word.length);

        document.onkeydown = function(e) {
            if (e.key === "Enter") {
                search();
            };
        };
    };

    function search() {
        console.log("Searching!", searchTyping);
        if (searchTyping !== "") {
        axios
            .get(`https://polar-coast-39563.herokuapp.com/api/products/`)
            .then((res) => setRaw(res.data))
            .catch(err => console.log("Error: ", err));
        };
    };

    function gather_up(group_name, object_name, list_name, count) {
            console.log("Yag!", object_name[count].prod_title);
            group_name["id"] = object_name[count].id;
            group_name["prod_title"] = object_name[count].prod_title;
            group_name["image"] = object_name[count].image;
            group_name["price"] = object_name[count].price;
            group_name["prod_cat"] = object_name[count].prod_cat;
            group_name["prod_subcat"] = object_name[count].prod_subcat;
            list_name.push(group_name);
            group_name = {};
        };

    function refine() {
        // if (searched === true) {
        console.log("REFINED! ", raw);
        var listo = [];
        var all_wordsy = searchTyping.split(" ");
        var all_words = all_wordsy.filter(word => word !== "");
        // all_words = [for (i of all_words) if (i !== " ") i]
        console.log("NOTHINGO: ", all_words);


        for (let word in all_words) {
            console.log("WORD APP: ", all_words[word]);
            //  NEW ^^^ formerly

        // PRIMARY SEARCH: PRODUCT CODES
        for (let i in raw) {
            var the_count = 0;
            var gather = {};
            
            if (raw[i].prod_code.toLowerCase().includes(all_words[word].toLowerCase())) {
                var telly = dedupe(listo, i, the_count, raw);
                if (telly) {
                    gather_up(gather, raw, listo, i);
                }
                
            }
        };
        // SECONDARY SEARCH: TITLES
        for (let i2 in raw) {
            var county = 0;
            var gather = {};
            if (raw[i2].prod_title.toLowerCase().includes(all_words[word].toLowerCase())) {
                console.log("Villa Rosie! Tasty!");
                // gather_up(gather, raw, listo, i2);

                var tello = dedupe(listo, i2, county, raw);
                // if (dedupe(listo, i2, county, raw)) {
                if (tello) {
                    gather_up(gather, raw, listo, i2);
                    console.log("Barkley 1!");
                }
                
            }
        };
        // TERTIARY SEARCH: DESCRIPTIONS
        for (let i3 in raw) {
            var counto = 0;
            var gather = {};
            if (raw[i3].prod_desc.toLowerCase().includes(all_words[word].toLowerCase())) {
                console.log("Sunday Sunday! PAN!!!!");

                var tell = dedupe(listo, i3, counto, raw);
                // if (dedupe(listo, i3, counto, raw)) {
                if (tell) {
                    gather_up(gather, raw, listo, i3);
                    console.log("barkley 2!");
                };

                // // BESPOKE DEDUPE IDEA PART 1!
                // for (let n in listo) {
                //     console.log("n.id: ", listo[n].id, "raw[i3].id: ", raw[i3].id);
                //     if (listo[n].id !== raw[i3].id) {
                //         counto += 1;
                //     }
                // }
                // // BESPOKE DEDUPE IDEA PART 2!
                // if (counto === listo.length) {
                //     gather_up(gather, raw, listo, i3);
                //     console.log("BARKEY!!");
                // }

            }
            console.log("List as it stands: ", listo);
        };

        };
        // NEW ^^^

        setShortlist(listo);
        console.log("LISTOple!", listo); 

        if (listo.length === 0) {
            listo.push("EMPTY!");
        };
        // if (listo.length === 0) {
        //     listo.push("Empty");
        // };
        // while (beatty.pathname !== "/search-results") {
            setShortlist(listo);
            setty("searchList", listo);
            setty("revert", listo);
            setty("term", searchTyping);
        // };
        console.log("Where: ", beatty.pathname);
        setSearched(true);
        setRaw({});
        section("searchList");
    // };
    };

    useEffect(() => {
        setShortlist([]);
        setSearched(false);
        setSearchtyping("");
        // setty("searchList", []);
        if (getty("searchList") === null) {
            setty("searchList", []);
        };
        console.log("Quell! ", searched.toString());
        document.getElementById("search-box").value = "";
    }, [])

    useEffect(() => {
        if (raw.length > 0) {
            refine();
        };
    }, [raw]);

    useEffect(() => {
        if (getty("searchList").length > 0 && searched === true) {
        // if (searched === true) {
            setSearched(false);
            // section("searchList");
            console.log("LOCATION! ", beatty);
            console.log("Redirect!", shortlist, searched.toString());
            window.location.href = ("/search-results");
        };
    }, [searched]);

    // document.getElementById("search-box").addEventListener("keydown", () => {
    //     document.getElementById("search-box").focus();
    // })

    return (
        <>
        {/* <form> */}
            <input 
                id="search-box" 
                type="text"
                placeholder="Search for Items"
                onChange={(e) => handleChange(e)} 
                autoFocus
                />
                {!bought ? 
                <><button id="subby" 
                onClick={() => search()} 
                type="submit">Submit</button><br /></>
                : 
                <><button id="subby" 
                onClick={() => {search(); empty(setDis, updateTotal, setFillingdeets)}} 
                type="submit">Submit</button><br /></>
                }
                {/* <p>{searchTyping}</p> */}
            {/* </form> */}
        </>
    );
};

