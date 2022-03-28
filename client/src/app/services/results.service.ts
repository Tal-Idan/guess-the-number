import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from './../Result';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ResultsService {
  private apiUrl = 'https://num-guess-srv.herokuapp.com/api/v1/users'

  constructor(private http: HttpClient) { }

  getScores(): Observable<Result[]> {
    return this.http.get<Result[]>(this.apiUrl)
  }

  saveScores(result: Result): Observable<Result> {
    const url = `${this.apiUrl}/saveresults`
    return this.http.post<Result>(url, result, httpOptions)
  }

}
