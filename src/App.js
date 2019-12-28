import React from "react";
import "./App.css";

import Category from "./visualizations/Category";

const width = 1280;
const height = 1800;

const ENTER_CODE = 13;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          id: 1,
          name: "Parking"
        },
        {
          id: 2,
          name: "Shopping"
        }
      ],
      categoryBeingAdded: null,
      inputPosition: { x: 0, y: 0 }
    };
  }

  componentDidMount() {
    this.updateInputPosition();

    window.addEventListener("resize", this.updateInputPosition);
  }

  updateInputPosition = () => {
    const { x, y } = document
      .getElementById("category-input")
      .getBoundingClientRect();
    this.setState({ inputPosition: { x, y } });
  };

  startCategory = event => {
    const categoryBeingAdded = {
      id: Math.random() * 1000,
      name: event.target.value
    };
    this.setState({ categoryBeingAdded });
  };

  clearCategory = event => {
    event.target.value = "";
    event.target.blur();
    this.setState({ categoryBeingAdded: null });
  };

  addCategory = event => {
    if (event.keyCode === ENTER_CODE) {
      // take the value of the input and create new category
      var category = Object.assign(this.state.categoryBeingAdded, {
        name: event.target.value,
        fx: null,
        fy: null
      });

      // clear out the input form on successful submit
      event.target.value = "";
      event.target.blur();

      this.setState({
        categories: [...this.state.categories, category],
        categoryBeingAdded: null
      });
    }
  };

  deleteCategory = (category) => {

  }

  render() {
    const { categories, categoryBeingAdded, inputPosition } = this.state;

    return (
      <div className="App">
        <input
          id="category-input"
          className="category-input"
          placeholder="Add category"
          onFocus={this.startCategory}
          onBlur={this.clearCategory}
          onKeyDown={this.addCategory}
        ></input>
        <svg
          className="svg-container"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          <Category
            data={categories}
            width={width}
            height={height}
            categoryBeingAdded={categoryBeingAdded}
            inputPosition={inputPosition}
          />
        </svg>
      </div>
    );
  }
}

export default App;
