import React, { Component } from "react";
import * as d3 from "d3";

const gWidth = 150;
const gHeight = 50;

export default class Total extends Component {
  componentDidMount() {
    const { width, height } = this.props;
    const defaultWidth = width || gWidth;
    const defaultHeight = height || gHeight;

    this.container = d3
      .select("#amount-total")
      .attr(
        "transform",
        "translate(" + [defaultWidth / 2, defaultHeight / 2] + ")"
      );
    this.styleLabels();
    this.animateTotal();
  }

  componentDidUpdate(prevProps) {
    const { total } = this.props;
    if (prevProps.total !== total) {
      this.animateTotal(prevProps.total);
    }
  }

  styleLabels = () => {
    const { size } = this.props;

    this.container
      .append("text")
      .attr("x", -1)
      .attr("y", 0)
      .attr("text-anchor", "end")
      .style("font-size", size * 0.6)
      .style("font-weight", 500)
      .text("$");

    this.container
      .append("text")
      .attr("x", 0)
      .attr("y", size * 0.6)
      .attr("text-anchor", "start")
      .style("font-size", size / 2)
      .style("font-weight", 300)
      .text("total");
  };

  animateTotal = (prevTotal = 0) => {
    const { total, size } = this.props;
    const t = d3.transition().duration(600);

    this.text = this.container.selectAll("#total");

    this.text
      .transition(t)
      .attr("opacity", 0)
      .remove();

    this.text = this.container
      .append("text")
      .attr("id", "total")
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "start")
      .style("font-size", size)
      .style("font-weight", 500)
      .text(prevTotal);

    this.text.transition(t).tween("text", function() {
      const selection = d3.select(this);
      const start = selection.text();
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
