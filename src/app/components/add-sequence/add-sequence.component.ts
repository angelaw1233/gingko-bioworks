import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sequence } from 'src/app/data/models/sequence';

@Component({
  selector: 'app-add-sequence',
  templateUrl: './add-sequence.component.html',
  styleUrls: ['./add-sequence.component.css']
})
export class AddSequenceComponent implements OnInit {
  @Output() closeAddSequenceDialog: EventEmitter<any>  = new EventEmitter();
  @Output() setSequenceData: EventEmitter<any>  = new EventEmitter();
  form: FormGroup;
  sequenceData: Sequence[] | undefined;
  sequenceString: any | undefined;
  errorMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
  ) { 
    this.form = formBuilder.group({
      name: ['', [Validators.required]],
      description:['', [Validators.required]],
      sequence:['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.closeAddSequenceDialog.emit();
  }

  saveData() {
    let exists = false;
    this.errorMessage = '';
    let upperCaseSequence = this.form.value.sequence.toUpperCase();
    let existingSequences: Sequence[] = [];
    for(let i=0;i<upperCaseSequence.length;i++) {
      if (
        upperCaseSequence[i] !== 'T' && 
        upperCaseSequence[i] !== 'C' && 
        upperCaseSequence[i] !== 'G' && 
        upperCaseSequence[i] !== 'A') {
          this.errorMessage = 'Sequence contains invalid characters.  Characters can only be "T", "C", "G" , & "A"';
          return this.errorMessage
        }
    }
    if (localStorage.getItem('sequenceData')) {
      this.sequenceData = JSON.parse(localStorage.getItem('sequenceData') || '{}');
      this.sequenceData?.forEach(sequence => {
        existingSequences.push(sequence);
      })
    }
    let newSequence = {
      sequenceName: this.form.value.name,
      sequenceDescription: this.form.value.description,
      sequence: this.form.value.sequence
    }
    if(existingSequences.length !== 0) {
      existingSequences.forEach(sequence => {
        if (
          sequence.sequenceName === newSequence.sequenceName &&
          sequence.sequence === newSequence.sequence
          ) {
            exists = true;
            this.errorMessage = 'Sequence already exists!'
          } 
      })
    } 
    if (!exists) {
      existingSequences.push(newSequence)
      this.sequenceString = (JSON.stringify(existingSequences));
      localStorage.setItem('sequenceData', this.sequenceString);
      this.closeAddSequenceDialog.emit();
    }
    return this.setSequenceData.emit(existingSequences)
  }

}
