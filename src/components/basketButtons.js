import React from "react";
import {getty, setty} from "./hooks/hooks.js";

export function addToBasket(setTyping2, item, state, this2, basket) {
  var total = localStorage.getItem("new");

  if (parseInt(total) === -1) {
    var new_total = parseInt(total) + 2;
  } else {
    var new_total = parseInt(total) + 1;
  };

  localStorage.setItem("new", parseInt(new_total));
  setTyping2(new_total);
  console.log("Plus: ", new_total, item.id);
};

  export function removeFromBasket(setTyping2, item) {
    // if (item) {
    //   var total = JSON.parse(localStorage.getItem("itemsList"))[item.id];
    // } else {
    var total = localStorage.getItem("new");
    // }
    if (parseInt(total) === 1 & getty("itemsList")[item.id] >= 1) {
      var new_total = parseInt(total) - 2;
    } else if (parseInt(total) <= 1 && getty("itemsList")[item.id] === 0 || parseInt(total) <= 1 && getty("itemsList")[item.id] === undefined) {
      // return;
      // console.log("PAN!!!!!!!", item.id);
      var new_total = 1;
      setty("new", new_total);
      return;
    } else {
      var new_total = parseInt(total) - 1;
    };
    if (total <= (getty("itemsList")[item.id] * -1)) {
      console.log("BOOSTY!");
      var new_total = total;
      setty("new", new_total);
      // return;
    }
    localStorage.setItem("new", parseInt(new_total));
    setTyping2(new_total);
    console.log("Minus: ", new_total, item.id, total -1, (getty("itemsList")[item.id] * -1));
  };
