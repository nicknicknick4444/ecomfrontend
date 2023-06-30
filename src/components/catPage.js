import React, {useState, useEffect} from "react";
import {useParams, Link, useLocation} from "react-router-dom";
import axios from "axios";
import {Basket} from "./basket.js";
import {Breadcrumb} from "./breadcrumb.js";
import {Navbar} from "./navBar.js";
import {SearchBox} from "./searchBox.js";
import {Header} from "./header.js";
import {Footer} from "./footer.js";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, toTitle, rand_parag, get_parags} from "./hooks/hooks.js";
import {ErrorBoundary} from "./errorBoundary.js";

export function CatPage() {
    let {cat_name} = useParams();
    const [allsubcats, setAllsubcats] = useState([]);
    const [subcat, setSubcat] = useState([]);
    const [catto, setCatto] = useState("");
    const [cat_desc, setCat_desc] = useState([]);
    const {category, setCategory, setSearched, section, 
        setChecking, setBurger, setMag} = useProps();

    const getSubcats = () => {
        axios
            // .get(`http://localhost:8000/api/subcat/`)
            .get(`https://polar-coast-39563.herokuapp.com/api/subcat/`)
            .then((res) => setAllsubcats(res.data))
            .catch(err =>console.log("Error: ", err));
    };

    useEffect(() => {
        getSubcats();
        console.log("Ran the real API!");
        setSearched(false);
        setChecking(true);
        setBurger(false);
        window.moveTo(0, 0);
    }, []);

    useEffect(() => {
        if (catto !== cat_name) {
        setCatto(cat_name);
        getSubcats();
        setCategory(cat_name);
        setBurger(false);
        };
        rand_parag();
        setCat_desc(get_parags());
    }, [cat_name]);

    useEffect(() => {
        if (allsubcats) {
            var subcatbox = [];
            for (let i in allsubcats) {
                if (allsubcats[i].top_cat === cat_name) {
    
                    console.log("Top hat! ", allsubcats[i]); 
                    subcatbox.push(allsubcats[i]);
                };
            };
            setSubcat(subcatbox);
        };
    }, [allsubcats]);

    console.log("Bush Lula! ", allsubcats);
    
    console.log("Subcats: ", subcat);
    if (subcat) {
    return (
        <>
        {/* <Basket /> */}
        {/* <Navbar />
        <SearchBox /> */}
        <Header />
        <div className="breadcrumb"><Breadcrumb /></div>
        <ErrorBoundary>
        <div className="prods_contain">
            <div className="prods_list" onClick={() => setMag(false)}>
                <h1>{toTitle(catto)}</h1>
                <div style={{textAlign: "center"}}>{cat_desc[0]}</div>
                <div className="cat_itself">
                    {
                        subcat.map((subby, key) => (
                            getty("all_cats") !== null && getty("all_cats").length > 0 && getty("all_cats").indexOf(subby["subcat_name"]) !== -1 ? 
                                <div key={key}>
                                    <Link to={{pathname: `${subby.subcat_name}`}}>
                                        <img src={`${subby.subcat_image}`} style={{ width: 200 }} /><br />
                                    {toTitle(subby.subcat_name)}
                                    </Link>
                                </div>
                                :
                                <span key={key+"a"}></span>
                        ))
                    }
                </div>
            </div>
        </div>
        {/* <div><i><Link to={{pathname: "/"}}>Home</Link></i></div> */}
        </ErrorBoundary>
        <Footer />
    </>
    )
    } else {
        return (
            <>
                <Header />
                <h1>No categories to display.</h1>
                <Footer />
            </>
        );
    }
};
