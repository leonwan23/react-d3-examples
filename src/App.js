import React from "react";
import Router from "./layout/Router";

export default class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}
