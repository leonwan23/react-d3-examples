import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children, page }) {
  return (
    <div>
      <Navbar page={page} />
      <div className="layout-page">{children}</div>
    </div>
  );
}
