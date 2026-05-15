import { Injectable } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';

import { Incident } from '../../core/models/incident.model';

import { IncidentRepository } from '../../domain/repositories/incident.repository';

import { MOCK_INCIDENTS } from '../mocks/incident.mock';

import { IncidentSseService } from '../sse/incident-sse.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentRepositoryImpl
  extends IncidentRepository {

  constructor(
    private sseService: IncidentSseService
  ) {
    super();
  }

  override getIncidents(): Observable<Incident[]> {

    const localIncidents = JSON.parse(
      localStorage.getItem('incidents') || '[]'
    );

    return of([
      ...localIncidents,
      ...MOCK_INCIDENTS
    ]);

  }

  override createIncident(
    incident: Incident
  ): Observable<void> {

    const incidents = JSON.parse(
      localStorage.getItem('incidents') || '[]'
    );

    incidents.unshift(incident);

    localStorage.setItem(
      'incidents',
      JSON.stringify(incidents)
    );

    return of(void 0);

  }

  override listenIncidents(): Observable<Incident> {
    return this.sseService.connect();
  }

}