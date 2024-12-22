import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { SystemNode } from './SystemNode';
import { SystemEdge } from './SystemEdge';
import { transformDataToNodesAndEdges } from './utils';
import { SystemComponent } from './types';

interface SystemArchitectureDiagramProps {
  components: SystemComponent[];
  onComponentClick?: (componentId: string) => void;
}

const nodeTypes = {
  systemNode: SystemNode,
};

const edgeTypes = {
  systemEdge: SystemEdge,
};

export default function SystemArchitectureDiagram({
  components = [],
  onComponentClick,
}: SystemArchitectureDiagramProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (components && components.length > 0) {
      const { nodes: initialNodes, edges: initialEdges } = transformDataToNodesAndEdges(components);
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [components, setNodes, setEdges]);

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      onComponentClick?.(node.id);
    },
    [onComponentClick]
  );

  return (
    <div className="w-full h-[600px] border border-border rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
} 