import React from 'react';
import ForceLayout from './forceLayout';
import Panel from 'react-bootstrap/lib/Panel';

const D3Panel = ({results, params}) => {
  const graph = results[params.items][params.itemIndex].graph;
  console.log('changeing');
  return (
    <Panel header='Graph'>
      <ForceLayout width={500} height={500} nodes={graph.nodes} links={graph.links} />
    </Panel>
  );
};

export default D3Panel;
