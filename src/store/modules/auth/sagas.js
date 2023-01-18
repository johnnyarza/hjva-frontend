import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { signInSuccess } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, '/session', { email, password });

    const { token, user } = response.data;

    if (!user) {
      console.tron.error('Usuário não encontrado');
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
    toast.success('Login efetuado');
    payload.history.push('/dashboard');
  } catch (err) {
    toast.error('Falha no login, verifique seus dados!');
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, '/user', { name, email, password });
    toast.success('Conta Criada com sucesso');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut({ payload }) {
  const { history } = payload;
  api.defaults.headers.Authorization = `Bearer `;
  history.push('/');
  toast.success('Logout com sucesso');
}
export default all([
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
