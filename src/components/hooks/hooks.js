// import React, {useEffect, useState} from "react";
// import {Link, useParams, useLocation} from "react-router-dom";
// import {useProps} from "./prop-hooks.js";
// import axios from "axios";
// import "../App.css";

import React, {useEffect, useState} from "react";
import {Link, useParams, useLocation} from "react-router-dom";
import {useProps} from "./prop-hooks.js";
import axios from "axios";
import "../../App.css";

export function telber() {
    console.log("YOOOOOOOO!!!");
};

export const getty = (place) => {
    return JSON.parse(localStorage.getItem(place));
};

// const {setDis} = useProps();

export const setty = (place, val) => {
    return localStorage.setItem(place, JSON.stringify(val));
};

// DO NEW_WORD function!
export function toTitle(word) {
    var new_word = "";
    for (let i in word) {
        if (i === "0") {
            var newLetter = word[i].toUpperCase();
            new_word += newLetter;
        } else if (word[i-1] === " " || word[i-1] === "-") {
            var newLetter = word[i].toUpperCase();
            new_word += newLetter;
        } else {
            new_word += word[i];
        }
    }
    return new_word;
};

export function dedupe(a_list, iter, counter, data) {
    for (let n in a_list) {
        if (a_list[n].id !== data[iter].id) {
            counter += 1;
            }
    }
        if (counter === a_list.length) {
            console.log("BARKLEY! ", a_list);
            // gatho(collect, data, a_list, iter);
            return true;
        } else {
            console.log("UH OH!!!!");
            return false;
        }
        // console.log("BARKLEY! ", a_list);
    // }
};

export function empty(setDis, updateTotal, setFillingdeets) {
    // const {setDis} = useProps();
    setty("itemsList", {});
    setty("priceList", {});
    setty("order", []);
    setDis(getty("discount"));
    setty("address", {});
    updateTotal();
    setty("discount", 1);
    setty("coupon_name", "");
    setty("boughtReset", false);
    setty("disp", []);
    setty("searchList", []);
    setty("page_nums", []);
    setFillingdeets(false);
};

// function back_reset() {
//     if (bought) {
//         empty(setDis, updateTotal);
//         setBought(false);
//         console.log("GRIN!!");
//     };
// };

export function back_reset(bought, setBought, setDis, updateTotal) {
    console.log("BOUGHT: ", bought);
    if (bought) {
        empty(setDis, updateTotal);
        setBought(false);
        console.log("GRIN!");
    };
    console.log("IT RAN!");
};

export function get_location() {
    // console.log("Vespa!", window.location["pathname"]);
    return window.location["pathname"];
};

export function Add2Basket(id, price, itemq, totally) {
    // const {typing, setTyping} = useProps();

    // ADD PRICES!!!!
    if (getty("itemsList") !== null) {
        var this_items = getty("itemsList");
        var this_order = getty("order");
        var this_prices = getty("priceList");
        if (id in getty("itemsList") && getty("itemsList")[id] > 0) {
            console.log("Crespa! Goot.", getty("itemsList")[id]);
            var higher_number = this_items[id] + 1;
            this_items[id] = higher_number;
            setty("itemsList", this_items);
        } else {
            console.log("Crespa! Add 1!");
            this_items[id] = 1;
            this_order.push(id);
            this_prices[id] = price;
            console.log(this_items, this_order);
            setty("itemsList", this_items);
            setty("order", this_order);
            setty("priceList", this_prices);
            // setTyping("");
        }
    } else {
        var this_items = {};
        var this_order = [];
        var this_prices = {}
        this_items[id] = 1;
        this_order.push(id);
        this_prices[id] = price;
        setty("itemsList", this_items);
        setty("order", this_order);
        setty("priceList", this_prices);
    }
    console.log("BOOTHY! BOOTHY!");
};

