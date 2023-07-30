import React, {useEffect} from "react";
import axios from "axios";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, setty, dedupe, empty} from "./hooks/hooks.js";

export function SearchBox() {
    const {searchTyping, setSearchtyping, raw, setRaw, shortlist, setShortlist, 
        searched, setSearched, section, bought, setDis, updateTotal, 
        setFillingdeets} = useProps();

    function handleChange(e) {
        var word = e.target.value;
        setSearchtyping(word);
        document.onkeydown = function(e) {
            if (e.key === "Enter") {
                search();
            };
        };
    };

    function search() {
        if (searchTyping !== "") {
        axios
            // .get(`http://localhost:8000/api/products/`)
            .get(`https://polar-coast-39563.herokuapp.com/api/products/`)
            .then((res) => setRaw(res.data))
            .catch(err => console.log("Error: ", err));
        };
    };

    function gather_up(group_name, object_name, list_name, count) {
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
        var listo = [];
        var all_wordsy = searchTyping.split(" ");
        var all_words = all_wordsy.filter(word => word !== "");
        
        for (let word in all_words) {
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
                    var tello = dedupe(listo, i2, county, raw);
                    if (tello) {
                        gather_up(gather, raw, listo, i2);
                    }
                }
            };
            // TERTIARY SEARCH: DESCRIPTIONS
            for (let i3 in raw) {
                var counto = 0;
                var gather = {};
                if (raw[i3].prod_desc.toLowerCase().includes(all_words[word].toLowerCase())) {
                    var tell = dedupe(listo, i3, counto, raw);
                    if (tell) {
                        gather_up(gather, raw, listo, i3);
                    }
                }
            };
        };

        setShortlist(listo);

        if (listo.length === 0) {
            listo.push("EMPTY!");
        };

        setShortlist(listo);
        setty("searchList", listo);
        setty("revert", listo);
        setty("term", searchTyping);
        setSearched(true);
        setRaw({});
        section("searchList");
    };

    useEffect(() => {
        setShortlist([]);
        setSearched(false);
        setSearchtyping("");
        if (getty("searchList") === null) {
            setty("searchList", []);
        };
        document.getElementsByClassName("search-boxy").value = "";
    }, [])

    useEffect(() => {
        if (raw.length > 0) {
            refine();
        };
    }, [raw]);

    useEffect(() => {
        if (getty("searchList").length > 0 && searched === true) {
            setSearched(false);
            window.location.href = ("/search-results");
        };
    }, [searched]);
    
    function setFocus() {
        if (window.innerWidth >= 800) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <>
            <div>
                <input 
                    className="search-boxy" 
                    type="text"
                    placeholder="Enter search terms"
                    onChange={(e) => handleChange(e)} 
                    autoFocus={setFocus()}
                />
                {!bought ? 
                    <><button id="subby" 
                    onClick={() => search()} 
                    type="submit">Submit</button><br /></>
                    : 
                    <><button id="subby" 
                    onClick={() => {search(); empty(setDis, updateTotal, setFillingdeets)}} 
                    type="submit">Search</button><br /></>
                }
            </div>
        </>
    );
};
