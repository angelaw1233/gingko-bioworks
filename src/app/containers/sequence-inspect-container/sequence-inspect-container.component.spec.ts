import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceInspectContainerComponent } from './sequence-inspect-container.component';

describe('SequenceInspectContainerComponent', () => {
  let component: SequenceInspectContainerComponent;
  let fixture: ComponentFixture<SequenceInspectContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequenceInspectContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceInspectContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
