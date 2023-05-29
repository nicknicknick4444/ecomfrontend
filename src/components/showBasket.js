import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {BasketList} from "./basketList.js";
import {Basket} from "./basket.js";
import {Navbar} from "./navBar.js";
import {SearchBox} from "./searchBox.js";
import {Header} from "./header.js";
import {Footer} from "./footer.js";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, setty, toTitle, empty, back_reset} from "./hooks/hooks.js";
import axios from "axios";

export function ShowBasket() {
    const [typing, setTyping] = useState("");
    const [coupons, setCoupons] = useState({});
    // const [cou, setCou] = useState("");

    // const getty = (place) => {
    //     return JSON.parse(localStorage.getItem(place));
    // };
    // const setty = (place, what) => {
    //     return JSON.stringify(localStorage.setItem(place, what));
    // };

    const {dis, setDis, updateTotal, bought, setBought, 
        setCou, setSearched, checking, setChecking, setFillingdeets, 
        setBurger, setMag} = useProps();

    const goosey = (e) => {
        var gup = "";
        gup = e.target.value;
        gup = gup.replace(" ", "");
        setTyping(gup);
    };

    function coupon_api() {
        // NEWLY ADDED
        // if (getty("codes") ===  null) {
        //     setty("codes", []);
        // }
        // setty("")
        // const promise = axios.get(`http://localhost:8000/api/coupons/`);
        const promise = axios.get(`https://polar-coast-39563.herokuapp.com/api/coupons/`);
        promise.then((res) => setty("codes", JSON.stringify(res.data)));
        return promise.then((res) => res.data);
        // return promisedData2;
    };

    async function coupon() {
        // NEWLY ADDED! 
        var coupon_codes = [];
        if (getty("codes") === null) {
            coupon_codes = await coupon_api();
            setty("codes", coupon_codes);
            console.log("tHOSE CODES: ", coupon_codes);
            console.log("Sot!");
        } else {
            coupon_codes = getty("codes");
            console.log("Got!", coupon_codes);
        };

        const looko = (number, place) => {
            console.log("PORTY!! ", coupon_codes);
            // if (JSON.parse(coupon_codes[place].coupon_code)[number] !== undefined) {
                return JSON.parse(coupon_codes[place].coupon_code)[number];
            // }
        };
        
        var the_codes = [];

        // for (let i in getty("codes")) {
        for (let i in coupon_codes) {
        
            // console.log("JOLF! ", JSON.parse(coupon_codes[i].coupon_code)[0]);
            // console.log("TOLF! ", JSON.parse(coupon_codes[i].coupon_code)[1]);

            the_codes.push(looko(0, i));
            console.log("GROOS! ", the_codes)
            // const looko = (number, i) => {
            //     return JSON.parse(coupon_codes[i].coupon_code)[number];
            // };
        };

        
            console.log("PLOT! ", coupon_codes[0]);
            
        for (let i in the_codes) {
            console.log("I!!!!!", the_codes[i]);
            if (typing.length === 0) {
                // setty("coupon_name", JSON.stringify(""));
                setty("coupon_name", "");
            } else if (typing.toUpperCase().trim() === the_codes[i]) {
                // setty("discount", JSON.stringify(the_codes[i]));
                setty("discount", JSON.stringify(looko(1, i)));
                setty("coupon_name", JSON.stringify(the_codes[i]));
                setDis(looko(1, i));
                console.log("DISCOUNTY! ", JSON.parse(coupon_codes[i].coupon_code)[1], looko(1, i));
                console.log("BLUG! ", the_codes[i]);
            } 
            if (typing.length >= 1 && the_codes.indexOf(typing.toUpperCase().trim()) === -1) {
            // if (typing !== looko(0, i)) {
                // setty("coupon_name", JSON.stringify("NONE"));
                setCou("NONE");
            }
            if (getty("order").length === 0) {
                console.log("CROOBY!");
            }
            // console.log("Boons ", getty("order").length);
        };
        setTyping("");
    };

    function unCoupon() {
        setty("discount", 1.0);
        setDis(1.0);
        // localStorage.setItem("coupon_name", JSON.stringify(""));
        setty("coupon_name", "");
        setCou("");
    };

    // function back_reset() {
    //     if (bought) {
    //         empty(setDis, updateTotal);
    //         setBought(false);
    //         console.log("GRIN!!");
    //     };
    // };

    useEffect(() => {
        if (getty("searchBox") !== []) {
            setSearched(false);
        };
        setChecking(false);
        if (bought) {
            setBought(false);
            empty(setDis, updateTotal, setFillingdeets);
        };
        setBurger(false);
    }, []);

    useEffect(() => {
        // begin();
        console.log("CRESTFALLEN!");
        updateTotal();
    }, [dis]);

    //     useEffect(() => {
    //     if (bought) {
    //         setBought(false);
    //         empty(setDis, updateTotal, setFillingdeets);
    //     }
    // }, [bought]);

    return (
        <>
            {/* <Basket /> */}
            {/* <Navbar />
            <SearchBox /> */}
            <Header />
            <div onClick={() => setMag(false)} >
                <BasketList />
            </div>
            {/* {getty("discount") === 1 && getty("order") !== null && getty("order").length > 0 ?  */}
            {getty("discount") === 1 && getty("order") !== null && getty("order").length > 0 ? 
            <div>
                <input type="text" 
                    value={typing}
                    onChange={goosey} 
                    placeholder={"Enter coupon code"} 
                    />
                <button onClick={() => coupon()}>Add Coupon</button><br />
                <span>10PC or 50PC</span>
            {/* </div> : getty("order").length < 1 ? "" : getty("order") === null ? "" :  */}
            </div> : getty("order") === null || getty("order").length === 0 ? "" : 
            <div>
                <button onClick={() => unCoupon()}>Remove Coupon</button>
            </div>}
            <div><Link to="/checkout">Checkout</Link></div>
            <div><i><Link to="/">Home</Link></i></div>
            <Footer />
        </>
    );
};

