import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, setty, toTitle, empty, back_reset} from "./hooks/hooks.js";
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
        checking, setChecking, bought, setBought, boughtReset, setBoughtreset, 
        mand, setMand, emailval, setEmailval, typingAddress, setTypingaddress, burger, setBurger, 
        setMag} = useProps();

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
        console.log("Bought Reset", getty("boughtReset"));
        console.log("Checking! ", checking);
        if (cou === "NONE") {
            setCou("");
        };
        console.log("DELVQ: ", delvq);
        console.log("ADDRESS! ", getty("address"), Object.keys(getty("address")).length);
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

    // useEffect(() => {
    //     if (bought) {
    //         setBurger(true);
    //     };
    // }, [burger]);

    useEffect(() => {
        setMand(false);
        setEmailval(false);
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
            console.log("POOKSGREEN! THE BRAVERY!");
            // setEmailval(true);
            return true;
        } else {
            console.log("FINEY FINEMAN FINE!");
            // setEmailval(false);
            return false;
        };
    };

    function set_red_messages() {
        // Check mandataory fields set
        if (check_mand()) {
            setMand(true);
            console.log("Missing some mand fields!");
        } else {
            setMand(false);
            console.log("All mand fields set!");
        };

        // Check email contains @ symbol
        if (check_email()) {
            setEmailval(true);
            console.log("Invalid email!");
        } else {
            setEmailval(false);
            console.log("Valid email!");
        };
    };

    async function makeReceipt() {
        // var line = {};
        var line2 = [];
        var totalArr = [];
        const ord = getty("order");
        var items = getty("itemsList");
        var prices = getty("priceList");
        // console.log(ord);
        for (let i in ord) {
            var stuff = "";
            var liney = await api_call(ord[i]);
            var quanto = items[parseInt(ord[i])];
            var price = prices[parseInt(ord[i])];
            console.log("Quanto! ", quanto);
            stuff += quanto.toString();
            stuff += " x ";
            stuff += liney.prod_title;
            stuff += (" @ £" + price.toString());
            stuff += " - line total : £" + (quanto * price).toFixed(2).toString();
            totalArr.push(quanto * price);
            console.log("Titol! ", liney.prod_title);
            line2.push(stuff);
        };
        const grandTotal = totalArr.reduce(
            (acc, curr) => acc + curr, 0);
        console.log("TOTALE!", grandTotal);
        setGrandTotal(grandTotal * dis);
        setOrder(line2);
        console.log("Branksome! ", line2);
    };

    // function buy() {
    function buy() {
        // setBought(() => !bought);
        // setBoughtreset(true);
        setty("boughtReset", true);
        console.log("Bought Reset", getty("boughtReset"));
        if (getty("coupon_name") && getty("coupon_name") !== "") {
            setCoupons(getty("coupon_name"));
        };
        makeReceipt();
        // empty();
        // setty("discount", 1);
        setDis(1);
        // setCoupons(getty("coupon_name"));
        setBought(true);
        setChecking(false);
        // setFillingdeets(false);
        console.log("MAN WASTED MY TIME! ", getty("address"));
        // empty(setDis, updateTotal);
    };

    function handleChange(e, q) {
        // if (localStorage.getItem("address") === null) {
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
        console.log("QUEGGS", word, dicto);
        dicto[q] = word;
        // localStorage.setItem("address", JSON.stringify(dicto));
        setty("address", dicto);
        setTypingaddress(dicto);
        if (q === "billing_email") {
            check_email();
        };
        // if (mand) {
        //     setMand(false);
        // };
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
        console.log("Amos aninmal. ", getty("coupon_name"));
        // window.scrollTo(0, 0);
        return (
            <>
                <Header />
                <div className="checkout-container">
                    <h1><Link to={"/basket-page"}><span className="past">1. Basket</span></Link>&nbsp;&nbsp;
                    <span className="present">2. Address</span>&nbsp;&nbsp;
                    <span className="future">3. Review</span>&nbsp;&nbsp;
                    <span className="future">4. Finish</span>
                    </h1>
                    <div className="address-form" onClick={() => setMag(false)}>
                        <form>
                            <div id="billing">
                            <p><i>Fields marked * are mandatory</i></p>
                            {mand ? <p id="mandatory">Please complete all mandatory fields</p> : null}
                            {emailval ? <p id="email-val">Please enter a valid email address</p> : null}
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
                                {/* <p>Gesp.</p> */}
                                
                                <div id="bottom-buttons">
                                <Link to={{pathname: "/"}}><div id="back-to-shop"><Link to={{pathname: "/"}}>Continue Shopping</Link></div></Link>
                                    {
                                            check_mand() === true || check_email() === true 
                                            ? 
                                            <div id="next2" onClick={() => {set_red_messages()}}>Next</div> : 
                                            <div id="next" onClick={() => {setFillingdeets(!fillingdeets); setChecking(true); setMand(false); setEmailval(false)}}>
                                                Next
                                            </div>
                                    }
                                    
                                </div>
                                
                                
                                
                                </div>
                                {/* </div> */}

                                {/* <div id="delv-q">
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
                                </div> */}
                            </div>
                            

                            {/* <div id="delivery" style={{display: `${disp}`}}> */}
                                <div id="delivery-container">


                            
                                {/* <div id="delv-q">
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
                                </div> */}

                                {/* {
                                        getty("address")["billing_name"] === undefined || getty("address")["billing_name"] === "" || 
                                        getty("address")["billing_email"] === undefined || getty("address")["billing_email"] === "" || 
                                        getty("address")["billing_tel"] === undefined || getty("address")["billing_tel"] === "" || 
                                        getty("address")["add_line_1"] === undefined || getty("address")["add_line_1"] === "" || 
                                        getty("address")["town"] === undefined || getty("address")["town"] === "" || 
                                        getty("address")["postcode"] === undefined || getty("address")["postcode"] === "" || 
                                        (delvq === true && getty("address")["delv_name"] === undefined) || (delvq === true && getty("address")["delv_name"] === "") || 
                                        (delvq === true && getty("address")["delv_add_line_1"] === undefined) || (delvq === true && getty("address")["delv_add_line_1"] === "") || 
                                        (delvq === true && getty("address")["delv_town"] === undefined) || (delvq === true && getty("address")["delv_town"] === "") || 
                                        (delvq === true && getty("address")["delv_postcode"] === undefined) || (delvq === true && getty("address")["delv_postcode"] === "") || 
                                        getty("address") === null || Object.keys(getty("address")).length === 0 ? 
                                        <div id="next2" onClick={() => {setMand(true)}}>Next</div> : 
                                        <div id="next" onClick={() => {setFillingdeets(!fillingdeets); setChecking(true); setMand(false)}}>
                                            Next
                                        </div>
                                } */}
                            
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


                    {/* <Link to={{pathname: "/"}}><button id="back-to-shop">Continue Shopping</button></Link> */}
                </div>
                {/* <div><i><Link to="/">Home</Link></i></div> */}
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
                    <div><i><Link to="/">Home</Link></i></div>
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
                        <span className="present">3. Review</span>&nbsp;&nbsp;
                        <span className="future">4. Finish</span>&nbsp;&nbsp;
                    </h1>
                    {!bought ? null : <>
                        <div id="thanks">
                            <h2>Thank you for your order!</h2><p>Your order number is:&nbsp; 
                            <span id="order-ref"><b>N{order_ref}</b></span></p>
                        </div>
                    </>}
                    {/* <div><b>TOTAL: £{(getty("amount")).toFixed(2)}</b></div> */}
                    {/* {getty("address") === null || getty("address") === {} ? "" : <h1>Review & Complete</h1>} */}
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
                                <div id="submit" onClick={() => buy()}>Submit Order</div>
                            </div>
                        </div>
                    </> 
                    :
                    <span></span>}
                    {/* <button onClick={(() => buy())}>Reset</button> */}
                    {/* <div><i><Link to="/">Home</Link></i></div> */}
                </div>
                <Footer />
            </>
        )
    }
};

