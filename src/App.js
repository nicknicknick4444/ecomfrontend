//import logo from './logo.svg';
import React, {useEffect, Component} from "react";
// import ModalY from "./components/Modal.js";
// import axios from "axios";
import {Link, useLocation, useRoutes} from "react-router-dom";
import './App.css';
import {Navbar} from "./components/navBar.js";
import {SearchBox} from "./components/searchBox.js";
import {Header} from "./components/header.js";
import {ProdPage} from "./components/prodPage.js";
import {CatPage} from "./components/catPage.js";
import {SubcatPage} from "./components/subcatPage.js";
import {Basket} from "./components/basket.js";
import {ShowBasket} from "./components/showBasket.js";
import {Checkout} from "./components/checkout.js";
import {SearchPage} from "./components/searchPage.js";
// import {Complete} from "./components/complete.js";
import {useProps} from "./components/hooks/prop-hooks.js";
import {getty, setty, toTitle} from "./components/hooks/hooks.js";
// import {ErrorBoundary} from "./components/errorBoundary.js";
import {addToBasket, removeFromBasket} from "./components/basketButtons.js";
import {basketUpdate, AllInput} from "./components/basketUpdate.js";


// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       viewCompleted: false,
//       viewCat: "",
//       todoList: [],
//       catList: [],
//       prodList: [],
//       booList: "Slatef",
//       belter: 7,
//       viewGubry: 100,
//       modal: false,
//       modal2: false,
//       typing: [],
//       basket: {
//         items: [],
//         new_stuff: 0,
//         new_id: 0,
//         itemsList: {},
//         total: 0,
//       }
//     };
//   };

// handleChange = (e) => {
//   // const source = document.getElementById("quantity1");
//   var res = 0;
//     res = e.target.value;
//     console.log("QUEGG", res);

//   let {typing} = this.state;
//   typing = res;
//   console.log("Train Train: ", typing);
//   this.setState({typing});
//   console.log(this.state.typing);
// };

//   componentDidMount() {
//     this.refreshList();
//     this.refreshCats();
//     this.refreshProds();
//     this.initBasket();
//     console.log(this.props.loce);
//     setty("searchList", []);
//   };

//   refreshList = () => {
//     axios
//       .get("http://localhost:8000/api/todos/")
//       .then((res) => this.setState({todoList: res.data}))
//       .catch(err => console.log("Jim Kerr " + err));
//   };

//   refreshCats = () => {
//     axios
//       .get("http://localhost:8000/api/category/")
//       .then((res) => this.setState({catList: res.data}))
//       .catch(err => console.log("Cat error " + err));
//   };

//   refreshProds = () => {
//     axios
//       .get("http://localhost:8000/api/products/")
//       .then((res) => this.setState({prodList: res.data}))
//       .catch(err => console.log("Product error " + err));
//   };

//   initBasket = () => {
//     let {items} = this.state.basket;
//     if (items.length === 0 & localStorage.getItem("item") !== null) {
//       console.log("Guevara!");
//       let itemo = localStorage.getItem("items");
//       console.log("Itemo ", itemo);
//       this.setState({items: itemo});
//     };

//     if (localStorage.getItem("itemsList") !== null) {
//       let {itemsList} = this.state.basket;
//       var snapshot = JSON.parse(localStorage.getItem("itemsList"));
//       console.log("Plasky!", snapshot);
//       this.setState({itemsList: snapshot});
//     };
//     localStorage.setItem("new", 1);
//   };

//   toTitleCase = (word) => {
//     var counto = 0;
//     var newWord = "";
//       for (let i in word) {
//         if (counto === 0) {
//         newWord += word[i].toUpperCase();
//         } else {
//           newWord += word[i].toLowerCase();
//         };
//         counto += 1;
//       };
//     return newWord;
//   };

//   toggle = () => {
//     this.setState({modal: !this.state.modal});
//   };

//   toggle2 = () => {
//     this.setState({modal2: !this.state.modal2});
//   };

//   handleDelete = (item) => {
//     let del_conf = window.confirm("Delete " + JSON.stringify(item["title"]) + "?");
//     if (del_conf) {
//       axios
//         .delete(`http://localhost:8000/api/todos/${item.id}/`)
//         .then((res) => this.refreshList())
//         .catch(err => console.log("Jim Kerr " + err));
//     } else {
//       return false;
//     };
//   };

//   handleSubmit = (item) => {
//     this.toggle();
//     if (item.id) {
//       let edit_conf = window.confirm("Edit " + JSON.stringify(item["title"]) + "?");
//       if (edit_conf) {
//         axios.put(`http://localhost:8000/api/todos/${item.id}/`, item)
//         .then((res) => this.refreshList());
//         this.setState({viewCompleted: item.completed});
//         return;
//       } else {
//         return false;
//       };
//     };

//     let save_conf = window.confirm("Save " + JSON.stringify(item["title"]))
//     if (save_conf) {
//       axios
//         .post(`http://localhost:8000/api/todos/`, item)
//         .then((res) => this.refreshList());
//       this.setState({viewCompleted: item.completed});
//     } else {
//       return false;
//     };
//   };

//   createItem = () => {
//     const item = {title: "", description: "", completed: false};
//     this.setState({activeItem: item, modal: !this.state.modal})
//   };

//   editItem = (item) => {
//     this.setState({activeItem: item, modal: !this.state.modal});
//   };

//   viewItem = (item) => {
//     this.setState({activeItem: item, modal2: !this.state.modal2});
//   };

//   displayCompleted = (status) => {
//     if (status) {
//       return this.setState({viewCompleted: true});
//     };
//     return this.setState({viewCompleted: false});
//   };

//   displayCat = (selected) => {
//     if (selected) {
//       return this.setState({viewCat: selected});
//     };
//     return this.setState({viewCat: ""});
//   };

//   renderCatList = () => {
//     const theCats = this.state.catList;
//     return theCats.map((cat, key) => (
//         <span key={key} className={this.state.viewCat === cat.cat_name ? "nav-link active" : "nav-link"}
//         onClick={() => this.displayCat(cat.cat_name)}>
//           <Link to={{pathname: `${cat.cat_name}`}}>
//             {this.toTitleCase(cat.cat_name)}
//           </Link>
//         </span>
//     ));
//   };

//   renderCatList2 = () => {
//     const allCats = this.state.catList;
//     return allCats.map((categ, key) => (
//         <div key={key}>
//           <Link to={{pathname: `../${categ.cat_name}`}}>
//             <p>{categ.cat_name}</p>
//             <p>{categ.id}</p>
//             <img src={`${categ.cat_image}`} style={{width: 200}} />
//           </Link>
//         </div>
      
//     ))
//   };

//   howMany = () => {
//     let {total} = this.state.basket;
//     console.log(this.state.basket);
//     var latest = JSON.parse(localStorage.getItem("itemsList"));
//     var counto = 0;
    
//     for (let i in latest) {
//       console.log("I", i, Object.keys(latest).length);
//       counto += latest[i];
//       console.log("Poo! ", latest[i]);
//       if (parseInt(i) === Object.keys(latest).length) {
//         console.log("State! ", total);
//       };
//       return counto;
//     };
    
//     console.log("Counto! ", counto);
//     localStorage.setItem("total", total);
//     return counto;
//   };

//   render() {
//     return (
//       <main className="container">
//         <Basket />
//         <h1 className="text-black text-titlecase text-center my-4">Ecommerce Shop</h1>
//         <div className="row">
//           <div className="col-md-6 col-sm-10 mx-auto p-0">
//             <div className="card p-3">
//               <div className="nav nav-tabs">
//               {/* <span className={this.state.viewCat === "" ? "nav-link active" : "nav-link"}
//                 onClick={() => this.displayCat("")}>Home</span> */}
//                 {/* {this.renderCatList()}<br /> */}
//                 <Navbar />
//                 {/* <SearchBox /> */}
//               </div>
//               <div>{this.renderCatList2()}</div>
//               {/* <div>{this.renderProducts()}</div> */}
//               {/* <div>{this.renderCatList2()}</div> */}
//             </div>
//           </div>
//         </div>
//         {this.state.modal ? (
//           <ModalY 
//             activeItem={this.state.activeItem} 
//             toggle={this.toggle} 
//             // onSave={this.handleSubmit}
//             onSave={this.handleSubmit}
//           />
//         ) : null}
//        {this.state.modal2 ? (
//         <ModalY 
//           activeItem={this.state.activeItem} 
//           toggle2={this.toggle2} 
//         />
//        ) : null}
//       </main>
//     );
//   };
// };

function AppFront() {
  const {setSearched, setChecking, setBurger, 
        setMag, setDroplist} = useProps();

  useEffect(() => {
    setSearched(false);
    setChecking(true);
    setBurger(false);
  }, []);

  return (
    <>
      {/* <ErrorBoundary> */}
      {/* <h1>Yes!</h1> */}
      {/* <Basket /> */}
      <Header />
      {/* <Navbar />
      <SearchBox /> */}
      {/* </ErrorBoundary> */}
      <body className="homepage-content" onClick={() => {setMag(false); setDroplist(false)}}>
        Beans and content
      </body>
    </>
  );
};

function App2() {
  var loce = useLocation();
  let element = useRoutes([
    // {path: "/", element: <App loce={loce} />},
    {path: "/", element: <AppFront />},
    {path: ":cat_name", element: <CatPage />},
    {path: ":cat_name/:subcat_name", element: <SubcatPage />},
    {path: ":cat_name/:subcat_name/:id", element: <ProdPage />},
    {path: "basket-page", element: <ShowBasket />},
    {path: "checkout", element: <Checkout />},
    {path: "search-results", element: <SearchPage />}
    // {path: "complete", element: <Complete />}
  ]);
  return element;
};

export default App2;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
