import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioFooter } from './studio-footer';

describe('StudioFooter', () => {
  let component: StudioFooter;
  let fixture: ComponentFixture<StudioFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(StudioFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
