const map = (results) => {
  const returnObject = {
    tiles: [],
    hotels: [],
    raw: results.raw
  };

  results.forEach(result => {
    returnObject[result.type + 's'].push({
      id: result.main.id,
      labels: result.main.labels,
      properties: result.main.properties,
      graph: toD3Format(result.nodes, result.relationships)
    });
  });
  return returnObject;
};

export default map;

const toD3Format = (neo4jNodes, relations) => {
  const nodesRef = {};

  const nodes = neo4jNodes.map((node, index) => {
    if (!nodesRef[node.id]) {
      nodesRef[node.id] = index;
      return {
        id: node.id,
        tagId: node.properties.id,
        label: node.labels[0],
        title: node.properties.name
      };
    }
  });

  const links = relations.map(relation => ({
    source: nodesRef[relation.source],
    target: nodesRef[relation.target],
    type: relation.type
  }));

  return {nodes, links};
};
