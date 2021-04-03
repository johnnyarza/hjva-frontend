import React from 'react';

import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';
import AuthLayout from '../_layouts/Auth';
import { store } from '../../store';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().min(6).required('Senha é obrigatória'),
});

const SignIn = () => {
  const { auth } = store.getState();
  const history = useHistory();
  const dispatch = useDispatch();

  if (auth.token) {
    return <Redirect to="/dashboard" />;
  }

  const handleSubmit = ({ email, password }) => {
    dispatch(signInRequest(email, password, history));
  };

  return (
    <AuthLayout>
      <Form schema={schema} onSubmit={handleSubmit}>
        <h1>Fazer Login</h1>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <button type="submit">Acessar</button>
        <Link to="/register">Criar conta</Link>
      </Form>
    </AuthLayout>
  );
};
export default SignIn;
