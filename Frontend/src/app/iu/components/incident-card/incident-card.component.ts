import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Incident } from 'src/app/domain/models/incident.model';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonBadge,
  IonCardContent, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-incident-card',
  templateUrl: './incident-card.component.html',
  styleUrls: ['./incident-card.component.scss'],
  standalone: true,
  imports: [IonIcon, 
    IonCardContent,
    IonBadge,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    CommonModule
  ]
})
export class IncidentCardComponent {

  @Input() incident!: Incident;

  constructor(private router: Router) {}

  getSeverityColor() {
    switch (this.incident.severity) {
      case 'P1': return 'danger';
      case 'P2': return 'warning';
      case 'P3': return 'medium';
      default: return 'light';
    }
  }

  getTimeAgo(): string {
    const now = new Date().getTime();
    const created = new Date(this.incident.createdAt).getTime();
    const diff = Math.floor((now - created) / 1000);

    if (diff < 60) return `Hace ${diff}s`;
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)}m`;
    return `Hace ${Math.floor(diff / 3600)}h`;
  }
  openDetail() {
    this.router.navigate(['/incident-detail', this.incident.id]);
  }
}