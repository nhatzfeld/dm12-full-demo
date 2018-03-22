import React, { Component } from "react";

import "./App.css";

import routes from "./routes";

import Header from "./components/Header/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Anything rendered abover or below routes will be shown on each view */}
        <Header />
        {routes}
      </div>
    );
  }
}

export default App;
