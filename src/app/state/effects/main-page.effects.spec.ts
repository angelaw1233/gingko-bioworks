import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MainPageEffects } from './main-page.effects';

describe('MainPageEffects', () => {
  let actions$: Observable<any>;
  let effects: MainPageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MainPageEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MainPageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
