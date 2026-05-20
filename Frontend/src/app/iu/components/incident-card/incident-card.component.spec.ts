import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { Router } from '@angular/router';

import { IncidentCardComponent }
  from './incident-card.component';

import { Severity }
  from 'src/app/core/enums/severity.enum';

import { Status }
  from 'src/app/core/enums/status.enum';

describe('IncidentCardComponent', () => {

  let component:
    IncidentCardComponent;

  let fixture:
    ComponentFixture<IncidentCardComponent>;

  const routerSpy = jasmine.createSpyObj(
    'Router',
    ['navigate']
  );

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [IncidentCardComponent],

      providers: [
        {
          provide: Router,
          useValue: routerSpy
        }
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(
        IncidentCardComponent
      );

    component =
      fixture.componentInstance;

    component.incident = {

      id: '1',

      title: 'Test Incident',

      description: 'Testing',

      severity: Severity.P1,

      status: Status.OPEN,

      assignedTo: null,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString()
    };

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });

  it('should calculate time ago', () => {

    component.updateTimeAgo();

    expect(component.timeAgo)
      .toContain('Hace');
  });

  it('should navigate to detail page', () => {

    component.openDetail();

    expect(routerSpy.navigate)
      .toHaveBeenCalledWith([
        '/incident-detail',
        '1'
      ]);
  });
});