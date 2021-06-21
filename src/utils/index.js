import { getTime, startOfDay, parseISO } from 'date-fns';

const utils = {
  isBetweenDates: (fromDate, toDate, dateToCompare) => {
    const parsedFrom = getTime(startOfDay(parseISO(fromDate)));
    const parsedTo = getTime(startOfDay(parseISO(toDate)));
    const parsedDate = getTime(startOfDay(parseISO(dateToCompare)));
    const interval = [parsedFrom, parsedTo];
    interval.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }

      return 0;
    });

    return interval[1] >= parsedDate && interval[0] <= parsedDate;
  },
  clean: (obj) => {
    const propNames = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < propNames.length; i++) {
      const propName = propNames[i];
      if (!obj[propName]) {
        delete obj[propName];
      }
    }
    return obj;
  },

  ciEquals: (a, b, usage = 'search') => {
    return typeof a === 'string' && typeof b === 'string'
      ? a.localeCompare(b, undefined, { sensitivity: 'base', usage }) === 0
      : a === b;
  },
  naturalSortCompare: (a, b) =>
    a.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: 'base',
    }),
};

export default utils;
