import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { API_BASE_URL } from "../../root/tokens/tokens";
import { ParamsUrl } from "../models/params-url.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, @Inject(API_BASE_URL) private baseUrl?: string) {}

  get<T>(url: string, params: ParamsUrl = {}): Observable<T> {
    const paramsToSend: HttpParams = new HttpParams({
      fromObject: params
    });
    return this.http.get<T>(`${this.baseUrl}/${url}`, { params: paramsToSend });
  }
  post(url: string, body: any, params: ParamsUrl = {}) {
    const paramsToSend: HttpParams = new HttpParams({
      fromObject: params
    });
    return this.http.post(`${this.baseUrl}/${url}`, body, { params: paramsToSend });
  }
  put(url: string, body: any, params: ParamsUrl = {}) {
    const paramsToSend: HttpParams = new HttpParams({
      fromObject: params
    });
    return this.http.put(`${this.baseUrl}/${url}`, body, { params: paramsToSend });
  }
  delete(url: string, params: ParamsUrl = {}) {
    const paramsToSend: HttpParams = new HttpParams({
      fromObject: params
    });
    return this.http.delete(`${this.baseUrl}/${url}`, { params: paramsToSend });
  }
}
