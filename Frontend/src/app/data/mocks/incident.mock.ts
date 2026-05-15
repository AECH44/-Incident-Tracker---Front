import { Incident } from '../../core/models/incident.model';

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: '1',
    title: 'Payment service down',
    description: 'Service not responding',
    severity: 'P1',
    status: 'OPEN',
    assignedTo: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Slow API response',
    description: 'Latency above threshold',
    severity: 'P2',
    status: 'ACKNOWLEDGED',
    assignedTo: 'Carlos',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'UI bug in dashboard',
    description: 'Button not clickable',
    severity: 'P3',
    status: 'RESOLVED',
    assignedTo: 'Ana',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];