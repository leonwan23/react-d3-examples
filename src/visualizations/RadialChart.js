import React, { Component } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";
import { theme } from "../constants/theme";
import { scaleRadial } from "../utils";

const height = 500;
const innerRadius = 100;
const outerRadius = 200;

const xScale = d3.scaleBand().range([0, 2 * Math.PI]); // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle

const yScale = scaleRadial().range([innerRadius + 5, outerRadius]); // Domain will be define later.

let colorScale = chroma.scale([
  theme.THEME_GREEN,
  theme.THEME_YELLOW,
  theme.THEME_RED
]);
var amountScale = d3.scaleLog();

// const data = [
//   {
//     name: "A",
//     amount: 0
//   },
//   {
//     name: "B",
//     amount: 0
//   },
//   {
//     name: "C",
//     amount: 0
//   },
//   {
//     name: "AA",
//     amount: 0
//   },
//   {
//     name: "BB",
//     amount: 0
//   },
//   {
//     name: "CC",
//     amount: 0
//   },
//   {
//     name: "AAA",
//     amount: 0
//   },
//   {
//     name: "BBB",
//     amount: 0
//   },
//   {
//     name: "CCC",
//     amount: 0
//   }
// ];

export default class RadialChart extends Component {
  componentDidMount() {
    const { width } = this.props;
    this.container = d3
      .select("#radial-chart-container")
      .attr("transform", "translate(" + [width / 2, height / 2] + ")");
    this.calculateData();
    this.drawChart();
  }

  componentDidUpdate() {
    this.calculateData();
    this.drawChart();
  }

  calculateData = () => {
    const {data} = this.props
    this.data = data.sort((a, b) => b.amount - a.amount);

    const amountExtent = d3.extent(this.data.map(d => d.amount));
    //if only 1 day in month has expense, set lower  bound of amount extent to very small number
    if (amountExtent[0] === amountExtent[1]) {
      amountExtent[0] = 0.0001;
    }
    amountScale.domain(amountExtent);

    xScale.domain(
      this.data.map(function(d) {
        return d.name;
      })
    ); // The domain of the X axis is the list of expenses.

    yScale.domain(amountExtent); // Domain of Y is from 0 to the max seen in the data
  };

  drawChart = () => {
    const t = d3.transition().duration(300);
    const arc = d3
      .arc() // imagine your doing a part of a donut plot
      .innerRadius(innerRadius)
      .outerRadius(function(d) {
        return yScale(d.amount);
      })
      .startAngle(function(d) {
        return xScale(d.name);
      })
      .endAngle(function(d) {
        return xScale(d.name) + xScale.bandwidth();
      })
      .padAngle(0.05)
      .padRadius(innerRadius);

    this.bars = this.container
      // .selectAll(".radial-bars")
      .data(this.data)
      .append("path")
      .attr("class", "radial-bars")

    this.bars
      // .exit()
      .transition(t)
      .attr("opacity", 0)
      .remove();

    //enter
    let enter = this.bars
      // .enter()
      // .append("g")
      .attr("fill", d => colorScale(amountScale(d.amount)));
      // .data(this.data);
      // .attr("class", "radial-bars");

    //enter + update
    this.bars = enter.merge(this.bars);

    // enter
      // .append("path")
      // this.bars = this.container
      // .append("g")
      // .selectAll("path")
      // .data(this.data)
      // .enter()
      // .attr("fill", d => colorScale(amountScale(d.amount)));
    // .attr("d", arc);

    // this.labels = this.container
    //   .append("g")
    //   .selectAll("g")
    //   .data(data)
    //   .enter()
    //   .append("g")
    //   .attr("text-anchor", function(d) {
    //     return (xScale(d.name) + xScale.bandwidth() / 2 + Math.PI) %
    //       (2 * Math.PI) <
    //       Math.PI
    //       ? "end"
    //       : "start";
    //   })
    //   .attr("transform", function(d) {
    //     return (
    //       "rotate(" +
    //       (((xScale(d.name) + xScale.bandwidth() / 2) * 180) / Math.PI - 90) +
    //       ")" +
    //       "translate(" +
    //       (yScale(d.amount) + 10) +
    //       ",0)"
    //     );
    //   })
    //   .append("text")
    //   .text(function(d) {
    //     return d.name;
    //   })
    //   .attr("transform", function(d) {
    //     return (xScale(d.name) + xScale.bandwidth() / 2 + Math.PI) %
    //       (2 * Math.PI) <
    //       Math.PI
    //       ? "rotate(180)"
    //       : "rotate(0)";
    //   })
    //   .style("font-size", 0)
    //   .attr("alignment-baseline", "middle");

    this.bars
      .selectAll("path")
      .transition()
      .ease(d3.easeElastic)
      .duration(2000)
      .delay(function(d, i) {
        return i * 50;
      })
      .attrTween("d", function(d, index) {
        var i = d3.interpolate(0, yScale(+d.amount));
        return function(t) {
          d.outerRadius = i(t);
          return arc(d, index);
        };
      });

    // this.labels
    //   .transition()
    //   .ease(d3.easeElastic)
    //   .duration(2000)
    //   .delay((d, i) => i * 150)
    //   .style("font-size", "11px");
  };

  render() {
    return <g id="radial-chart-container" />;
  }
}
