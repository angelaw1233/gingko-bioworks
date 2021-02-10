import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as MainPageActions from '../actions/main-page.actions';
import { DataService } from 'src/app/services/data.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Sequence } from 'src/app/data/models/sequence';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddSequenceContainerComponent } from 'src/app/containers/add-sequence-container/add-sequence-container.component';
import { SequenceInspectContainerComponent } from 'src/app/containers/sequence-inspect-container/sequence-inspect-container.component';

@Injectable()
export class MainPageEffects {
  addSequenceDialogRef: MatDialogRef<AddSequenceContainerComponent> | undefined;
  sequenceInspectDialogRef: MatDialogRef<SequenceInspectContainerComponent> | undefined;

  loadData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MainPageActions.loadJsonData),
      switchMap(() => this.dataService.getJsonData()
        .pipe(
          map((result: Sequence[]) => MainPageActions.loadJsonDataSuccess({ jsonData: result })),
          catchError(error => of(MainPageActions.loadJsonDataFailure({ error })))
        )
      )
    );
  });

  @Effect({ dispatch: false })
  openProjectSummaryDialog$ = this.actions$.pipe(
    ofType(MainPageActions.openAddSequenceDialog),
    map(() => {
      this.addSequenceDialogRef = this.dialog.open(AddSequenceContainerComponent, {
        disableClose: false,
        autoFocus: false,
      });
    })
  );

  @Effect({ dispatch: false })
  closeAddSequenceDialog$ = this.actions$.pipe(
    ofType(MainPageActions.closeAddSequenceDialog),
    map(() => {
      if (this.addSequenceDialogRef) {
        this.addSequenceDialogRef.close();
      }
    })
  );

  @Effect({ dispatch: false })
  openSequenceInspectDialog$ = this.actions$.pipe(
    ofType(MainPageActions.openSequenceInspectDialog),
    map(() => {
      this.sequenceInspectDialogRef = this.dialog.open(SequenceInspectContainerComponent, {
        maxHeight: '90vh',
        disableClose: false,
        autoFocus: false,
      });
    })
  );
  
  @Effect({ dispatch: false })
  closeSequenceInspectDialog$ = this.actions$.pipe(
    ofType(MainPageActions.closeSequenceInspectDialog),
    map(() => {
      if (this.sequenceInspectDialogRef) {
        this.sequenceInspectDialogRef.close();
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private dialog: MatDialog,
  ) {}

}
