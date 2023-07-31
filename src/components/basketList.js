import React, {useState, useEffect} from "react";
import {useProps} from "./hooks/prop-hooks.js";
import {setty, getty, get_location} from "./hooks/hooks.js";
import {AllInput} from "./basketUpdate.js";
import {Link} from "react-router-dom";
import axios from "axios";

export function BasketList(){
    const {updateTotal, amount, cou, setCou, dis, setDis,  
        checking, bought, setLoc} = useProps();
    const [prod, setProd] = useState();
    const [basket, setBasket] = useState([]);
    const [arr, setArr] = useState([]);
    const [arr2, setArr2] = useState([]);
    const [long, setLong] = useState(false);
    const [arr3, setArr3] = useState([]);

    // var domain = "http://localhost:3000";
    var domain = "https://ecomfrontend-nick.vercel.app";
    
    const refreshList = ()  => {
        var basketList = [];
        var curr = getty("itemsList");
        for (let i in curr) {
        i = parseInt(i);
        axios
            // .get(`http://localhost:8000/api/products/${i}/`)
            .get(`https://polar-coast-39563.herokuapp.com/api/products/${i}/`)
            .then((res) => basketList.push(res.data))
            .catch(err => console.log("Error: ", err));
        };
        setProd(basketList);
        return basketList;
    };

    function api_call(id){
        // const promise = axios.get(`http://localhost:8000/api/products/${id}/`);
        const promise = axios.get(`https://polar-coast-39563.herokuapp.com/api/products/${id}/`);
        const promisedData = promise.then((res) => res.data)
        return promisedData;
    };

    async function loopyApi(){
        var arro = [];
        var ord = getty("order");
        let reso;
        for (let i in ord){
            reso = await api_call(parseInt(ord[i]));
            arro.push(reso);
        };
        setArr(arro);
        if (arro.length > 4) {
            setArr2(arro.slice(-3));
            setLong(true);
        } else {
            setArr2(arro);
            setLong(false);
        };


    };

    useEffect(() => {
        if (getty("order") === null) {
            setty("order", []);
        };
        loopyApi();
        setLoc(get_location());
    }, []);

    useEffect(() => {
            if (get_location() !== "/basket-page" && get_location() !== "/checkout") {
                setArr3(arr2);
            } else {
                setArr3(arr);
            };
    }, [arr]);

    // useEffect(() => {
    //     console.log("For testing: arr2 upon change", arr2);
    // }, [arr2]);


    function amounty(id) {
        if (getty("itemsList")){
            var many = getty("itemsList");
            var price = getty("priceList");
            return many[parseInt(id)] * price[parseInt(id)];
        } else {
            return 0;
        };
    };

    function total() {
        if (!getty("itemsList")){
            return 0;
        } else if (!getty("priceList")){
            return 0;
        }
        var total = 0;
        var many = getty("itemsList");
        for (let i in many){
            total += many[parseInt(i)];
        };
        return total;
    };

    useEffect(() => {
        if (!prod) {
            setProd(refreshList());
        } else {
            total();
        };
    }, []);

    const shopping = () => {
        setBasket(getty("basket"));
    };

    function deleteButton(the_id){
        var itemsList = JSON.parse(localStorage.getItem("itemsList"));
        itemsList[parseInt(the_id)] = 0;
        setty("itemsList", itemsList);
        updateTotal();
        var ord = getty("order");
        ord = ord.filter(val => val !== parseInt(`${the_id}`));
        setty("order", ord);
        if (getty("order").length < 1) {
            setty("discount", 1);
            setty("coupon-name", "");
            setDis(1);
        };
        setCou("");
    };

    function total_word() {
            if (getty("discount") !== 1 && !bought) {
                return ("NEW");
            } else if (getty("discount") !== 1 && bought) {
                return ("ORDER")
        } else {
            return "";
        }
    };
    

    useEffect(() => {
        shopping();
        total();
    }, [prod, amount]);
    
    if (prod) {
        var amount_total = 0;
        if ("amount" in localStorage) {
            amount_total = getty("amount");
        } else {
            amount_total = amount;
        }
        
        return (
            <>
                {long && get_location() !== "/basket-page" && get_location() !== "/checkout" ?
                <div className="see_all">...</div>
                : null}
                {
                    parseInt(getty("amount")) > 0 ? 
                    arr3?.map((i, key) => (
                        getty("itemsList")[`${i.id}`] > 0 ?
                        <div key={key}>
                        <div id="basket-item">
                            <div className="prod_details">
                                <div id="basket_title">
                                    <a href={`${domain}/${i.prod_cat}/${i.prod_subcat}/${i.id}`}>
                                        <b>{i.prod_title}</b>
                                    </a>
                                </div>
                                <span className="basket_writing">Quantity: {getty("itemsList")[`${i.id}`]}<br />
                                Cost: £{amounty(i.id).toFixed(2)}</span><br />
                                <span className={get_location() !== "/basket-page" && get_location() !== "/checkout" ? 
                                    "basket_image_contain" : 
                                    "basket_image_contain2"}>
                                    <a href={`${domain}/${i.prod_cat}/${i.prod_subcat}/${i.id}`}>
                                        <img className="basket_image" src={i.image} />
                                    </a>
                                </span>
                                {(checking === false && bought === false) ? 
                                <>
                                <div id="basket-page-input">
                                    <div id="prod_input">
                                        <AllInput item={i} words={"Edit/ Update"} placeholder={"1"} />
                                        <button id="update-button" className="changeBasket" onClick={() => {deleteButton(parseInt(i.id))}}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                    </>
                                    : null
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        : ""
                    ))
                    
                    :
                    <div id="empty-basket">Your basket is empty</div>
                }
                
                {get_location() === "/basket-page" || get_location() === "/checkout" ?
                    
                    getty("discount") !== 1 & getty("coupon_name") !== "" && getty("amount") > 0 && getty("amount") !== null ? 
                    <div id="discount-info"><b><span style={{color: "#2aaa41"}}>Coupon code {getty("coupon_name")} added</span></b><br />
                    <del>Original total: £{(amount_total / getty("discount")).toFixed(2)}</del></div> : 
                    cou === "NONE" ? <span id="coupon-error" style={{color: "#ff0000"}}><i>Coupon code not recognised</i></span> : "" : null}
                    {get_location() === "/basket-page" || get_location() === "/checkout" ?
                    amount_total > 0 ? <div id="grand-total"><b>{total_word()} TOTAL: £{amount_total.toFixed(2)}</b></div> : null
                    : null
                    }

                    {long && get_location() !== "/basket-page" && get_location() !== "/checkout" ? 
                    <div className="see_all" id="see_all_itself"><Link to={{pathname: "/basket-page"}}>See All</Link></div> 
                    : null}
            </>
        );
    } else {
        return (
            <>
                <p><b>Loading...</b></p>
            </>
        )
    }

};
