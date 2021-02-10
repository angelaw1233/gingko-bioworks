import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Sequence } from 'src/app/data/models/sequence';

@Component({
  selector: 'app-sequence-inspect',
  templateUrl: './sequence-inspect.component.html',
  styleUrls: ['./sequence-inspect.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SequenceInspectComponent implements OnInit {
  @Input() selectedSequence!: Sequence;
  @Output() closeSequenceInspectDialog: EventEmitter<any>  = new EventEmitter();
  sequenceString!: string;

  constructor() { }

  ngOnInit(): void {
    let stringArray = [];
    let string = '';
    for(let i=0;i<this.selectedSequence.sequence.length;i++) {
      if (this.selectedSequence.sequence[i] === 'T') {
        stringArray.push('<span class="char-' + this.selectedSequence.sequence[i].toLowerCase() + '">' + this.selectedSequence.sequence[i] + '</span>')
      } else if (this.selectedSequence.sequence[i] === 'C') {
        stringArray.push('<span class="char-' + this.selectedSequence.sequence[i].toLowerCase() + '">' + this.selectedSequence.sequence[i] + '</span>')
      } else if (this.selectedSequence.sequence[i] === 'G') {
        stringArray.push('<span class="char-' + this.selectedSequence.sequence[i].toLowerCase() + '">' + this.selectedSequence.sequence[i] + '</span>')
      } else {
        stringArray.push('<span class="char-' + this.selectedSequence.sequence[i].toLowerCase() + '">' + this.selectedSequence.sequence[i] + '</span>')
      }
    }
    string = stringArray.join('')
    this.sequenceString = string;
  }

}
