import { getTime, startOfDay, parseISO, isDate, isAfter } from 'date-fns';

const utils = {
  isDateAfter: (date, dateToCompare) => {
    const parsedDate = getTime(startOfDay(date));
    const parsedDateToCompare = getTime(startOfDay(dateToCompare));
    return isAfter(parsedDate, parsedDateToCompare);
  },
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
  managePrintURL: (
    suffixURL = 'category',
    searchField,
    urlState,
    locale = '',
    baseURL = `${process.env.REACT_APP_API_BASE_URL}report/`
  ) => {
    const [, setPrintURL] = urlState;
    let url = baseURL + suffixURL;

    if (searchField) {
      const entries = Object.entries(searchField);
      const [field, value] = entries[0];

      if (value) {
        switch (field) {
          case 'updatedAt': {
            url = url.concat(
              `${url.includes('?') ? '&' : '?'}${'updated_at'}=${JSON.stringify(
                value
              )}`
            );
            break;
          }
          case 'loadedAt': {
            url = url.concat(
              `${url.includes('?') ? '&' : '?'}${'loaded_at'}=${JSON.stringify(
                value
              )}`
            );
            break;
          }
          case 'sampledAt': {
            url = url.concat(
              `${url.includes('?') ? '&' : '?'}${'sampled_at'}=${JSON.stringify(
                value
              )}`
            );
            break;
          }
          default:
            url = url.concat(
              `${url.includes('?') ? '&' : '?'}${field}=${value}`
            );
        }
      }
    }

    if (locale) {
      url = url.concat(`${url.includes('?') ? '&' : '?'}locale=${locale}`);
    }
    setPrintURL(url);
  },
  pagesAccess: {
    users: ['admin'],
    stockToSell: ['admin', 'escritorio', 'vendedor'],
    compressionTestHome: ['escritorio', 'admin', 'laboratorio'],
    compressionTestId: ['escritorio', 'admin', 'laboratorio'],
    clients: ['escritorio', 'admin', 'vendedor', 'estoque'],
    providers: ['escritorio', 'admin', 'vendedor', 'estoque'],
    category: ['escritorio', 'admin', 'vendedor', 'estoque'],
    stock: ['escritorio', 'admin', 'estoque'],
    measurements: ['escritorio', 'admin', 'estoque'],
    concreteDesigns: ['escritorio', 'admin', 'laboratorio'],
    materialTransactions: ['escritorio', 'admin', 'estoque'],
  },
};

export default utils;
