import React from "react";
import "./App.css";
import moment from "moment";

import Category from "./visualizations/Category";
import Day from "./visualizations/Day";

const width = 750;
const height = 1800;

const ENTER_CODE = 13;

const style = {
  width
};

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
      selectedDate: new Date() //current day
    };
  }

  componentDidMount() {}

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

  deleteCategory = category => {};

  selectMonth = (prev = true) => {
    const { selectedDate } = this.state;
    const monthDiff = prev ? -1 : 1;
    this.setState({
      selectedDate: moment(selectedDate)
        .add(monthDiff, "months")
        .toDate()
    });
  };

  render() {
    const { categories, categoryBeingAdded, selectedDate } = this.state;

    return (
      <div className="App" style={style}>
        <input
          id="category-input"
          className="category-input"
          placeholder="Add category"
          onFocus={this.startCategory}
          onBlur={this.clearCategory}
          onKeyDown={this.addCategory}
        ></input>
        <h3 className="month-label">
          <span style={{ cursor: "pointer" }} onClick={this.selectMonth}>
            ←{" "}
          </span>
          {moment(selectedDate).format("MMM YYYY")}
          <span
            style={{ cursor: "pointer" }}
            onClick={() => this.selectMonth(false)}
          >
            {" "}
            →
          </span>
        </h3>
        <svg
          className="svg-container"
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          {/* <Category
            data={categories}
            width={width}
            height={height}
            categoryBeingAdded={categoryBeingAdded}
          /> */}

          <Day width={width} selectedDate={selectedDate} />
        </svg>
      </div>
    );
  }
}

export default App;
