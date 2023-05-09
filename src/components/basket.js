import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {setty, getty, empty, get_location} from "./hooks/hooks.js";
import {BasketList} from "./basketList.js";
import {useProps} from "./hooks/prop-hooks.js";
import {ErrorBoundary} from "./errorBoundary.js";

export function Basket() {
    const [basko, setBasko] = useState({});
    const {totally, setAmount, amount, begin, bought, setChecking, 
        setDis, updateTotal, setFillingdeets, droplist, setDroplist} = useProps();

    useEffect(() => {
        if (totally) {
            setAmount(begin());
        };
    }, [totally]);

    useEffect(() => {
        if (getty("itemsList") !== null) {
            setBasko(<BasketList />);
        }
        console.log("WHACKO! ", basko);
    }, [droplist]);

    // if (localStorage.getItem("new") !== null) {
    if (getty("new") !== null) {
        return (
            <>
                <ErrorBoundary>
                    <div className="basket-pc" onMouseOver={() => {setDroplist(true); get_location()}} onMouseLeave={() => setDroplist(false)}>
                        <div>Number of Items: {!bought ? totally < 0 ? "0.00" : totally : 0 }</div>
                        <div>Basket Total: £{!bought ? parseInt(amount) == 0 ? "0.00" : amount.toFixed(2) : "0.00"}</div> 
    
                        {!bought ?
                        <div onClick={() => setChecking(false)}><Link to="/basket-page"><i>View Basket</i></Link></div>
                        :
                        <div style={{margin: "auto"}} onClick={() => {setChecking(false); empty(setDis, updateTotal, setFillingdeets)}}>
                            <Link to="/basket-page"><i>View Basket</i></Link>
                        </div>
                        }

                    {droplist && get_location() !== "/basket-page" && get_location() !== "/checkout" ? 
                    <div className="dropdown-basket">
                        <BasketList />
                        {/* {droplist.toString()} */}
                    </div>
                    : null
                    }

                    </div>
                    {/* {droplist ? 
                    <div className="dropdown-basket">
                        <BasketList />
                        {droplist.toString()}
                    </div>
                    : null
                    } */}
                </ErrorBoundary>
            </>
        );
    } else {
        // localStorage.setItem("new", 1);
        setty("new", 1);
    };
};
