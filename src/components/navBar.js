import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {setty, getty, toTitle} from "./hooks/hooks.js";
import {BasketPage} from "./basketList.js";
import axios from "axios";
import "../App.css";

export function Navbar() {
    const [cats, setCats] = useState([]);
    const {allcats, prods_api, burger, setBurger} = useProps();

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
        setBurger(false);
    }, []);

    useEffect(() => {
        if (cats) {
            console.log("Garcey! ", cats);
        }
    }, [cats]);

    if (cats.length > 1) {
    return (
        <>
            <div style={{clear: "right"}}>
            <span className="navbar"><Link to={{pathname: "/"}}>Home</Link></span>
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
            <div className="navbar-mob">
            <div onClick={() => {setBurger(!burger)}}>☰ {burger.toString()}</div>
                {burger ? 
                <div>
                <span><Link to={{pathname: "/"}}>Home</Link></span><br />
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
                <div>
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
                </div>

                <div className="navbar-mob">
                <div onClick={() => setBurger(!burger)}>☰ {burger.toString()}</div>
                    {burger ? 
                    <div>
                        <span><Link pathname="/">Home</Link></span><br />
                        <span><Link pathname="/pets">Pets</Link></span><br />
                        <span><Link pathname="/confectionary">Confectionary</Link></span><br />
                        <span><Link pathname="/breads">Breads</Link></span><br />
                    </div> : null}
                    
                </div>
                <div style={{clear: "left"}}>Loading...</div>

            </>
        );
    }
};
