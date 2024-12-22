import { Node, Edge } from 'reactflow';
import { SystemComponent } from './types';

export function transformDataToNodesAndEdges(components: SystemComponent[]) {
  const nodes: Node[] = components.map((component, index) => ({
    id: component.id,
    type: 'systemNode',
    position: getInitialPosition(index, components.length),
    data: {
      name: component.name,
      type: component.type,
    },
  }));

  const edges: Edge[] = components.flatMap((component) =>
    component.connections.map((targetId) => ({
      id: `${component.id}-${targetId}`,
      source: component.id,
      target: targetId,
      type: 'systemEdge',
    }))
  );

  return { nodes, edges };
}

function getInitialPosition(index: number, total: number) {
  const radius = 200;
  const angle = (index / total) * 2 * Math.PI;
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
} 