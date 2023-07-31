import React, {useEffect} from "react";
import {useProps} from "./hooks/prop-hooks.js";
import {telber, getty, setty} from "./hooks/hooks.js";
import "../App.css";

export function ConfirmBox(title, the_id) {
    var the_id = the_id.the_id;
    const {vis, setVis, new_quant} = useProps();
    var product_title = title.title

    useEffect(() => {
        setVis("Standby");
        telber();
        if (getty("itemsList") === null) {
            setty("itemsList", {});
        } else {
            // console.log("For testing: itemsList showing in LS:", getty("itemsList"));
        };
    }, []);

    useEffect(() => {
        if (getty("itemsList")[the_id] === 0 && new_quant < 0) {
            // console.log("For testing: Already removed all of item from basket.", new_quant);
        };
        if (vis === "Yes"){
            setTimeout(function(){setVis("No");}, 500);
        }
        if (vis === "First") {
            setTimeout(function(){setVis("No");}, 500);
        }
        if (vis === "No"){
            setTimeout(function(){setVis("Standby");}, 500);
        }
        if (vis === "Emptied") {
            setTimeout(function(){setVis("No");}, 500);
        }
    }, [vis]);

    if (vis === "Yes") {
        return (
            <>
                <div className="confirm">
                    <p>{new_quant > 0 ? `Added ${new_quant}` : `Removed ${new_quant * -1}`} x '{product_title}' {new_quant > 0 ? "to" : "from"} the basket!</p>
                    <span id="close" onClick={() => {setVis("No")}}>Close(x)</span>
                </div>
                
            </>
        );
    } else if (vis === "First") {
        return (
            <>
        <div className="confirm">
            <p>Added {getty("new")} x '{product_title}' has to the basket!</p>
            <span id="close" onClick={() => {setVis("No")}}>Close(x)</span>
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
                    Emptied every '{product_title}' from the basket!<br />
                    <span id="close" onClick={() => {setVis("No")}}>Close(x)</span>
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
