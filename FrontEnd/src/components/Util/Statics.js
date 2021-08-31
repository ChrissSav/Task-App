import moment from 'moment';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';

class Statics {
  static ACCESS_TOKEN = 'ACCESS_TOKEN';
  static REFRESH_TOKEN = 'REFRESH_TOKEN';
  static API_URL = 'http://localhost:8080/api';
  static ERROR_API_UNREACHABLE = 'ERROR_API_UNREACHABLE';

  static TASK_DATE_FORMAT = 'MMM Do YYYY , h a';

  static getDateFromTimestamp(timestamp, format) {
    var date = new Date(timestamp * 1000);
    return moment(date).format(format);
  }

  static wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms * 1000) {
      end = new Date().getTime();
    }
  }

  static toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }

  static saveAccessRefreshToken(accessToken, refreshToken) {
    cookie.save(Statics.ACCESS_TOKEN, accessToken, {
      path: '/',
      expires: new Date(jwt_decode(accessToken).exp * 1000),
    });
    cookie.save(Statics.REFRESH_TOKEN, refreshToken, {
      path: '/',
      expires: new Date(jwt_decode(refreshToken).exp * 1000),
    });
  }
}

export default Statics;
