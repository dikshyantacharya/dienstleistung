import { Injectable } from '@angular/core';
import { Service } from '../object/service';
import { Observable } from 'rxjs';
//import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Dienstleistung } from '../object/dienstleistung';
import { User } from '../object/user';

@Injectable({
  providedIn: 'root',
})
export class DienstleistungService {
  private apiServerUrl = 'https://dienstleistung.herokuapp.com';

  constructor(private http: HttpClient) {}

  public createDienstleistung(dienstleistung: Service): Observable<Service> {
    const url = `${this.apiServerUrl}/service/create`;
    return this.http.post<Service>(url, dienstleistung);
  }

  public getDienstleistungById(id: number): Observable<Dienstleistung> {
    const url = `${this.apiServerUrl}/job/${id}`;
    return this.http.get<Dienstleistung>(url);
  }

  public getMyJobs(userEmail: String): Observable<Dienstleistung[]> {
    const url = `${this.apiServerUrl}/service/my/${userEmail}`;
    return this.http.get<Dienstleistung[]>(url);
  }

  getAllJobs(userEmail: String): Observable<Dienstleistung[]> {
    const url = `${this.apiServerUrl}/service/other/${userEmail}`;
    return this.http.get<Dienstleistung[]>(url);
  }

  updateDienstleistung(
    dienstleistung: Dienstleistung
  ): Observable<Dienstleistung> {
    const url = `${this.apiServerUrl}/service/update`;
    return this.http.put<Dienstleistung>(url, dienstleistung);
  }

  deleteDienstleistung(id: number): Observable<any> {
    const url = `${this.apiServerUrl}/service/delete/${id}`;
    return this.http.delete(url);
  }

  getUserByServiceId(serviceId: number): Observable<User> {
    const url = `${this.apiServerUrl}/service/user/${serviceId}`;
    return this.http.get<User>(url);
  }
}
