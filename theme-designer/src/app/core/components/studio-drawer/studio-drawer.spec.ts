import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioDrawer } from './studio-drawer';

describe('StudioDrawer', () => {
  let component: StudioDrawer;
  let fixture: ComponentFixture<StudioDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioDrawer],
    }).compileComponents();

    fixture = TestBed.createComponent(StudioDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
