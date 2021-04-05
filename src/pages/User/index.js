import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import computerName from 'computer-name';
import { updateUserRequest } from '../../store/modules/user/actions';

import AuthLayout from '../_layouts/Auth';
import SideBar from '../../components/SideBar';
import { Container, Content } from './style';

import userPath from '../../assets/user.svg';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('Insira um e-mail válido'),
  password: Yup.string(),
  confirmPassword: Yup.string()
    .when('password', (password, field) => (password
      ? field
        .required('Confirmção é obrigatório')
        .min(6, 'Senha deve conter no mínimo 6 caracteres')
      : field))
    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
  oldPassword: Yup.string().when('password', (password, field) => (password
    ? field
      .required('Senha atual é obrigatória')
      .notOneOf([Yup.ref('confirmPassword')], 'Senha atual é igual a nova')
    : field)),
});

export default function User() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [nameInputValue, setNameInputValue] = useState(
    user.name ? user.name : '',
  );
  const [emailInputValue, setEmailInputValue] = useState(
    user.email ? user.email : '',
  );

  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    setEmailInputValue(user.email ? user.email : '');
    setNameInputValue(user.name ? user.name : '');
  }, [user]);

  const handleNewPasswordChange = ({ target }) => {
    const { value } = target;
    setIsChangingPassword(!!value);
  };

  const AvatarImage = () => {
    if (user.avatar) {
      return <img src={userPath} alt="user" />;
    }
    return <img src={userPath} alt="user" />;
  };

  function clean(obj) {
    const propNames = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < propNames.length; i++) {
      const propName = propNames[i];
      if (!obj[propName]) {
        delete obj[propName];
      }
    }
    return obj;
  }

  const handleSubmit = async ({
    name,
    email,
    password,
    confirmPassword,
    oldPassword,
  }) => {
    const body = clean({
      name,
      email,
      password,
      confirmPassword,
      oldPassword,
    });
    dispatch(updateUserRequest(body));
  };

  return (
    <>
      <SideBar />
      <Container>
        <h1>Editar usuário</h1>
        <Content isChangingPassword={isChangingPassword}>
          <AuthLayout>
            <Form onSubmit={handleSubmit} schema={schema}>
              {AvatarImage()}
              <Input
                name="name"
                type="text"
                placeholder="Seu nome"
                value={nameInputValue}
                onChange={(data) => { setNameInputValue(data.target.value); }}
              />
              <Input
                name="email"
                type="email"
                placeholder="Seu e-mail"
                value={emailInputValue}
                onChange={(data) => { setEmailInputValue(data.target.value); }}
              />
              <Input
                name="password"
                type="password"
                placeholder="Nova senha"
                onChange={(data) => handleNewPasswordChange(data)}
              />
              {isChangingPassword && (
                <>
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirme sua senha"
                  />
                  <Input
                    name="oldPassword"
                    type="password"
                    placeholder="Senha atual"
                  />
                </>
              )}

              <button type="submit">Atualizar</button>
            </Form>
          </AuthLayout>
        </Content>
      </Container>
    </>
  );
}
