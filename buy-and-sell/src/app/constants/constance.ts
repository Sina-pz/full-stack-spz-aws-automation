import * as moment from 'moment';

export function getTodayDate() {
  return moment().format();
}
