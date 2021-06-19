import React, { useState, useCallback, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';

import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import Modal from '../../components/Modal';

import {
  Container,
  Content,
  GridContainer,
  SelectContainer,
  NameContainer,
} from './style';

import api from '../../services/api';
import GenericModal from '../../components/GenericModal';
import Input from '../../components/Input';
/* eslint-disable */
const formSchema = Yup.object().shape({
  password: Yup.string().required('Nova senha é obrigatória'),
  confirmPassword: Yup.string()
    .when('password', (password, field) =>
      password
        ? field
          .required('Confirmação é obrigatório')
          .min(6, 'Senha deve conter no mínimo 6 caracteres')
        : field
    )
    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
});
/* eslint-enable */

export default function UsersDashboard() {
  const formRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [deleteUserConfirmationOpen, setDeleteUserConfirmationOpen] = useState(
    false
  );

  const [currentUser, setCurrentUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(
    false
  );

  const loadAllUsers = useCallback(async () => {
    const res = await api.get('/users');
    const { data } = res;
    setUsers(data);
  }, []);

  const loadAllRoles = useCallback(async () => {
    const res = await api.get('/roles');
    const { data } = res;
    setRoles(data);
  }, []);

  useEffect(() => {
    loadAllUsers();
    loadAllRoles();
  }, [loadAllUsers, loadAllRoles]);

  const handleSelectChange = useCallback(
    (selectedUser, role) => {
      try {
        api.put(`/user/role/${selectedUser.id}`, { role });

        const updatedUsers = users.map((user) => {
          if (user.id === selectedUser.id) {
            const newUser = { ...user };
            newUser.role = role;
            return newUser;
          }
          return user;
        });
        setUsers(updatedUsers);
      } catch (error) {
        toast.error('Erro ao atualizar privilégios');
      }
    },
    [users]
  );

  const handleUpdatePassword = async (data) => {
    try {
      await formSchema.validate(data, {
        abortEarly: false,
      });
      await api.put(`/user/password/${currentUser.id}`, data);
      setIsResetPasswordModalOpen(false);
      toast.success('Senha resetada com sucesso');
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
      toast.error('Erro ao resetar senha');
    }
  };

  const deleteHandle = async () => {
    try {
      await api.delete(`/user/${currentUser.id}`);
      const newUsers = users.filter((user) => user.id !== currentUser.id);
      setUsers(newUsers);
      setDeleteUserConfirmationOpen(false);
      toast.success('Usuário deletado');
    } catch (err) {
      const text = err.response?.data.message || err.message;
      toast.error(text);
    }
  };

  const generateGridRows = useCallback(() => {
    if (users.length && users.length > 0 && roles?.length > 0) {
      const options = roles.map((role) => <option>{role.name}</option>);
      const rows = users.map((user) => (
        <>
          <NameContainer key={`nameContainer-${user.id}`}>
            <div>{user.name}</div>
          </NameContainer>
          <SelectContainer key={`selectContainer-${user.id}`}>
            <select
              key={user.id}
              onChange={({ target }) => handleSelectChange(user, target.value)}
              defaultValue={user.role}
            >
              {options}
            </select>
          </SelectContainer>
          <button
            key={`b-${user.id}`}
            type="button"
            className="reset-password"
            onClick={() => {
              setCurrentUser(user);
              setIsResetPasswordModalOpen(true);
            }}
          >
            Resetar Senha
          </button>
          <button
            key={`b1-${user.id}`}
            className="delete-user-button"
            onClick={() => {
              setCurrentUser(user);
              setDeleteUserConfirmationOpen(true);
            }}
            type="button"
          >
            <MdDelete
              key={`ic-${user.id}`}
              style={{ minHeight: '20px', width: 'auto' }}
            />
          </button>
        </>
      ));
      return rows;
    }
    return <></>;
  }, [users, roles, handleSelectChange]);

  return (
    <>
      <Container>
        <Content>
          <GridContainer style={{ gridTemplateColumns: '45% 20% 25% 10%' }}>
            <div>
              <h1>Usuário</h1>
            </div>
            <div className="access-title">
              <h1>Acesso</h1>
            </div>
            <div />
            <div />
            {generateGridRows()}
          </GridContainer>
        </Content>

        {isResetPasswordModalOpen && (
          <GenericModal
            isOpen
            onEscPress={() => setIsResetPasswordModalOpen(false)}
          >
            <h1 style={{ marginBottom: '15px' }}>Resetar Senha</h1>
            <Form
              ref={formRef}
              onSubmit={handleUpdatePassword}
              schmea={formSchema}
            >
              <Input
                type="password"
                hasBorder={false}
                name="password"
                placeholder="Nova senha"
                onChange={() => formRef.current.setFieldError('password', '')}
              />
              <Input
                type="password"
                hasBorder={false}
                name="confirmPassword"
                placeholder="Confirmar senha"
                onChange={() =>
                  formRef.current.setFieldError('confirmPassword', '')
                }
              />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  type="submit"
                  name="resetPassword"
                  className="form-ok-button"
                >
                  Atualizar
                </button>
                <button
                  className="form-cancel-button"
                  type="button"
                  name="cancel"
                  onClick={() => setIsResetPasswordModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </Form>
          </GenericModal>
        )}
      </Container>
      {deleteUserConfirmationOpen && (
        <Modal
          isOpen
          onCancelClick={() => setDeleteUserConfirmationOpen(false)}
          onOkClick={deleteHandle}
          message={`Certeza que deseja deletar usuário: ${currentUser.name} ?`}
          onEscPress={() => setDeleteUserConfirmationOpen(false)}
        />
      )}
    </>
  );
}
