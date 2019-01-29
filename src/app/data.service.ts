import { Injectable, Testability } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Request, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient) { }

  API_URL = 'http://localhost:8082/api/';

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
      { responseType: 'text' });
  }

  updateUser(user) {
    return this.http.post(
      this.API_URL + "user.php?function=updateUser",
      user,
      { responseType: 'text' });
  }

  changePassword(user) {
    return this.http.post(
      this.API_URL + "user.php?function=changePassword",
      user,
      { responseType: "text" }
    );
  }

  getAllUsers(companyId) {
    return this.http.post(
      this.API_URL + "user.php?function=getUsers",
      companyId,
      { responseType: 'text' });
  }

  getUserCount(companyId) {
    return this.http.post(
      this.API_URL + "user.php?function=getUserCount",
      companyId,
      { responseType: 'text' });
  }

  updateUsers(user) {
    return this.http.post(
      this.API_URL + "user.php?function=updateUsers",
      user,
      { responseType: 'text' }
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

  deleteBorger(ids) {
    return this.http.post(
      this.API_URL + "borger.php?function=deleteBorger",
      ids,
      { responseType: 'text' }
    );
  }

  createBorger(borger) {
    return this.http.post(
      this.API_URL + "borger.php?function=createBorger",
      borger,
      { responseType: "text" }
    );
  }

  registerTime(registrationForm) {
    return this.http.post(
      this.API_URL + "registration.php?function=registerTime",
      registrationForm,
      { responseType: 'text' }
    );
  }

  getMyRegistrations(userId) {
    return this.http.post(
      this.API_URL + "registration.php?function=getMyRegistrations",
      userId,
      { responseType: 'text' }
    );
  }

  downloadMyActivity(data) {
    return this.http.post(
      this.API_URL + "download.php?function=myActivity",
      data,
      { responseType: 'blob' }
    );
  }

}
