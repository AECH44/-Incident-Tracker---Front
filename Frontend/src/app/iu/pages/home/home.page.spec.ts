import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { of } from 'rxjs';

import { RouterTestingModule }
  from '@angular/router/testing';

import { PopoverController }
  from '@ionic/angular';

import { HomePage }
  from './home.page';

import { GetIncidentsUseCase }
  from 'src/app/domain/use-cases/get-incidents.usecase';

import { ListenIncidentsUseCase }
  from 'src/app/domain/use-cases/listen-incidents.usecase';

import { Severity }
  from 'src/app/core/enums/severity.enum';

import { Status }
  from 'src/app/core/enums/status.enum';

describe('HomePage', () => {

  let component: HomePage;

  let fixture:
    ComponentFixture<HomePage>;

  const mockGetIncidentsUseCase = {

    execute: jasmine.createSpy()
      .and.returnValue(of([]))
  };

  const mockListenIncidentsUseCase = {

    execute: jasmine.createSpy()
      .and.returnValue(of())
  };

  const popoverControllerMock = {

    create: jasmine.createSpy()
      .and.returnValue(
        Promise.resolve({
          present: jasmine.createSpy()
        })
      )
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        HomePage,
        RouterTestingModule
      ],

      providers: [

        {
          provide: GetIncidentsUseCase,
          useValue:
            mockGetIncidentsUseCase
        },

        {
          provide: ListenIncidentsUseCase,
          useValue:
            mockListenIncidentsUseCase
        },

        {
          provide: PopoverController,
          useValue:
            popoverControllerMock
        }
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(HomePage);

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });

  it('should detect critical incidents', () => {

    component.incidents = [

      {
        id: '1',
        title: 'Critical',
        description: 'Critical incident',
        severity: Severity.P1,
        status: Status.OPEN,
        assignedTo: null,
        createdAt: '',
        updatedAt: ''
      }
    ];

    component.checkCriticalIncidents();

    expect(component.hasCriticalAlert)
      .toBeTrue();

    expect(component.criticalCount)
      .toBe(1);
  });

  it('should not detect critical incidents', () => {

    component.incidents = [

      {
        id: '1',
        title: 'Resolved',
        description: 'Resolved incident',
        severity: Severity.P3,
        status: Status.RESOLVED,
        assignedTo: null,
        createdAt: '',
        updatedAt: ''
      }
    ];

    component.checkCriticalIncidents();

    expect(component.hasCriticalAlert)
      .toBeFalse();

    expect(component.criticalCount)
      .toBe(0);
  });
});