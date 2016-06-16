import React from 'react';

class ForceLayout extends React.Component {

  componentWillReceiveProps (props) {
    d3.select(this.refs.mountPoint).selectAll('*').remove();
    this.renderGraph(props.width, props.height, props.nodes, props.links);
  }

  renderGraph (width, height, nodes, links) {
    const color = d3.scale.category10();
    const svg = d3.select(this.refs.mountPoint)
      .append('svg')
      .attr('height', height)
      .attr('width', width);

    // Build arrows for links/edges
    svg.append('svg:defs')
      .selectAll('marker')
      .data(['end'])
      .enter().append('svg:marker')
      .attr('id', String)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 15)
      .attr('refY', -1.5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5');

    const texts = svg.selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('fill', 'black')
      .attr('font-family', 'sand-serif')
      .attr('font-size', '11px')
      .text(d => (d.title));

    const force = d3.layout.force()
      .nodes(nodes)
      .links(links)
      .size([width, height])
      .charge(-2000)
      .linkDistance(1)
      .linkStrength(1)
      .start();

    const edges = svg.selectAll('line')
      .data(links)
      .enter()
      .append('g')
      .attr('class', 'edge-group')
      .append('line')
      .style('stroke', '#ccc')
      .style('stroke-width', 1)
      .attr('marker-end', 'url(#end)');

    const edgesText = svg.selectAll('.edge-group')
      .append('text')
      .data(links)
      .text(d => (d.type))
      .style('font-size', 10)
      .attr('x', d => (d.source.x + (d.target.x - d.source.x) * 0.5))
      .attr('y', d => (d.source.y + (d.target.y - d.source.y) * 0.5))
      .attr('dy', '.25em')
      .attr('text-anchor', 'middle');

    const node = svg.selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 8)
      .attr('opacity', 0.5)
      .style('fill', (d, i) => {
        console.log(d);
        if (d.tagId.startsWith('geo')) return color(3);
        if (d.tagId.startsWith('marketing')) return color(7);
        if (d.tagId.startsWith('hotel:mhid')) return color(1);
        if (d.tagId.startsWith('tile')) return color(4);
        return color(10);
      })
      .call(force.drag);

    force.on('tick', function () {
      edges.attr('x1', function (d) { return d.source.x; })
        .attr('y1', function (d) { return d.source.y; })
        .attr('x2', function (d) { return d.target.x; })
        .attr('y2', function (d) { return d.target.y; });
      node.attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
      texts.attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });

      edgesText
        .attr('x', function (d) { return (d.source.x + (d.target.x - d.source.x) * 0.5); })
        .attr('y', function (d) { return (d.source.y + (d.target.y - d.source.y) * 0.5); });
    });
  }

  componentDidMount () {
    this.renderGraph(this.props.width, this.props.height, this.props.nodes, this.props.links);
  }

  render () {
    const { width, height } = this.props;
    const style = { width, height };
    return (<div style={style} ref='mountPoint' />);
  }
}

export default ForceLayout;
