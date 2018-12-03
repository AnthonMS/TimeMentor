import { Injectable, Testability } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Request, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient) { }

  API_URL = 'http://localhost/TimeReg-App/TimeReg/src/services/api/';

  /*getUsers() {
    return this.http.get('http://jsonplaceholder.typicode.com/users');
  }

  getUser(userId) {
    return this.http.get('http://jsonplaceholder.typicode.com/users/' + userId);
  }

  getPosts() {
    return this.http.get('http://jsonplaceholder.typicode.com/posts');
  }*/


  getUsersNew() {
    return this.http.get(this.API_URL + "test.php");
  }

  login(user) {
    return this.http.post(
      this.API_URL + "login.php?function=login",
      user,
      { responseType: 'text' });
  }


  // This is called to check whether or not a token is already in the database. If it is, it is called again with a new token.
  checkToken(user) {
    return this.http.post(
      this.API_URL + "login.php?function=checkToken",
      user,
      { responseType: 'text' });
  }

  getUserWithToken(token) {
    return this.http.post(
      this.API_URL + "login.php?function=getUser",
      token,
      { responseType: 'json' });
  }

  updateUser(user) {
    return this.http.post(
      this.API_URL + "user.php?function=updateUser",
      user,
      { responseType: 'json' });
  }

  getAllUsers(companyId) {
    return this.http.post(
      this.API_URL + "user.php?function=getUsers",
      companyId,
      { responseType: 'json' });
  }

  getUserCount(companyId) {
    return this.http.post(
      this.API_URL + "user.php?function=getUserCount",
      companyId,
      { responseType: 'json' });
  }

  updateUsers(user) {
    return this.http.post(
      this.API_URL + "user.php?function=updateUsers",
      user,
      { responseType: 'json' }
    );
  }

  deleteUser(user) {
    return this.http.post(
      this.API_URL + "user.php?function=deleteUser",
      user,
      { responseType: 'text' }
    );
  }

  createUser(user) {
    return this.http.post(
      this.API_URL + "user.php?function=createUser",
      user,
      { responseType: 'json' }
    );
  }

  checkUsername(username) {
    return this.http.post(
      this.API_URL + "user.php?function=checkUsername",
      username,
      { responseType: 'text' }
    );
  }

  getBorgere(companyId) {
    return this.http.post(
      this.API_URL + "borger.php?function=getBorgere",
      companyId,
      { responseType: 'text' }
    );
  }

  registerTime(registrationForm) {
    return this.http.post(
      this.API_URL + "registration.php?function=registerTime",
      registrationForm,
      { responseType: 'text' }
    );
  }

}
