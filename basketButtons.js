import React from "react";
import {getty, setty} from "./hooks/hooks.js";

export function addToBasket(setTyping2, item, typing2) {
  var total = localStorage.getItem("new");

  if (parseInt(total) === -1) {
    var new_total = parseInt(total) + 2;
  } else {
    var new_total = parseInt(total) + 1;
  };

  localStorage.setItem("new", parseInt(new_total));
  setTyping2(new_total);
};

  export function removeFromBasket(setTyping2, item) {
    var total = localStorage.getItem("new");
    if (parseInt(total) === 1 & getty("itemsList")[item.id] >= 1) {
      var new_total = parseInt(total) - 2;
    } else if (parseInt(total) <= 1 && getty("itemsList")[item.id] === 0 || parseInt(total) <= 1 && getty("itemsList")[item.id] === undefined) {
      var new_total = 1;
      setty("new", new_total);
      return;
    } else {
      var new_total = parseInt(total) - 1;
    };
    if (total <= (getty("itemsList")[item.id] * -1)) {
      var new_total = total;
      setty("new", new_total);
    }
    localStorage.setItem("new", parseInt(new_total));
    setTyping2(new_total);
  };
