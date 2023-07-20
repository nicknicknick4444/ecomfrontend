import React, {useState, useEffect} from "react";
import {useParams, Link, useLocation} from "react-router-dom";
import axios from "axios";
import {Basket} from "./basket.js";
import {AllInput} from "./basketUpdate.js"
import {Navbar} from "./navBar.js";
import {SearchBox} from "./searchBox.js";
import {Header} from "./header.js";
import {Footer} from "./footer.js";
import {Breadcrumb} from "./breadcrumb.js";
import {ConfirmBox} from "./confirmBox.js";
import {useProps} from "./hooks/prop-hooks.js";
import {ErrorBoundary} from "./errorBoundary.js";
import {getty, toTitle, rand_parag, get_parags} from "./hooks/hooks.js";

export function ProdPage() {
    const [product, setProduct] = useState();
    const [desc, setDesc] = useState([]);
    const {insertPrice, searched, setSearched, 
        setChecking, setBurger, setMag} = useProps();
    let listy2 = localStorage.getItem("itemsList");
    let {id} = useParams();

    const refreshDetails = () => {
        axios
            // .get(`http://localhost:8000/api/products/${id}/`)
            .get(`https://polar-coast-39563.herokuapp.com/api/products/${id}/`)
            .then((res) => setProduct(res.data))
            .catch(err => console.log("Product API error: " + err));
    };

    useEffect(() => {
        setSearched(false);
        console.log("Subs! ", searched.toString());
        setChecking(true);
        setBurger(false);
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        rand_parag();
        setDesc(get_parags());
    }, [id]);

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

    function price_halves(price_here) {
        var point = 0;
        for (let i in price_here) {
            if (price_here[i] === ".") {
                point = i;
            }
        }
        return [price_here.slice(0, point), price_here.slice(point).slice(1)];
    }

    if (product) {
        return (
            <>
                {/* <Basket /> */}
                {/* <Navbar />
                <SearchBox /> */}
                <Header />
                <ErrorBoundary>
                    <Breadcrumb product={product.prod_title} />
                </ErrorBoundary>
                <div className="product" onClick={() => {setMag(false); setBurger(false)}} >
                    {/* <h1>{toTitle(product.prod_title)}</h1> */}
                    {/* <p>{id}</p> */}
                    {/* <p>{product.prod_title}</p> */}
                    <div className="top_info">
                        <div id="prod_title">
                            <h1>{toTitle(product.prod_title)}</h1>
                        </div>
                        <div id="img_contain">
                            <img id="prod_img" src={`${product.image}`} />
                        </div>
                        <div id="info-and-add">
                            <div id="prod_code">Code: {product.prod_code}</div>
                            {/* <p className="price">£{product.price}</p> */}
                            <div className="price">£<span id="pounds">{price_halves(product.price)[0]}</span>.<span id="pennies">{price_halves(product.price)[1]}
                                </span>
                            </div>
                            {/* </div> */}
                            <div id="prod_input"><AllInput item={product} words="Add To Basket" placeholder="1" /></div>
                        </div>
                    </div>
                    <br /><br /><br />
                    {/* <div style={{borderTop: "1px #000000 solid", backgroundColor: "#000000"}}></div> */}
                    {/* <div id="img_contain">
                        <img id="prod_img" src={`${product.image}`} />
                    </div> */}
                    <div id="desc_itself">
                        <p>{desc[0]}</p>
                        <p>{desc[1]}</p>
                        <p>{desc[2]}</p>
                    </div>
                    {/* <p className="prod_desc" id="desc_itself">{desc[1]}</p>
                    <p className="prod_desc" id="desc_itself">{desc[2]}</p> */}
                    {/* <p className="prod_desc" id="desc_itself">{product.prod_desc}</p> */}
                    {/* <br />
                    <br />
                        <i><Link to="../">Home</Link></i> */}
                    <ConfirmBox title={product.prod_title} the_id={product.id} />
                </div>
                <Footer />
            </>
        );
    } else {
        return (
            <>
                <Header />
                    <h1>Loading...</h1>
                <Footer />
            </>
        );
    };
};
