import React, {useState, useEffect} from "react";
import {useParams, Link, useLocation} from "react-router-dom";
import axios from "axios";
import {Basket} from "./basket.js";
import {AllInput} from "./basketUpdate.js"
import {Navbar} from "./navBar.js";
import {SearchBox} from "./searchBox.js";
import {Header} from "./header.js";
import {Breadcrumb} from "./breadcrumb.js";
import {ConfirmBox} from "./confirmBox.js";
import {useProps} from "./hooks/prop-hooks.js";
import {ErrorBoundary} from "./errorBoundary.js";
import {getty, setty, toTitle} from "./hooks/hooks.js";

export function ProdPage() {
    const [product, setProduct] = useState();
    const {insertPrice, searched, setSearched, 
        setChecking} = useProps();
    let listy2 = localStorage.getItem("itemsList");
    let {id} = useParams();

    const refreshDetails = () => {
        axios
            .get(`https://polar-coast-39563.herokuapp.com/api/products/${id}/`)
            .then((res) => setProduct(res.data))
            .catch(err => console.log("Product API error: " + err));
    };

    useEffect(() => {
        setSearched(false);
        console.log("Subs! ", searched.toString());
        setChecking(true);
    }, []);

    useEffect(() => {
        if (getty("searchItems") !== []) {
            console.log("PANTOMIME HORSE!");
            setSearched(false);
        }
    }, [searched]);

    useEffect(() => {
        if (!product) {
            refreshDetails();
        } else if (product){
            insertPrice(product);
        }
    }, [product]);

    var gus = useLocation();
    console.log("Gocky!", gus);

    console.log("Borcey Thank U: ", listy2);

    if (product) {
        return (
            <>
                <Basket />
                {/* <Navbar />
                <SearchBox /> */}
                <Header />
                <ErrorBoundary>
                    <Breadcrumb product={product.prod_title} />
                </ErrorBoundary>
                <h1>{toTitle(product.prod_title)}</h1>
                {/* <p>{id}</p> */}
                {/* <p>{product.prod_title}</p> */}
                <p>Product Code: {product.prod_code}</p>
                <p>{product.prod_desc}</p>
                <p>£{product.price}</p>
                <img src={`${product.image}`} style={{ width: 300 }} /><br />
                <AllInput item={product} words="Add To Basket" placeholder="1" />
                <br />
                    <i><Link to="../">Home</Link></i>
                <br /><ConfirmBox title={product.prod_title} see={"Maybe"} />
            </>
        );
    } else {
        return (
            <>
                <Basket />
                <Header />
                {/* <ErrorBoundary>
                    <Breadcrumb />
                </ErrorBoundary> */}
                <h1>Loading...</h1>
            </>
        );
    };
};
