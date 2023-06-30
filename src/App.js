//import logo from './logo.svg';
import React, {useEffect, Component} from "react";
// import ModalY from "./components/Modal.js";
// import axios from "axios";
import {Link, useLocation, useRoutes} from "react-router-dom";
import './App.css';
import {Navbar} from "./components/navBar.js";
import {SearchBox} from "./components/searchBox.js";
import {Header} from "./components/header.js";
import {Footer} from "./components/footer.js";
import {ProdPage} from "./components/prodPage.js";
import {CatPage} from "./components/catPage.js";
import {SubcatPage} from "./components/subcatPage.js";
import {Basket} from "./components/basket.js";
import {ShowBasket} from "./components/showBasket.js";
import {Checkout} from "./components/checkout.js";
import {SearchPage} from "./components/searchPage.js";
import {General} from "./components/general.js";
import {useProps} from "./components/hooks/prop-hooks.js";
import {getty, setty, toTitle} from "./components/hooks/hooks.js";
import {addToBasket, removeFromBasket} from "./components/basketButtons.js";
import {basketUpdate, AllInput} from "./components/basketUpdate.js";

function AppFront() {
  const {setSearched, setChecking, setBurger, 
        setMag, setDroplist} = useProps();

  useEffect(() => {
    setSearched(false);
    setChecking(true);
    setBurger(false);
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="body">
        <div className="homepage-content" onClick={() => {setMag(false); setDroplist(false)}}>
          Beans and content
        </div>
      </div>
      <Footer />
    </>
  );
};

function App2() {
  let element = useRoutes([
    {path: "/", element: <AppFront />},
    {path: ":cat_name", element: <CatPage />},
    {path: ":cat_name/:subcat_name", element: <SubcatPage />},
    {path: ":cat_name/:subcat_name/:id", element: <ProdPage />},
    {path: "basket-page", element: <ShowBasket />},
    {path: "checkout", element: <Checkout />},
    {path: "search-results", element: <SearchPage />},
    {path: "about-us", element: <General />},
    {path: "contact-us", element: <General />}
  ]);
  return element;
};

export default App2;
