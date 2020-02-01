import React, { Component } from "react";
import * as d3 from "d3";
import moment from "moment";

import { theme } from "../constants/theme";

let height = 600;
const dayHeight = 73;
const radius = 5;

let xScale = d3.scaleLinear().domain([0, 6]);
let yScale = d3.scaleLinear();
let amountScale = d3.scaleLinear().range([radius, 3 * radius]);

var simulation = d3
  .forceSimulation()
  .alphaDecay(0.003)
  .velocityDecay(0.3)
  .force(
    "collide",
    d3.forceCollide(d => d.radius)
  )
  .force(
    "x",
    d3.forceX(d => d.focusX)
  )
  .force(
    "y",
    d3.forceY(d => d.focusY)
  )
  .stop();

export default class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    simulation.on("tick", this.forceTick);
  }

  componentDidMount() {
    const { width } = this.props;
    xScale.range([0, width]);

    this.container = d3.select("#expenses-container").append("g");

    this.tooltip = d3.select("#expenses-container").append("g");
    this.tooltip
      .append("foreignObject")
      .attr("class", "tooltip")
      .append("xhtml:div")
      .append("div")
      .attr("class", "tooltip-expense-name");

    this.tooltip
      .select("div")
      .append("div")
      .attr("class", "tooltip-expense-amount");

    this.calculateData();
    this.renderCircles();

    simulation
      .nodes(this.expenses)
      .alpha(0.9)
      .restart();
  }

  componentDidUpdate() {
    this.calculateData();
    this.renderCircles();

    simulation
      .nodes(this.expenses)
      .alpha(0.9)
      .restart();
  }

  calculateData = () => {
    const { selectedDate, data, width } = this.props;
    const amountExtent = d3.extent(data, d => d.amount);
    amountScale.domain(amountExtent);

    const date = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ); //first day of month
    this.backs = [];
    while (date.getMonth() === selectedDate.getMonth()) {
      this.backs.push({
        date: new Date(date)
      });
      date.setDate(date.getDate() + 1);
    }

    const weeksExtent = d3.extent(this.backs, d => d3.timeWeek.floor(d.date));
    const weeksDiff = moment(weeksExtent[1]).diff(weeksExtent[0], "week");

    if (weeksDiff === 4) {
      yScale.range([0, height]);
    } else if (weeksDiff === 5) {
      yScale.range([0, height + 150]);
    } else {
      yScale.range([0, height - 150]);
    }
    yScale.domain(weeksExtent);

    this.expenses = data.map(d => {
      const { x, y } = this.calculateDayPosition(new Date(d.date));
      return Object.assign(d, {
        radius: amountScale(d.amount),
        focusX: x,
        focusY: y,
        fill: "#fff8fa"
      });
    });
  };

  calculateDayPosition(date) {
    var dayOfWeek = date.getDay();
    var week = d3.timeWeek.floor(date);
    var x = xScale(dayOfWeek);
    var y = yScale(week) + 2 * dayHeight;

    return {
      x,
      y
    };
  }

  renderCircles = () => {
    const t = d3.transition().duration(300);
    this.circles = this.container.selectAll(".expenses").data(this.expenses);

    //exit + remove
    this.circles
      .exit()
      .transition(t)
      .attr("transform", "translate(" + [0, 300] + ")")
      .attr("r", 0)
      .remove();

    //enter
    let enter = this.circles
      .enter()
      .append("circle")
      .attr("class", "expenses")
      .on("mouseover", this.mouseOver)
      .on("mouseleave", () => this.tooltip.style("display", "none"));

    //enter + update
    this.circles = enter.merge(this.circles);
    this.circles
      .transition(t)
      .attr("fill", d => d.fill)
      .attr("r", d => d.radius);
  };

  forceTick = () => {
    this.circles.attr("cx", d => d.x).attr("cy", d => d.y);
  };

  mouseOver = d => {
    this.tooltip.style("display", "block");

    let { x, y, name, amount } = d;

    this.tooltip.attr("transform", "translate(" + [x, y + d.radius + 20] + ")");
    this.tooltip.select(".tooltip-expense-name").html(`<text>${name}</text>`);
    this.tooltip
      .select(".tooltip-expense-amount")
      .html(`<text>$${amount.toFixed(2)}</text>`);
    this.tooltip
      .select("text")
      .attr("text-anchor", "middle")
      .style("pointer-events", "none");
    var width1 = this.tooltip
      .select(".tooltip-expense-name")
      .select("text")
      .node()
      .getBoundingClientRect().width;
    var width2 = this.tooltip
      .select(".tooltip-expense-amount")
      .select("text")
      .node()
      .getBoundingClientRect().width;
    var height1 = this.tooltip
      .select(".tooltip-expense-name")
      .select("text")
      .node()
      .getBoundingClientRect().height;
    var height2 = this.tooltip
      .select(".tooltip-expense-amount")
      .select("text")
      .node()
      .getBoundingClientRect().height;
    this.tooltip
      .select("foreignObject")
      .attr("width", Math.max(width1, width2) + 10)
      .attr("height", height1 + height2 + d.radius + 10);
  };

  render() {
    return <g id="expenses-container"> </g>;
  }
}
