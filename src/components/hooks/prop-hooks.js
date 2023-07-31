import React, {createContext, useState, useContext} from "react";
import {getty, setty} from "./hooks.js";
import axios from "axios";

const PropContext = createContext();
export const useProps = () => useContext(PropContext);

export default function PropProvider({children}) {

    var counto = 0;
    for (let i in getty("itemsList")) {
        counto += getty("itemsList")[`${i}`];
    };

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
    const [page, setPage] = useState([0,9]);
    const [numbers, setNumbers] = useState([]);
    const [subset, setSubset] = useState([]);
    // const [bought, setBought] = useState(false);
    const [bought, setBought] = useState(false);
    const [boughtReset, setBoughtreset] = useState(false);
    const [fillingdeets, setFillingdeets] = useState(false);
    const [checked, setChecked] = useState(false);
    const [checking, setChecking] = useState(false);
    const [mand, setMand] = useState(false);
    const [emailval, setEmailval] = useState(false);
    const [telval, setTelval] = useState(false);
    const [taxo, setTaxo] = useState([]);
    const [allcats, setAllcats] = useState([]);
    const [burger, setBurger] = useState(false);
    const [droplist, setDroplist] = useState(false);
    const [loc, setLoc] = useState("");
    const [mag, setMag] = useState(false);
    const [itemq, setItemq] = useState(0);
    const [cats, setCats] = useState([]);

    function assertCateg(categ) {
        setCategory(categ);
    };
    
    function insertPrice(item) {
        if ("priceList" in localStorage) {
          if (localStorage.getItem("priceList")[`${item.id}`] !== undefined) {
            var priceL = getty("priceList");
            priceL[item.id] = item.price;
            setty("priceList", priceL);
          } else {
            var priceL = getty("priceList");
            priceL[item.id] = item.price;
            setty("priceList", priceL);
            };
        } else {
            var priceL = {};
            priceL[item.id] = item.price;
            setty("priceList", priceL);
        }
      };

    function totUp(quants) {
        var currTotal = 0;
        var prices = getty("priceList");
        var discount = parseFloat(getty("discount"));
        for (let i in quants) {
            // console.log("For testing: Prices!", prices[i]);
            // console.log("For testing: Quantity! ", quants[i]);
            var iQuant = quants[i];
            var iPrices = prices[i];
            if (iQuant < 0) {
                iQuant = 0;
            };
            if (iPrices === undefined) {
                iPrices = 0;
            };
            currTotal += (iQuant * iPrices);
        };
        if (currTotal < 0) {
            return 0;
        };
        // DISCOUNT MULTIPLIER:
        currTotal *= discount;
        localStorage.setItem("amount", currTotal);
        return currTotal;
    };

    function begin() {
        if (getty("priceList") === null) {
            setty("priceList", {});
        };
        if (getty("itemsList") === null) {
            setty("itemsList", {});
        };
        if (getty("discount") === null) {
            localStorage.setItem("discount", JSON.parse(1));
        };
        return totUp(getty("itemsList"));
    };

    function adjOrder(id){
        var newy = parseInt(getty("new"));

        if(newy > 0) {
            var index = parseInt(id);
            if ("order" in localStorage) {
                var ord = getty("order");
            } else {
                var ord = [];
            };

            if (ord.indexOf(parseInt(index)) === -1){
                ord.push(index);
            };
            setty("order", ord);
        } else {
            if ("order" in localStorage) {
                var ord = getty("order");
            } else {
                var ord = [];
            };

            if (parseInt(getty("new")) + parseInt(getty("itemsList")[`${id}`]) <= 0) {
                ord = ord.filter(val => val !== parseInt(`${id}`));
            } else {
                // console.log("For testing: New proposed quantity:", parseInt(getty("new")) + parseInt(getty("itemsList")[`${id}`]));
            };
            setty("order", ord);
        };
    };

    const updateTotal = () => {
        var beat = getty("itemsList");
        var newTotal = 0;
        for (let i in beat) {
            if (beat[`${i}`] < 0) {
                newTotal += 0;
            } else {
                newTotal += beat[`${i}`];
            };
        };
        if (newTotal < 0) {
            setTotal(0);
        } else {
            setTotal(newTotal);
        };
        setAmount(totUp(beat));
    };

    function section(array_list, subset) {
        var page_nums = [];
        var new_section = page[0] * page[1];
        var sub_section = getty(array_list).slice(new_section, new_section + page[1]);
        var many = [...Array(Math.ceil(prods.length/page[1])).keys()];
        for (let i in many) {
            page_nums.push(many[i]);
        }

        setSubset(sub_section);
        setNumbers(page_nums);
        setty("sub_section", sub_section);
        setty("page_nums", page_nums);
    };

    function page_click(page_num) {
        var new_page = [page_num, page[1]];
        setPage(new_page);
    };

    function getAllCats() {
        var all_cats = [];

        function goose(listu) {
            for (let i in listu) {
                if (all_cats.indexOf(listu[i]["prod_cat"]) === -1) {
                    all_cats.push(listu[i]["prod_cat"]);
                };
                if (all_cats.indexOf(listu[i]["prod_subcat"]) === -1) {
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
}

    async function prods_api() {
        var quest = await getAllCats();
    };

    return <PropContext.Provider value={{totally, setTotal, totUp, updateTotal, setAmount, amount, insertPrice, 
    adjOrder, begin, dis, setDis, cou, setCou, category, setCategory, prods, setProds, vis, setVis,
    new_quant, setNew_quant, shortlist, raw, setRaw, setShortlist, searched, setSearched, 
    searchTyping, setSearchtyping, page, setPage, numbers, setNumbers, subset, setSubset, 
    section, page_click, fillingdeets, setFillingdeets, checked, setChecked, checking, setChecking, 
    bought, setBought, boughtReset, setBoughtreset, mand, setMand, emailval, setEmailval, telval, setTelval, 
    typingAddress, setTypingaddress, allcats, prods_api, taxo, setTaxo, burger, setBurger, droplist, setDroplist, 
    loc, setLoc, mag, setMag, itemq, setItemq, cats, setCats}}>
        {children}
    </PropContext.Provider>
};
