import { createAction, props } from '@ngrx/store';
import { Sequence } from 'src/app/data/models/sequence';

export const loadJsonData = createAction(
  '[MainPage] Load JSON data'
);

export const loadJsonDataSuccess = createAction(
  '[MainPage] Load JSON data success',
  props<{ jsonData: Sequence[] }>()
);

export const loadJsonDataFailure = createAction(
  '[MainPage] Load JSON data failure',
  props<{ error: any }>()
);

export const openAddSequenceDialog = createAction(
  '[MainPage] Open add sequence dialog'
);

export const closeAddSequenceDialog = createAction(
  '[MainPage] Close add sequence dialog'
);

export const setSequenceData = createAction(
  '[MainPage] Set sequence data from local memory',
  props<{ sequenceData: Sequence[] }>()
);

export const openSequenceInspectDialog = createAction(
  '[MainPage] Open sequence inspect dialog'
);

export const closeSequenceInspectDialog = createAction(
  '[MainPage] Close sequence inspect dialog'
);

export const selectSequence = createAction(
  '[MainPage] Select sequence from table',
  props<{ selectedSequence: Sequence }>()
);
