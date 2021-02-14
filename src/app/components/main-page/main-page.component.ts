import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Sequence } from 'src/app/data/models/sequence';
import { IncomingJson } from 'src/app/data/models/incomingJson';
import { FileUploader, FileItem, ParsedResponseHeaders, FileLikeObject } from 'ng2-file-upload';

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
  errorMessage!: string;
  file: any;
  uploadedFile!: any;

  public uploader: FileUploader = new FileUploader({
    url: '',
    disableMultipart : false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['image', 'pdf']
  });  

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
    if (localStorage.getItem('uploadedSequences')) {
      const tempData = JSON.parse(localStorage.getItem('uploadedSequences') || '{}');
      tempData.sequences.forEach((sequence: any) => {
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

  fileChanged(e: any) {
    this.file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.uploadedFile = fileReader.result;
      this.setUploadedFile(this.uploadedFile) 
    }
    fileReader.readAsText(this.file);
  } 

  setUploadedFile(file: string) {
    let uploadedSequences: any[] = [];
    this.uploadedFile = (JSON.parse(this.uploadedFile))
    if (localStorage.getItem('uploadedSequences')) {
      const tempData = JSON.parse(localStorage.getItem('uploadedSequences') || '{}');
      tempData.sequences.forEach((sequence: any) => {
        uploadedSequences.push(sequence);
      })
    }
    this.uploadedFile.sequences.forEach((sequence: any) => {
      uploadedSequences.push(sequence);
    })
    localStorage.setItem('uploadedSequences', file);
    this.getData();
  }
}


