import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGeoLayersComponent } from './app-geo-layers.component';

describe('AppGeoLayersComponent', () => {
  let component: AppGeoLayersComponent;
  let fixture: ComponentFixture<AppGeoLayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppGeoLayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppGeoLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
