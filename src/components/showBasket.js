import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {BasketList} from "./basketList.js";
import {Header} from "./header.js";
import {Footer} from "./footer.js";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, setty, empty} from "./hooks/hooks.js";
import axios from "axios";

export function ShowBasket() {
    const [typing, setTyping] = useState("");

    const {dis, setDis, updateTotal, bought, setBought, 
        setCou, setSearched, setChecking, setFillingdeets, 
        setBurger, setMag} = useProps();

    const goosey = (e) => {
        var gup = "";
        gup = e.target.value;
        gup = gup.replace(" ", "");
        setTyping(gup);
    };

    function coupon_api() {
        // const promise = axios.get(`http://localhost:8000/api/coupons/`);
        const promise = axios.get(`https://polar-coast-39563.herokuapp.com/api/coupons/`);
        promise.then((res) => setty("codes", JSON.stringify(res.data)));
        return promise.then((res) => res.data);
    };

    async function coupon() {
        // NEWLY ADDED! 
        var coupon_codes = [];
        if (getty("codes") === null) {
            coupon_codes = await coupon_api();
            setty("codes", coupon_codes);
        } else {
            coupon_codes = getty("codes");
        };

        const looko = (number, place) => {
                return JSON.parse(coupon_codes[place].coupon_code)[number];
        };
        
        var the_codes = [];

        for (let i in coupon_codes) {
            the_codes.push(looko(0, i));
        };
            
        for (let i in the_codes) {
            if (typing.length === 0) {
                setty("coupon_name", "");
            } else if (typing.toUpperCase().trim() === the_codes[i]) {
                setty("discount", JSON.stringify(looko(1, i)));
                setty("coupon_name", JSON.stringify(the_codes[i]));
                setDis(looko(1, i));
            } 
            if (typing.length >= 1 && the_codes.indexOf(typing.toUpperCase().trim()) === -1) {
                setCou("NONE");
            }
            if (getty("order").length === 0) {
                // console.log("For testing: Order in storage has zero length.");
            }
        };
        setTyping("");
    };

    function unCoupon() {
        setty("discount", 1.0);
        setDis(1.0);
        setty("coupon_name", "");
        setCou("");
    };

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
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        updateTotal();
    }, [dis]);

    return (
        <>
            <Header />
            <div className="basket_page" onClick={() => setMag(false)} >
                <h1 id="progress">
                <span className="present">1. Basket</span>&nbsp;&nbsp;
                <span className="future">2. Checkout</span>&nbsp;&nbsp;
                <span className="future">3. Review</span>&nbsp;&nbsp;
                <span className="future">4. Finish</span>
                </h1>
                <div id="basket-list">
                    <BasketList />
            </div>
                {getty("discount") === 1 && getty("order") !== null && getty("order").length > 0 ? 
                <div id="coupon-contain">
                    <div id="add-coupon">
                        <input 
                            id="coupon-box"
                            type="text" 
                            value={typing}
                            onChange={goosey} 
                            placeholder={"Enter coupon code"} 
                            />
                        <button id="coupon-buttons" onClick={() => coupon()} 
                        style={{}}>
                            Add Coupon
                        </button><br />
                        <span id="hint"><i>(Psst! 10PC or 50PC)</i></span>
                    </div><br /><br /><br /><div id="extra-line"><br /></div>
                    <Link to="/checkout"><button id="checkout-button">Checkout</button></Link><br /><br />
                    <Link to="/"><button id="resume">Keep Shopping</button></Link>
                </div> 
                : getty("order") === null || getty("order").length === 0 ? null : 
                <div id="coupon-contain">
                <div id="remove-coupon">
                    <button id="coupon-buttons" onClick={() => unCoupon()}>Remove Coupon</button>
                </div>
                <div id="extra-line"><br /></div>
                    <Link to="/checkout"><div id="checkout-button2">Checkout</div></Link><br /><br /><br /><br />
                    <Link to="/"><div id="resume2">Keep Shopping</div></Link>
                </div>}
            </div>
            <Footer />
        </>
    );
};

