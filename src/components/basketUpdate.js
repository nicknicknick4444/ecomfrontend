import React, {useState, useEffect} from "react";
import {addToBasket, removeFromBasket} from "./basketButtons.js";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, setty, Add2Basket} from "./hooks/hooks.js";

export function BasketUpdate(item, typing, setItems2 = f => f, setTyping = f => f) {
  
  var newo = parseInt(localStorage.getItem("new"));
  
  if ("itemsList" in localStorage) {
    var dict_now = JSON.parse(localStorage.getItem("itemsList"));
    var dict_now = getty("itemsList");
    setItems2(dict_now);
  } else {
    var dict_now = {};
  };

  if (item.id.toString() in dict_now) {
    var item_now = dict_now[`${item.id}`];
  } else {
    var item_now = 0;
    dict_now[item.id.toString()] = item_now;
  };

  if (typing.length >= 1) {
      newo = parseInt(newo) + parseInt(typing);
      // console.log("For testing: typing", typing);
      dict_now[`${item.id}`] = parseInt(typing);
      var dict_to_str = JSON.stringify(dict_now);
      localStorage.setItem("itemsList", dict_to_str);
      localStorage.setItem("new", 0);
      setTyping(1);
      if (typing === "0") {
        var ord = getty("order");
        ord = ord.filter(val => val !== parseInt(`${item.id}`));
        setty("order", ord);
      };
      if (typing === "1") {
        localStorage.setItem("itemsList", dict_to_str);
        // console.log("For testing: typing", typing);
      };
      return;
    } else {
        dict_now[`${item.id}`] = parseInt(item_now) + 1;
    };

  var new2 = getty("new");
  if (new2 !== "1") {
    dict_now[`${item.id}`] = parseInt(item_now) + parseInt(new2);
    localStorage.setItem("new", 0);
  };

  if (dict_now[`${item.id}`] < 0) {
    dict_now[`${item.id}`] = 0;
  };

  setty("itemsList", dict_now);

  if (document.getElementById(`input-${item.id}`).value === "") {
    var dict_again = getty("itemsList");
    if (getty("new") === 0) {
      setTyping(1);
      setty("new", 1);
      dict_again[item.id] += 1;
      setty("itemsList", dict_again);
    } else if (getty("new") === 1) {
      setTyping(1)
      setty("new", 1);
      dict_again[item.id] = dict_again[item.id] - 2;
      setty("itemsList", dict_again);
    };
  };

  if (getty("order").length < 1) {
    setty("coupon_name", "");
    setty("discount", 1);
  }
};

function addDis() {
  if (getty("discount") === null) {
      // Set initial discount: 1, ie. No discount
      setty("discount", 1);
  };
};

export function AllInput({item, words, placeholder, state, this2}) {
  const {insertPrice, updateTotal, adjOrder, setCou, setVis, setNew_quant, 
  itemq, setItemq, totally, setTotal} = useProps();
  const [items2, setItems2] = useState();
  const [typing2 = [], setTyping2] = useState();
  var itemy = getty("itemsList");
  var counto = 0;
  for (let i in itemy) {
    counto += itemy[i];
  };
  // Set initial basket total: 0
  setty("total", counto);

  useEffect(() => {
    setty("new", 0);
  }, []);
  
  const handleChange2 = (e) => {
    var res = 0;
    res = e.target.value;
    setTyping2(res);
  };

  function two(item) {
    adjOrder(item.id);
    BasketUpdate(item, typing2, setItems2, setTyping2, state, this2);
    insertPrice(item);
    updateTotal();
    addDis();
    setCou("");
    if (getty("itemsList")[item.id] > 0 && typing2 > 0) {
      setVis("Yes")
    } else if (getty("itemsList")[item.id] > 0 && typing2 < 0) {
      setVis("Yes");
    } else if (getty("itemsList")[item.id] === 0 && typing2 === 1) {
      setVis("Yes");
    } else if (getty("itemsList")[item.id] === 0 && typing2 < 0) {
      setVis("Emptied");
    } else if (getty("order")[item.id] === undefined && typing2 === []) {
      setNew_quant(1);
      setTyping2(1);
      setVis("Yes");
    } else if (getty("itemsList")[item.id] === undefined && getty("new") === 1) {
      setVis("Yes");
    } else if (typing2.length === 0 && typing2 !== 0 ){
      if (getty("order").indexOf(item.id) > -1) {
        setNew_quant(1);
        setVis("First");
    } else if (getty("order").indexOf(item.id) === -1 || 
    getty("itemsList")[item.id] === undefined || getty("itemsList")[item.id] === 0) {
      setNew_quant(1);
      setVis("First");
    } else {
      setVis("Standby");
    }
  };
    if (typing2) {
      setNew_quant(typing2);
    }
    if (parseInt(getty("itemsList")[item.id]) <= getty("new") * -1) {
      var edit_list = getty("itemsList");
      edit_list[item.id] = 0;
      setty("itemsList", edit_list);
      setVis("Emptied");
    };
    document.getElementById(`input-${item.id}`).value = "";
    setTyping2("");
  };

  function Combo_add(item, itemq, totally) {
    if (document.getElementById(`input-${item.id}`).value === "") {
      Add2Basket(item.id, item.price, itemq, totally);
      setItemq(getty("itemsList")[item.id]);
      var new_totally = totally + 1;
      setTotal(new_totally);
      updateTotal();
      setVis("Yes");
      setNew_quant(1);
    } else {
      two(item);
    }
  };

  return (
    <>
    <div className="bask-input">
      <button type="button" className="changeBasket" id="changeBasket1" onClick={() => addToBasket(setTyping2, item, typing2)}>+</button>
      <input 
        id={`input-${item.id}`} 
        className="number-input" 
        type="number" 
        value={typing2}
        placeholder={getty("itemsList") && getty("itemsList")[item.id] ? getty("itemsList")[item.id] : 0}
        onChange={handleChange2} 
        style={{width: 44}}
      /> 
    <button className="changeBasket" id="changeBasket2" onClick={() => removeFromBasket(setTyping2, item)}>-</button><br />
    <button id="update-button" className="changeBasket" onClick={() =>Combo_add(item, itemq, totally)}>{words}</button>
    </div>
    </>
  );
};
