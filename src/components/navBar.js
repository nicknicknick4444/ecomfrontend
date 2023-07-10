import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {setty, getty, toTitle} from "./hooks/hooks.js";
import {SearchBox} from "./searchBox.js";
import axios from "axios";
import "../App.css";

export function Navbar() {
    // const [cats, setCats] = useState([]);
    const {allcats, prods_api, bought, burger, setBurger, 
            setMag, cats, setCats} = useProps();

    const getCats = () => {
        axios
            // .get(`http://localhost:8000/api/category/`)
            .get(`https://polar-coast-39563.herokuapp.com/api/category/`)
            .then((res) => setCats(res.data))
            .catch(err => console.log("Error: ", err));
    };

    useEffect(() => {
        getCats();
        if (getty("all_cats") === null || getty("all_cats").length === 0 || getty("all_cats") === []) {
            prods_api();
            console.log("FRIDGE TET");
        };
        console.log("Blues! ", allcats);
        // if (!bought) {
        //     setBurger(false);
        // };
        // if (bought) {
        //     setBurger(true);
        // };
    }, []);

    useEffect(() => {
        if (cats) {
            console.log("Garcey! ", cats);
        }
    }, [cats]);

    if (cats.length > 1) {
    return (
        <>
            {/* <div className="nav-edge"></div> */}
                <div id="nav-main">
                <span className="navbar">
                    <Link to={{pathname: "/"}}>Home</Link>
                </span>
                {   
                    cats.map((cat, key) => (

                        <span key={key} className="navbar">
                            <Link to={{pathname: `../${cat.cat_name}`}}>
                                {toTitle(cat.cat_name)}
                            </Link>
                        </span>
                    ))
                }
                </div>
            <div className="navbar-mob" onClick={() => setMag(false)} >
            <div onClick={() => {bought ? setBurger(true) : setBurger(!burger)}}>
            <span className="burger-itself">☰</span><br />
            {burger ? 
                <><div className="navbar-mob">
                    <Link to={{pathname: "/"}}>
                        Home
                    </Link>
                </div></> : 
            null}</div>
                {burger ? 
                <div>
                {/* <span className="search-box-mob"><SearchBox /></span> */}
                {/* <span className="navbar-mob"><Link to={{pathname: "/"}}>Home</Link></span><br /> */}
                {
                    cats.map((cat, key) => (

                        
                        <span key={key+"mob"} className="navbar-mob">
                            <Link to={{pathname: `../${cat.cat_name}`}}>
                                {toTitle(cat.cat_name)}
                            </Link><br />
                        </span>

                    ))
                }
                <span className="navbar-mob"><Link to={{pathname: "/about-us" }}>About Us</Link></span><br />
                <span className="navbar-mob"><Link to={{pathname: "/contact-us"}}>Contact Us</Link></span>
                </div>: null}
            </div>
            {/* <div className="nav-edge"></div> */}
        </>
    );
    } else {
        return (
            <>
                {/* <div className="nav-edge"> */}
                    <div id="nav-main">
                        <span className="navbar">
                            <Link to={{pathname: "/"}}>Home</Link>
                        </span>
                        <span className="navbar">
                            <Link to={{pathname: "/pets"}}>Pets</Link>
                        </span>
                        <span className="navbar">
                            <Link to={{pathname: "/confectionary"}}>Confectionary</Link>
                        </span>
                        <span className="navbar">
                            <Link to={{pathname: "/breads"}}>Breads</Link>
                        </span>
                    {/* <span className="navbar">Loading...</span> */}
                    </div>
                {/* </div> */}

                <div className="navbar-mob">
                
                <div onClick={() => {bought ? setBurger(true) : setBurger(!burger)}}>
                <span className="burger-itself" >☰ {burger.toString()}</span><br />
                    {burger ? <><span className="navbar-mob">
                    <Link to={{pathname: "/"}}>
                        Home
                    </Link></span><br /></> : null}
                    </div>
                    {burger ? 
                    <div>
                        <span className="navbar-mob"><Link to={{pathname: "/pets"}}>Pets</Link></span><br />
                        <span className="navbar-mob"><Link to={{pathname: "/confectionary"}}>Confectionary</Link></span><br />
                        <span className="navbar-mob"><Link to={{pathname: "/breads"}}>Breads</Link></span><br />
                        <span className="navbar-mob"><Link to={{pathname: "/about-us"}}>About Us</Link></span><br />
                        <span className="navbar-mob"><Link to={{pathname: "/contact-us"}}>Contact Us</Link></span>
                    </div> : null}
                    
                    {/* <div style={{clear: "left"}}>Loading...</div> */}
                </div>
                {/* <div className="nav-edge"></div> */}
                <div id="loading">Loading...</div>

            </>
        );
    }
};
