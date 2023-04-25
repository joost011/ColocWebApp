import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromosomeComponent } from './chromosome.component';

describe('ChromosomeComponent', () => {
  let component: ChromosomeComponent;
  let fixture: ComponentFixture<ChromosomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChromosomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChromosomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
