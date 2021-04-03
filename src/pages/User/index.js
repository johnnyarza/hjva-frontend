import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector } from 'react-redux';
import { MdAccountCircle } from 'react-icons/md';

import AuthLayout from '../_layouts/Auth';
import SideBar from '../../components/SideBar';
import { Container, Content } from './style';

import userPath from '../../assets/user.svg';

export default function User() {
  const { user } = useSelector((state) => state.user);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

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

  return (
    <>
      <SideBar />
      <Container>
        <Content>
          <h1>Editar usuário</h1>
          <AuthLayout>
            <Form>
              {AvatarImage()}
              <Input
                name="name"
                type="text"
                placeholder="Seu nome"
                value={user.name ? user.name : null}
              />
              <Input
                name="email"
                type="email"
                placeholder="Seu e-mail"
                value={user.email ? user.email : null}
              />
              <Input
                name="newPassword"
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
                    name="password"
                    type="password"
                    placeholder="Confirme sua senha"
                  />
                </>
              )}

              <button type="submit">Criar</button>
            </Form>
          </AuthLayout>
        </Content>
      </Container>
    </>
  );
}
