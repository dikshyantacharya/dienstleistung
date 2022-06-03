import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DienstDetailComponent } from './dienst-detail.component';

describe('DienstDetailComponent', () => {
  let component: DienstDetailComponent;
  let fixture: ComponentFixture<DienstDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DienstDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DienstDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
