export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: 'P1' | 'P2' | 'P3';
  status: 'OPEN' | 'ACKNOWLEDGED' | 'RESOLVED';
  assignedTo?: string | null;
  createdAt: string;
  updatedAt: string;
}

