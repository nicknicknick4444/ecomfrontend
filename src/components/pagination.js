import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {Add2Basket} from "./hooks/hooks.js";

export function ProductPagination() {
    const {page, setBurger, subset, numbers, page_click} = useProps();
    const [setClicked] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page[0]]);

    function ShowSubset() {
        return (
            <>
                <div className="prods_contain">
                    <div className="prods_list" onClick={() => setBurger(false)}>
                        {
                            subset?.map((item, key) => (
                                
                                <div className="prod_itself" key={key}>
                                    <Link to={{pathname: `/${item.prod_cat}/${item.prod_subcat}/${item.id}`}}>
                                        <img src={`${item.image}`} style={{width: 200}} /><br />
                                        <p>{item.prod_title}</p>
                                        <p>£{item.price}</p>
                                    </Link>
                                    <Link to={{pathname: "/basket-page"}}>
                                        <button id="add2" className="changeBasket" onClick={() => Add2Basket(item.id, item.price)}>
                                            Add To Basket
                                        </button>
                                    </Link>
                                </div>
                                
                            ))
                        }
                    </div>
                </div>
            </>
        );
    };

    function shortPage() {
        if (numbers.length === 1) {
            return (
            <></>
            );
        }
        else {
        return (
            <>
                <div className="search_pagination">
                    {
                        numbers?.map((numbo, key2) => (
                            <span key={key2} onClick={() => page_click(numbo)}>
                                {numbo === page[0] ? <b>{numbo + 1}  </b> : <span>{numbo + 1}   </span>}
                            </span>
                        ))
                    }
                </div>
            </>
        );
        };
    };

    function shortPage2() {
        return (
            <>
                {shortPage()}
                    <ShowSubset />
                {shortPage()}
            </>
        );
    };


    function longPageStart() {
        return (
            <>
                <div className="search_pagination">
                                <span onClick={() => page_click(page[0])}><b>{numbers[0] + 1}  </b></span>
                                <span onClick={() => {page_click(page[0] + 1); setClicked(page[0] + 1)}}>{numbers[0] + 2}  </span>
                                <span>...  </span>
                    <span onClick={() => page_click(numbers.length - 1)}>Last</span>
                </div>
            </>
        );
    };

    function longPageStart2() {
        return (
            <>
                {longPageStart()}
                    <ShowSubset />
                {longPageStart()}
            </>
        );
    };

    function longPageStartMid() {
        return (
            <>
                <div className="search_pagination">
                    <span onClick={() => {page_click(numbers[0]); setClicked(numbers[0])}}>{page[0] === 2 ? "1  " : null}</span>
                    <span onClick={() => {page_click(page[0] - 1); setClicked(page[0] - 1)}}>{page[0]}  </span>  
                    <span><b>{page[0] + 1}  </b></span>
                    <span onClick={() => {page_click(page[0] + 1); setClicked(page[0] + 1)}}>{page[0] + 2}  </span>
                    {page[0] + 1 < 3 || numbers.length !== 5 ? <span>...  </span> : <span></span>}
                    <span onClick={() => page_click(numbers.length - 1)}>
                        {page[0] + 1 < 2 && numbers.length > 4  || numbers.length === 5 ? `${numbers.length}` : "Last"}
                    </span> 
                </div>
            </>
        );
    };

    function longPageStartMid2() {
        return (
            <>
                {longPageStartMid()}
                    <ShowSubset />
                {longPageStartMid()}
            </>
        );
    };

    function longPageMid() {
        return (
            <>
                <div className="search_pagination">
                    <span onClick={() => page_click(numbers[0])}>
                        {page[0] < 1 ? "1  " : "First  "} 
                        {page[0] < 1 ? "" : "... "}
                    </span>
                    <span onClick={() => page_click(page[0] - 1)}>{page[0]}  </span>
                    <span><b>{page[0] + 1}  </b></span>
                    <span onClick={() => page_click(page[0] + 1)}>{page[0] + 2}  </span>
                    {numbers.length < 4 ? <span>...  </span> : <span></span>}
                    
                    <span onClick={() => page_click(numbers.length - 1)}>
                        {page[0] < numbers.length - 3 ? "... " : ""}
                    </span>
                    <span onClick={() => {page_click(numbers.length - 1)}}>{page[0] + 1 === numbers.length - 2 ? `${numbers.length}` : "Last"}
                    </span>
                </div>
            </>
        );
    };

    function longPageMid2() {
        return (
            <>
                {longPageMid()}
                    <ShowSubset />
                {longPageMid()}
            </>
        );
    };

    function longPage2ndLast() {
        return (
            <>
                <div className="search_pagination">
                    <span onClick={() => page_click(numbers[0])}>First  </span>
                    <span>...  </span>
                    <span onClick={() => page_click(page[0] - 1)}>{page[0]}  </span>
                    <span><b>{page[0] + 1}  </b></span>
                    <span onClick={() => page_click(numbers.length - 1)}>{numbers.length}</span>
                </div>
            </>
        );
    };

    function longPage2ndLast2() {
        return (
            <>
                {longPage2ndLast()}
                    <ShowSubset />
                {longPage2ndLast()}
            </>
        );
    };


    function longPageLast() {
        return (
            <>
                <div className="search_pagination">
                    <span onClick={() => page_click(numbers[0])}>First  </span>
                    {numbers.length > 4 ? <span>...  </span> : <span></span>}
                    <span onClick={() => page_click(page[0] - 1)}>{numbers.length - 1}  </span>
                    <span><b>{numbers.length}</b></span>
                </div>
            </>
        );
    };

    function longPageLast2() {
        return (
            <>
                {longPageLast()}
                    <ShowSubset />
                {longPageLast()}
            </>
        );
    };

    if (numbers.length <= 4) {
        // console.log("For testing: shortPage2()");
        return shortPage2();

    } else if (numbers.length > 4) {
        if (page[0] === 0) {
            // console.log("For testing: longPageStart2()", numbers);
            return longPageStart2();
        } else if (page[0] > 0 && page[0] <= 2) {
            // console.log("For testing: longPageStartMid2()", page[0]);
            return longPageStartMid2();
        } else if (page[0] >= 3 && page[0] < numbers.length - 2) {
            // console.log("For testing: longPageMid2()", numbers.length - 2, page[0]);
            return longPageMid2();
        } else if (page[0] === numbers.length - 2) {
            // console.log("For testing: longPage2ndLast2()");
            return longPage2ndLast2();
        } else if (page[0] === numbers.length - 1) {
            // console.log("For testing: longPageLast2()");
            return longPageLast2();
        }
    }
};
