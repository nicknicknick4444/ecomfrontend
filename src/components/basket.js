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
                    <div><img src="https://i.ibb.co/G31Vcrk/basket.png" className="basket-icon" /></div>
                    <div className="basket-words">
                        <div>Items: <span clasName="basket_total">{!bought ? totally < 0 ? "0.00" : totally : 0 }</span></div>
                        <div>Total: &nbsp;<span className="price-pad">£{!bought ? parseInt(amount) == 0 ? "0.00" : amount.toFixed(2) : "0.00"}</span></div> 
    
                        {!bought ?
                        <div id="view-basket" onClick={() => setChecking(false)}><Link to="/basket-page"><i>View Basket</i></Link></div>
                        :
                        <div id="view-basket" onClick={() => {setChecking(false); empty(setDis, updateTotal, setFillingdeets)}}>
                            <Link to="/basket-page"><i>View Basket</i></Link>
                        </div>
                        }
                    </div>
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
