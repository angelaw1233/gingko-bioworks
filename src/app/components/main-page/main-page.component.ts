import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Sequence } from 'src/app/data/models/sequence';
import { IncomingJson } from 'src/app/data/models/incomingJson';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnChanges {
  @Input() jsonData!: IncomingJson;
  @Input() existingSequenceData: any[] = [];
  @Output() openAddSequenceDialog = new EventEmitter();
  @Output() setSequenceData: EventEmitter<any>  = new EventEmitter();
  @Output() setCombinedSequenceData: EventEmitter<any>  = new EventEmitter();
  @Output() selectSequence: EventEmitter<any>  = new EventEmitter();
  @Output() openSequenceInspectDialog: EventEmitter<any>  = new EventEmitter();
  sequenceData: Sequence[] | undefined;
  displayedColumns: string[] = ['name', 'description', 'sequence'];
  dataSource!: Sequence[];
  allData: Sequence[] = [];
  searchText!: string;
  formData!: FormData;


  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getData();
  }

  getData() {
    this.allData = [];
    if (localStorage.getItem('sequenceData')) {
      this.sequenceData = JSON.parse(localStorage.getItem('sequenceData') || '{}');
      this.sequenceData?.forEach(sequence => {
        this.allData.push(sequence);
      })
    }
    if (this.jsonData !== null) {
      this.jsonData.sequences.forEach((sequence: Sequence) => {
        this.allData.push(sequence);
      })
    }
    this.dataSource = this.allData;
  }

  selectSequenceInspect(sequence: Sequence) {
    this.selectSequence.emit(sequence);
    this.openSequenceInspectDialog.emit();
  }

  search() {
    if (this.searchText !== '') {
      this.dataSource = this.allData.filter(sequence => sequence.sequenceName.toLowerCase().includes(this.searchText.toLowerCase()));
    } else {
      this.getData();
    }
  }

  clearSearchText() {
    this.searchText = '';
    this.getData();
  }

  exportToCsv() {
    const items = this.dataSource;
    const replacer = (_key: any, _value: any) => _value === (null || undefined) ? '' : _value; 
    const header = Object.keys(items[0]);
    const csv = items.map((row: any) => header.map(fieldName => JSON.stringify(row[fieldName], replacer).replace(/\\"/g, '""')).join(','));
    csv.unshift(header.join(','));
    const file = csv.join('\r\n');

    const d = new Date();
    const fileName = 'sequences.csv';
    this.downloadFile(file, fileName, 'text/csv;encoding:utf-8');
  }

  downloadFile(content: any, fileName: any, mimeType: any) {
    const a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(new Blob([content], {
        type: mimeType
      }), fileName);
    } else if (URL && 'download' in a) { 
      a.href = URL.createObjectURL(new Blob([content], {
        type: mimeType
      }));
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      location.href = 'data:application/octet-stream,' + encodeURIComponent(content); 
    }
  }

  
  // onUploadOutput(output: UploadOutput): void {
  //   console.log('output', output);
  //   if (output.type === 'allAddedToQueue') {
  //     const event: UploadInput = {
  //       type: 'uploadAll',
  //       url: localStorage.setItem('sequenceData', this.sequenceString),
  //       method: 'POST',
  //     };
  //     this.uploadInput.emit(event);
  //   } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
  //     this.files.push(output.file);
  //   } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
  //     const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
  //     this.files[index] = output.file;
  //     this.processing = true;
  //   } else if (output.type === 'done') {

  //     // // upload list of projects
  //     // if (this.files[0].responseStatus === 201) {
  //     //   this.projectService.addProject(this.files[0].response.project);
  //     // }

  //     // if (!this.files[0].response.message) {
  //     //   this.files[0].response = {
  //     //     message: 'A major problem occurred. Please send your Excel file to an administrator.'
  //     //   };
  //     // }

  //     // if (this.files[0].response.message !== 'File uploaded successfully') {
  //     //   this.openSnackBar(this.files[0].response.message, '');
  //     // } else {
  //     //   this.dontOpenSnackBar(this.files[0].response.message, '');
  //     // }

  //     // // clear record of previous upload
  //     // this.projectService.setUploadResponse(this.files[0].response);
  //     // this.files = [];
  //     // this.processing = false;
  //     // const uploadDiv: any = document.getElementById('file-upload');
  //     // uploadDiv.value = '';
  //     // this.uploadInput.emit({ type: 'removeAll' });

  //   }
  // }

}

