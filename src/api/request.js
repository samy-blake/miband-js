'use strict';

class Request {
  constructor() {
    this.rootuUrl = 'http://localhost:3000/api/';
    this.token = false;
  }

  _response(data) {
    console.log(data);
    return data;
  }

  _call(subUrl, methode = 'POST', data = false) {
    const request = new XMLHttpRequest();
    const promise = (resolve, reject) => {

      request.addEventListener("load", (evt) => {
        resolve(this._response(evt));
      });

      request.addEventListener("error", (err) => {
        reject(err);
      });

      request.setRequestHeader(
        'Content-Type', 'application/json'
      );
      
      if(this.token) {
        request.setRequestHeader(
          'x-lauftracker-authtoken', this.token
        );
      }

      request.open(methode, this.rootuUrl + subUrl);
      if(data) {
        request.send(data);
      }
      request.send();
    }

    return new Promise(promise);
  }

  setToken(token) {
    this.token = token;
  }

  login(email, password) {
    let data = {
      email: email,
      password: password
    };
    return this._call('auth/login', 'POST', data);
  }

  register(email, password, firstname, lastname) {
    let data = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname
    };
    return this._call('auth/register', 'POST', data);
  }
}