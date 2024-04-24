import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: false,
  BASE_URL: 'http://localhost:8080',
  BASE_TOKEN: '/api',
  USER_URL: '/api/user',
};
export const endpoints = {
  LOGIN: '/login',
  REGISTER: '/register',
  TOKEN: '/token',
};

export const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  }),
};

export const roles = {
  ADMIN: 'ADMIN',
  USER: 'USER'
}
  