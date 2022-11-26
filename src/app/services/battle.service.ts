import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespostaClass } from '../classes/resposta-class';
import { ConfigClass } from '../classes/config-class';

const httpOpcoes = {
  headers: new Headers({
    'Content-type': 'application/json'
  })
}
const path = `${ConfigClass.getUrlApi().toString()}/` 

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<HttpResponse<RespostaClass>> {
    return this.http.get<RespostaClass>(
      `${path}/monsters`, {observe: 'response'}
    );
  } 

  getId(id: number): Observable<HttpResponse<RespostaClass>> {
    return this.http.get<RespostaClass>(
      `${path}/monsters/${id}`, {observe: 'response'}
    );
  } 

  postBattle(body: any): Observable<HttpResponse<RespostaClass>> {
    return this.http.post<RespostaClass>(
      `${path}/battle`, body, {observe: 'response'}
    );
  }
}