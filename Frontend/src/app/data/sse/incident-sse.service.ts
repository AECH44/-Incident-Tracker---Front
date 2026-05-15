import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { Incident } from '../../core/models/incident.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentSseService {

  constructor(
    private zone: NgZone
  ) {}

  connect(): Observable<Incident> {

    return new Observable(observer => {

      /*

      codigo comentado temporalmente hasta que se tenga el
      endpoint:
      http://localhost:8080/incidents/stream

      Descomentar para habilitar el codigo.
      */

      /*
      const eventSource = new EventSource(
        'http://localhost:8080/incidents/stream'
      );

      eventSource.onmessage = (event) => {

        this.zone.run(() => {

          const incident: Incident =
            JSON.parse(event.data);

          observer.next(incident);

        });

      };

      eventSource.onerror = (error) => {

        this.zone.run(() => {
          observer.error(error);
        });

        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
      */

      console.log(
        'SSE deshabilitado temporalmente (modo mock)'
      );

    });

  }

}