import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import GenericModal from '../../../components/GenericModal';
import Input from '../../../components/Input';

// import { Container } from './styles';

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
function ResetPassModal({ onEscPress, onSubmit, onCancelPress }) {
  const formRef = useRef(null);
  const handleEscPress = () => {
    onEscPress();
  };
  const handleSubmit = async (data) => {
    try {
      await formSchema.validate(data, {
        abortEarly: false,
      });
      onSubmit(data);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      } else toast.error('Erro ao resetar senha');
    }
  };
  return (
    <GenericModal isOpen onEscPress={handleEscPress}>
      <h2 style={{ marginBottom: '15px' }}>Resetar Senha</h2>
      <Form ref={formRef} onSubmit={handleSubmit} schmea={formSchema}>
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
          onChange={() => formRef.current.setFieldError('confirmPassword', '')}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" name="resetPassword" className="form-ok-button">
            Atualizar
          </button>
          <button
            className="form-cancel-button"
            type="button"
            name="cancel"
            onClick={() => onCancelPress()}
          >
            Cancelar
          </button>
        </div>
      </Form>
    </GenericModal>
  );
}

export default ResetPassModal;
