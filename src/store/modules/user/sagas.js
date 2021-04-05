import {
  all, takeLatest, call, put,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { updateUserSuccess } from './actions';

import api from '../../../services/api';

export function* updateUser({ payload }) {
  try {
    const { body } = payload;
    const res = yield call(api.put, '/user', body);
    yield put(updateUserSuccess(res.data));
    toast.success('Dados atualizados');
  } catch (error) {
    toast.error('Erro ao atualizar os dados');
  }
}
export default all([takeLatest('@user/UPDATE_USER_REQUEST', updateUser)]);
