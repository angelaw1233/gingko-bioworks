import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSequenceContainerComponent } from './add-sequence-container.component';

describe('AddSequenceContainerComponent', () => {
  let component: AddSequenceContainerComponent;
  let fixture: ComponentFixture<AddSequenceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSequenceContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSequenceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
