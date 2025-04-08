import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Modele {
  id: number;
  title: string;
  description: string;
  contentTemplate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModeleService {
  private readonly apiUrl = 'http://localhost:8080/api/templates';

  constructor(private readonly http: HttpClient) {}

  getAllModeles(): Observable<Modele[]> {
    return this.http.get<Modele[]>(this.apiUrl);
  }

  getTemplateById(id: number): Observable<Modele> {
    return this.http.get<Modele>(`${ this.apiUrl }/${ id }`);
  }

}
