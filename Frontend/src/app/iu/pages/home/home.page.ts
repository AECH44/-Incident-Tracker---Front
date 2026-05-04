import { Component, OnInit, inject } from '@angular/core';
import { IncidentService } from 'src/app/data/services/incident';
import { CommonModule } from '@angular/common';
import { Incident } from 'src/app/domain/models/incident.model';
import { IncidentCardComponent } from '../../components/incident-card/incident-card.component';
import { IonMenuButton } from '@ionic/angular/standalone';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSpinner,
  IonList,
  IonButtons,
  IonIcon,
  IonButton,
  IonBadge
} from '@ionic/angular/standalone';
import { MenuController, PopoverController } from '@ionic/angular';
import { NotificationsComponent } from 'src/app/iu/components/notifications/notifications.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonBadge,
    IonButton,
    IonIcon,
    IonButtons,
    IonList,
    IonSpinner,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IncidentCardComponent,
    CommonModule,
    IonMenuButton
  ]
})
export class HomePage implements OnInit {

  incidents: Incident[] = [];
  loading = true;
  error = false;

  
  hasCriticalAlert = false;

  
  private popoverCtrl = inject(PopoverController);

  constructor(
    private incidentService: IncidentService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.loadIncidents();
  }

  loadIncidents() {
    this.loading = true;

    this.incidentService.getIncidents().subscribe({
      next: (data) => {
        this.incidents = data;

        this.checkCriticalIncidents();

        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  //  lógica alerta crítica
  checkCriticalIncidents() {
    const now = Date.now();

    this.hasCriticalAlert = this.incidents.some(incident => {
      const created = new Date(incident.createdAt).getTime();
      const diffSeconds = (now - created) / 1000;

      return (
        incident.severity === 'P1' &&
        incident.status === 'OPEN' &&
        diffSeconds > 30
      );
    });
  }

  //  menú lateral
  openMenu() {
    this.menuCtrl.open();
  }

  // abrir notificaciones
  async openNotifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      translucent: true,
      componentProps: {
        hasCritical: this.hasCriticalAlert
      }
    });

    await popover.present();
  }

}