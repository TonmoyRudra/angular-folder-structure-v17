import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterAddComponent } from './roster-add.component';

describe('RosterAddComponent', () => {
  let component: RosterAddComponent;
  let fixture: ComponentFixture<RosterAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RosterAddComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
