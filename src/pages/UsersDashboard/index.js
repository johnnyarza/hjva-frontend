import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaRedoAlt, FaKey } from 'react-icons/fa';

import COLUMNS from './Table/columns';
import { Container, Content } from './style';
import ResetPassModal from './ResetPassModal';

import Modal from '../../components/Modal';
import UsersTable from '../../components/Table';
import api from '../../services/api';
import TopBar from '../../components/DinTopBar';
import TableEditColumn from '../../components/TableEditColumn';
import RoleModal from './RoleModal';
import utils from '../../utils';
import Spinner from '../../components/Spinner';
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
  const [, setUserRole] = useState('common');
  const formRef = useRef(null);
  const [searchField, setSearchField] = useState('');
  const [users, setUsers] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [deleteUserConfirmationOpen, setDeleteUserConfirmationOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

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
      setIsResetPasswordModalOpen(false);
      toast.error('Erro ao resetar senha');
    }
  };

  const handleDeleteUser = async () => {
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

  const updateRoleHandle = async (data) => {
    try {
      const { data: newUser } = await api.put(`user/role/${currentUser.id}`, {
        role: data.name,
      });

      setUsers(
        users.map((user) => {
          const { id } = user;
          if (id === newUser.id) {
            return newUser;
          }
          return user;
        })
      );

      setIsRoleModalOpen(false);
      toast.success('Acceso actualizado');
    } catch (error) {
      setIsRoleModalOpen(false);
      toast.error('Error al actualizar acceso');
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
                setIsRoleModalOpen(true);
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

  const handleSearch = useCallback(() => {
    let filtered = users;
    if (searchField) {
      const entries = Object.entries(searchField);
      const [field, value] = entries[0];

      if (value) {
        filtered = users.filter((user) => {
          const valueToCompare = user[field];
          if (!valueToCompare) return false;
          if (field === 'updatedAt') {
            const { from, to } = value;
            if (from && to) {
              return utils.isBetweenDates(from, to, valueToCompare);
            }
            return true;
          }

          return valueToCompare.toLowerCase().includes(value.toLowerCase());
        });
      }
      setTimeout(() => setFilteredUsers(filtered), 350);
    }
  }, [users, searchField]);

  useEffect(() => {
    const loadUserRole = async () => {
      const res = await api.get('/user');
      if (res.data) {
        setUserRole(res.data.role);
      }
    };
    loadUserRole();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [handleSearch, users, searchField]);

  useEffect(() => {
    const loadAllUsers = async () => {
      const res = await api.get('/users');
      const { data } = res;
      setUsers(data);
    };
    loadAllUsers();
  }, []);

  useEffect(() => {
    if (users) {
      if (!searchField) setFilteredUsers(users);
      setIsLoading(false);
    }
  }, [users, searchField]);
  return (
    <>
      <Container>
        <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Accesos</h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TopBar
              onSearchInputChange={(data) => setSearchField(data)}
              onCleanSearchButton={() => {
                setFilteredUsers(users);
                setSearchField('');
              }}
              fields={[
                {
                  field: 'name',
                  label: 'Nombre',
                  inputProps: { type: 'text' },
                },
                {
                  field: 'role',
                  label: 'Acceso',
                  inputProps: { type: 'text' },
                },
              ]}
            />
            <Content>
              <UsersTable data={filteredUsers} columns={columns} />
            </Content>
          </>
        )}
      </Container>
      {isResetPasswordModalOpen && (
        <ResetPassModal
          onCancelPress={() => setIsResetPasswordModalOpen(false)}
          onEscPress={() => setIsResetPasswordModalOpen(false)}
          onSubmit={handleUpdatePassword}
        />
      )}

      {deleteUserConfirmationOpen && (
        <Modal
          isOpen
          onCancelClick={() => setDeleteUserConfirmationOpen(false)}
          onOkClick={handleDeleteUser}
          message={`Certeza que deseja deletar usuário: ${currentUser.name} ?`}
          onEscPress={() => setDeleteUserConfirmationOpen(false)}
        />
      )}
      {isRoleModalOpen && (
        <RoleModal
          onEscPress={() => setIsRoleModalOpen(false)}
          onCancelPress={() => setIsRoleModalOpen(false)}
          onSubmit={updateRoleHandle}
          initialData={{ label: currentUser.role }}
        />
      )}
    </>
  );
}
