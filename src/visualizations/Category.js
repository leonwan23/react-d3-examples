import React, { Component } from "react";
import * as d3 from "d3";
import chroma from "chroma-js";

import trashIcon from "../static/trash-o.svg";

const radius = 50;
const deleteIconY = 160;
const deleteIconRadius = 12;

const simulation = d3
  .forceSimulation()
  .force("charge", d3.forceManyBody().strength(700))
  .force("collide", d3.forceCollide(radius))
  .stop();

const drag = d3.drag();

function lightOrDark(color) {
  let r, g, b, hsp;

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
    // .attr("transform", "translate(" + [width / 2, height / 2] + ")");

    this.deleteIcon = this.container
      .append("image")
      .attr("x", width / 2 - deleteIconRadius)
      .attr("y", deleteIconY - deleteIconRadius)
      .attr("width", 2 * deleteIconRadius)
      .attr("height", 2 * deleteIconRadius)
      .attr("xlink:href", trashIcon)
      .attr("fill", "black")
      .style("display", "none");

    this.calculateData();
    this.drawCircles();

    this.startSimulation();
  }

  componentDidUpdate() {
    this.calculateData();
    this.drawCircles();

    this.startSimulation();
  }

  startSimulation = () => {
    const { width, height } = this.props;
    simulation
      .nodes(this.data)
      .force("center", d3.forceCenter(width / 2, height / 2))
      .alpha(0.9)
      .velocityDecay(0.4)
      .restart();
  };

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
    const { width, height } = this.props;
    const t = d3.transition().duration(500);
    this.circles = this.container.selectAll("g").data(this.data);
    console.log(this.data);
    //exit + remove
    this.circles.exit().remove();

    //enter
    const enter = this.circles.enter().append("g").call(drag);

    const circles = enter
      .append("circle")
      .attr("r", 0)
      .attr("id", d => d.id)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("fill", d => d.color)
      .attr("stroke-width", 1)
      .attr("stroke", d => chroma(d.color).darken());
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

    circles.transition(t).attr("r", radius);
  };

  forceTick = () => {
    this.circles.attr("transform", d => "translate(" + [d.x, d.y] + ")");
  };

  dragStart = () => {
    simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;

    this.deleteIcon.style("display", "block");
  };

  onDrag = () => {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  };

  dragEnd = () => {
    if (!d3.event.active) simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;

    this.deleteIcon.style("display", "none");

    // if dragged over the deleteIcon
    var categoryX = d3.event.x;
    var categoryY = d3.event.y;
    if (
      this.props.width / 2 - deleteIconRadius < categoryX &&
      categoryX < this.props.width / 2 + deleteIconRadius &&
      deleteIconY - deleteIconRadius < categoryY &&
      categoryY < deleteIconY + deleteIconRadius
    ) {
      if (this.props.handleDelete){
        // this.props.handleDelete(d3.event.subject.id);
        console.log(d3.event)
      }
    }
  };

  render() {
    return <g id="categories"></g>;
  }
}
