import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Primitive } from './primitive';

describe('Primitive', () => {
  let component: Primitive;
  let fixture: ComponentFixture<Primitive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Primitive],
    }).compileComponents();

    fixture = TestBed.createComponent(Primitive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
