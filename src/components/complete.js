// import React, {useState, useEffect} from "react";
// import {Link} from "react-router-dom";
// import {useProps} from "./hooks/prop-hooks.js";
// import {getty, setty, toTitle} from "./hooks/hooks.js";
// import {BasketList} from "./basketList.js";
// import {Navbar} from "./navBar.js";
// import {SearchBox} from "./searchBox.js";
// import {Header} from "./header.js";
// import axios from "axios";

import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {setty, getty, toTitle} from "./hooks/hooks.js";

export function Complete() {
    const {bought, setBought} = useProps();

    console.log("BOUGHT! ", bought);

    useEffect(() => {
        if (getty("address2") === null) {
            setty("address2", {});
        }
    }, []);

    return (
        <>
            <h1>Hi Fans!</h1>
            {/* {
                getty("address2")?.map((i, key) => (
                    <p key={key}>{i}</p>
                ))
            } */}
            <div>
                <p>Billing Name: {getty("address2")["billing_name"]}</p>
                <p>Billing Email: {getty("address2")["billing_email"]}</p>
            </div>
        </>
    );
};


// export function Checkout() {
//     const [delvq, setDelvq] = useState(false);
//     const [disp, setDisp] = useState("none");
//     // const [fillingdeets, setFillingdeets] = useState(false);
//     const [bought, setBought] = useState(false);
//     // const [checked, setChecked] = useState(false);
//     const [order, setOrder] = useState({gas: "YEs", gas2: "no", gas3: "posso!"});
//     const [grandTotal, setGrandTotal] = useState(0.00);
//     const [typing, setTyping] = useState("");
//     const [coupons, setCoupons] = useState("");
//     const [address2, setAddress2] = useState({});
//     const {updateTotal, dis, setDis, setSearched, fillingdeets, setFillingdeets, 
//         checked, setChecked, checking, setChecking} = useProps();

//     useEffect(() => {
//         if (getty("searchList") !== []) {
//             setSearched(false);
//         };
//         if (getty("delvq") === null) {
//             setty("delvq", false);
//         };
//         // if (disp) {
//         setDisp("none");
//         // };
//         console.log("Checking! ", checking);
//     }, [])
    
//     useEffect(() => {
//         if (delvq) {
//             setDisp("block");
//         } else {
//             setDisp("none");
//         };
//         setty("delvq", delvq);
//     }, [delvq]);

//     function api_call(id) {
//         const promise = axios.get(`http://localhost:8000/api/products/${id}/`);
//         const promisedData = promise.then((res) => res.data);
//         return promisedData;
//     };

//     async function makeReceipt() {
//         // var line = {};
//         var line2 = [];
//         var totalArr = [];
//         const ord = getty("order");
//         var items = getty("itemsList");
//         var prices = getty("priceList");
//         // console.log(ord);
//         for (let i in ord) {
//             var stuff = "";
//             var liney = await api_call(ord[i]);
//             var quanto = items[parseInt(ord[i])];
//             var price = prices[parseInt(ord[i])];
//             console.log("Quanto! ", quanto);
//             stuff += quanto.toString();
//             stuff += " x ";
//             stuff += liney.prod_title;
//             stuff += (" @ £" + price.toString());
//             stuff += " - line total : £" + (quanto * price).toFixed(2).toString();
//             totalArr.push(quanto * price);
//             console.log("Titol! ", liney.prod_title);
//             line2.push(stuff);
//         };
//         const grandTotal = totalArr.reduce(
//             (acc, curr) => acc + curr, 0);
//         console.log("TOTALE!", grandTotal);
//         setGrandTotal(grandTotal * dis);
//         setOrder(line2);
//         console.log("Branksome! ", line2);
//     };

//     function empty() {
//         setty("itemsList", {});
//         setty("priceList", {});
//         setty("order", []);
//         setAddress2(getty("address"));
//         setDis(getty("discount"));
//         setty("address", {});
//         updateTotal();
//         setty("discount", 1);
//         setty("coupon_name", "");
//     };

//     // function buy() {
//     function buy() {
//         setBought(() => !bought);
//         if (getty("coupon_name") && getty("coupon_name") !== "") {
//             setCoupons(getty("coupon_name"));
//         };
//         makeReceipt();
//         empty();
//         setty("discount", 1);
//         setDis(1);
//         // setCoupons(getty("coupon_name"));
//         console.log("CUNT WASTED MY TIME! ", getty("address"));
//     };

//     function handleChange(e, q) {
//         if (localStorage.getItem("address") === null) {
//             setty("address", JSON.stringify(dicto));
//             var dicto = {};
//         } else {
//             var dicto = getty("address");
//         };
//         var word = "";
//         word = e.target.value;
//         setTyping(word);
//         console.log("QUEGGS", word, dicto);
//         dicto[q] = word;
//         localStorage.setItem("address", JSON.stringify(dicto));
//     };

//     function addresses() {
//         if (getty("address") !== null) {
//             return getty("address");
//         } else {
//             return false;
//         }
//         // return address2;
//     };

//     function abbrev_add(property) {
//         if (addresses() !== false) {
//             return addresses()[`${property}`] ? addresses()[`${property}`] : "";
//         };
//         // return plyke;
//     };

//     if (!fillingdeets) {
//         if (getty("order").length > 0) {
//         console.log("Amos aninmal. ", getty("coupon_name"));
//         return (
//             <>
//                 <h1>Checkout!</h1>
//                 {/* <Navbar />
//                 <SearchBox /> */}
//                 <Header />
//                 <div className="AddressForm" style={{width: "100%"}}>
//                     <form>
//                         <div>
//                             <label htmlFor="name">Name:&nbsp;
//                                 <input type="text" name="name1" onChange={(e) => handleChange(e, "billing_name")} 
//                                     value={abbrev_add("billing_name")}
//                                 />
//                             </label><br />
//                             <label htmlFor="email">Email:&nbsp;
//                                 <input type="text" name="email1" onChange={(e) => handleChange(e, "billing_email")} 
//                                     value={abbrev_add("billing_email")}
//                                 />
//                             </label><br />
//                             <label htmlFor="tel1">Phone:&nbsp;
//                                 <input type="tel" name="tel1" onChange={(e) => handleChange(e, "billing_tel")} 
//                                     value={abbrev_add("billing_tel")}
//                                 />
//                             </label><br />
//                         </div>
//                         <div>
//                             <label htmlFor="delv_q">Different delivery address?&nbsp;
//                                 {delvq === true ? 
//                                 <input type="checkbox" name="delv_q" onClick={() => setDelvq(!delvq)} 
//                                 checked
//                                     // value={getty("delvq")} 
//                                 /> : 
//                                 <input type="checkbox" name="delv_q" onClick={() => setDelvq(!delvq)} />
//                                 }
//                             </label>
//                         </div>
                        
//                         <div style={{display: `${disp}`}}>
//                             <div>
//                                 <label htmlFor="name2">Name:&nbsp;
//                                     <input type="text" name="name2" onChange={(e) => handleChange(e, "delv_name")} 
//                                         value={abbrev_add("delv_name")}
//                                     />
//                                 </label><br />
//                                 <label htmlFor="email2">Email:&nbsp;
//                                     <input type="text" name="email2" onChange={(e) => handleChange(e, "delv_email")} 
//                                         value={abbrev_add("delv_email")}
//                                     />
//                                 </label><br />
//                                 <label htmlFor="tel2">Phone:&nbsp;
//                                     <input type="tel" name="tel2" onChange={(e) => handleChange(e, "delv_tel")} 
//                                         value={abbrev_add("delv_tel")}
//                                     />
//                                 </label><br />
//                             </div>
//                         </div>
                       
//                     </form>
//                     <button onClick={() => {setFillingdeets(!fillingdeets); setChecking(true)}}>Next</button>
//                 </div>
//                 <BasketList />
//                 <div><i><Link to="/">Home</Link></i></div>
//             </>
//         );
//         } else {
//             return (
//                 <>
//                     <h1>Checkout</h1>
//                     {/* <Navbar />
//                     <SearchBox /> */}
//                     <Header />
//                     <BasketList />
//                     <div><i><Link to="/">Home</Link></i></div>
//                 </>
//             );
//         }
//     } else {
//         return (
//             <>
//                 {/* <Navbar />
//                 <SearchBox /> */}
//                 <Header />
//                 {/* <h1>Thanks!</h1>
//                 {
//                 Object.keys(order)?.map((i, key) => (
//                     <div key={key}>
//                         <p>{order[i]}</p>
//                     </div>
//                 ))
//                 } */}
//                 {/* <p>Tote: {grandTotal}</p> */}
//                 {/* {
//                     Object.keys(addresses())?.map((i, key) => (
//                         <p key={key}>{addresses()[i]}</p>
//                     ))
//                 } */}
//                 {/* <p>{getty("discount") !== 1 ? `${getty("discount")} discount applied` : null }</p>
//                 <div><b>TOTAL: £{getty("discount") !== 1 ? 
//                 (grandTotal * getty("discount")).toFixed(2) : grandTotal.toFixed(2)}</b></div> */}
//                 {!bought ? <h2>Review & Submit</h2> : <h2>Thank you for your order!</h2>}
//                 <div style={{color: "#2aaa41"}}>
//                     <b>{getty("discount") !== 1 
//                     ? 
//                         `DISCOUNT APPLIED: ${getty("coupon_name")}` 
//                     : 
//                         ""}</b>
//                 </div>
//                 <div><b>TOTAL: £{(getty("amount")).toFixed(2)}</b></div>
//                 <div>Address Details:</div>
//                 <div>
//                 <p><b>{addresses()["delv_name"] ? "Billing Address" : null}</b></p>
//                 <p>{addresses()["billing_name"] ? addresses()["billing_name"] : null}</p>
//                 <p>{addresses()["billing_email"] ? addresses()["billing_email"] : null}</p>
//                 <p>{addresses()["billing_tel"] ? addresses()["billing_tel"] : null}</p>
//                 </div>

//                 { getty("delvq") === true ? 
//                 <div>
//                 <p><br/ ><b>{addresses()["delv_name"] ? "Delivery Address" : null}</b></p>
                
//                 <p>{addresses()["delv_name"] ? addresses()["delv_name"] : null}</p>
//                 <p>{addresses()["delv_email"] ? addresses()["delv_email"] : null}</p>
//                 <p>{addresses()["delv_tel"] ? addresses()["delv_tel"] : null}</p>
//                 </div> : <span></span>}
//                 <BasketList />
//                 <button onClick={() => {setFillingdeets(!fillingdeets); setChecking(false)}}>Edit Order</button>
//                 <button>Submit Order</button>
//                 <button onClick={(() => buy())}>Reset</button>
//                 <div><i><Link to="/">Home</Link></i></div>
//             </>
//         )
//     }
// };

