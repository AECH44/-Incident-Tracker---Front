import { Severity } from '../enums/severity.enum';
import { Status } from '../enums/status.enum';

export interface Incident {

  id: string;

  title: string;

  description: string;

  severity: Severity;

  status: Status;

  assignedTo?: string | null;

  createdAt: string;

  updatedAt: string;

}