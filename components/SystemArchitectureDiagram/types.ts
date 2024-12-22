export interface SystemComponent {
    id: string;
    type: 'frontend' | 'backend' | 'database';
    name: string;
    connections: string[];
  } 