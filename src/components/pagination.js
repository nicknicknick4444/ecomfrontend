import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {AllInput} from "./basketUpdate.js";
import {ConfirmBox} from "./confirmBox.js";
import {getty, setty, Add2Basket} from "./hooks/hooks.js";

export function ProductPagination() {
    const {setPage, page, setSubset, subset, numbers, page_click} = useProps();
    const [clicked, setClicked] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page[0]]);

    useEffect(() => {
        setPage([clicked, 9]);
        console.log("CLICKED: ", clicked);
    }, [clicked]);

    function ShowSubset() {



        // function Add2Basket(id, price) {
        //         // ADD PRICES!!!!
        //         if (getty("itemsList") !== null) {
        //             var this_items = getty("itemsList");
        //             var this_order = getty("order");
        //             var this_prices = getty("priceList");
        //             if (id in getty("itemsList") && getty("itemsList")[id] > 0) {
        //                 console.log("Crespa! Goot.", getty("itemsList")[id]);
        //                 var higher_number = this_items[id] + 1;
        //                 this_items[id] = higher_number;
        //                 setty("itemsList", this_items);
        //             } else {
        //                 console.log("Crespa! Add 1!");
        //                 this_items[id] = 1;
        //                 this_order.push(id);
        //                 this_prices[id] = price;
        //                 console.log(this_items, this_order);
        //                 setty("itemsList", this_items);
        //                 setty("order", this_order);
        //                 setty("priceList", this_prices)
        //             }
        //         } else {
        //             var this_items = {};
        //             var this_order = [];
        //             var this_prices = {}
        //             this_items[id] = 1;
        //             this_order.push(id);
        //             this_prices[id] = price;
        //             setty("itemsList", this_items);
        //             setty("order", this_order);
        //             setty("priceList", this_prices);
        //         }
        // };



        return (
            <>
                <div className="prods_contain">
                    <div className="prods_list">
                        {
                            getty("sub_section")?.map((item, key) => (
                                
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
            <>
                {/* <ShowSubset /> */}
            </>
            );
        }
        else {
        return (
            <>
                {/* <ShowSubset /> */}
                <div className="search_pagination">
                    {
                        numbers?.map((numbo, key2) => (
                            <span key={key2} onClick={() => page_click(numbo)}>
                                {numbo === page[0] / page[1] ? <b>{numbo + 1}  </b> : <span>{numbo + 1}   </span>}
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
                {/* <ShowSubset /> */}
                <div className="search_pagination">
                    {/* {
                        numbers?.map((numbo, key3) => (
                            <span key={key3}> */}
                            {/* { */}
                                <span onClick={() => page_click(page[0])}><b>{numbers[0] + 1}  </b></span>
                                <span onClick={() => {page_click(page[0] + 1); setClicked(page[0] + 1)}}>{numbers[0] + 2}  </span>
                                {/* <span onClick={() => page_click(page[0] + 2)}>{numbers[0] + 3}  </span> */}
                                <span>...  </span>
                            {/* } */}
                        {/* ))
                    } */}
                    <span onClick={() => page_click(numbers.length - 1)}>Last</span>
                </div>
                {/* <p>{numbo + 1}</p>
                <p>{numbo + 2}</p> */}
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
                {/* <ShowSubset /> */}
                <div className="search_pagination">
                    <span onClick={() => page_click(numbers[0])}>{page[0] == 2 ? "1  " : ""}</span>
                    <span onClick={() => page_click(page[0] - 1)}>{page[0]}  </span>  
                    <span><b>{page[0] + 1}  </b></span>
                    <span onClick={() => page_click(page[0] + 1)}>{page[0] + 2}  </span>
                    {/* {page[0] + 1 !== numbers.length - 1 ?  */}
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
                {/* <ShowSubset /> */}
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
                {/* <ShowSubset /> */}
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
                {/* <ShowSubset /> */}
                <div className="search_pagination">
                    <span onClick={() => page_click(numbers[0])}>First  </span>
                    {numbers.length > 4 ? <span>...  </span> : <span></span>}
                    {/* <span onClick={() => page_click(page[0] - 2)}>{numbers.length - 2}  </span> */}
                    {/* <span>... </span> */}
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
        return shortPage2();
    // } else if (numbers.length <= 2) {
    //     return <h1>GRAAAH!</h1>;

    } else if (numbers.length > 4) {
        if (page[0] === 0) {
            console.log("longPageStart2()", numbers);
            return longPageStart2();
        } else if (page[0] > 0 && page[0] <= 2) {
            console.log("Woogy bread. longPageStartMid2()", page[0]);
            return longPageStartMid2();
        // } else if (page[0] === 1) {
        //     console.log(page[0] + "BOOTHY!");
        //     return null;
        } else if (page[0] >= 3 && page[0] < numbers.length - 2) {
            console.log("Tell it to the fields. longPageMid2()", numbers.length - 2, page[0]);
            return longPageMid2();
        } else if (page[0] === numbers.length - 2) {
            console.log("longPage2ndLast2()");
            return longPage2ndLast2();
        } else if (page[0] === numbers.length - 1) {
            console.log("longPageLast2()");
            return longPageLast2();
        }
    }

};
