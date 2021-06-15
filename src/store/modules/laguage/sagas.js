import { all, takeLatest, select } from 'redux-saga/effects';
import api from '../../../services/api';

export function changeLocale({ payload }) {
  try {
    const { locale } = payload;
    if (locale) {
      api.defaults.headers.locale = locale;
    }
  } catch (error) {
    console.log(error);
  }
}

export function* setLocale({ payload }) {
  const { locale } = yield select((state) => state.locale);

  if (payload) {
    api.defaults.headers.locale = payload;
  } else {
    api.defaults.headers.locale = locale;
  }
}

export default all([
  takeLatest('@language/CHANGE_LOCALE', changeLocale),
  takeLatest('persist/REHYDRATE', setLocale),
]);
