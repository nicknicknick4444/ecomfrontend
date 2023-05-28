import React from "react";
import {Link} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, setty} from "./hooks/hooks.js";

export function ProductPagination() {
    const {page, subset, numbers, page_click} = useProps();

    function ShowSubset() {
        return (
            <>
                <div className="prods_list">
                    {
                        subset?.map((item, key) => (
                            <Link key={key} to={{pathname: `/${item.prod_cat}/${item.prod_subcat}/${item.id}`}}>
                                <div className="prod_itself">
                                    <p>{item.prod_title}</p>
                                    <img src={`${item.image}`} className="prod_img" />
                                    <p>£{item.price}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </>
        );
    };

    function shortPage() {
        return (
            <>
                <ShowSubset />
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

    function longPageStart() {
        return (
            <>
                <ShowSubset />
                <div className="search_pagination">
                    {/* {
                        numbers?.map((numbo, key3) => (
                            <span key={key3}> */}
                            {/* { */}
                                <span onClick={() => page_click(page[0])}><b>{numbers[0] + 1}  </b></span>
                                <span onClick={() => page_click(page[0] + 1)}>{numbers[0] + 2}  </span>
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

    function longPageStartMid() {
        return (
            <>
                <ShowSubset />
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

    function longPageMid() {
        return (
            <>
                <ShowSubset />
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

    function longPage2ndLast() {
        return (
            <>
                <ShowSubset />
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

    function longPageLast() {
        return (
            <>
                <ShowSubset />
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

    if (numbers.length <= 4) {
        return shortPage();
    } else if (numbers.length <= 2) {
        return <h1>GRAAAH!</h1>;
    } 
    else if (numbers.length > 4) {
        if (page[0] === 0) {
            return longPageStart();
        } else if (page[0] > 0 && page[0] <= 2) {
            // return <h1>BLEE!</h1>
            console.log("Woogy bread. ", page[0]);
            return longPageStartMid();
        } else if (page[0] >= 3 && page[0] < numbers.length - 2) {
            console.log("Tell it to the fields. ", numbers.length - 2, page[0]);
            return longPageMid();
        } else if (page[0] === numbers.length - 2) {
            return longPage2ndLast();
        } else if (page[0] === numbers.length - 1) {
            return longPageLast();
        }
    }

};
