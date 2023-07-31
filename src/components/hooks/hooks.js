import React, {useEffect, useState} from "react";
import {Link, useParams, useLocation} from "react-router-dom";
import {useProps} from "./prop-hooks.js";
import axios from "axios";
import "../../App.css";

export function telber() {
    // console.log("For testing: Tells us that hooks are working.");
};

export const getty = (place) => {
    return JSON.parse(localStorage.getItem(place));
};

export const setty = (place, val) => {
    return localStorage.setItem(place, JSON.stringify(val));
};

export function toTitle(word) {
    var new_word = "";
    for (let i in word) {
        if (i === "0") {
            var newLetter = word[i].toUpperCase();
            new_word += newLetter;
        } else if (word[i-1] === " " || word[i-1] === "-") {
            var newLetter = word[i].toUpperCase();
            new_word += newLetter;
        } else {
            new_word += word[i];
        }
    }
    new_word = new_word.replace(" X ", " x ");
    return new_word;
};

export function dedupe(a_list, iter, counter, data) {
    for (let n in a_list) {
        if (a_list[n].id !== data[iter].id) {
            counter += 1;
        }
    }
    if (counter === a_list.length) {
        return true;
    } else {
        return false;
    }
};

export function empty(setDis, updateTotal, setFillingdeets) {
    setty("itemsList", {});
    setty("priceList", {});
    setty("order", []);
    setDis(getty("discount"));
    setty("address", {});
    updateTotal();
    setty("discount", 1);
    setty("coupon_name", "");
    setty("boughtReset", false);
    setty("disp", []);
    setty("searchList", []);
    setty("page_nums", []);
    setFillingdeets(false);
};

export function back_reset(bought, setBought, setDis, updateTotal) {
    // console.log("For testing: Bought?", bought);
    if (bought) {
        empty(setDis, updateTotal);
        setBought(false);
    };
};

export function get_location() {
    return window.location["pathname"];
};

export function Add2Basket(id, price, itemq, totally) {
    if (getty("itemsList") !== null) {
        var this_items = getty("itemsList");
        var this_order = getty("order");
        var this_prices = getty("priceList");
        if (id in getty("itemsList") && getty("itemsList")[id] > 0) {
            var higher_number = this_items[id] + 1;
            this_items[id] = higher_number;
            setty("itemsList", this_items);
        } else {
            this_items[id] = 1;
            this_order.push(id);
            this_prices[id] = price;
            setty("itemsList", this_items);
            setty("order", this_order);
            setty("priceList", this_prices);
        }
    } else {
        var this_items = {};
        var this_order = [];
        var this_prices = {}
        this_items[id] = 1;
        this_order.push(id);
        this_prices[id] = price;
        setty("itemsList", this_items);
        setty("order", this_order);
        setty("priceList", this_prices);
    }
};

export function rand_parag() {
    var general_number = Math.floor(Math.random() * 21);
    var paragraph = "";
    switch (general_number) {
        case 0:
            paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet sem dui, \
                nec consequat nisl placerat tristique. Vestibulum lacinia pellentesque odio sit amet varius. \
                Rallenta sed dui laoreet, tincidunt nisl vel, auctor magna. \
                Nullam eget ex cursus, volutpat libero eget, sodales leo. \
                Nunc quis purus felis. Suspendisse malesuada, enim vitae semper facilisis, \
                sapien libero blandit nunc, vel tempus massa felis ac ante.";
            break;
        case 1:
            paragraph = "Vestibulum condimentum ac magna vitae bibendum. Ut aliquet arcu at \
                nibh bibendum tempus. Donec dictum interdum ligula. \
                Phasellus id ultricies nulla. Praesent elementum mauris id tortor suscipit efficitur. \
                Suspendisse eget erat vel lacus sagittis pharetra sodales nec nibh. \
                Etiam turpis eros, vulputate non lobortis eu, ultrices eu tellus. \
                Aliquam odio nisl, placerat sit amet felis vitae, egestas ultricies nisi.";
            break;
        case 2:
            paragraph = "Donec elit leo, commodo non ullamcorper fringilla, dignissim quis risus. \
                Proin libero dui, pulvinar a lectus vel, tristique tempus metus. \
                Nunc vulputate mattis consectetur. Donec ac dui sit amet arcu aliquet \
                pharetra id et tellus. Pellento sit amet elementum ante, \
                Vivamus varius, est et rutrum dictum, quis cursus \
                dolor turpis et quam. Proin felis lectus, ultrices pollexa bibendum nec, \
                maximus vel tellus.";
            break;
        case 3:
            paragraph = "Vivamus blandit lectus ut lorem placerat feugiat. \
                Donec ultricies magna vitae diam placerat, vitae maximus sem semper. \
                Nullam enim ipsum, posuere sed dapibus at, vulputate at ante. \
                Nam rhoncus felis risus, efficitur blandit elit finibus sed. \
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, \
                per inceptos himenaeos. Nullam vitae lectus non magna pharetra tristique.";
            break;
        case 4:
            paragraph = "Ut porttitor venenatis lectus. Sed accumsan, mauris eget \
                fringilla imperdiet, risus lorem pulvinar ex, ac aliquet nulla nisl sed dolor. \
                Proin mauris neque, venenatis in elit vitae, porttitor vehicula justo. Quisque accumsan \
                facilisis egestas. Aliquam erat volutpat. Morbi lobortis euismod lacus eu tempor. Donec nulla risus, \
                tempor non orci eget, commodo varius nunc. \
                Bucle et manifesti pro borta balpus contra benifice!";
            break;
        case 5:
            paragraph = "Etiam et feugiat dolor, sed sollicitudin odio. \
                Quisque et libero odio. Donec placerat tellus eu tortor tincidunt, \
                eu maximus risus condimentum. Sed a quam et quam elementum ultrices. \
                Praesent faucibus vestibulum fringilla. Nam eleifend eros id dapibus fermentum. \
                In fermentum cursus libero, sed tincidunt elit efficitur ut. Fusce nec \
                Fusce vehicula mauris non orci aliquet, at tristique massa viverra. \
                Aenean sit amet augue nisl.";
            break;
        case 6:
            paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
                Vivamus fringilla risus sit amet mi feugiat, vel semper leo hendrerit. \
                Quisque vel tortor eget tortor egestas interdum et vitae ex. \
                Phasellus in ipsum felis. Sed vel ante sit amet arcu rhoncus tempus \
                nec non est. In suscipit ex crubi sagittis cursus. Mauris \
                est vulputate, nec suscipit mauris suscipit. \
                Vivamus sodales turpis a justo congue, ac venenatis ante vestibulum.";
            break;
        case 7:
            paragraph = "Suspendisse tincidunt odio eget condimentum lobortis. \
                Vestibulum sed tortor eget dui lobortis vulputate. \
                Aenean ornare condimentum tellus vitae consequat. \
                Orci varius natoque penatibus et magnis gus dis parturient montes, \
                blandit diam scelerisque eu. Nulla in lectus vel eros dapibus \
                truculenti porttitor ut ac ex. Vestibulum tristique massa metus, \
                lobortis suscipit dolor mollis id.";
            break;
        case 8:
            paragraph = "Vivamus auctor placerat nisi, nec lobortis \
                elit accumsan ac. Praesent convallis felis vitae justo \
                suscipit sodales. Praesent faucibus sem at aliquam aliquam. \
                Orci varius natoque penatibus et magnis dis parturient montes, \
                diam id, aliquam odio. Nulla fermentum dolor quis condimentum tempus. \
                Nullam id luctus arcu, non posuere rablin tortor. Nunc suscipit banjuice \
                mauris risus, vitae euismod velit posuere quis. La tristesse durera.";
            break;
        case 9:
            paragraph = "Cras et lectus velit. Nullam sodales arcu sed laoreet \
                malesuada. Vestibulum mollis massa ac maximus dapibus. Nulla rutrum \
                fermentum fringilla. Nulla sollicitudin, nibh sed iaculis eleifend, \
                tellus massa porta ante, efficitur mattis ligula massa nec neque. Cras \
                dictum lobortis tempus. Cras tincidunt sapien mi, at mattis ligula \
                rhoncus, porta tellus in, volutpat tellus. Sed tempor felis at \
                rhoncus cursus. Ut nec elit sem. Praesent a velit lectus.";
            break;
        case 10:
            paragraph = "Nam nec vestibulum orci. Fusce rhoncus, \
                velit dapibus vehicula volutpat, leo massa luctus diam, id vestibulum belus \
                tortor magna ut mi. Etiam vehicula augue vitae bulphic dolor vehicula, vel \
                faucibus velit lobortis. Nunc eget suscipit risus. Vivamus risus urna, \
                cursus non ullamcorper nec, sodales ornare tortor. Sed pretium, lacus id \
                pretium sollicitudin, libero ligula dictus dolor, quis tempor est \
                nisi vel ligula. Sed interdum neque at porttitor venenatis.";
            break;
        case 11:
            paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
                Aenean euismod volutpat elit eget condimentum. Etiam consequat, eros ac \
                porta volutpat, lacus mauris viverra erat, ut semper dolor orci a nisl. \
                Ut erat turpis, sollicitudin a libraro tortor eget, tempus pretium elit. \
                varius eu tincidunt at, vehicula a quam. Donec volutpat mauris a hendrerit \
                bibendum eu lacinia tempus, volutpat id sapien. Nulla volutpat venenatis \
                dignissim. Fusce lacinia dignissim auctor.";
            break;
        case 12:
            paragraph = "Cras eget eros eget velit volboxi cembus pulvinar in et nibh. \
                Nullam interdum auctor mauris, et gravida dolor feugiat sed. Mauris vulputate \
                fringilla nunc lacinia egestas. Morbi luctus diam ut blandit finibus. \
                Mauris et elementum nunc, ac tristique ante. Class aptent taciti sociosqu \
                urna ultrices, consectetur quam non, rhoncus mauris. Suspendisse potenti. \
                Nulla tempus eros dolor, eget dictum magna interdum id. Ut sed lobortis enim, \
                ac aliquam mi. Milober at ipsum posuere lectus ultricies dignissim.";
            break;
        case 13:
            paragraph = "In sit amet convallis dui, id interdum massa. Donec enim tellus, \
                dignissim non hendrerit nec, tristique nec est. Curabitur dignissim pretium \
                elit quis semper. Nam efficitur egestas velit. Vestibulum varius viverra \
                consectetur. Integer sit amet velit arcu. Vestibulum consectetur auctor dolor \
                euismod. Fusce tincidunt pulvinar nisi locomus tempor. Proin fermentum urna \
                euismod mauris, id iaculis odio laoreet eget. Sed porttitor mauris id commodo \
                tincidunt. Etiam id congue supa data velit. Fusce feugiat semper dui, id blandit \
                magna blandit vel.";
            break;
        case 14:
            paragraph = "Quisque imperdiet gravida risus, bibendum auctor ligula malesuada eu. \
                Donec condimentum augue non enim pharetra, vel placerat tellus pilo condimentum. \
                Etiam championus facilisis nisi, accumsan varius ante elementum vehicula. \
                Donec sed interdum augue, eu consequat lorem. Vestibulum ante ipsum primis in \
                et tincidunt. Donec feugiat sapien ex, vel vulputate sapien volutpat ut. Pellento \
                Etasque cruta ornare tortor sed bisp nisi euismod facilisis. \
                Indextris vel commodo ipsum.";
            break;
        case 15:
            paragraph = "Donec ac lectus id arcu blandit pretium. Donec non urna dapibus, posuere \
                blandus ipsum sed, fringilla tortor. Quisque ullamcorper, libero sed tincidunt \
                varius, ipsum ligula posuere sapien, eu posuere risus felis at lectus. \
                Morbi imperdiet iaculis dignissim. Cras id libero tincidunt, iaculis mi vitae, \
                ultrices ante. Phasellus pretium magna vitae diam porta, a sollicitudin eros \
                consectetur. Quisque commodo tristique nulla vitae faucibus. \
                Mauris sollicitudin nunc lectus.";
            break;
        case 16:
            paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
                Cras ultrices mi sit amet sem efficitur, at ultricies quam interdum. Hecticor \
                tincidunt, eros et scelerisque blandit, diam ex feugiat justo, et lobortis ipsum \
                velit sit amet risus. Fusce ac turpis faucibus elit auctor suscipit. Nam egestas \
                In cursus tortor sed ornare lacinia. Donec fermentum sit amet tellus quis maximus. \
                Cras id massa ultricies, cursus lectus id, aliquam libero. Vestibulum ullamcorper \
                halpa eleifend felis vitae euismod. Phasellus eu ex turpis.";
            break;
        case 17:
            paragraph = "In magna ante, convallis a blandit vel, efficitur commodo est. \
                In varius lorem odio, ac hendrerit turpis ultricies vitae. Aliquam dignissim malesuada \
                massa, sed euismod neque pretium id. Sed semper aliquet nisl, id tincidunt sapien. Nunc vel \
                telber magna non purus tempor congue. Fusce consectetur cursus urna vel pulvinar. \
                Fusce est mauris, maximus ut scelerisque nec, pretium non nibh. Nulla condimentum \
                nibh. Sed venenatis, nibh ut dictum dignissim, ex metus facilisis urna, vel volutpat mi \
                lorem lobortis ante. Donec sit amet tellus lacinia, dictumcus justo dapibus, porttitor nunc.";
            break;
        case 18:
            paragraph = "Donec eleifend pharetra lorem, quis lacinia lacus sagittis nec. \
                Proin eget ante eu erat scelerisque sodales vitae ut sapien. Praesent sit amet \
                dignissim mauris. Curabitur vulputate metus nisl, eu pretium justo facilisis tincidunt. \
                Duis in metus et eros feugiat pharetra at et orci. Morbi non tellus rutrum, \
                auctor odio et, lobortis ante. Morbi dui lacus, gravida quis mollis consequat, \
                consequat at mi. Phasellus facilisis venenatis pharetra. Maecenas nec diam luctus, \
                dictum ac in mallofax tellus. In nisi purus, laoreet surbit id dolor et, pulvinar \
                finibus urna. Sed at dui urna.";
            break;
        case 19:
            paragraph = "Donec tellus neque, imperdiet faucibus velit lacinia, congue auctor \
            massa. Pollum tendi sed arcu nulla. Nam in tincidunt leo, in auctor leo relbi. \
            Duis ac purus tellus. Donec laoreet convallis leo, sed ultricies turpis suscipit at. \
            Donec mollis egestas tincidunt. Belbi hamlum in eros condimentum, pharetra mauris sit \
            amet, finibus lectus. Donec vulputate bilbius nibh ac mi varius, conferi in aliquam est \
            tincidunt. In hac habitasse cellet platea dictumst. Phasellus sed post pultim dolor justo.";
            break;
        case 20:
            paragraph = "Vivamus molestie leo eros, eu vestibulum est convallis vitae. \
            In finibus lobortis nulla a consequat. Cras in ipsum porttitor, volutpat erat a, \
            sollicitudin ex. Proin sodales posuere lacus nec sagittis. Quisque pretium felis \
            erat, non auctor urna rhoncus sit amet. Morbi pretium mi a nunc cursus, et pretium nunc \
            mauris commodo eu. Morbi in rutrum granti dolor, sed pretium eros. Duis fermentum est varius \
            feugiat auctor. Praesent aliquam risus tincidunt, elementum velit eget, gravida ex. \
            Sed quis est at tellus sodales mattis id id libero. Duis et nibh arcu. \
            Morbi sit amet erat ligula.";
            break;
    };
    return paragraph;
};

export function get_parags() {
    var holder = [];
    for (let i = 0; i <= 2; i++) {
        holder.push(rand_parag())
    };
    return holder;
};
