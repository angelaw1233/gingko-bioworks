import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceInspectComponent } from './sequence-inspect.component';

describe('SequenceInspectComponent', () => {
  let component: SequenceInspectComponent;
  let fixture: ComponentFixture<SequenceInspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequenceInspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceInspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
