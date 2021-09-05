import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import SearchbleList from '../../../components/SearchbleList';
import GenericModal from '../../../components/GenericModal';
import Label from '../../../components/Label';

import { Container, Content, FormButtonsContainer } from './styles';
import api from '../../../services/api';
import Spinner from '../../../components/Spinner';

function RoleModal({ onEscPress, onCancelPress, onSubmit, initialData }) {
  const [currentRole, setCurrentRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [roles, setRoles] = useState('');
  const formRef = useRef(null);

  const loadAllRoles = useCallback(async () => {
    const res = await api.get('/roles');
    const { data } = res;
    setRoles(data);
  }, []);

  useEffect(() => {
    if (initialData && roles) {
      const { label } = initialData;
      const { id } = roles.find(({ name }) => name === label);
      setCurrentRole({ label, value: id });
    }
  }, [initialData, roles]);

  useEffect(() => {
    if (currentRole) {
      formRef.current.setData({
        role: { ...currentRole },
      });
      setIsLoading(false);
    }
  }, [currentRole]);

  useEffect(() => {
    loadAllRoles();
  }, [loadAllRoles]);

  const formatRoles = () => {
    if (roles) {
      return roles.map(({ id, name }) => ({ value: id, label: name }));
    }
    return [];
  };

  const handleSubmit = async (data) => {
    try {
      const schema = Yup.object().shape({
        role: Yup.object()
          .typeError('Seleccionar acceso')
          .required('Seleccionar acceso'),
      });
      await schema.validate(data, { abortEarly: false });
      const { value, label } = data.role;
      formRef.current.setErrors({});
      setIsLoading(true);
      onSubmit({ id: value, name: label });
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else {
        toast.error('Erro ao criar o produto');
      }
    }
  };
  return (
    <GenericModal onEscPress={() => onEscPress()} isOpen>
      <Container>
        <Content>
          <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
            Editar Acceso
          </h2>
          {!roles ? (
            <Spinner />
          ) : (
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Label htmlFor="role" label="Acceso">
                <SearchbleList
                  id="role"
                  name="role"
                  values={formatRoles()}
                  onChange={() => formRef.current.setFieldError('role', '')}
                  isDisabled={isLoading}
                />
              </Label>
              {isLoading ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px',
                  }}
                >
                  <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    height={30}
                    width={30}
                  />
                </div>
              ) : (
                <FormButtonsContainer>
                  <button type="submit" className="ok-btn">
                    ok
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => onCancelPress()}
                  >
                    Cancelar
                  </button>
                </FormButtonsContainer>
              )}
            </Form>
          )}
        </Content>
      </Container>
    </GenericModal>
  );
}

export default RoleModal;

RoleModal.propTypes = {
  onEscPress: PropTypes.func,
  onCancelPress: PropTypes.func,
  onSubmit: PropTypes.func,
  initialData: PropTypes.shape({
    label: PropTypes.string,
  }),
};
RoleModal.defaultProps = {
  onEscPress: () => {},
  onCancelPress: () => {},
  onSubmit: () => {},
  initialData: {},
};
