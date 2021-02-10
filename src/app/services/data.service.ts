import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sequence } from '../data/models/sequence';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _httpClient: HttpClient) { }

  getJsonData() {
    const apiUrl = 'assets/sequences.json';
    return this._httpClient.get<Sequence[]>(apiUrl);
  }
  
}

