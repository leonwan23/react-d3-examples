import React, { Component } from "react";
import Navbar from "./Navbar";

export default class Layout extends Component {
  render() {
    const { children, page } = this.props;
    return (
      <div>
        <Navbar page={page}/>
        <div className="layout-page">{children}</div>
      </div>
    );
  }
}
