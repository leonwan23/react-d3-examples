import React, { Component } from "react";
import * as d3 from "d3";

const width = 150;
const height = 50;

export default class Total extends Component {
  componentDidMount() {
    this.container = d3
      .select("#amount-total")
      .attr("transform", "translate(" + [width / 4, height / 2] + ")");
    this.styleLabels();
    this.animateTotal();
  }

  componentDidUpdate() {
    this.animateTotal();
  }

  styleLabels = () => {
    const { size } = this.props;

    this.container
      .append("text")
      .attr("x", -size / 2)
      .attr("y", 0)
      .style("font-size", size * 0.6)
      .style("font-weight", 500)
      .text("$");

    this.container
      .append("text")
      .attr("x", 3)
      .attr("y", size * 0.6)
      .style("font-size", size / 2)
      .style("font-weight", 300)
      .text("total");
  };

  animateTotal = () => {
    const { total, size } = this.props;
    const t = d3.transition().duration(350);

    this.text = this.container.selectAll(".total");

    this.text
      .transition(t)
      .attr("opacity", 0)
      .remove();

    this.text = this.container
      .attr("class", "total")
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .style("font-size", size)
      .style("font-weight", 500)
      .text(0);

    this.text.transition(t).tween("text", function() {
      const selection = d3.select(this);
      const start = d3.select(this).text() || 0;
      const interpolator = d3.interpolateNumber(start, total);
      return function(t) {
        selection.text(Math.round(interpolator(t)));
      };
    });
  };

  render() {
    return <g id="amount-total"></g>;
  }
}
