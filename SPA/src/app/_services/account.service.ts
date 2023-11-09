import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IUser } from '../_models/iuser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser | null>(null); // BehaviorSubject is a type of Subject, a subject is a special type of observable so you can subscribe to messages like any other observable. The unique features of BehaviorSubject are:
  currentUser$ = this.currentUserSource.asObservable(); // It needs an initial value as it must always return a value on subscription even if it hasn't received a next()

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<IUser>(this.baseUrl + 'account/login', model).pipe(
      map((response: IUser) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user)); // Store user in local storage
          this.currentUserSource.next(user); // Emit the current user
        }
      })
    );
  }

  register(model: any) {  
    return this.http.post<IUser>(this.baseUrl + 'account/register', model).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user)); // Store user in local storage
          this.currentUserSource.next(user); // Emit the current user
        }
      })
    );
  }

  setCurrentUser(user: IUser) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null); // Remove user from local storage
  }
  
}
