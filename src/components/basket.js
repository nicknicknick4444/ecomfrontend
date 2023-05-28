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
        console.log("AMOOOONT! ", length_pixels());
    }, [totally]);

    useEffect(() => {
        setDroplist(false);
    }, []);

    useEffect(() => {
        if (getty("itemsList") !== null) {
            setBasko(<BasketList />);
        }
        console.log("WHACKO! ", basko);
    }, [droplist]);

    function length_pixels() {
        var extra = 0;
        if (amount <= 99.99) {
            extra = 0;
        } else if (amount >= 100.00 && amount <= 999.99) {
            extra = 10;
        } else if (amount >= 1000.00 && amount <= 10000.00) {
            extra = 20;
        } else if (amount >= 10000.00 && amount <= 99999.99) {
            extra = 25;
        } else if (amount >= 100000.01) {
            extra = 30;
        }
        return extra;
    };

    function widthCond() {
        if (window.innerWidth <= 676) {
            return 103 + length_pixels();
        } else {
            return 190 + length_pixels();
        }
    };

    if (getty("new") !== null) {
        return (
            <>
                <ErrorBoundary>
                    <div className="basket-pc" onMouseOver={() => {setDroplist(true); get_location()}} onMouseLeave={() => setDroplist(false)} 
                        style={{ width: widthCond()}}>
                    <Link to="/basket-page">
                        <div><img src="https://i.ibb.co/pRNYvv3/basket1.png" className="basket-icon" /></div>
                    </Link>
                    <div className="basket-words">
                        <div>Items: <span className="basket_total">{!bought ? totally < 0 ? "0.00" : totally : 0 }</span></div>
                        <div>Total: &nbsp;<span className="price_pad">£{!bought ? parseInt(amount) === 0 ? "0.00" : amount.toFixed(2) : "0.00"}</span></div> 
    
                        {/* {!bought ?
                        <div id="view-basket" onClick={() => setChecking(false)}>View Basket</div>
                        :
                        <div id="view-basket" onClick={() => {setChecking(false); empty(setDis, updateTotal, setFillingdeets)}}>
                            <Link to="/basket-page">View Basket</Link>
                        </div>
                        } */}
                    </div>
                    <div class="buttons">
                    {!bought ?
                    <>
                        <div id="view-basket" onClick={() => setChecking(false)}>
                            <Link to={{pathname: "/basket-page"}}>View Basket</Link>
                        </div>
                        <div id="view-checkout">
                            <Link to={{pathname: "/checkout"}}>Checkout</Link>
                        </div>
                        </>
                        :
                        <>
                        <div id="view-basket" onClick={() => {setChecking(false); empty(setDis, updateTotal, setFillingdeets)}}>
                            <Link to={{pathname: "/basket-page"}}>View Basket</Link>
                        </div>
                        <div id="view-checkout">
                            <Link to={{pathname: "/checkout"}}>Checkout</Link>"</div>
                        </>
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
