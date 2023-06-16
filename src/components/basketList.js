import React, {useState, useEffect} from "react";
import {useProps} from "./hooks/prop-hooks.js";
import {setty, getty, get_location} from "./hooks/hooks.js";
import {AllInput} from "./basketUpdate.js";
import {Link} from "react-router-dom";
import axios from "axios";

export function BasketList(){
    const {updateTotal, amount, cou, setCou, dis, setDis,  
        checking, setChecking, bought, loc, setLoc} = useProps();
    const [prod, setProd] = useState();
    const [basket, setBasket] = useState([]);
    const [arr, setArr] = useState([]);
    const [arr2, setArr2] = useState([]);
    const [long, setLong] = useState(false);
    // const [loc, setLoc] = useState("");
    const [arr3, setArr3] = useState([]);

    // var domain = "http://localhost:3000";
    var domain = "https://ecomfrontend-nick.vercel.app";
    
    const refreshList = ()  => {
        var basketList = [];
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
        if (arro.length > 4) {
            setArr2(arro.slice(-3));
            setLong(true);
            // arr3 = arro.splice(-4, -1);
        } else {
            setArr2(arro);
            setLong(false);
            // arr3 = arro;
        };


    };

    useEffect(() => {
        if (getty("order") === null) {
            setty("order", []);
        };
        loopyApi();
        setLoc(get_location());
        // SOMETHING ABOUT COU DEFAULTING TO "" IF "NONE" on render
    }, []);

    useEffect(() => {
        // if (loc !== get_location) {
        //     setLoc(get_location());
            if (get_location() !== "/basket-page" && get_location() !== "/checkout") {
                setArr3(arr2);
            } else {
                setArr3(arr);
            };
        // };
        console.log("REFRESH!", loc, arr3);
    }, [arr]);

    // useEffect(() => {
    //     // if (arr.length > 4) {
    //     //     setArr2([arr.slice(-4, -1)]);
    //     // } else {
    //     //     console.log("BEAT!");
    //     // }
    //     // console.log("Arr2 Pothy! ", arr.slice(-4, -1), arr2, arr.length);
    //     if (get_location() !== "/basket-page" || get_location() !== "/checkout") {
    //         arr3 = arr2;
    //     } else {
    //         arr3 = arr;
    //     }
    // }, [arr2]);

    useEffect(() => {
        console.log("Granthy! ", arr2);
    }, [arr2]);


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
        console.log("Tsunami tsunami! ", get_location());
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
                                    {/* </Link> */}
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
                                    {/* {bought.toString()} {checking.toString()} */}
                                    </>
                                    
                                    : null
                                    }
                                    
                                </div>
                            </div>
                        </div>
                        : ""
                    ))
                    
                    :
                    <div>Basket is sound empty!</div>
                }
                {/* {long && get_location() !== "/basket-page" && get_location() !== "/checkout" ? 
                    <div id="see_all"><Link to={{pathname: "/basket-page"}}>See All</Link></div> 
                    : null} */}

                {get_location() === "/basket-page" || get_location() === "/checkout" ?
                    
                    getty("discount") !== 1 & getty("coupon_name") !== "" && getty("amount") > 0 && getty("amount") !== null ? 
                    <div id="discount-info"><b><span style={{color: "#2aaa41"}}>COUPON CODE {getty("coupon_name")} ADDED</span></b><br />
                    <del>Original total: £{(amount_total / getty("discount")).toFixed(2)}</del></div> : 
                    cou === "NONE" ? <span id="coupon-error" style={{color: "#ff0000"}}><i>Coupon code not recognised</i></span> : "" : null}
                    {/* {amount_total > 0 ? <div><b>{getty("discount") !== 1 ? "NEW" : ""} TOTAL: £{amount_total.toFixed(2)}</b></div> : null} */}
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
