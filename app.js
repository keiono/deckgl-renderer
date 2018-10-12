import React, {Component} from 'react';
import {render} from 'react-dom';
import DeckGL from '@deck.gl/react';
import {OrthographicView} from '@deck.gl/core';
import BezierGraphLayer from './bezier-graph-layer';

import SAMPLE_GRAPH from './data/sample-graph.json';
import CYJS_GRAPH from './data/small.json';

const INITIAL_VIEW_STATE = {
  offset: [100, 100],
  zoom: 50
};


const transform = (cyjs) => {

  const elements = cyjs.elements
  const nodes = elements.nodes;
  const edges = elements.edges;

  let nodeCount = nodes.length
  const newNodes = []
  while(nodeCount--) {
    const node = nodes[nodeCount]

    const newNode = {
      id: node.data.id,
      position: [node.position.x, node.position.y]
    }

    newNodes.push(newNode)
  }

  const newEdges = []
  let edgeId = 1
  let edgeCount = edges.length
  while(edgeCount--) {
    const edge = edges[edgeCount]

    const newEdge = {
      id: edgeId.toString(),
      sourceId: edge.data.source,
      targetId: edge.data.target
    }

    newEdges.push(newEdge)
  }

  return {nodes: newNodes, edges: newEdges}

}


export default class App extends Component {
  render() {
    const {data = transform(CYJS_GRAPH)} = this.props;

    return (
      <DeckGL
        width="100%"
        height="100%"
        initialViewState={INITIAL_VIEW_STATE}
        views={[new OrthographicView({
          controller: true
        })]}
        layers={[new BezierGraphLayer({data})]}
      />
    );
  }
}

/* global document */
render(<App />, document.body.appendChild(document.createElement('div')));
