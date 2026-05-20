import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  ActivatedRoute
} from '@angular/router';

import { of } from 'rxjs';

import { IncidentDetailPage }
  from './incident-detail.page';

import { GetIncidentsUseCase }
  from 'src/app/domain/use-cases/get-incidents.usecase';

describe('IncidentDetailPage', () => {

  let component:
    IncidentDetailPage;

  let fixture:
    ComponentFixture<IncidentDetailPage>;

  const mockGetIncidentsUseCase = {

    execute: jasmine.createSpy()
      .and.returnValue(
        of([])
      )
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        IncidentDetailPage
      ],

      providers: [

        {
          provide: ActivatedRoute,

          useValue: {

            snapshot: {

              paramMap: {

                get: () => '1'
              }
            }
          }
        },

        {
          provide: GetIncidentsUseCase,
          useValue:
            mockGetIncidentsUseCase
        }
      ]

    }).compileComponents();

    fixture =
      TestBed.createComponent(
        IncidentDetailPage
      );

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });

});