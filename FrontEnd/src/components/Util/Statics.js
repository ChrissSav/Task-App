import moment from 'moment';

class Statics {
  static ACCESS_TOKEN = 'ACCESS_TOKEN';
  static REFRESH_TOKEN = 'REFRESH_TOKEN';

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
}

export default Statics;
