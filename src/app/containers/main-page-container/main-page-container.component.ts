import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Sequence } from 'src/app/data/models/sequence';
import * as mainPageActions from '../../state/actions/main-page.actions';
import * as fromMainPage from '../../state/selectors/main-page.selectors';

@Component({
  selector: 'app-main-page-container',
  templateUrl: './main-page-container.component.html',
  styleUrls: ['./main-page-container.component.css']
})
export class MainPageContainerComponent implements OnInit {
  jsonData$ = this.store.pipe(select(fromMainPage.selectJsonData));
  existingSequenceData$ = this.store.pipe(select(fromMainPage.selectExistingData));

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(mainPageActions.loadJsonData());
  }

  openAddSequenceDialog() {
    this.store.dispatch(mainPageActions.openAddSequenceDialog());
  }

  openSequenceInspectDialog() {
    this.store.dispatch(mainPageActions.openSequenceInspectDialog());
  }

  setSequenceData(data: Sequence[]) {
    this.store.dispatch(mainPageActions.setSequenceData({sequenceData: data}));
  }

  selectSequence(sequence: Sequence) {
    this.store.dispatch(mainPageActions.selectSequence({selectedSequence: sequence}));
  }

}
