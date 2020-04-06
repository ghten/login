import { HttpHeaders } from '@angular/common/http';

export const cfg = {
  loginUrl: 'oauth/token',
  user: 'user',

  headerLogin: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
  }),
  headerDefault: new HttpHeaders({
    'Content-Type':  'application/json',
    'X-Requested-With': 'XMLHttpRequest',
}),
  time: '259200000',
  url_backend: 'http://localhost:8081/login/public/api/'
};
