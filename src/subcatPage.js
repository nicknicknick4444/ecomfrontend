import React, {useState, useEffect} from "react";
import {useParams, Link, useLocation} from "react-router-dom";
import axios from "axios";
import {Header} from "./header.js";
import {Footer} from "./footer.js";
import {Breadcrumb} from "./breadcrumb.js";
import {Sorting} from "./sorting.js";
import {ProductPagination} from "./pagination.js";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, setty, toTitle} from "./hooks/hooks.js";
import {SearchPage} from "./searchPage.js";
import {ErrorBoundary} from "./errorBoundary.js";

export function SubcatPage() {
    let {subcat_name} = useParams();
    const [allprods, setAllprods] = useState([]);
    const {prods, setProds, category, setCategory, setBurger, setSearched, section, 
        page, setPage, setChecking, subset} = useProps();
    var allprods2 = allprods;

    const getProds = () => {
        axios
            // .get(`http://localhost:8000/api/products/`)
            .get(`https://polar-coast-39563.herokuapp.com/api/products/`)
            .then((res) => setAllprods(res.data))
            .catch(err => console.log("Error: ", err));
    };

    useEffect(() => {
        getProds();
        setSearched(false);
        // NEW!!
        if (getty("disp") === null) {
            setty("disp", []);
        };
        setChecking(true);
        setBurger(false);
        window.moveTo(0, 0);
    }, []);

    // useEffect(() => {
    //     allprods2 = allprods;
    // }, [allprods]);

    useEffect(() => {
        console.log("Graphy! ", prods);
        section("disp");
        // Set results-per-page by adjusting the second array item below
        setPage([0,9]);
    }, [prods[0]]);

    useEffect(() => {
        // if (allprods) {
            var prodbox = [];
            // var allprods2 = allprods;
            allprods2 = allprods2.sort((a, b) => (a.prod_code < b.prod_code ? -1 : a.prod_code > b.prod_code ? 1 : 0));
            // Testing sorting by prod_code by reversing it!
            // allprods2 = allprods2.sort((a, b) => (a.prod_code < b.prod_code ? 1 : a.prod_code > b.prod_code ? -1 : 0));
            for (let i in allprods2) {
                var collect = {};
                if (allprods2[i].prod_subcat === subcat_name) {
                    collect["id"] = allprods2[i].id;
                    collect["prod_code"] = allprods2[i].prod_code;
                    collect["prod_title"] = allprods2[i].prod_title;
                    collect["image"] = allprods2[i].image;
                    collect["price"] = allprods2[i].price;
                    collect["prod_cat"] = allprods2[i].prod_cat;
                    collect["prod_subcat"] = allprods2[i].prod_subcat;
                    prodbox.push(collect);
                    console.log(collect["id"], collect["prod_code"], "New Amserdam!");
                    // prodbox.push(allprods[i]);
                };
            };
            setCategory(subcat_name);
            setProds(prodbox);
            setty("disp", prodbox);
            setty("revert", prodbox);
        // };
            
    }, [allprods]);

    useEffect(() => {
        section("disp");
        console.log("PLAYDOH!", page[0], page);
        // Change back?
    }, [page]);

    if (prods) {
    return (
        <>
            {/* <Basket /> */}
            {/* <Navbar />
            <SearchBox /> */}
            <Header />
            <Breadcrumb />
            <ErrorBoundary>
            {/* <SearchPage /> */}
            <Sorting list_name="disp" />
            <h1>{toTitle(category)}</h1>
            {/* <div className="prods_list" onClick={() => setMag(false)} >
            <h1>{toTitle(subcat_name)}</h1>
            {
                prods.map((prod, key) => (
                    <div key={key} className="prod_itself">
                        <Link to={{pathname: `${prod.id}`}}>
                            <span>{prod.prod_title}</span><br />
                            <img src={`${prod.image}`} style={{ width: 200 }} /><br />
                            <span>£{prod.price}</span>
                        </Link>
                    </div>
                ))
            }
            <br />
            </div> */}
            <ProductPagination />
            {/* <p><i><Link to={{pathname: "/"}}>Home</Link></i></p> */}
            </ErrorBoundary>
            <Footer />
        </>
    );
    } else {
        return (
            <>
                <Header />
                <Breadcrumb />
                    <h1>No subcategories to display.</h1>
                <Footer />
            </>
        );
    } 
};