import React, { Component } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";

const grey = "rgba(232, 236, 241, 1)";

const colorScale = chroma.scale(["#53c3ac", "#f7e883", "#e85178"]);
const radius = 50;

const simulation = d3
  .forceSimulation()
  .alphaDecay(0.001)
  .velocityDecay(0.3)
  .force(
    "collide",
    d3.forceCollide(d => d.radius + 10)
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
const drag = d3.drag();

export default class Bubble extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    simulation.on("tick", this.forceTick);
    drag
      .on("start", this.dragStart)
      .on("drag", this.onDrag)
      .on("end", this.dragEnd);
  }

  componentDidMount() {
    const { width, height } = this.props;
    this.container = d3.select("#categories");

    this.calculateData();
    this.drawCircles();

    simulation
      .nodes(this.data)
      .alpha(0.9)
      .restart();
  }

  componentDidUpdate() {
    this.calculateData();
    this.drawCircles();

    simulation
      .nodes(this.data)
      .alpha(0.9)
      .restart();
  }

  calculateData = () => {
    const { data, width, height } = this.props;
    this.data = data.slice();
    this.data.map(d => {
      return Object.assign(d, {
        focusX: width / 2,
        focusY: height / 8,
        radius
      });
    });

    // if (categoryBeingAdded) {
    //   this.data.push(
    //     Object.assign(categoryBeingAdded, {
    //       fx: width / 2,
    //       fy: -5,
    //       radius
    //     })
    //   );
    // }
  };

  drawCircles = () => {
    this.circles = this.container.selectAll("g").data(this.data);

    //exit + remove
    this.circles.exit().remove();

    //enter
    const enter = this.circles.enter().append("g");
    enter
      .append("circle")
      .attr("r", radius)
      .attr("fill", grey)
      .attr("stroke-width", 1)
      .attr("stroke", chroma(grey).darken())
      .call(drag);
    enter
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("font-size", 14)
      .style("pointer-events", "none");

    //enter + update
    this.circles = enter.merge(this.circles);
    this.circles.select("text").text(d => d.name);
  };

  forceTick = () => {
    this.circles.attr("transform", d => "translate(" + [d.x, d.y] + ")");
  };

  dragStart = () => {
    simulation.alphaTarget(0.9).restart();
    d3.event.subject.x = d3.event.subject.x;
    d3.event.subject.y = d3.event.subject.y;

    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  };

  onDrag = () => {
    d3.event.subject.x = d3.event.x;
    d3.event.subject.y = d3.event.y;

    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  };

  dragEnd = () => {
    if (!d3.event.active) simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  };

  render() {
    return <g id="categories"></g>;
  }
}
