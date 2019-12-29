import React, { Component } from "react";
import * as d3 from "d3";
import moment from "moment";

let height = 600;
const dayWidth = 61;
const dayHeight = 73;

let xScale = d3.scaleLinear().domain([0, 6]);
let yScale = d3.scaleLinear();

export default class Day extends Component {
  componentDidMount() {
    const { width } = this.props;
    xScale.range([0, width]);

    this.container = d3.select("#days-container");
    this.calculateDates();
    this.renderBacks();
  }

  componentDidUpdate() {
    this.calculateDates();
    this.renderBacks();
  }

  calculateDates = () => {
    const { selectedDate } = this.props;
    var date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1); //first day of month
    this.backs = [];
    while (date.getMonth() === selectedDate.getMonth()) {
      this.backs.push({ date: new Date(date) });
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

    this.backs.map(back => {
      const { x, y } = this.calculateDayPosition(back.date);
      return Object.assign(back, { x, y });
    });
  };

  calculateDayPosition(date) {
    var dayOfWeek = date.getDay();
    var week = d3.timeWeek.floor(date);
    var x = xScale(dayOfWeek);
    var y = yScale(week) + 2 * dayHeight;

    return { x, y };
  }

  renderBacks = () => {
    const t = d3.transition().duration(500);
    this.blocks = this.container.selectAll(".back").data(this.backs);

    //exit + remove
    this.blocks.exit().remove();

    //enter
    const enter = this.blocks
      .enter()
      .append("g")
      .attr("class", "back")
      .attr("transform", d => "translate(" + [d.x, d.y] + ")");

    enter
      .append("rect")
      .attr("width", 2 * dayWidth)
      .attr("height", 2 * dayHeight)
      .attr("x", -dayWidth)
      .attr("y", -dayHeight)
      .attr("fill", "#e1ecea");

    enter
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", dayHeight - 10)
      .attr("font-size", 12)
      .style("pointer-events", "none");

    //enter + update
    this.blocks = enter.merge(this.blocks);
    this.blocks
      .transition(t)
      .delay((d, i) => i * 10)
      .attr("transform", d => "translate(" + [d.x, d.y] + ")");

    this.blocks.select("text").text(d => moment(d.date).format("DD/MM"));
  };

  render() {
    return <g id="days-container" />;
  }
}
