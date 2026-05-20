import { Injectable } from '@angular/core';

import {
  Observable,
  of
} from 'rxjs';

import { Incident } from '../../core/models/incident.model';

import { IncidentRepository } from '../../domain/repositories/incident.repository';

import { MOCK_INCIDENTS } from '../mocks/incident.mock';

import { IncidentSseService } from '../sse/incident-sse.service';

import { StorageService } from '../services/storage.service';

import { Severity } from 'src/app/core/enums/severity.enum';
import { Status } from 'src/app/core/enums/status.enum';

@Injectable({
  providedIn: 'root'
})
export class IncidentRepositoryImpl
  extends IncidentRepository {

  constructor(
    private sseService: IncidentSseService,
    private storageService: StorageService
  ) {
    super();
  }

  override getIncidents(): Observable<Incident[]> {

    const localIncidents =
      this.storageService.getIncidents();

    const mappedLocal =
      localIncidents.map(
        incident => this.normalizeIncident(incident)
      );

    const mappedMocks =
      MOCK_INCIDENTS.map(
        incident => this.normalizeIncident(incident)
      );

    const merged = [
      ...mappedLocal,
      ...mappedMocks
    ];

    const uniqueIncidents =
      merged.filter(
        (incident, index, self) =>

          index === self.findIndex(
            i => i.id === incident.id
          )
      );

    return of(uniqueIncidents);
  }

  override createIncident(
    incident: Incident
  ): Observable<void> {

    this.storageService.addIncident(
      this.normalizeIncident(incident)
    );

    return of(void 0);
  }

  override listenIncidents():
    Observable<Incident> {

    return this.sseService.connect();
  }

  private normalizeIncident(
    incident: Partial<Incident>
  ): Incident {

    return {

      id:
        incident.id || crypto.randomUUID(),

      title:
        incident.title || 'Sin título',

      description:
        incident.description || '',

      severity:
        incident.severity || Severity.P3,

      status:
        incident.status || Status.OPEN,

      createdAt:
        incident.createdAt ||
        new Date().toISOString(),

      updatedAt:
        incident.updatedAt ||
        new Date().toISOString(),

      assignedTo:
        incident.assignedTo || null
    };
  }
}