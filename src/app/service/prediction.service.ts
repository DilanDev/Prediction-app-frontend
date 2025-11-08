// src/app/services/prediction.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PredictionRequest, PredictionResponse } from '../models/prediction.model';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = 'http://localhost:8000/predict';

  constructor(private http: HttpClient) { }

  predict(params: PredictionRequest): Observable<PredictionResponse> {
    const url = `${this.apiUrl}?sleep=${params.sleep}&screen=${params.screen}&social=${params.social}&exercise=${params.exercise}&stress=${params.stress}&diet=${params.diet}`;

    return this.http.get<PredictionResponse>(url);
  }

  simulateLoading(): Observable<boolean> {
    const loadingTime = Math.floor(Math.random() * 1000) + 1000;
    return of(true).pipe(delay(loadingTime));
  }
}
