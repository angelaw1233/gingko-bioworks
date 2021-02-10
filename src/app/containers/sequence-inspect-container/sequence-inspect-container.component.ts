import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromMainPage from '../../state/selectors/main-page.selectors';
import * as mainPageActions from '../../state/actions/main-page.actions';

@Component({
  selector: 'app-sequence-inspect-container',
  templateUrl: './sequence-inspect-container.component.html',
  styleUrls: ['./sequence-inspect-container.component.css']
})
export class SequenceInspectContainerComponent implements OnInit {
  selectedSequence$ = this.store.pipe(select(fromMainPage.selectSelectedSequence));
  Colors:Array<any> = ["#FFF","#0b9660","#FF0000","#000","#FFF","#ffd11a","#fb9667"];

  constructor(private store: Store) { }

  ngOnInit(): void {
  
  }

  closeSequenceInspectDialog() {
    this.store.dispatch(mainPageActions.closeSequenceInspectDialog());
  }
}
