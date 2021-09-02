import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { FaRedoAlt, FaKey } from 'react-icons/fa';

import COLUMNS from './Table/columns';
import { Container, Content } from './style';
import ResetPassModal from './ResetPassModal';

import Modal from '../../components/Modal';
import UsersTable from '../../components/Table';
import api from '../../services/api';
import GenericModal from '../../components/GenericModal';
import Input from '../../components/Input';
import TopBar from '../../components/DinTopBar';
import TableEditColumn from '../../components/TableEditColumn';
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
    console.log(data);
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

  const columns = useMemo(() => {
    const newCol = {
      Header: 'Editar',
      accessor: 'edit',

      width: 25,
      disableResize: true,
      disableSort: true,

      // eslint-disable-next-line react/prop-types
      Cell: ({ row: { original } }) => {
        return (
          <div
            className="edit-buttons-container"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <button
              type="button"
              className="key-btn"
              onClick={() => {
                setCurrentUser(original);
              }}
            >
              <FaKey />
            </button>
            <button
              type="button"
              className="key-btn"
              onClick={() => {
                setCurrentUser(original);
                setIsResetPasswordModalOpen(true);
              }}
            >
              <FaRedoAlt />
            </button>
            <TableEditColumn
              userRole="admin"
              original={original}
              hasDelete
              onEditClick={() => {}}
              onDeleteClick={() => {
                setCurrentUser(original);
                setDeleteUserConfirmationOpen(true);
              }}
            />
          </div>
        );
      },
    };
    return [...COLUMNS, newCol];
  }, []);

  return (
    <>
      <Container>
        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Accesos</h2>
        <TopBar />
        <Content>
          <UsersTable data={users} columns={columns} />
        </Content>

        {isResetPasswordModalOpen && (
          <ResetPassModal
            onCancelPress={() => setIsResetPasswordModalOpen(false)}
            onEscPress={() => setIsResetPasswordModalOpen(false)}
            onSubmit={(data) => console.log(data)}
          />
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
