import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Incident } from 'src/app/core/models/incident.model';

import { Severity } from 'src/app/core/enums/severity.enum';
import { Status } from 'src/app/core/enums/status.enum';

import { IncidentCardComponent } from '../../components/incident-card/incident-card.component';

import { GetIncidentsUseCase } from 'src/app/domain/use-cases/get-incidents.usecase';
import { ListenIncidentsUseCase } from 'src/app/domain/use-cases/listen-incidents.usecase';

import { StorageService } from 'src/app/data/services/storage.service';

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
  IonBadge,
  IonMenuButton,
  IonItem,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';

import { PopoverController } from '@ionic/angular';

import { NotificationsComponent } from 'src/app/iu/components/notifications/notifications.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonFabButton,
    IonFab,
    IonItem,
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
export class HomePage implements OnInit, OnDestroy {

  incidents: Incident[] = [];

  loading = true;
  error = false;

  hasCriticalAlert = false;
  criticalCount = 0;

  bannerVisible = true;

  readonly Severity = Severity;
  readonly Status = Status;

  private popoverCtrl = inject(PopoverController);
  private router = inject(Router);

  private incidentsSubscription?: Subscription;
  private sseSubscription?: Subscription;

  constructor(
    private getIncidentsUseCase: GetIncidentsUseCase,
    private listenIncidentsUseCase: ListenIncidentsUseCase,
    private storageService: StorageService
  ) {}

  ngOnInit() {

    this.loadIncidents();

    this.listenRealtimeIncidents();
  }

  ionViewWillEnter() {

    this.loadIncidents();
  }

  ngOnDestroy() {

    this.incidentsSubscription?.unsubscribe();

    this.sseSubscription?.unsubscribe();
  }

loadIncidents() {

  this.loading = true;

  this.incidentsSubscription =
    this.getIncidentsUseCase
      .execute()
      .subscribe({

        next: (incidents) => {

          this.incidents = incidents;

          this.checkCriticalIncidents();

          this.loading = false;
        },

        error: (err) => {

          console.error(
            'Error loading incidents',
            err
          );

          this.error = true;

          this.loading = false;
        }
      });
}

  listenRealtimeIncidents() {

    this.sseSubscription =
      this.listenIncidentsUseCase
        .execute()
        .subscribe({

          next: (incident: Incident) => {

            console.log(
              '📡 SSE Incident received:',
              incident
            );

            const exists =
              this.incidents.some(
                i => i.id === incident.id
              );

            if (!exists) {

              this.incidents.unshift(incident);

              this.checkCriticalIncidents();
            }
          },

          error: (err) => {

            console.error(
              'SSE connection error',
              err
            );
          }
        });
  }

  checkCriticalIncidents() {

    const criticals =
      this.incidents.filter(incident => {

        return (

          incident.severity === Severity.P1 &&

          incident.status === Status.OPEN
        );
      });

    this.criticalCount = criticals.length;

    this.hasCriticalAlert =
      this.criticalCount > 0;
  }

  closeBanner() {

    this.bannerVisible = false;
  }

  async openNotifications(ev: any) {

    const popover =
      await this.popoverCtrl.create({

        component: NotificationsComponent,

        event: ev,

        translucent: true,

        componentProps: {

          hasCritical:
            this.hasCriticalAlert,

          criticalCount:
            this.criticalCount
        }
      });

    await popover.present();
  }

  goToCreateIncident() {

    this.router.navigate([
      '/create-incident'
    ]);
  }

  trackByIncidentId(
  index: number,
  incident: Incident
): string {

  return incident.id;
}
}