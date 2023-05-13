import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, setty, toTitle, empty, back_reset} from "./hooks/hooks.js";
import {BasketList} from "./basketList.js";
import {Basket} from "./basket.js";
import {Navbar} from "./navBar.js";
import {SearchBox} from "./searchBox.js";
import {Header} from "./header.js";
import axios from "axios";

export function Checkout() {
    const [delvq, setDelvq] = useState(false);
    const [disp, setDisp] = useState("none");
    // const [fillingdeets, setFillingdeets] = useState(false);
    // const [bought, setBought] = useState(false);
    // const [checked, setChecked] = useState(false);
    const [order, setOrder] = useState({gas: "YEs", gas2: "no", gas3: "posso!"});
    const [grandTotal, setGrandTotal] = useState(0.00);
    const [typing, setTyping] = useState("");
    const [coupons, setCoupons] = useState("");
    const {updateTotal, dis, cou, setCou, setDis, setSearched, fillingdeets, setFillingdeets, 
        checking, setChecking, bought, setBought, boughtReset, setBoughtreset, 
        mand, setMand, typingAddress, setTypingaddress, burger, setBurger, 
        setMag} = useProps();

    var order_ref = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    useEffect(() => {
        if (getty("searchList") !== []) {
            setSearched(false);
        };
        if (getty("delvq") === null) {
            setty("delvq", false);
        };
        if (getty("boughtReset") === null) {
            setty("boughtReset", false);
        };
        if (getty("address") === null) {
            setty("address", {"billing_name": "", "billing_email": "", 
            "billing_tel": ""});
        };
        // if (disp) {
        setDisp("none");
        if (getty("boughtReset")) {
            // console.log("YAG!");
            empty(setDis, updateTotal, setFillingdeets);
            // setBoughtreset(false);
            setty("boughtReset", false);
            // back_reset(bought, setBought, setDis, updateTotal);
        };
        if (checking) {
            setBought(false);
        };
        // setFillingdeets(false);
        // };
        console.log("Bought Reset", getty("boughtReset"));
        console.log("Checking! ", checking);
        if (cou === "NONE") {
        setCou("");
        };
        console.log("DELVQ: ", delvq);
        console.log("ADDRESS! ", getty("address"), Object.keys(getty("address")).length);
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
    }, [typingAddress])

    function api_call(id) {
        // const promise = axios.get(`http://localhost:8000/api/products/${id}/`);
        const promise = axios.get(`https://polar-coast-39563.herokuapp.com/api/products/${id}/`);
        const promisedData = promise.then((res) => res.data);
        return promisedData;
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

    // function empty() {
    //     setty("itemsList", {});
    //     setty("priceList", {});
    //     setty("order", []);
    //     setDis(getty("discount"));
    //     setty("address", {});
    //     updateTotal();
    //     setty("discount", 1);
    //     setty("coupon_name", "");
    // };

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
        // return plyke;
    };

    // function back_reset() {
    //     if (bought) {
    //         empty(setDis, updateTotal);
    //         setBought(false);
    //         console.log("GRIN!!");
    //     };
    // };

    if (!fillingdeets && getty("address") !== null) {
        if (getty("order").length > 0) {
        console.log("Amos aninmal. ", getty("coupon_name"));
        // back_reset(bought, setBought, setDis, updateTotal);
        return (
            <>
                {/* <Navbar />
                <SearchBox /> */}
                {/* <Basket /> */}
                <Header />
                <h1>Checkout!</h1>
                <div className="AddressForm" style={{width: "100%"}} onClick={() => setMag(false)}>
                    <form>
                        <div>
                        <p><i>Fields marked * are mandatory</i></p>
                        {mand ? <p style={{color: "#ff0000"}}>Please complete all mandatory fields</p> : <span></span>}
                            <label htmlFor="name">Name:*&nbsp;
                                <input type="text" name="name1" onChange={(e) => handleChange(e, "billing_name")} 
                                    value={abbrev_add("billing_name")} 
                                />
                            </label><br />
                            <label htmlFor="email">Email:*&nbsp;
                                <input type="text" name="email1" onChange={(e) => handleChange(e, "billing_email")} 
                                    value={abbrev_add("billing_email")} 
                                />
                            </label><br />
                            <label htmlFor="tel1">Phone:*&nbsp;
                                <input type="tel" name="tel1" onChange={(e) => handleChange(e, "billing_tel")} 
                                    value={abbrev_add("billing_tel")} 
                                />
                            </label><br />
                        </div>
                        <div>
                            <label htmlFor="delv_q">Different delivery address?&nbsp;
                                {delvq ? 
                                <input type="checkbox" name="delv_q" onChange={() => setDelvq(!delvq)}  
                                checked={delvq} id="checkout_checkbox"
                                    // value={getty("delvq")} 
                                /> : 
                                <input type="checkbox" name="delv_q" onChange={() => setDelvq(!delvq)} 
                                    checked={delvq} id="checkout_checkbox" 
                                />
                                }
                            </label>
                        </div>
                        
                        <div style={{display: `${disp}`}}>
                            <div>
                                <label htmlFor="name2">Name:&nbsp;
                                    <input type="text" name="name2" onChange={(e) => handleChange(e, "delv_name")} 
                                        value={abbrev_add("delv_name")}
                                    />
                                </label><br />
                                <label htmlFor="email2">Email:&nbsp;
                                    <input type="text" name="email2" onChange={(e) => handleChange(e, "delv_email")} 
                                        value={abbrev_add("delv_email")}
                                    />
                                </label><br />
                                <label htmlFor="tel2">Phone:&nbsp;
                                    <input type="tel" name="tel2" onChange={(e) => handleChange(e, "delv_tel")} 
                                        value={abbrev_add("delv_tel")}
                                    />
                                </label><br />
                            </div>
                        </div>
                        {/* <input onClick={() => {setFillingdeets(!fillingdeets); setChecking(true); }} type="submit" value="Next" /> */}
                    </form>
                    {/* <button onClick={() => {setFillingdeets(!fillingdeets); setChecking(true); }} type="submit">Next</button> */}
                    {getty("address")["billing_name"] === undefined || getty("address")["billing_name"] === "" || 
                    getty("address")["billing_email"] === undefined || getty("address")["billing_email"] === "" || 
                    getty("address")["billing_tel"] === undefined || getty("address")["billing_tel"] === "" || 
                    getty("address") === null || Object.keys(getty("address")).length === 0 ? 
                        <button onClick={() => {setMand(true)}}>CUNT</button> : 
                        <button onClick={() => {setFillingdeets(!fillingdeets); setChecking(true); setMand(false)}}>Next</button>
                    }
                </div>
                <BasketList />
                <div><i><Link to="/">Home</Link></i></div>
            </>
        );
        } else {
            return (
                <>
                    <h1>Checkout</h1>
                    {/* <Navbar />
                    <SearchBox /> */}
                    {/* <Basket /> */}
                    <Header />
                    <div onClick={() => setMag(false) }></div>
                    <BasketList />
                    <div><i><Link to="/">Home</Link></i></div>
                </>
            );
        }
    } else {
        return (
            <>
                {/* <Navbar />
                <SearchBox /> */}
                    {/* <Basket /> */}
                    <Header />
                <div onClick={() => setMag(false)}>
                    {!bought ? <h2>Review & Submit</h2> : <><h2>Thank you for your order!</h2><p>Your order number is: N{order_ref}</p></>}
                    {/* <div style={{color: "#2aaa41"}}>
                        <b>{getty("discount") !== 1 
                        ? 
                            `DISCOUNT APPLIED: ${getty("coupon_name")}` 
                        : 
                            ""}</b>
                    </div> */}
                    <div><b>TOTAL: £{(getty("amount")).toFixed(2)}</b></div>
                    {getty("address") === null || getty("address") === {} ? "" : <div>Address Details:</div>}
                    <div>
                    <p><b>{addresses()["delv_name"] ? "Billing Address:" : null}</b></p>
                    <p>{addresses()["billing_name"] ? addresses()["billing_name"] : null}</p>
                    <p>{addresses()["billing_email"] ? addresses()["billing_email"] : null}</p>
                    <p>{addresses()["billing_tel"] ? addresses()["billing_tel"] : null}</p>
                    </div>

                    { getty("delvq") === true ? 
                    <div>
                    <p><br/ ><b>{addresses()["delv_name"] ? "Delivery Address:" : null}</b></p>
                    
                    <p>{addresses()["delv_name"] ? addresses()["delv_name"] : null}</p>
                    <p>{addresses()["delv_email"] ? addresses()["delv_email"] : null}</p>
                    <p>{addresses()["delv_tel"] ? addresses()["delv_tel"] : null}</p>
                    </div> : <span></span>}
                    <BasketList />
                    {!bought ? 
                    <>
                        <button onClick={() => {setFillingdeets(!fillingdeets); setChecking(false)}}>Edit Order</button>
                        <button onClick={() => buy()}>Submit Order</button>
                    </> 
                    :
                    <span></span>}
                    {/* <button onClick={(() => buy())}>Reset</button> */}
                    <div><i><Link to="/">Home</Link></i></div>
                </div>
            </>
        )
    }
};

