import React from 'react';
import ForceLayout from './forceLayout';
import Panel from 'react-bootstrap/lib/Panel';

const D3Panel = ({results, params}) => {
  console.log('changeing');
  return (
    <div>
      <Panel header='Queries'>
        {results.queries.map(obj => <pre><code>{obj}</code></pre>)}
      </Panel>
      <Panel header='Graph'>
        <ForceLayout width={700} height={500} results={results} />
      </Panel>
    </div>
  );
};

export default D3Panel;
