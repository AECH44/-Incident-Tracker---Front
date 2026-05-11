import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonList,
  IonItem
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  standalone: true,
  imports: [
    CommonModule,
    IonList,
    IonItem
  ]
})
export class NotificationsComponent implements OnInit {

  @Input() hasCritical: boolean = false;
  @Input() criticalCount: number = 0;

  notifications: any[] = [];

  ngOnInit() {

    this.notifications = JSON.parse(
      localStorage.getItem('notifications') || '[]'
    );
  }
}