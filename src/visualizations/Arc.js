import React, { Component } from "react";
import * as d3 from "d3";

const margin = { top: 20, right: 30, bottom: 20, left: 30 };
const width = 1280 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;

// A linear scale to position the nodes on the X axis
const xScale = d3.scalePoint().range([0, width]);

export default class Arc extends Component {
  componentDidMount() {
    const { data } = this.props;
    this.container = d3
      .select("#arc-container")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const nodeRange = data.nodes.map(d => d.id);
    xScale.domain(nodeRange);

    this.drawCircles();
    this.drawLinks();
  }
  componentDidUpdate() {}

  calculateData = () => {};

  drawCircles = () => {
    const { data } = this.props;

    this.circles = this.container.selectAll("g").data(data.nodes);

    //exit + remove
    this.circles.exit().remove();

    //enter
    let enter = this.circles
      .enter()
      .append("g")
      .attr("id", d => d.id);
    enter
      .append("circle")
      .attr("r", 20)
      .attr("fill", "#69b3a2")
      .attr("stroke", "#666")
      .attr("stroke-width", 1);
    enter
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", 20)
      .style("pointer-events", "none");

    // enter + update selection
    this.circles = enter.merge(this.circles);
    this.circles
      .select("circle")
      .attr("cx", function(d) {
        return xScale(d.id);
      })
      .attr("cy", height - 30);
    this.circles
      .select("text")
      .text(d => d.name)
      .attr("x", function(d) {
        return xScale(d.id);
      })
      .attr("y", height + 10);

    this.circles
      .on("mouseover", this.nodesMouseOver)
      .on("mouseout", this.mouseOut);
  };

  drawLinks = () => {
    const { data } = this.props;
    this.links = this.container.selectAll("path").data(data.links);

    //exit + remove
    this.links.exit().remove();

    //enter + update
    const enter = this.links
      .enter()
      .insert("path", "g")
      .attr("d", function(d) {
        let start = xScale(d.source); // X position of start node on the X axis
        let end = xScale(d.target); // X position of end node
        return [
          "M",
          start,
          height - 30, // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
          "A", // This means we're gonna build an elliptical arc
          (start - end) / 2,
          ",", // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
          (start - end) / 2,
          0,
          0,
          ",",
          start < end ? 1 : 0,
          end,
          ",",
          height - 30
        ] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
          .join(" ");
      })
      .style("fill", "none")
      .style("stroke", "#b8b8b8")
      .style("stroke-width", 2);

    this.links = enter.merge(this.links);
    this.links
      .on("mouseover", this.linksMouseOver)
      .on("mouseout", this.mouseOut);
  };

  nodesMouseOver = d => {
    const { data } = this.props;

    var nodesToHighlight = data.links
      .map(function(e) {
        //find linked nodes to currently hovered node
        return e.source === d.id ? e.target : e.target === d.id ? e.source : 0;
      })
      .filter(function(d) {
        return d;
      });

    this.circles
      .select("circle")
      .attr("fill", node => {
       return nodesToHighlight.indexOf(node.id) >= 0 || node.id === d.id ? "#69b3b2" : "#B8B8B8"
      });

    // Highlight the connections
    this.links
      .style("stroke", function(link_d) {
        return link_d.source === d.id || link_d.target === d.id
          ? "#69b3b2"
          : "#b8b8b8";
      })
      .style("stroke-width", function(link_d) {
        return link_d.source === d.id || link_d.target === d.id ? 4 : 2;
      });
  };

  linksMouseOver = d => {
    this.circles.select("circle").attr("fill", node => {
      return node.id === d.source || node.id === d.target
        ? "#69b3b2"
        : "#B8B8B8";
    });
    this.links
      .style("stroke", function(link_d) {
        return link_d.source === d.source || link_d.target === d.target
          ? "#69b3b2"
          : "#b8b8b8";
      })
      .style("stroke-width", function(link_d) {
        return link_d.source === d.source && link_d.target === d.target ? 4 : 2;
      });
  };

  mouseOut = d => {
    this.circles.select("circle").attr("fill", "#69b3a2");
    this.links.style("stroke", "#b8b8b8").style("stroke-width", 2);
  };

  render() {
    return (
      <svg
        id="arc-container"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height * 2}`}
      ></svg>
    );
  }
}
