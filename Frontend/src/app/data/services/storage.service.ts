import { Injectable } from '@angular/core';

import { Incident } from 'src/app/core/models/incident.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly INCIDENTS_KEY = 'incidents';

  getIncidents(): Incident[] {

    try {

      const data = localStorage.getItem(
        this.INCIDENTS_KEY
      );

      if (!data) {
        return [];
      }

      const parsed = JSON.parse(data);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed;

    } catch (error) {

      console.error(
        'Error reading incidents from localStorage',
        error
      );

      return [];
    }
  }

  saveIncidents(
    incidents: Incident[]
  ): void {

    try {

      if (!Array.isArray(incidents)) {

        console.error(
          'Invalid incidents array'
        );

        return;
      }

      localStorage.setItem(
        this.INCIDENTS_KEY,
        JSON.stringify(incidents)
      );

    } catch (error) {

      console.error(
        'Error saving incidents in localStorage',
        error
      );
    }
  }

  addIncident(
    incident: Incident
  ): void {

    const incidents = this.getIncidents();

    incidents.unshift(incident);

    this.saveIncidents(incidents);
  }

  updateIncident(
    updatedIncident: Incident
  ): void {

    const incidents = this.getIncidents();

    const updated = incidents.map(incident => {

      if (incident.id === updatedIncident.id) {
        return updatedIncident;
      }

      return incident;
    });

    this.saveIncidents(updated);
  }

  getIncidentById(
    id: string
  ): Incident | undefined {

    return this
      .getIncidents()
      .find(incident => incident.id === id);
  }
}