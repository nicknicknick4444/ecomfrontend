import React, {useState, useEffect} from "react";
import {useProps} from "./hooks/prop-hooks.js";
import {setty, getty, get_location} from "./hooks/hooks.js";
import {AllInput} from "./basketUpdate.js";
import {Link} from "react-router-dom";
import axios from "axios";

export function BasketList(){
    const {updateTotal, amount, cou, setCou, dis, setDis,  
        checking, setChecking, bought} = useProps();
    const [prod, setProd] = useState();
    const [basket, setBasket] = useState([]);
    const [arr, setArr] = useState([]);
    

    // const getty = (place) => {
    //     return JSON.parse(localStorage.getItem(place));
    // };

    // const setty = (place, val) => {
    //     return localStorage.setItem(place, JSON.stringify(val));
    // };

    const refreshList = ()  => {
        var basketList = [];
        // var curr = JSON.parse(localStorage.getItem("itemsList"));
        var curr = getty("itemsList");
        for (let i in curr) {
        i = parseInt(i);
        console.log(i);
        axios
            // .get(`http://localhost:8000/api/products/${i}/`)
            .get(`https://polar-coast-39563.herokuapp.com/api/products/${i}/`)
            .then((res) => basketList.push(res.data))
            .catch(err => console.log("Error: ", err));
        };
        setProd(basketList);
        console.log("Drush! ", basketList);
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
        console.log("Poggo! ", arro);
        setArr(arro);
    };

    useEffect(() => {
        if (getty("order") === null) {
            setty("order", []);
        };
        loopyApi();
        // SOMETHING ABOUT COU DEFAULTING TO "" IF "NONE" on render
    }, []);


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
        // var price = getty("priceList");
        for (let i in many){
            total += many[parseInt(i)];
        console.log("Cannot be stolen: ", total);
        };
        return total;
    };

    useEffect(() => {
        if (!prod) {
            setProd(refreshList());
        } else {
            total();
        };

        // };
        // if (prod) {
        //     total();
        // };


        // if (getty("order") === null) {
        //     setty("order", []);
        // };
    }, []);

    for (let i in prod){
        console.log(i);
    };

    const shopping = () => {
        setBasket(getty("basket"));
    };

    function deleteButton(the_id){
        var itemsList = JSON.parse(localStorage.getItem("itemsList"));
        itemsList[parseInt(the_id)] = 0;
        console.log("Gauche222! ", itemsList);
        //localStorage.setItem("itemsList", JSON.stringify(itemsList));
        setty("itemsList", itemsList);
        updateTotal();
        var ord = getty("order");
        ord = ord.filter(val => val !== parseInt(`${the_id}`));
        // localStorage.setItem("order", JSON.stringify(ord));
        setty("order", ord);
        if (getty("order").length < 1) {
            console.log("GOUDA BREEZE!");
            setty("discount", 1);
            setty("coupon-name", "");
            setDis(1);
        }
        // if (getty("order").length)
        // setDis()
        setCou("");
        console.log("18 Wheeler! ", dis);
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
        // amounty();
        total();
    }, [prod, amount]);
    
    if (prod) {
        console.log("Amount! ", amount);
        // var amoont = amounty();
        // console.log("Amoooont! ", amo);
        var amount_total = 0;
        if ("amount" in localStorage) {
            console.log("AMOONT ", getty("amount"));
            amount_total = getty("amount");
        } else {
            console.log("Also AMOONT", amount);
            amount_total = amount;
        }
        return (
            <>
                {
                    parseInt(getty("amount")) > 0 ?
                    arr?.map((i, key) => (
                        getty("itemsList")[`${i.id}`] > 0 ?
                        <div key={key}>
                        <p>
                            <Link to={{pathname: `/${i.prod_cat}/${i.prod_subcat}/${i.id}`}}>{i.prod_title}</Link><br />
                            Quantity: {getty("itemsList")[`${i.id}`]}<br />
                            Cost: £{amounty(i.id).toFixed(2)}<br />
                            {(checking === false && bought === false) ? 
                            <><AllInput item={i} words={"Edit Quantity"} placeholder={"1"} /><br />
                            <button onClick={() => {deleteButton(parseInt(i.id))}}>Delete</button> 
                            {bought.toString()} {checking.toString()}
                            </>
                            : null
                            }
                            </p>
                        </div>
                        : ""
                    ))
                    :
                    <div>Basket is sound empty!</div>
                }

                {getty("discount") !== 1 & getty("coupon_name") !== "" ? 
                    <div><b><span style={{color: "#2aaa41"}}>COUPON CODE {getty("coupon_name")} ADDED</span></b><br />
                    <del>Original total: £{(amount_total / getty("discount")).toFixed(2)}</del></div> : 
                    cou === "NONE" ? <span style={{color: "#ff0000"}}><i>Coupon code not recognised</i></span> : ""}
                    {/* {amount_total > 0 ? <div><b>{getty("discount") !== 1 ? "NEW" : ""} TOTAL: £{amount_total.toFixed(2)}</b></div> : null} */}
                    {get_location() === "/basket-page" || get_location() === "/checkout" ?
                    amount_total > 0 ? <div><b>{total_word()} TOTAL: £{amount_total.toFixed(2)}</b></div> : null
                    : null
                    }
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
