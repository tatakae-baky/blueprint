import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const typeColors = {
  frontend: 'bg-green-500',
  backend: 'bg-blue-500',
  database: 'bg-orange-500',
};

export const SystemNode = memo(({ data }) => {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="!bg-muted-foreground" />
      <div
        className={`rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md
          ${data.selected ? 'ring-2 ring-primary' : ''}`}
      >
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${typeColors[data.type]}`} />
          <h3 className="font-medium">{data.name}</h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{data.type}</p>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-muted-foreground" />
    </div>
  );
});

SystemNode.displayName = 'SystemNode'; 