/*jshint unused:false*/
const read = require('read-file');

const removeParents = (graph) => {
  const find = (id) => {
    return graph.elements.nodes.find(node => node.data.id === id);
  };

  const hash = {};

  graph.elements.edges.forEach(edge => {
    const source = find(edge.data.source);
    const target = find(edge.data.target);
    if (source.data.parent) {
      edge.data.source = source.data.parent;
    }
    if (target.data.parent) {
      edge.data.target = target.data.parent;
    }
    if (hash[`${edge.data.source}x${edge.data.target}`] === true) {
      edge.marked = true;
    }
    hash[`${edge.data.source}x${edge.data.target}`] = true;
  });

  graph.elements.edges = graph.elements.edges.filter(edge => edge.marked !== true);
  graph.elements.nodes = graph.elements.nodes.filter(node => !node.data.parent);
  return graph;
};

module.exports = (client, path) => {
  const json = JSON.parse(read.sync(__dirname + '/kiali-circle-callback-1.json', 'utf-8'));
  const graph = JSON.stringify(removeParents(json));
  return Promise.all([
    client.mockWithCallback(
      {
        'path': path,
        'method': 'GET'
      },
      () => {
        // kiali-circle-callback-1.json
        // istio-system.json
        // faulty-ns.json
        return {
          "statusCode": 200,
          "body": graph
        };
      },
      {
        'unlimited': true
      }
    )
  ]);
};
