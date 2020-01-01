import React, { Component } from "react";
import * as d3 from "d3";
import moment from "moment";
import chroma from "chroma-js";

let height = 600;
const dayWidth = 61;
const dayHeight = 73;

let xScale = d3.scaleLinear().domain([0, 6]);
let yScale = d3.scaleLinear();
var amountScale = d3.scaleLog();
let colorScale = chroma.scale(["#53c3ac", "#f7e883", "#e85178"]);

const daysLabels = moment.weekdaysShort();

export default class Day extends Component {
  componentDidMount() {
    const { width } = this.props;
    xScale.range([0, width]);

    this.container = d3.select("#days-container");
    this.calculateData();
    this.renderDayLabels();
    this.renderBacks();
  }

  componentDidUpdate() {
    this.calculateData();
    this.renderBacks();
  }

  calculateData = () => {
    const { selectedDate, expenses } = this.props;

    this.totalByDay = expenses.reduce((acc, curr) => {
      acc[curr.date] = acc[curr.date] || 0;
      acc[curr.date] += curr.amount;
      return acc;
    }, {});

    const amounts = Object.keys(this.totalByDay).map(
      total => this.totalByDay[total]
    );
    const amountExtent = d3.extent(amounts);
    amountScale.domain(amountExtent);

    var date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1); //first day of month
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

    this.backs.map(back => {
      const { x, y } = this.calculateDayPosition(back.date);
      const match = Object.keys(this.totalByDay).find(day => {
        return new Date(day).getTime() === back.date.getTime();
      });
      const dayTotal = match ? this.totalByDay[match] : 0;
      return Object.assign(back, {
        fill: colorScale(amountScale(dayTotal)),
        x,
        y
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

  renderDayLabels = () => {
    const t = d3.transition().duration(500);
    this.labels = this.container.selectAll(".day-labels").data(daysLabels);

    const enter = this.labels
      .enter()
      .append("text")
      .attr("class", "day-labels")
      .attr("x", (d, i) => xScale(i))
      .attr("y", 60)
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")
      .text(d => d);
  };

  renderBacks = () => {
    const t = d3.transition().duration(300);
    this.blocks = this.container.selectAll(".back").data(this.backs);

    //exit + remove
    this.blocks
      .exit()
      .transition(t)
      .attr("transform", d => "translate(" + [d.x, d.y + 20] + ")")
      .attr("opacity", 0)
      .remove();

    //enter
    const enter = this.blocks
      .enter()
      .append("g")
      .attr("class", "back")
      .attr("opacity", 0)
      .attr("transform", d => "translate(" + [d.x, d.y - 20] + ")");

    enter.append("rect").attr("fill", d => d.fill);

    enter
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", dayHeight - 10)
      .attr("font-size", 12)
      .attr("font-weight", "700")
      .attr("class", "date-label")
      .attr("fill", "#fff8fa");

    //enter + update
    this.blocks = enter.merge(this.blocks);
    this.blocks
      .transition(t)
      .delay((d, i) => i * 10)
      .attr("opacity", 1)
      .attr("transform", d => "translate(" + [d.x, d.y] + ")");

    this.blocks
      .select("rect")
      .attr("width", 2 * dayWidth)
      .attr("height", 2 * dayHeight)
      .attr("x", -dayWidth)
      .attr("y", -dayHeight)
      .transition(t)
      .delay((d, i) => i * 20)
      .attr("fill", d => d.fill);
    this.blocks
      .select("text")
      .text(d => moment(d.date).format("DD MMM"))
      .style("pointer-events", d => {
        const match = Object.keys(this.totalByDay).some(day => {
          return new Date(day).getTime() === d.date.getTime();
        });
        return match ? "all" : "none";
      });
  };

  render() {
    return <g id="days-container" />;
  }
}
