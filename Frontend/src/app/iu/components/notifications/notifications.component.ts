import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  standalone: true, 
  imports: [CommonModule, IonList, IonItem]
})
export class NotificationsComponent {
  @Input() hasCritical: boolean = false;
}