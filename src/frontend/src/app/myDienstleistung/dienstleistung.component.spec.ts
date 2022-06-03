import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DienstleistungComponent } from './dienstleistung.component';

describe('DienstleistungComponent', () => {
  let component: DienstleistungComponent;
  let fixture: ComponentFixture<DienstleistungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DienstleistungComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DienstleistungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
