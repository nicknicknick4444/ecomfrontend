import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Header} from "./header.js";
import {Footer} from "./footer.js";
import {Breadcrumb} from "./breadcrumb.js";
import {Sorting} from "./sorting.js";
import {ProductPagination} from "./pagination.js";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, setty, toTitle} from "./hooks/hooks.js";
import {ErrorBoundary} from "./errorBoundary.js";

export function SubcatPage() {
    let {subcat_name} = useParams();
    const [allprods, setAllprods] = useState([]);
    const {prods, setProds, category, setCategory, setBurger, setSearched, section, 
        page, setPage, setChecking, subset, cats} = useProps();
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
        if (getty("disp") === null) {
            setty("disp", []);
        };
        setChecking(true);
        setBurger(false);
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        console.log("Graphy! ", prods);
        section("disp", subset);
        // Set results-per-page by adjusting the second array item below!
        setPage([0,9]);
    }, [prods[0]]);

    useEffect(() => {
            var prodbox = [];
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
        // console.log("For testing - page numbers", page[0], page);
    }, [page]);

    if (prods) {
    return (
        <>
            <Header />
            <Breadcrumb />
            <ErrorBoundary>
            <Sorting list_name="disp" />
            {cats.length < 1 ? <div id="loading-pushdown"></div> : null}
            <h1>{toTitle(category)}</h1>
            {cats.length < 1 ? <div id="loading-pushdown"></div> : null}
            <ProductPagination />
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
