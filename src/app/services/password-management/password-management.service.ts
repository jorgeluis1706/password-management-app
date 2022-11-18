import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

/**
 * Models
 */
import { Password } from "../../models/Password";

@Injectable({
  providedIn: 'root'
})
export class PasswordManagementService {
  constructor(public httpClient: HttpClient) {}

  /**
   * Create password.
   * @param passwordData Password data to create.
   */
  createPassword(passwordData: Password): Observable<Password>{
    return this.httpClient.post<Password>(`${environment.apiUrl}/passwords`, passwordData);
  }

  /**
   * Get all passwords.
   */
  getPasswords(): Observable<Password[]>{
    return this.httpClient.get<Password[]>(`${environment.apiUrl}/passwords`);
  }

  /**
   * Update a password.
   * @param id password ID.
   * @param passwordData new password data.
   */
  updatePassword(id: number | undefined, passwordData: Password){
    return this.httpClient.patch<Password>(`${environment.apiUrl}/passwords/${id}`, passwordData);
  }

  /**
   * Delete password.
   * @param id password ID.
   */
  deletePassword(id: number){
    return this.httpClient.delete<Password>(`${environment.apiUrl}/passwords/${id}`);
  }
}
