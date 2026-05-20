import { Injectable, inject } from '@angular/core';

import {
  Observable,
  map
} from 'rxjs';

import { Incident } from '../../core/models/incident.model';

import { Severity } from '../../core/enums/severity.enum';
import { Status } from '../../core/enums/status.enum';

import { IncidentRepository } from '../repositories/incident.repository';

@Injectable({
  providedIn: 'root'
})
export class GetIncidentsUseCase {

  private repository =
    inject(IncidentRepository);

  execute(): Observable<Incident[]> {

    return this.repository
      .getIncidents()
      .pipe(

        map((incidents) => {

          const normalized =
            incidents.map(
              this.normalizeIncident
            );

          return this.removeDuplicates(
            normalized
          );
        })
      );
  }

  private normalizeIncident(
    incident: Partial<Incident>
  ): Incident {

    return {

      id: incident.id || '',

      title: incident.title || '',

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

  private removeDuplicates(
    incidents: Incident[]
  ): Incident[] {

    return incidents.filter(

      (incident, index, self) =>

        index === self.findIndex(
          i => i.id === incident.id
        )
    );
  }
}