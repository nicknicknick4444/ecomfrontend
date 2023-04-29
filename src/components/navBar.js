import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {toTitle} from "./hooks/hooks.js";
import {BasketPage} from "./basketList.js";
import axios from "axios";
import "../App.css";

export function Navbar() {
    const [cats, setCats] = useState([]);

    const getCats = () => {
        axios
            .get(`https://polar-coast-39563.herokuapp.com/api/category/`)
            .then((res) => setCats(res.data))
            .catch(err => console.log("Error: ", err));
    };

    useEffect(() => {
        getCats();
    }, []);

    useEffect(() => {
        if (cats) {
            console.log("Garcey! ", cats);
        }
    }, [cats]);

    if (cats) {
    return (
        <>
            <div>
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
            </div><br /><br /><br />
        </>
    );
    } else {
        return (
            <>
                <div>
                    <span className="navbar"><Link to={{pathname: "/"}}>Home</Link></span>
                </div><br /><br /><br />
            </>
        );
    }
};
