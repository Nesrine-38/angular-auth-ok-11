import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './entities';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged = localStorage.getItem('token')?true:false;
  constructor(private http:HttpClient) { }

  addUser(user:User){
    return this.http.post<User>('http://127.0.0.1:8000/api/user', user); //<on met ce que le serveur nous retourne (type)>
 }

 login(user:User) {
  return this.http.post<{token:string}>('http://127.0.0.1:8000/api/login', user).pipe(
    tap(data => {
      localStorage.setItem('token', data.token);
      this.logged = true;
    })
  );
}

getUser() {
  return this.http.get('http://127.0.0.1:8000/api/protected');
}

logout() {
  localStorage.removeItem('token');
  this.logged =false;
}

}
