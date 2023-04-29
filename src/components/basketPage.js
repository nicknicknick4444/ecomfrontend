import React, {useState, useEffect} from "react";
import {useProps} from "./hooks/prop-hooks.js";
import {AllInput} from "./basketUpdate.js";
import {Link} from "react-router-dom";
import axios from "axios";

export function BasketList(){
    const {updateTotal, amount, dis, setDis} = useProps();
    const [prod, setProd] = useState();
    const [basket, setBasket] = useState([]);
    const [arr, setArr] = useState([]);

    const getty = (place) => {
        return JSON.parse(localStorage.getItem(place));
    };

    const refreshList = ()  => {
        var basketList = [];
        var curr = JSON.parse(localStorage.getItem("itemsList"));
        for (let i in curr) {
        i = parseInt(i);
        console.log(i);
        axios
            .get(`https://polar-coast-39563.herokuapp.com/api/products/${i}/`)
            .then((res) => basketList.push(res.data))
            .catch(err => console.log("Error: ", err));
        };
        setProd(basketList);
        console.log("Drush! ", basketList);
        return basketList;
    };

    function api_call(id){
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
        loopyApi();
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
        };
        if (prod) {
            total();
            amounty();
        };
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
        console.log("Gauche2! ", itemsList);
        localStorage.setItem("itemsList", JSON.stringify(itemsList));
        updateTotal();
        var ord = getty("order");
        ord = ord.filter(val => val !== parseInt(`${the_id}`));
        localStorage.setItem("order", JSON.stringify(ord));
        // if (itemsList.length === 1) {
        //     setDis(1);
        // };
    };

    useEffect(() => {
        shopping();
        amounty();
        total();
    }, [prod, amount]);
    
    if (prod) {
        console.log("Amount! ", amount);
        return (
            <>
                {
                    parseInt(getty("amount")) > 0 ?
                    arr?.map((i, key) => (
                        getty("itemsList")[`${i.id}`] > 0 ?
                        <div key={key}>
                        <p>
                            {i.prod_title}<br />
                            Quantity: {getty("itemsList")[`${i.id}`]}<br />
                            Cost: £{amounty(i.id).toFixed(2)}<br />

                            <AllInput item={i} words={"Edit Quantity"} /><br />
                            <button onClick={() => {deleteButton(parseInt(i.id))}}>Delete</button>
                            </p>
                        </div>
                        : ""
                    ))
                    :
                    <div>Basket is sound empty!</div>
                }


                <div><b>TOTAL: £{getty("amount").toFixed(2)}</b></div>
                {/* <div>
                    <input type="text" onClick={() => coupon()} />
                    <button>Add Coupon</button></div> */}
                <p><i><Link to="/">Home</Link></i></p>
            </>
        );
    } else {
        return (
            <>
                <h1>CUNT2!</h1>
            </>
        )
    }

};
