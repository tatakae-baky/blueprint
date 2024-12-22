import React, { memo } from 'react';
import { BaseEdge, EdgeProps, getStraightPath } from 'reactflow';

export const SystemEdge = memo((props: EdgeProps) => {
  const { sourceX, sourceY, targetX, targetY } = props;

  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <BaseEdge
      {...props}
      path={edgePath}
      style={{
        strokeWidth: 2,
        stroke: 'var(--muted-foreground)',
      }}
    />
  );
});

SystemEdge.displayName = 'SystemEdge'; 