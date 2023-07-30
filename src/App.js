import React, {useEffect} from "react";
import {Link, useRoutes} from "react-router-dom";
import './App.css';
import {Header} from "./components/header.js";
import {Footer} from "./components/footer.js";
import {ProdPage} from "./components/prodPage.js";
import {CatPage} from "./components/catPage.js";
import {SubcatPage} from "./components/subcatPage.js";
import {ShowBasket} from "./components/showBasket.js";
import {Checkout} from "./components/checkout.js";
import {SearchPage} from "./components/searchPage.js";
import {General} from "./components/general.js";
import {useProps} from "./components/hooks/prop-hooks.js";


function AppFront() {
  const {setSearched, setChecking, setBurger, 
        setMag, setDroplist, cats} = useProps();

  useEffect(() => {
    setSearched(false);
    setChecking(true);
    setBurger(false);
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
       <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&family=Kameron:wght@700&family=Aleo:wght@400&family=Trispace:wght@700&family=VT323&display=swap" rel="stylesheet" />
      <div className="body">
      {cats.length < 1 ? <div id="loading-pushdown"></div> : null}
        <div className="homepage-content" onClick={() => {setMag(false); setDroplist(false)}}>
          <Link to={{pathname: "/Tableware/Cutlery"}}>
            <div className="front-box" id="box1" alt="Some knives and forks">
              <div className="overlay" id="overlay1">Explore our Cutlery</div>
            </div>
          </Link>
          <div className="front-box-row">
          <Link to={{pathname: "/Furniture"}}>
            <div className="front-box-inner" id="box2" alt="Cafe furniture">
              <div className="overlay" id="overlay2">
                <span className="small-box">Relaxing Furniture</span>
              </div>
            </div>
          </Link>
          <Link to={{pathname: "/Appliances/Fridges%20&%20Freezers"}}>
            <div className="front-box-inner" id="box3" alt="Ice cubes">
              <div className="overlay" id="overlay3">
                <span className="small-box" >Cool Refrigeration</span>
              </div>
            </div>
          </Link>
          </div>
          <Link to={{pathname: "/Tableware/Crockery"}}>
            <div className="front-box" id="box4" alt="Crocery piccy">
              <div className="overlay" id="overlay4">Discover Our Crockery</div>
            </div>
          </Link>
          <Link to={{pathname: "Kitchenware/Pots%20&%20Pans"}}>
            <div className="front-box" id="box5" alt="Onions in a pan">
              <div className="overlay" id="overlay5">Sizzling Cookware</div>
            </div>
          </Link>
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
    {path: "contact-us", element: <General />},
    {path: "FAQ", element: <General />},
    {path: "picks-of-the-month", element: <General />},
    {path: "deliveries-and-Returns", element: <General />},
    {path: "careers", element: <General />},
    {path: "privacy-policy", element: <General />},
    {path: "terms-and-conditions", element: <General />}
  ]);
  return element;
};

export default App2;
