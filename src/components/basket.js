import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {setty, getty, empty} from "./hooks/hooks.js";
import {useProps} from "./hooks/prop-hooks.js";
import {ErrorBoundary} from "./errorBoundary.js";

export function Basket(){
    const {totally, setAmount, amount, begin, bought, setChecking, 
        setDis, updateTotal, setFillingdeets} = useProps();

    useEffect(() => {
        if (totally) {
            setAmount(begin());
        };
    }, [totally]);

    // if (localStorage.getItem("new") !== null) {
    if (getty("new") !== null) {
        return (
            <>
                <ErrorBoundary>
                    
                    <div>Number of Items: {!bought ? totally < 0 ? "0.00" : totally : 0 }</div>
                    <div>Basket Total: £{!bought ? parseInt(amount) == 0 ? "0.00" : amount.toFixed(2) : "0.00"}</div> 
   
                    {!bought ?
                    <div onClick={() => setChecking(false)}><Link to="/basket-page"><i>View Basket</i></Link></div>
                    :
                    <div onClick={() => {setChecking(false); empty(setDis, updateTotal, setFillingdeets)}}>
                        <Link to="/basket-page"><i>View Basket</i></Link>
                    </div>
                    }
                    {/* <div><Link to="/checkout">Checkout</Link></div> */}
                </ErrorBoundary>
            </>
        );
    } else {
        // localStorage.setItem("new", 1);
        setty("new", 1);
    };
};
