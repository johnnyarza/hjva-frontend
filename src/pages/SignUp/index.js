import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { useHistory, Redirect } from 'react-router-dom';
import { signUpRequest } from '../../store/modules/auth/actions';

import AuthLayout from '../_layouts/Auth';

import { store } from '../../store';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha deve conter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
  confirmPassword: Yup.string()
    .min(6, 'Senha deve conter no mínimo 6 caracteres')
    .required('Senha é obrigatória')
    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { signed } = store.getState().auth;

  if (signed) {
    return <Redirect to="/dashboard" />;
  }

  const handleSubmit = useCallback(({ email, password, name }) => {
    dispatch(signUpRequest(name, email, password));
    history.push('/dashboard');
  }, []);

  return (
    <AuthLayout>
      <Form schema={schema} onSubmit={handleSubmit}>
        <h1>Criar conta</h1>
        <Input name="name" type="text" placeholder="Seu nome" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
        />
        <button type="submit">Criar</button>
      </Form>
    </AuthLayout>
  );
}
