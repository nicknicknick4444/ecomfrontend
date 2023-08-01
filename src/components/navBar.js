import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {getty, toTitle} from "./hooks/hooks.js";
import axios from "axios";
import "../App.css";

export function Navbar() {
    const {prods_api, bought, burger, setBurger, 
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
        };
    }, []);

    if (cats.length > 1) {
    return (
        <>
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
                {
                    cats.map((cat, key) => (

                        
                        <span key={key+"mob"} className="navbar-mob">
                            <Link to={{pathname: `../${cat.cat_name}`}}>
                                {toTitle(cat.cat_name)}
                            </Link><br />
                        </span>

                    ))
                }
                </div>: null}
            </div>
        </>
    );
    } else {
        return (
            <>
                    <div id="nav-main">
                        <span className="navbar">
                            <Link to={{pathname: "/"}}>Home</Link>
                        </span>
                        <span className="navbar">
                            <Link to={{pathname: "/Tableware"}}>Tableware</Link>
                        </span>
                        <span className="navbar">
                            <Link to={{pathname: "/Kitchenware"}}>Kitchenware</Link>
                        </span>
                        <span className="navbar">
                            <Link to={{pathname: "/Furniture"}}>Furniture</Link>
                        </span>
                        <span className="navbar">
                            <Link to={{pathname: "/Appliances"}}>Appliances</Link>
                        </span>
                        <span className="navbar">
                            <Link to={{pathname: "/Cleaning"}}>Cleaning</Link>
                        </span>
                    </div>

                <div className="navbar-mob">
                
                <div onClick={() => {bought ? setBurger(true) : setBurger(!burger)}}>
                <span className="burger-itself" >☰</span><br />
                    {burger ? <><span className="navbar-mob">
                    <Link to={{pathname: "/"}}>
                        Home
                    </Link></span><br /></> : null}
                    </div>
                    {burger ? 
                    <div>
                        <span className="navbar-mob"><Link to={{pathname: "/Tableware"}}>Tableware</Link></span><br />
                        <span className="navbar-mob"><Link to={{pathname: "/Kitchenware"}}>Kitchenware</Link></span><br />
                        <span className="navbar-mob"><Link to={{pathname: "/Furniture"}}>Furniture</Link></span><br />
                        <span className="navbar-mob"><Link to={{pathname: "/Appliances"}}>Appliances</Link></span><br />
                        <span className="navbar-mob"><Link to={{pathname: "/Cleaning"}}>Cleaning</Link></span>
                    </div> : null}
                </div>
                <div id="loading">Loading...</div>

            </>
        );
    }
};
