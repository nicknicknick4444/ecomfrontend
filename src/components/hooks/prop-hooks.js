import React, {createContext, useState, useEffect, useContext} from "react";
import {getty, setty} from "./hooks.js";
import axios from "axios";

const PropContext = createContext();
export const useProps = () => useContext(PropContext);

export default function PropProvider({children}) {
    const getty = (place) => {
        return JSON.parse(localStorage.getItem(place));
    };
    console.log("GETTY1: ", getty("itemsList"));

    var counto = 0;
    for (let i in getty("itemsList")) {
        counto += getty("itemsList")[`${i}`];
    };
    console.log("Main counto!", counto);

    const [totally, setTotal] = useState(counto);
    const [amount, setAmount] = useState(0.00);
    const [dis, setDis] = useState(parseFloat(getty("discount")));
    const [cou, setCou] = useState("");
    const [category, setCategory] = useState("");
    const [prods, setProds] = useState([]);
    const [vis, setVis] = useState("Standby");
    const [new_quant, setNew_quant] = useState(1);
    const [raw, setRaw] = useState({});
    const [searchTyping, setSearchtyping] = useState("");
    const [typingAddress, setTypingaddress] = useState({});
    const [shortlist, setShortlist] = useState([]);
    const [searched, setSearched] = useState(false);
    const [page, setPage] = useState([0,2]);
    const [numbers, setNumbers] = useState([]);
    const [subset, setSubset] = useState([]);
    // const [bought, setBought] = useState(false);
    const [bought, setBought] = useState(false);
    const [boughtReset, setBoughtreset] = useState(false);
    const [fillingdeets, setFillingdeets] = useState(false);
    const [checked, setChecked] = useState(false);
    const [checking, setChecking] = useState(false);
    const [mand, setMand] = useState(false);
    const [taxo, setTaxo] = useState([]);
    const [allcats, setAllcats] = useState([]);
    const [burger, setBurger] = useState(false);

    function assertCateg(categ) {
        setCategory(categ);
    };
    
    function insertPrice(item) {
        console.log("SCOOT! ", item);
        if ("priceList" in localStorage) {
          console.log("CREB!");
          if (localStorage.getItem("priceList")[`${item.id}`] !== undefined) {
            var priceL = getty("priceList");
            console.log("RIP Steve Mackey! ", item);
            priceL[item.id] = item.price;
            localStorage.setItem("priceList", JSON.stringify(priceL));
          } else {
            var priceL = {};
            priceL[item.id] = item.price;
            localStorage.setItem("priceList", JSON.stringify(priceL));
            };
        } else {
            var priceL = {};
            priceL[item.id] = item.price;
            localStorage.setItem("priceList", JSON.stringify(priceL));
        }
      };

    function totUp(quants) {
        var currTotal = 0;
        var prices = getty("priceList");
        // NEW DISCOUNT MULTIPLIER!
        var discount = parseFloat(getty("discount"));
        for (let i in quants) {
            console.log("Prices! ", prices[i]);
            console.log("Quant: ", quants[i]);
            var iQuant = quants[i];
            var iPrices = prices[i];
            if (iQuant < 0) {
                iQuant = 0;
            };
            if (iPrices === undefined) {
                iPrices = 0;
            };
            currTotal += (iQuant * iPrices);
            // console.log("iQuant: ", iQuant);
            // setNew_quant(iQuant);
        };
        console.log("She's a River! ", currTotal);
        if (currTotal < 0) {
            return 0;
        };
        // NEW DISCOUNT MULTIPLIER!
        currTotal *= discount;
        
        console.log("CROUDACEIE! BLOWY! ", currTotal);
        localStorage.setItem("amount", currTotal);
        return currTotal;
    };

    function begin() {
        // if (!"priceList" in localStorage) {
        if (getty("priceList") === null) {
            localStorage.setItem("priceList", JSON.stringify({}));
        };
        // if (!"itemsList" in localStorage) {
        if (getty("itemsList") === null) {
            localStorage.setItem("itemsList", JSON.stringify({}));
        };
        // if (!"discount" in localStorage) {
        if (getty("discount") === null) {
            localStorage.setItem("discount", JSON.parse(1));
        };
        return totUp(getty("itemsList"));
    };

    function adjOrder(id){
        // var newy = parseInt(localStorage.getItem("new"));
        var newy = parseInt(getty("new"));

        if(newy > 0) {
            var index = parseInt(id);
            if ("order" in localStorage) {
                // var ord = JSON.parse(localStorage.getItem("order"));
                var ord = getty("order");
            } else {
                var ord = [];
            };

            if (ord.indexOf(parseInt(index)) === -1){
                ord.push(index);
            };
            console.log("GAUDY! ", ord);
            localStorage.setItem("order", JSON.stringify(ord));
        } else {
            if ("order" in localStorage) {
                // var ord = JSON.parse(localStorage.getItem("order"));
                var ord = getty("order");
            } else {
                var ord = [];
            };

            if (parseInt(getty("new")) + parseInt(getty("itemsList")[`${id}`]) <= 0) {
                    ord = ord.filter(val => val !== parseInt(`${id}`));
                    console.log("Bundle: ", ord);
            } else {
                console.log("CABBAGE!", parseInt(getty("new")) + parseInt(getty("itemsList")[`${id}`]));
            }
            console.log("PUCE!!", ord);
            localStorage.setItem("order", JSON.stringify(ord));
        };
    };

    const updateTotal = () => {
        // var beat = JSON.parse(localStorage.getItem("itemsList"));
        var beat = getty("itemsList");
        // var discount = parseInt(getty("discount"));
        // console.log("It is confusing!", discount);
        var newTotal = 0;
        for (let i in beat) {
            if (beat[`${i}`] < 0) {
                newTotal += 0;
            } else {
                newTotal += beat[`${i}`];
            };
            console.log(counto, newTotal);
        };
        // newTotal *= discount;
        console.log("GETTY2: ", beat);

        if (newTotal < 0) {
            setTotal(0);
        } else {
            setTotal(newTotal);
        };
        console.log("Begint! ", begin());
        setAmount(totUp(beat));
    };

    // const [page, setPage] = useState([0,1]);
    // const [numbers, setNumbers] = useState([]);
    // const [subset, setSubset] = useState([]);

    function section(array_list) {
        // if (prods) {
            var page_nums = [];
            var sub_section = getty(array_list).slice(page[0], page[0] + page[1]);
            var many = [...Array(Math.ceil(prods.length/page[1])).keys()];
            console.log("Pages! ", many);
            for (let i in many) {
                console.log("YAHOO! ", i);
                page_nums.push(many[i]);
            }

            setSubset(sub_section);
            setNumbers(page_nums);
            setty("sub_section", sub_section);
            setty("page_nums", page_nums);
            console.log("Picadilly Palare! ", numbers, many);
        // }
    };

    function page_click(page_num) {
        var new_page = [page_num * page[1], page[1]];
        setPage(new_page);
        console.log("Now I'm here! ", new_page);
    };

    function getAllCats() {
        var all_cats = [];
        function goose(listu) {
            for (let i in listu) {
                console.log("Deus does not exist!");
                if (all_cats.indexOf(listu[i]["prod_cat"]) === -1) {
                    all_cats.push(listu[i]["prod_cat"]);
                } else if (all_cats.indexOf(listu[i]["prod_subcat"]) === -1) {
                    all_cats.push(listu[i]["prod_subcat"]);
                };
            };
            setAllcats(all_cats);
            setty("all_cats", all_cats);
        };
            // axios(`http://localhost:8000/api/products/`)
            axios(`https://polar-coast-39563.herokuapp.com/api/products/`)
            .then((res) => goose(res.data))
            .catch(err => console.log("Error: ", err));
        return all_cats;
}

    async function prods_api() {
        var quest = await getAllCats();
        console.log("The subcats quest!", quest);
    };

    return <PropContext.Provider value={{totally, totUp, updateTotal, setAmount, amount, insertPrice, 
    adjOrder, begin, dis, setDis, cou, setCou, category, setCategory, prods, setProds, vis, setVis,
    new_quant, setNew_quant, shortlist, raw, setRaw, setShortlist, searched, setSearched, 
    searchTyping, setSearchtyping, page, setPage, numbers, setNumbers, subset, setSubset, 
    section, page_click, fillingdeets, setFillingdeets, checked, setChecked, checking, setChecking, 
    bought, setBought, boughtReset, setBoughtreset, mand, setMand, typingAddress, setTypingaddress, 
    allcats, prods_api, taxo, setTaxo, burger, setBurger}}>
        {children}
    </PropContext.Provider>
};
