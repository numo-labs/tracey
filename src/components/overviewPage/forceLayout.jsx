import React from 'react';

class ForceLayout extends React.Component {

  componentWillReceiveProps (props) {
    d3.select(this.refs.mountPoint).selectAll('*').remove();
    this.renderGraph(props.width, props.height, props.nodes, props.links);
  }

  renderGraph (width, height, results) {
    function parse_cypher (result) {
       var graph = { nodes: [], edges: [] },
          nodesMap = {},
          edgesMap = {},
          key;

      // Iteration on all result data
      result.forEach(function (data) {

          // iteration on graph for all node
          data.nodes.forEach(function (node) {
              var sigmaNode =  {
                  id : node.id,
                  label : node.properties.name,
                  weight : 1,
                  nodeType: node.properties.nodeType + ':' + node.properties.nodeSubType
              };

              if (graph.nodes.findIndex(function (n) { return n.id === node.id }) > -1) {
                // Already Exists
              } else {
                graph.nodes.push(sigmaNode);
              }

          });

          // iteration on graph for all node
          data.relationships.forEach(function (edge) {
              var sigmaEdge =  {
                  id : edge.id,
                  label : edge.type,
                  source : graph.nodes.findIndex(function (node) {
                    if (node.id === edge.source) {
                      return true
                    }
                  }),
                  target : graph.nodes.findIndex(function (node) {
                    if (node.id === edge.target) {
                      return true
                    }
                  })
              };

              if (sigmaEdge.id in edgesMap) {
                  // do nothing
              } else {
                  edgesMap[sigmaEdge.id] = sigmaEdge;
              }
          });

      });

      // construct sigma nodes
      for (key in edgesMap) {
          graph.edges.push(edgesMap[key]);
      }

      return graph;
    }
    const color = d3.scale.category10().domain(['geo:geonames', 'hotel:mhid', 'marketing', 'tile:article']);

    const svg = d3.select(this.refs.mountPoint)
      .append('svg')
      .attr('height', height)
      .attr('width', '100%')
      .attr("pointer-events", "all")
      .call(d3.behavior.zoom().on("zoom", function () {
        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
      }))
      .append("g");

    var force = d3.layout.force()
            .charge(-200)
            .linkDistance(20)
            .gravity(0.05)
            .size([width, height]);

    var graph = results.raw;
    graph = parse_cypher(graph);

    force.nodes(graph.nodes).links(graph.edges).start();

    var link = svg.selectAll(".link")
            .data(graph.edges).enter()
            .append('g')
            .attr('class', 'edge-group')
            .append("line").attr("class", "link")

    var tip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    var node = svg.selectAll(".node")
            .data(graph.nodes).enter()
            .append("circle")
            .attr('class', 'node')
            .attr('r', function (d) {
              if (d.nodeType === 'geo') {
                var count = graph.edges.filter(function (edge) {
                  return edge.source.id === d.id;
                }).length;
                return Math.exp(-count + 2) * 4.5;
              } else {
                return 10;
              }
            })
            .attr('opacity', 1)
            .style('fill', (d, i) => {
              return color(d.nodeType);
            })
        .on("mouseover", function(d) {
          tip.transition()
            .duration(200)
            .style("opacity", .9);
          tip.html(`${d.label} (${d.nodeType})`)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          })
        .on("mouseout", function(d) {
          tip.transition()
            .duration(500)
            .style("opacity", 0);
        })
        .call(force.drag);

    // html title attribute
    node.append("title")
            .text(function (d) { return d.title; })

    // force feed algo ticks
    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
    });
    function scaleAndDraw() {
      var xExtent = d3.extent(d3.values(graph.nodes), function(n) { return n.x; }),
          yExtent = d3.extent(d3.values(graph.nodes), function(n) { return n.y; });

      if ((xExtent[1] - xExtent[0]) > width) {
        var scaleX = (xExtent[1] - xExtent[0]) / width;
        var scaleY = (yExtent[1] - yExtent[0]) / height;

        var scale = 1 / Math.max(scaleX, scaleY);

        var translateX = Math.abs(xExtent[0]) * scale;
        var translateY = Math.abs(yExtent[0]) * scale;
        svg.attr("transform", "translate(" +
          translateX + "," + translateY + ")" +
          " scale(" + scale + ")");
      }
    }
  }

  componentDidMount () {
    this.renderGraph(this.props.width, this.props.height, this.props.results);
  }

  render () {
    const { width, height } = this.props;
    const style = { width: '100%', height };
    return (<div style={style} ref='mountPoint' />);
  }
}

export default ForceLayout;
