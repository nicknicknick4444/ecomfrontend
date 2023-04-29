import React, {useEffect, useState} from "react";
import {Link, useParams, useLocation} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {telber, getty, setty} from "./hooks/hooks.js";
import axios from "axios";
import "../App.css";

export function ConfirmBox(title) {
    var the_id = parseInt(useLocation()["pathname"].split("/").slice(-1));
    // const getty = (place) => {
    //     return JSON.parse(localStorage.getItem(place));
    // }
    const {vis, setVis, new_quant} = useProps();
    var product_title = title.title
    console.log("Aimee Mann! ", vis);

    useEffect(() => {
        setVis("Standby");
        console.log("ID? ", the_id);
        telber();
        // NEW
        if (getty("itemsList") === null) {
            setty("itemsList", {});
        } else {
            console.log("GROOOOP! ", getty("itemsList"));
        };
    }, []);

    useEffect(() => {
        if (getty("itemsList")[the_id] === 0 && new_quant < 0) {
            console.log("Removed all!", new_quant);
            // setVis("Yes");
        };
        if (vis === "Yes"){
            setTimeout(function(){setVis("No");}, 3000);
            // clearTimeout(endTime);
        }
        if (vis === "First") {
            console.log("Gorbets!!!!!");
            setTimeout(function(){setVis("No");}, 3000);
        }
        if (vis === "No"){
            // clearTimeout(startTime);
            setTimeout(function(){setVis("Standby");}, 500);
        }
        if (vis === "Emptied") {
            setTimeout(function(){setVis("No");}, 3000);
            // clearTimeout(endTime);
        }
    }, [vis]);

    if (vis === "Yes") {
        console.log("GLAG! ", new_quant);
        return (
            <>
                <div className="confirm">
                    <p>{new_quant > 0 ? `Added ${new_quant}` : `Removed ${new_quant * -1}`} x '{product_title}' {new_quant > 0 ? "to" : "from"} the basket!</p>
                    <p><span onClick={() => {setVis("No")}}>Close(x)</span></p>
                </div>
                
            </>
        );
    } else if (vis === "First") {
        return (
            <>
        <div className="confirm">
            <p>Added {getty("new")} x '{product_title}' has to the basket!</p>
            <p><span onClick={() => {setVis("No")}}>Close(x)</span></p>
        </div>
        </>
        );
    } else if (vis === "No") {
        return (
            <div style={{display: "none"}} className="confirm3"></div>
        );
    } else if (vis === "Emptied") {
        return (
            <>
                <div className="confirm">
                    <p>Emptied every '{product_title}' from the basket!</p>
                    <p><span onClick={() => {setVis("No")}}>Close(x)</span></p>

                </div>
            </>
        );
    } else if (vis === "Standby") {
        return (
            <>
                <div style={{display: "none"}} className="confirm3"></div>
            </>
        );
    }
};