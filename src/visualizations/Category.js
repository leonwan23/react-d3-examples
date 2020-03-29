import React, { Component } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";

const radius = 50;

const simulation = d3
  .forceSimulation()
  .alphaDecay(0.001)
  .velocityDecay(0.3)
  .force("collide", d3.forceCollide(radius + 5))
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

function lightOrDark(color) {
  var r, g, b, hsp;

  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, light if true, dark if false
  return hsp > 127.5 ? "#000" : "#fff";
}

export default class Category extends Component {
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
        focusY: height / 2
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
      .attr("fill", d => d.color)
      .attr("stroke-width", 1)
      .attr("stroke", d => chroma(d.color).darken())
      .call(drag);
    enter
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("font-size", 14)
      .attr("fill", d => lightOrDark(d.color))
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
