import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { updateUserRequest } from '../../store/modules/user/actions';

import AuthLayout from '../_layouts/Auth';
import SideBar from '../../components/SideBar';
import Input from '../../components/Input';
import { Container, Content } from './style';
import AvatarInput from './AvatarInput';

import userPath from '../../assets/user.svg';

import api from '../../services/api';

/* eslint-disable */
const schema = Yup.object().shape({
  name: Yup.string().min(1, 'Nome não pode ser vazio'),
  email: Yup.string().email('Insira um e-mail válido'),
  password: Yup.string(),
  confirmPassword: Yup.string()
    .when('password', (password, field) =>
      password
        ? field
          .required('Confirmação é obrigatório')
          .min(6, 'Senha deve conter no mínimo 6 caracteres')
        : field
    )
    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
  oldPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
        .required('Senha atual é obrigatória')
        .notOneOf([Yup.ref('confirmPassword')], 'Senha atual é igual a nova')
      : field
  ),
});
/* eslint-enable */

export default function User() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState({});
  const { user } = useSelector((state) => state.user);

  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    formRef.current.setData({ name: user.name, email: user.email });
  }, [user]);

  useEffect(() => {
    const loadAvatar = async () => {
      const { data } = await api.get('/user');
      const { avatar: value } = data;
      if (value) {
        setAvatar(value);
      }
    };
    loadAvatar();
  }, []);

  const handleNewPasswordChange = ({ target }) => {
    const { value } = target;
    setIsChangingPassword(!!value);
    if (!value) {
      formRef.current.setErrors({
        confirmPassword: '',
        oldPassword: '',
      });
    }
  };

  const AvatarImage = () => {
    if (avatar) {
      return (
        <>
          <input type="file" />
          <img
            className="avatar"
            src={avatar.url}
            alt="user"
            style={{ marginBottom: '15px' }}
          />
        </>
      );
    }
    return <img src={userPath} alt="user" style={{ marginBottom: '15px' }} />;
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

  const handleSubmit = async (data) => {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(updateUserRequest(clean(data)));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };

  return (
    <>
      <Container>
        <h1>Editar usuário</h1>
        <Content isChangingPassword={isChangingPassword}>
          <AuthLayout>
            <AvatarInput />
            <Form onSubmit={handleSubmit} schema={schema} ref={formRef}>
              <Input name="name" type="text" placeholder="Seu nome" />
              <Input name="email" type="email" placeholder="Seu e-mail" />
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
                    onChange={() =>
                      formRef.current.setFieldError('confirmPassword', '')
                    }
                  />
                  <Input
                    name="oldPassword"
                    type="password"
                    placeholder="Senha atual"
                    onChange={() =>
                      formRef.current.setFieldError('oldPassword', '')
                    }
                  />
                </>
              )}

              <button type="submit">Atualizar</button>
            </Form>
          </AuthLayout>
        </Content>
      </Container>
      <SideBar />
    </>
  );
}
