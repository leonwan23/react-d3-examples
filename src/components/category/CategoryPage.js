import React, { Component } from "react";
import Category from "../../visualizations/Category";
import Layout from "../../layout/Layout";
import "./category.scss";

const data = [
  { name: "test", color: "#000000" },
  { name: "hello", color: "#ffffff" }
];
const width = 800;
const height = 800;

function AddCategory() {
  return (
    <div className="add-category-form">
      <input />
      <button>Add</button>
    </div>
  );
}

export default class CategoryPage extends Component {
  render() {
    return (
      <Layout page="category">
        <div className="category-page">
          <AddCategory />
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <Category data={data} width={width} height={height} />
          </svg>
        </div>
      </Layout>
    );
  }
}
