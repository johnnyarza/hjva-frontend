import NumberFormat from 'react-number-format';

const utils = {
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
