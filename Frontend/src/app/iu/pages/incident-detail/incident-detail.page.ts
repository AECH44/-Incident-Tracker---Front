import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Incident } from 'src/app/core/models/incident.model';
import { IncidentService } from 'src/app/data/services/incident';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonBadge,
  IonButtons
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-incident-detail',
  templateUrl: './incident-detail.page.html',
  styleUrls: ['./incident-detail.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonBadge
  ]
})
export class IncidentDetailPage implements OnInit {

  incident!: Incident;

  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentService
  ) {}

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadIncident(id);
    }
  }

  loadIncident(id: string) {

    const localIncidents = JSON.parse(
      localStorage.getItem('incidents') || '[]'
    );

    const localIncident = localIncidents.find(
      (i: any) => i.id === id
    );

    if (localIncident) {
      this.incident = localIncident;
      return;
    }

    this.incidentService.getIncidents().subscribe(data => {

      const found = data.find(i => i.id === id);

      if (found) {
        this.incident = found;
      }
    });
  }

  goBack() {
    window.history.back();
  }

  saveLocalIncident() {

    const incidents = JSON.parse(
      localStorage.getItem('incidents') || '[]'
    );

    const updated = incidents.map((i: any) => {

      if (i.id === this.incident.id) {
        return this.incident;
      }

      return i;
    });

    localStorage.setItem(
      'incidents',
      JSON.stringify(updated)
    );
  }

  acknowledge() {

    if (this.incident.status === 'OPEN') {

      this.incident.status = 'ACKNOWLEDGED';
      this.incident.severity = 'P2';
      this.incident.updatedAt = new Date().toISOString();

      this.saveLocalIncident();
    }
  }

  resolve() {

    if (this.incident.status !== 'RESOLVED') {

      this.incident.status = 'RESOLVED';
      this.incident.severity = 'P3';
      this.incident.updatedAt = new Date().toISOString();

      this.saveLocalIncident();
    }
  }

  canAcknowledge(): boolean {
    return this.incident.status === 'OPEN';
  }

  canResolve(): boolean {
    return this.incident.status !== 'RESOLVED';
  }

  getSeverityClass() {

    switch (this.incident.severity) {

      case 'P1':
        return 'badge-p1';

      case 'P2':
        return 'badge-p2';

      case 'P3':
        return 'badge-p3';

      default:
        return '';
    }
  }

  getStatusClass() {

    switch (this.incident.status) {

      case 'OPEN':
        return 'badge-open';

      case 'ACKNOWLEDGED':
        return 'badge-ack';

      case 'RESOLVED':
        return 'badge-resolved';

      default:
        return '';
    }
  }
}