import { Action, createReducer, on } from '@ngrx/store';
import { Sequence } from 'src/app/data/models/sequence';
import * as MainPageActions from '../actions/main-page.actions';

export const mainPageFeatureKey = 'mainPage';

export interface State {
  jsonData: any;
  existingSequenceData: Sequence[];
  selectedSequence: any;
}

export const initialState: State = {
  jsonData: null,
  existingSequenceData: [],
  selectedSequence: null
};


export const reducer = createReducer(
  initialState,
  on(MainPageActions.loadJsonData, (state, action) => (
    {
      ...state,
      dataLoading: true
    }
  )),
  on(MainPageActions.loadJsonDataSuccess, (state, action) => (
    {
      ...state,
      jsonData: action.jsonData,
      dataLoading: false
    }
  )),
  on(MainPageActions.loadJsonDataFailure, (state, action) => (
    {
      ...state,
      dataLoading: false
    }
  )),
  on(MainPageActions.setSequenceData, (state, action) => (
    {
      ...state,
      existingSequenceData: action.sequenceData
    }
  )),
  on(MainPageActions.selectSequence, (state, action) => (
    {
      ...state,
      selectedSequence: action.selectedSequence
    }
  )),
);

