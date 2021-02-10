import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Sequence } from 'src/app/data/models/sequence';
import * as mainPageActions from '../../state/actions/main-page.actions';

@Component({
  selector: 'app-add-sequence-container',
  templateUrl: './add-sequence-container.component.html',
  styleUrls: ['./add-sequence-container.component.css']
})
export class AddSequenceContainerComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  closeAddSequenceDialog() {
    this.store.dispatch(mainPageActions.closeAddSequenceDialog());
  }

  setSequenceData(data: Sequence[]) {
    this.store.dispatch(mainPageActions.setSequenceData({sequenceData: data}));
  }

}
