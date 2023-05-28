import React, {useState, useEffect} from "react";
import {useParams, Link, useLocation} from "react-router-dom";
import axios from "axios";
import {Basket} from "./basket.js";
import {Navbar} from "./navBar.js";
import {SearchBox} from "./searchBox.js";
import {Header} from "./header.js";
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
        page, setPage, setChecking, setMag} = useProps();

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
    }, []);

    useEffect(() => {
        console.log("Graphy! ", prods);
        section("disp");
        // Set results-per-page by adjusting the second array item below
        setPage([0,9]);
    }, [prods[0]]);

    useEffect(() => {
        // if (allprods) {
            var prodbox = [];
            for (let i in allprods) {
                var cuppo = {};
                if (allprods[i].prod_subcat === subcat_name) {
                    cuppo["id"] = allprods[i].id;
                    cuppo["prod_title"] = allprods[i].prod_title;
                    cuppo["image"] = allprods[i].image;
                    cuppo["price"] = allprods[i].price;
                    cuppo["prod_cat"] = allprods[i].prod_cat;
                    cuppo["prod_subcat"] = allprods[i].prod_subcat;
                    prodbox.push(cuppo);
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
        </>
    );
    } else {
        return (
            <>
                {/* <Basket /> */}
                <Header />
                {/* <Breadcrumb /> */}
                <h1>No subcategories to display.</h1>
            </>
        );
    } 
};