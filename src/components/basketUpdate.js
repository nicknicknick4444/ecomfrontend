import React, {useState, useEffect} from "react";
import {addToBasket, removeFromBasket} from "./basketButtons.js";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, setty} from "./hooks/hooks.js";

// const getty = (place) => {
//   return JSON.parse(localStorage.getItem(place));
// };

export function BasketUpdate(item, typing, setItems2 = f => f, setTyping = f => f) {
  // const {setCou} = useProps();
  var newo = parseInt(localStorage.getItem("new"));
  // const getty = (place) => {
  //   return JSON.parse(localStorage.getItem(place));
  // };

  // const getty = (place) => {
  //   return JSON.parse(localStorage.getItem(place));
  // };

  // const setty = (place, val) => {
  //   return localStorage.setItem(place, JSON.stringify(val));
  // };
  
  if ("itemsList" in localStorage) {
    var dict_now = JSON.parse(localStorage.getItem("itemsList"));
    setItems2(dict_now);
  } else {
    var dict_now = {};
  };

  if (item.id.toString() in dict_now) {
    var item_now = dict_now[`${item.id}`];
    console.log("OH Cruddas! ", dict_now[`${item.id}`], item_now);
  } else {
    var item_now = 0;
    dict_now[item.id.toString()] = item_now;
  };

  if (typing.length >= 1) {
      newo = parseInt(newo) + parseInt(typing);
      console.log("Typing be like: ", typing);
      dict_now[`${item.id}`] = parseInt(typing);
      var dict_to_str = JSON.stringify(dict_now);
      localStorage.setItem("itemsList", dict_to_str);
      localStorage.setItem("new", 1);
      setTyping(1);
      if (typing === "0") {
        var ord = getty("order");
        ord = ord.filter(val => val !== parseInt(`${item.id}`));
        // localStorage.setItem("order", JSON.stringify(ord));
        setty("order", ord);
        // console.log("PEWTER?!?!?!?!?!?!");
      };
      if (typing === "1") {
        localStorage.setItem("itemsList", dict_to_str);
        console.log("Fugginell! ", typing);
      };
      return;
    } else {
      dict_now[`${item.id}`] = parseInt(item_now) + 1;
      console.log("BOther Revolution!", item_now);
  };

  var new2 = getty("new");
  if (new2 !== "1") {
    dict_now[`${item.id}`] = parseInt(item_now) + parseInt(new2);
    localStorage.setItem("new", 1);
  };

  if (dict_now[`${item.id}`] < 0) {
    dict_now[`${item.id}`] = 0;
  };

  // setItems2(dict_now);
  // let dict_as_str = JSON.stringify(dict_now);
  // localStorage.setItem("itemsList", dict_as_str);
  setty("itemsList", dict_now);

  setTyping(1);

  if (getty("order").length < 1) {
    console.log("I'M TOO BASHFUL! Windowpane. My blood'll thickon. ");
    setty("coupon_name", "");
    setty("discount", 1);
  }
};

function addDis() {
  if (getty("discount") === null) {
      localStorage.setItem("discount", JSON.stringify(1));
      console.log("Babu!");
  };
};


export function AllInput({item, words, placeholder, state, this2}) {
  const {insertPrice, updateTotal, adjOrder, setCou, setVis, new_quant, setNew_quant} = useProps();
  const [items2, setItems2] = useState();
  const [typing2 = [], setTyping2] = useState();
  // var itemy = localStorage.getItem("itemsList");
  var itemy = getty("itemsList");
  var counto = 0;
  for (let i in itemy) {
    counto += itemy[i];
  };
  localStorage.setItem("total", counto);

  useEffect(() => {
    setty("new", 1);
  }, []);
  
  const handleChange2 = (e) => {
    var res = 0;
    res = e.target.value;
    // var typing = res;
    setTyping2(res);
  };

  function two(item) {
    adjOrder(item.id);
    BasketUpdate(item, typing2, setItems2, setTyping2, state, this2);
    insertPrice(item);
    updateTotal();
    addDis();
    setCou("");
    // console.log("Pooost! ", typeof getty("order"), typeof item.id);
    if (getty("itemsList")[item.id] > 0 && typing2 > 0) {
      console.log("Mr. A");
      setVis("Yes")
    } else if (getty("itemsList")[item.id] > 0 && typing2 < 0) {
      setVis("Yes");
      console.log("Mr. B");
      console.log("Toro Amis! ", getty("order")[item.id]);
    } else if (getty("itemsList")[item.id] === 0 && typing2 === 1) {
      setVis("Yes");
      console.log("Mr. C");
    } else if (getty("itemsList")[item.id] === 0 && typing2 < 0 
    // && getty("order")[item.id] !== undefined
    ) {
      setVis("Emptied");
      console.log("Whatue: ", getty("order")[item.id]);
    } else if (getty("order")[item.id] === undefined && typing2 === []) {
      console.log("Mr. D", typing2); //If typing2 === empty array?
      // setTyping2(getty("new"));
      setNew_quant(1);
      setTyping2(1);
      setVis("Yes");
    } else if (getty("itemsList")[item.id] === undefined && getty("new") === 1) {
      console.log("Mr. E");
      setVis("Yes");
    } else if (typing2 === "[]"){
      setVis("Yes");
      console.log("Mr. F");
    } else if (getty("itemsList")[item.id] === 1 && getty("order")[item.id] === undefined || 
    getty("itemsList")[item.id] === undefined || getty("order")[item.id] === undefined) {
      console.log("GAFFREY! PAUN!");
      setNew_quant(1);
      setVis("First");
    } else {
      setVis("Standby");
      console.log("GAYYYYY!!!!!", typing2);
    };
    if (typing2) {
      setNew_quant(typing2);
    }
    // } else {
    //   setNew_quant(getty("new"));
    // }
    if (parseInt(getty("itemsList")[item.id]) <= getty("new") * -1) {
      var edit_list = getty("itemsList");
      console.log("BLASTY!", edit_list[item.id]);
      edit_list[item.id] = 0;
      setty("itemsList", edit_list);
      setVis("Emptied");
    };
    console.log("Boki! ", typing2);

  };

  return (
    <>
      <button onClick={() => addToBasket(setTyping2, item, state, this2)}>+</button>
      <input 
        id={`${item.id}`} 
        className="numberInput" 
        type="number" 
        value={typing2} 
        placeholder={placeholder} 
        onChange={handleChange2} 
        style={{width: 44}}
      /> 
    <button onClick={() => removeFromBasket(setTyping2, item)}>-</button><br />
    <button onClick={() =>two(item)}>{words}</button>
    </>
  );
};