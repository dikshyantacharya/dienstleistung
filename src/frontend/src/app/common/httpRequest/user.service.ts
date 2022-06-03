import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
//import { environment } from "../../../environments/environment";
import { User } from '../object/user';
import { Login } from '../object/login';
import { UserUpdate } from '../object/userUpdate';
import {changePassword} from "../object/changePassword";

@Injectable({
  providedIn: 'root',
})
/**
 * api Service zum Backend
 */
export class UserService {
  // Siehe bei environment nach
  private apiServerUrl = 'http://localhost:6060';

  constructor(private http: HttpClient) {}

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiServerUrl, user);
  }

  public getLoginValidation(login: Login): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiServerUrl}/${login.email}/${login.password}`
    );
  }

  public updateUser(email: String, userUpdate: UserUpdate): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/${email}`, userUpdate);
  }

  public changePassword(email: String, changepw: changePassword): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/changepw/${email}`, changepw);
  }

  public getUser(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/${email}`);
  }

  public deleteUser(login: Login): Observable<unknown> {
    const url = `${this.apiServerUrl}/delete`;
    return this.http.post(url, login);
  }
}
