import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function TrainMap({ routes }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const margin = { top: -5, right: 20, bottom: 200, left: 20 };
    const width = 800 - margin.left - margin.right;
    const height = 1200 - margin.top - margin.bottom;

    svg.selectAll("*").remove();

    if (routes.length > 0) {
      drawMap(svg, routes, width, height);
    }
  }, [routes]);

  const drawMap = (svg, routesData, width, height) => {
    const nodesMap = {};
    const links = [];
    routesData.forEach(route => {
      if (!nodesMap[route.start]) {
        nodesMap[route.start] = { id: route.start, type: 'station' };
      }
      if (!nodesMap[route.end]) {
        nodesMap[route.end] = { id: route.end, type: 'station' };
      }
      const linkId = `${route.start}-${route.end}`;
      if (!links.find(link => link.id === linkId)) {
        links.push({ id: linkId, source: route.start, target: route.end, type: 'connection' });
      }
    });
    const nodes = Object.values(nodesMap);

    const defs = svg.append("defs");
    defs.selectAll("marker")
      .data(["end"])
      .enter().append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("class", "arrowHead");

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("marker-end", "url(#arrow)");

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 20)
      .attr("fill", "lightblue")
      .call(drag);

    const text = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text(d => d.id)
      .attr("fill", "black")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle");

    const simulationInstance = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", () => {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => {
            const dx = d.target.x - d.source.x;
            const dy = d.target.y - d.source.y;
            const angle = Math.atan2(dy, dx);
            return d.target.x - Math.cos(angle) * 20;
          })
          .attr("y2", d => {
            const dx = d.target.x - d.source.x;
            const dy = d.target.y - d.source.y;
            const angle = Math.atan2(dy, dx);
            return d.target.y - Math.sin(angle) * 20;
          });

        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);

        text
          .attr("x", d => d.x)
          .attr("y", d => d.y);
      });
  };

  function drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  return (
    <svg ref={svgRef} id="train-map" width="1200" height="1300"></svg>
  );
}

export default TrainMap;
