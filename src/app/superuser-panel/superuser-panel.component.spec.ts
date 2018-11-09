import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperuserPanelComponent } from './superuser-panel.component';

describe('SuperuserPanelComponent', () => {
  let component: SuperuserPanelComponent;
  let fixture: ComponentFixture<SuperuserPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperuserPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperuserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
