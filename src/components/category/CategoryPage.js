import React, { Component } from "react";
import Category from "../../visualizations/Category";
import Layout from "../../layout/Layout";

import { connect } from "react-redux";
import { categoryActions } from "./categoryActions";

import "./category.scss";

const width = 800;
const height = 800;

function AddCategory({ handleAdd }) {
  return (
    <form className="add-category-form" onSubmit={handleAdd}>
      <input />
      <button>Add</button>
    </form>
  );
}

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryBeingAdded: null
    };
  }

  componentDidMount() {
    const { getCategories, authUser } = this.props;
    getCategories(authUser.id);
  }

  addCategory = e => {
    e.preventDefault();
    const { addCategory, authUser } = this.props;
    addCategory({ name: "test", userId: authUser.id });
  };

  render() {
    const { categories, loadingCategories } = this.props;
    return (
      <Layout page="category">
        <div className="category-page">
          <AddCategory handleAdd={this.addCategory} />
          {!loadingCategories && (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
            >
              <Category
                data={categories}
                width={width}
                height={height}
                handleDelete={this.props.deleteCategory}
              />
            </svg>
          )}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { authUser } = state.authReducer;
  const {
    loadingCategories,
    categories,
    categoriesErr
  } = state.categoryReducer;
  return {
    loadingCategories,
    categories,
    categoriesErr,
    authUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: userId => dispatch(categoryActions.getCategories(userId)),
    addCategory: category => dispatch(categoryActions.addCategory(category)),
    deleteCategory: id => dispatch(categoryActions.deleteCategory(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
