import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useProps} from "./hooks/prop-hooks.js";
import {setty, getty, toTitle} from "./hooks/hooks.js";
import {BasketPage} from "./basketList.js";
import axios from "axios";
import "../App.css";

export function Navbar() {
    const [cats, setCats] = useState([]);
    const {allcats, prods_api} = useProps();
    var cats2 = [];

    const getCats = () => {
        axios
            .get(`http://localhost:8000/api/category/`)
            // .get(`https://polar-coast-39563.herokuapp.com/api/category/`)
            .then((res) => setCats(res.data))
            .catch(err => console.log("Error: ", err));
    };

    useEffect(() => {
        getCats();
        if (getty("all_cats") === null || getty("all_cats") === 0) {
            prods_api();
        };
        console.log("Blues! ", allcats);
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
                    getty("all_cats") !== null && getty("all_cats").length > 0 && getty("all_cats").indexOf(cat["cat_name"]) !== -1 ? 
                    <span key={key} className="navbar">
                        <Link to={{pathname: `../${cat.cat_name}`}}>
                            {toTitle(cat.cat_name)}
                        </Link>
                    </span>
                    :
                    <span key={key+"b"}>Beance {cat["cat_name"]}</span>
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
