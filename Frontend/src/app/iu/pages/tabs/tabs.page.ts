import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, documentText, time, person, notificationsOutline } from 'ionicons/icons';

addIcons({
  home,
  'document-text': documentText,
  time,
  person,
  'notifications-outline': notificationsOutline
});

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    RouterModule
  ]
})
export class TabsPage {}