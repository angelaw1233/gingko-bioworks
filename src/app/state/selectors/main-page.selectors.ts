import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMainPage from '../reducers/main-page.reducer';

export const selectMainPageState = createFeatureSelector<fromMainPage.State>(
  fromMainPage.mainPageFeatureKey
)

export const selectJsonData = createSelector(
  selectMainPageState,
  state => state.jsonData
)

export const selectExistingData = createSelector(
  selectMainPageState,
  state => state.existingSequenceData
)

export const selectSelectedSequence = createSelector(
  selectMainPageState,
  state => state.selectedSequence
)
