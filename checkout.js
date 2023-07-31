import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, setty, empty} from "./hooks/hooks.js";
import {BasketList} from "./basketList.js";
import {Header} from "./header.js";
import {Footer} from "./footer.js";
import axios from "axios";

export function Checkout() {
    const [delvq, setDelvq] = useState(false);
    const [disp, setDisp] = useState("none");
    const [order, setOrder] = useState({line: "Hello", line2: "Hello2", line3: "Hello3"});
    const [grandTotal, setGrandTotal] = useState(0.00);
    const [typing, setTyping] = useState("");
    const [coupons, setCoupons] = useState("");
    const {updateTotal, dis, cou, setCou, setDis, setSearched, fillingdeets, setFillingdeets, 
        checking, setChecking, bought, setBought, mand, setMand, emailval, setEmailval, 
        telval, setTelval, typingAddress, setTypingaddress, setBurger, setMag} = useProps();

    var order_ref = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    useEffect(() => {
        if (getty("searchList") !== []) {
            setSearched(false);
        };
        if (getty("itemsList") === null) {
            setty([]);
        };
        if (getty("delvq") === null) {
            setty("delvq", false);
            setDelvq(false);
        };
        if (getty("boughtReset") === null) {
            setty("boughtReset", false);
        };
        if (getty("address") === null) {
            setty("address", {"billing_name": "", "billing_email": "", 
            "billing_tel": ""});
        };
        setDisp("none");
        if (getty("boughtReset")) {
            empty(setDis, updateTotal, setFillingdeets);
            setty("boughtReset", false);
        };
        if (checking) {
            setBought(false);
        };
        if (cou === "NONE") {
            setCou("");
        };
        window.scrollTo(0, 0);
    }, [])
    
    useEffect(() => {
        if (delvq) {
            setDisp("block");
        } else {
            setDisp("none");
        };
        setty("delvq", delvq);
    }, [delvq]);

    useEffect(() => {
        setMand(false);
        setEmailval(false);
        setTelval(false);
    }, [typingAddress])

    function api_call(id) {
        // const promise = axios.get(`http://localhost:8000/api/products/${id}/`);
        const promise = axios.get(`https://polar-coast-39563.herokuapp.com/api/products/${id}/`);
        const promisedData = promise.then((res) => res.data);
        return promisedData;
    };

    function check_mand() {
        if (getty("address")["billing_name"] === undefined || getty("address")["billing_name"] === "" || 
        getty("address")["billing_email"] === undefined || getty("address")["billing_email"] === "" || 
        getty("address")["billing_tel"] === undefined || getty("address")["billing_tel"] === "" || 
        getty("address")["add_line_1"] === undefined || getty("address")["add_line_1"] === "" || 
        getty("address")["town"] === undefined || getty("address")["town"] === "" || 
        getty("address")["postcode"] === undefined || getty("address")["postcode"] === "" || 
        (delvq === true && getty("address")["delv_name"] === undefined) || (delvq === true && getty("address")["delv_name"] === "") || 
        (delvq === true && getty("address")["delv_add_line_1"] === undefined) || (delvq === true && getty("address")["delv_add_line_1"] === "") || 
        (delvq === true && getty("address")["delv_town"] === undefined) || (delvq === true && getty("address")["delv_town"] === "") || 
        (delvq === true && getty("address")["delv_postcode"] === undefined) || (delvq === true && getty("address")["delv_postcode"] === "") || 
        getty("address") === null || Object.keys(getty("address")).length === 0) {
            return true;
        } else {
            return false;
        }
    };

    function check_email() {
        if (getty("address")["billing_email"].indexOf("@") === -1)  {
            return true;
        } else {
            return false;
        };
    };

    function check_number() {
        if (getty("address")["billing_tel"] !== undefined) {
            var tel = getty("address")["billing_tel"].replace(" ", "");
        } else {
            var tel = "";
        }
        if (tel.match(/^[0-9]+$/) !== null && tel !== undefined) {
            // console.log("For testing: VALID TEL!");
            return false;
        } else {
            // console.log("For testing: INVALID TEL!");
            return true;
        };
    };

    function set_red_messages() {
        // Check mandataory fields set
        if (check_mand()) {
            setMand(true);
            // console.log("For testing: Missing some mand fields!");
        } else {
            setMand(false);
            // console.log("For testing: All mand fields set!");
        };

        // Check email contains @ symbol
        if (check_email()) {
            setEmailval(true);
            // console.log("For testing: Invalid email!");
        } else {
            setEmailval(false);
            // console.log("For testing: Valid email!");
        };

        if (check_number()) {
            setTelval(true);
        } else {
            setTelval(false);
        }
    };

    async function makeReceipt() {
        var line2 = [];
        var totalArr = [];
        const ord = getty("order");
        var items = getty("itemsList");
        var prices = getty("priceList");
        for (let i in ord) {
            var stuff = "";
            var liney = await api_call(ord[i]);
            var quanto = items[parseInt(ord[i])];
            var price = prices[parseInt(ord[i])];
            stuff += quanto.toString();
            stuff += " x ";
            stuff += liney.prod_title;
            stuff += (" @ £" + price.toString());
            stuff += " - line total : £" + (quanto * price).toFixed(2).toString();
            totalArr.push(quanto * price);
            line2.push(stuff);
        };
        const grandTotal = totalArr.reduce(
            (acc, curr) => acc + curr, 0);
        setGrandTotal(grandTotal * dis);
        setOrder(line2);
    };

    function buy() {
        setty("boughtReset", true);
        if (getty("coupon_name") && getty("coupon_name") !== "") {
            setCoupons(getty("coupon_name"));
        };
        makeReceipt();
        setDis(1);
        setBought(true);
        setChecking(false);
    };

    function handleChange(e, q) {
        if (getty("address") === null) {
            var starter_dicto = {"billing_name": "", "billing_email": "", 
            "billing_tel": ""}
            setty("address", JSON.stringify(starter_dicto));
            var dicto = {};
        } else {
            var dicto = getty("address");
        };
        var word = "";
        word = e.target.value;
        setTyping(word);
        dicto[q] = word;
        setty("address", dicto);
        setTypingaddress(dicto);
        if (q === "billing_email") {
            check_email();
        };
    };

    function addresses() {
        if (getty("address") !== null) {
            return getty("address");
        } else {
            return false;
        }
    };

    function abbrev_add(property) {
        if (addresses() !== false) {
            return addresses()[`${property}`] ? addresses()[`${property}`] : "";
        };
    };

    if (!fillingdeets && getty("address") !== null) {
        if (getty("order").length > 0) {
        return (
            <>
                <Header />
                <div className="checkout-container" onClick={() => setBurger(false)}>
                    <h1><Link to={"/basket-page"}><span className="past">1. Basket</span></Link>&nbsp;&nbsp;
                    <span className="present">2. Address</span>&nbsp;&nbsp;
                    <span className="future">3. Review</span>&nbsp;&nbsp;
                    <span className="future">4. Finish</span>
                    </h1>
                    <div className="address-form" onClick={() => setMag(false)}>
                        <form>
                            <div id="billing">
                            <p><i>Fields marked * are mandatory</i></p>
                            {mand ? <p id="mandatory"><i>Please complete all mandatory fields</i></p> : null}
                            {emailval ? <p id="email-val"><i>Please enter a valid email address</i></p> : null}
                            {telval ? <p id="email-val"><i>Please enter a valid telephone number</i></p> : null}
                                <div>
                                <h1>{delvq ? "Billing " : null}Address</h1>
                                <label for="name"><span className="form-label">Name:*</span>&nbsp;
                                    <input type="text" name="name1" onChange={(e) => handleChange(e, "billing_name")} 
                                        value={abbrev_add("billing_name")} className="form-input"
                                    />
                                </label><br />
                                <label for="email"><span className="form-label">Email:*</span>&nbsp;
                                    <input type="email" name="email1" onChange={(e) => handleChange(e, "billing_email")} 
                                        value={abbrev_add("billing_email")} className="form-input"
                                    />
                                </label><br />
                                <label id="leave-line" for="tel1"><span className="form-label">Phone:*</span>&nbsp;
                                    <input type="tel" name="tel1" onChange={(e) => handleChange(e, "billing_tel")} 
                                        value={abbrev_add("billing_tel")} className="form-input"
                                    />
                                </label><br />
                                <label for="add_line_1">
                                    <span className="form-label">Address Line 1:*</span>&nbsp;
                                    <input type="text" name="add_line_1" 
                                            onChange={(e) => handleChange(e, "add_line_1")} 
                                            value={abbrev_add("add_line_1")} className="form-input"
                                    />
                                </label><br />
                                <label for="add_line_2">
                                    <span className="form-label">Address Line 2:</span>&nbsp;
                                    <input type="text" name="add_line_2" 
                                            onChange={(e) => handleChange(e, "add_line_2")} 
                                            value={abbrev_add("add_line_2")} className="form-input"
                                    />
                                </label><br />
                                <label for="add_line_3">
                                    <span className="form-label">Address Line 3:</span>&nbsp;
                                    <input type="text" name="add_line_3" 
                                            onChange={(e) => handleChange(e, "add_line_3")}
                                            value={abbrev_add("add_line_3")} className="form-input"
                                    />
                                </label><br />
                                <label for="town">
                                    <span className="form-label">Town/ City:*</span>&nbsp;
                                    <input type="text" name="town" 
                                            onChange={(e) => handleChange(e, "town")}
                                            value={abbrev_add("town")} className="form-input"
                                    />
                                </label><br />
                                <label for="county">
                                    <span className="form-label">County:</span>&nbsp;
                                    <input type="text" name="county" 
                                            onChange={(e) => handleChange(e, "county")}
                                            value={abbrev_add("county")} className="form-input"
                                    />
                                </label><br />
                                <label for="postcode">
                                    <span className="form-label">Postcode:*</span>&nbsp;
                                    <input type="text" name="postcode" 
                                            onChange={(e) => handleChange(e, "postcode")}
                                            value={abbrev_add("postcode")} className="form-input"
                                    />
                                </label><br />
                                <label for="country">
                                    <span className="form-label">Country:</span>&nbsp;
                                    <input type="text" name="country" 
                                            onChange={(e) => handleChange(e, "country")}
                                            value={abbrev_add("country")} className="form-input"
                                    />
                                </label><br />
                                
                                <div id="bottom-buttons">
                                    <Link to={{pathname: "/"}}><div id="back-to-shop"><Link to={{pathname: "/"}}>Continue Shopping</Link></div></Link>
                                        {
                                                check_mand() === true || check_email() === true || check_number() === true
                                                ? 
                                                <div id="next2" onClick={() => {set_red_messages()}}>Next</div> : 
                                                <div id="next" onClick={() => {setFillingdeets(!fillingdeets); setChecking(true); setMand(false); 
                                                                                setEmailval(false); setTelval(false); window.scrollTo(0, 0)}}>
                                                    Next
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                                <div id="delivery-container">
                            
                            <div id="delivery" style={{display: `${disp}`}}>
                                <div>
                                    <h1 id="delivery-top">Delivery Address</h1>
                                    <h1 id="sub-head">Please ensure somebody is available to take delivery</h1>
                                    <label for="name2" id="leave-line"><span className="form-label">Name:*</span>&nbsp;
                                        <input type="text" name="name2" onChange={(e) => handleChange(e, "delv_name")} 
                                            value={abbrev_add("delv_name")} className="form-input"
                                        />
                                    </label><br />
                                    <label for="delv_add_line_1">
                                    <span className="form-label">Address Line 1:*</span>&nbsp;
                                    <input type="text" name="delv_add_line_1" 
                                            onChange={(e) => handleChange(e, "delv_add_line_1")} 
                                            value={abbrev_add("delv_add_line_1")} className="form-input"
                                    />
                                </label><br />
                                <label for="delv_add_line_2">
                                    <span className="form-label">Address Line 2:</span>&nbsp;
                                    <input type="text" name="delv_add_line_2" 
                                            onChange={(e) => handleChange(e, "delv_add_line_2")} 
                                            value={abbrev_add("delv_add_line_2")} className="form-input"
                                    />
                                </label><br />
                                <label for="delv_add_line_3">
                                    <span className="form-label">Address Line 3:</span>&nbsp;
                                    <input type="text" name="delv_add_line_3" 
                                            onChange={(e) => handleChange(e, "delv_add_line_3")}
                                            value={abbrev_add("delv_add_line_3")} className="form-input"
                                    />
                                </label><br />
                                <label for="delv_town">
                                    <span className="form-label">Town/ City:*</span>&nbsp;
                                    <input type="text" name="delv_town" 
                                            onChange={(e) => handleChange(e, "delv_town")}
                                            value={abbrev_add("delv_town")} className="form-input"
                                    />
                                </label><br />
                                <label for="delv_county">
                                    <span className="form-label">County:</span>&nbsp;
                                    <input type="text" name="delv_county" 
                                            onChange={(e) => handleChange(e, "delv_county")}
                                            value={abbrev_add("delv_county")} className="form-input"
                                    />
                                </label><br />
                                <label for="delv_postcode">
                                    <span className="form-label">Postcode:*</span>&nbsp;
                                    <input type="text" name="delv_postcode" 
                                            onChange={(e) => handleChange(e, "delv_postcode")}
                                            value={abbrev_add("delv_postcode")} className="form-input"
                                    />
                                </label><br />
                                <label for="delv_country">
                                    <span className="form-label">Country:</span>&nbsp;
                                    <input type="text" name="delv_country" 
                                        onChange={(e) => handleChange(e, "delv_country")}
                                        value={abbrev_add("delv_country")} className="form-input"
                                    />
                                </label><br />
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                    


                    <div id={delvq ? "delv-q-on" : "delv-q-off"} >
                        <label for="delv_q">Different delivery address?&nbsp;
                            {delvq ? 
                            <input type="checkbox" name="delv_q" onChange={() => setDelvq(!delvq)}  
                                checked={delvq} id="checkout_checkbox"
                            /> : 
                            <input type="checkbox" name="delv_q" onChange={() => setDelvq(!delvq)} 
                                checked={delvq} id="checkout_checkbox" 
                            />
                            }
                        </label>
                    </div>
                </div>
                <Footer />
            </>
            );
        } else {
            return (
                <>
                    <Header />
                    <div onClick={() => setMag(false) }></div>
                    <h1>Checkout</h1>
                    <BasketList />
                    <Footer />
                </>
            );
        }
    } else {
        window.scrollTo(0, 0);
        return (
            <>
                <Header />
                <div onClick={() => setMag(false)}>
                    <h1 id="progress">
                        <span className="past">1. Basket</span>&nbsp;&nbsp;
                        <span className="past">2. Address</span>&nbsp;&nbsp;
                        <span className={bought ? "past" : "present"}>3. Review</span>&nbsp;&nbsp;
                        <span className={bought ? "present" : "future"}>4. Finish</span>&nbsp;&nbsp;
                    </h1>
                    {!bought ? null : <>
                        <div id="thanks">
                            <h2>Thank you for your order!</h2><p>Your order number is:&nbsp; 
                            <span id="order-ref"><b>N{order_ref}</b></span></p>
                        </div>
                    </>}
                    <div className={delvq ? "review-addresses" : "review-only-address"}>
                        <div className={delvq ? "review-billing" : "only-address"}>
                            <h1 className="review-title"><b>{delvq ? "Billing Address:" : "Address"}</b></h1>
                            <p>{addresses()["billing_name"] ? addresses()["billing_name"] : null}</p>
                            <p>{addresses()["billing_email"] ? addresses()["billing_email"] : null}</p>
                            <p>{addresses()["billing_tel"] ? addresses()["billing_tel"] : null}</p>
                            <p>{addresses()["add_line_1"] ? addresses()["add_line_1"] : null}</p>
                            <p>{addresses()["add_line_2"] ? addresses()["add_line_2"] : null}</p>
                            <p>{addresses()["add_line_3"] ? addresses()["add_line_3"] : null}</p>
                            <p>{addresses()["town"] ? addresses()["town"] : null}</p>
                            <p>{addresses()["county"] ? addresses()["county"] : null}</p>
                            <p>{addresses()["postcode"] ? addresses()["postcode"] : null}</p>
                            <p>{addresses()["country"] ? addresses()["country"] : null}</p>
                        </div>

                        { getty("delvq") === true ? 
                        <div className="review-delivery">
                            <h1 className="review-title"><b>{addresses()["delv_name"] ? "Delivery Address:" : null}</b></h1>
                        
                            <p>{addresses()["delv_name"] ? addresses()["delv_name"] : null}</p>
                            <p>{addresses()["delv_email"] ? addresses()["delv_email"] : null}</p>
                            <p>{addresses()["delv_tel"] ? addresses()["delv_tel"] : null}</p>
                            <p>{addresses()["delv_add_line_1"] ? addresses()["delv_add_line_1"] : null}</p>
                            <p>{addresses()["delv_add_line_2"] ? addresses()["delv_add_line_2"] : null}</p>
                            <p>{addresses()["delv_add_line_3"] ? addresses()["delv_add_line_3"] : null}</p>
                            <p>{addresses()["delv_town"] ? addresses()["delv_town"] : null}</p>
                            <p>{addresses()["delv_county"] ? addresses()["delv_county"] : null}</p>
                            <p>{addresses()["delv_postcode"] ? addresses()["delv_postcode"] : null}</p>
                            <p>{addresses()["delv_country"] ? addresses()["delv_country"] : null}</p>

                        </div> : null}
                    </div>
                    <div className="review-basket">
                        <BasketList />
                    </div>
                    {!bought ? 
                    <>
                        <div id="end-buttons">
                            <div id="back-to-shop" onClick={() => {setFillingdeets(!fillingdeets); setChecking(false)}}>
                                <Link to={{pathname: "/basket-page"}}>Edit Order</Link>
                            </div>
                            <div>
                                <div id="submit" onClick={() => {buy(); window.scrollTo(0, 0)}}>Submit Order</div>
                            </div>
                        </div>
                    </> 
                    :
                    <span></span>}
                </div>
                <Footer />
            </>
        )
    }
};

