import { Injectable } from '@angular/core';
import { ApiService } from "../../core/services/api.service";
import { Observable } from "rxjs";
import { Person } from "../models/person.model";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private api: ApiService) { }


 getPerson(id: number): Observable<Person> {
    return this.api.get(`/people/${id}`);
  }
}
