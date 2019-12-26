import React from "react";
import logo from "./logo.svg";
import "./App.css";
import arcData from "./data/arc_data.json";

import Arc from "./visualizations/Arc";

function App() {

  

  return (
    <div className="App">
      <Arc data={arcData} />
    </div>
  );
}

export default App;
