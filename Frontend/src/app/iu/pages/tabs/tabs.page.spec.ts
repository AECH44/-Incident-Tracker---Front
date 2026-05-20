import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  RouterTestingModule
} from '@angular/router/testing';

import { ActivatedRoute }
  from '@angular/router';

import { TabsPage }
  from './tabs.page';

describe('TabsPage', () => {

  let component: TabsPage;

  let fixture:
    ComponentFixture<TabsPage>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        TabsPage,
        RouterTestingModule
      ],

      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture =
      TestBed.createComponent(TabsPage);

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component)
      .toBeTruthy();
  });
});