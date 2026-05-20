import { Incident } from '../../core/models/incident.model';

import { Severity } from '../../core/enums/severity.enum';
import { Status } from '../../core/enums/status.enum';

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: '1',
    title: 'Payment service down',
    description: 'Service not responding',
    severity: Severity.P1,
    status: Status.OPEN,
    assignedTo: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Slow API response',
    description: 'Latency above threshold',
    severity: Severity.P2,
    status: Status.ACKNOWLEDGED,
    assignedTo: 'Carlos',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'UI bug in dashboard',
    description: 'Button not clickable',
    severity: Severity.P3,
    status: Status.RESOLVED,
    assignedTo: 'Ana',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];