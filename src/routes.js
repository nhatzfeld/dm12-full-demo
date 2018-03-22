import React from "react";
import { Switch, Route } from "react-router-dom";

// IMPORT COMPONENTS TO BE RENDERED
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Shop from "./components/Shop/Shop";
import Cart from "./components/Cart/Cart";

// OUR ROUTES
export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/shop" component={Shop} />
    <Route path="/cart" component={Cart} />
  </Switch>
);
