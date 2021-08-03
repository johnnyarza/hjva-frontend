import { getTime, startOfDay, parseISO, isDate } from 'date-fns';

const utils = {
  isBetweenDates: (fromDate, toDate, dateToCompare) => {
    const parsedFrom = getTime(startOfDay(parseISO(fromDate)));
    const parsedTo = getTime(startOfDay(parseISO(toDate)));
    const parsedDate = getTime(
      startOfDay(
        isDate(dateToCompare) ? dateToCompare : parseISO(dateToCompare)
      )
    );
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
  getArrayNewIndex: (moveBy = 1, array, currentIndex = 0) => {
    if (array.length > 0) {
      let newIndex = currentIndex + moveBy;
      if (newIndex > array.length - 1) newIndex = 0;
      if (newIndex < 0) newIndex = array.length - 1;
      return newIndex;
    }
    return currentIndex;
  },
};

export default utils;
