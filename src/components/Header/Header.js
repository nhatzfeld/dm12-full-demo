import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div style={{ display: "flex" }}>
      <Link to="/">HOME</Link>
      <Link to="/login">LOGIN</Link>
      <Link to="/shop">SHOP</Link>
      <Link to="/cart">CART</Link>
    </div>
  );
};

export default Header;
