import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioShell } from './studio-shell';

describe('StudioShell', () => {
  let component: StudioShell;
  let fixture: ComponentFixture<StudioShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioShell],
    }).compileComponents();

    fixture = TestBed.createComponent(StudioShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
