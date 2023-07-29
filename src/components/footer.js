import React from "react";
import {Link} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import "../App.css";

export function Footer() {

    const {setBurger} = useProps();

    var now = new Date();
    return (
        <>
            <div className="footer" onClick={() => setBurger(false)}>
                <p className="footer-links">
                    <div className="footer-col">
                        <h4>Company</h4>
                        <Link to={{pathname: "/contact-us"}}>Contact Us</Link><br />
                        <Link to={{pathname: "/about-us"}}>About Us</Link><br />
                        <Link to={{pathname: "/FAQ"}}>FAQ</Link><br />
                        <Link to={{pathname: "/picks-of-the-month"}}>Picks of the Month</Link>
                    </div>
                    <div className="footer-col">
                        <h4>Information</h4>
                        <Link to={{pathname: "/deliveries-and-returns"}}>Deliveries & Returns</Link><br />
                        <Link to={{pathname: "/careers"}}>Careers</Link><br />
                        <Link to={{pathname: "/privacy policy"}}>Privacy Policy</Link><br />
                        <Link to={{pathname: "/terms-and-conditions"}}>Terms & Conditions</Link>
                    </div>
                </p>
                <p><i>© Nick Hart {now.getFullYear()}</i></p>
            </div>
        </>
    );
}
