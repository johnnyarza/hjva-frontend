import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Form } from '@unform/web';

import { MdDelete, MdEdit } from 'react-icons/md';
import GenericModal from '../../../components/GenericModal';
import Label from '../../../components/Label';
import Input from '../../../components/Input';
import Table from '../../../components/Table';

import { Content } from './styles';
import COLUMNS from './Table/columns';
import TextArea from '../../../components/TextArea';

function ConcreteDesignModal({
  initialData = {},
  onSubmit,
  onCancelButton,
  onEscPress,
  ...rest
}) {
  // const [initialConcreteDesign, setInitialConcreteDesign] = useState(null);
  const [concreteDesingMaterial, setConcreteDesingMaterial] = useState([]);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.setData(initialData);
    console.log(initialData);
  }, [initialData]);

  useEffect(() => {
    setConcreteDesingMaterial(initialData.concreteDesignMaterial || []);
  }, [initialData]);

  const columns = useMemo(() => {
    const newCol = {
      Header: 'Editar',
      accessor: 'edit',

      width: 20,
      disableResize: true,
      disableSort: true,

      // eslint-disable-next-line react/prop-types
      Cell: ({ row: { original } }) => (
        <div
          className="edit-buttons-container"
          style={{ justifyContent: 'center' }}
        >
          <button
            className="edit-button"
            type="button"
            onClick={() => console.log(original)}
          >
            <MdEdit />
          </button>
          <button
            className="delete-button"
            type="button"
            onClick={() => console.log(original)}
          >
            <MdDelete />
          </button>
        </div>
      ),
    };
    return [...COLUMNS, newCol];
  }, []);

  return (
    <GenericModal
      isOpen
      {...rest}
      onEscPress={isMaterialModalOpen ? () => {} : onEscPress}
    >
      <Form ref={formRef}>
        <Content>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '10px' }}>
              <Label htmlFor="name" label={initialData.name ? 'Nombre' : ''}>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nombre"
                  onChange={() => formRef.current.setFieldError('name', '')}
                  hasBorder={false}
                />
              </Label>
              <Label htmlFor="slump" label={initialData.slump ? 'Slump' : ''}>
                <Input
                  id="slump"
                  name="slump"
                  placeholder="slump"
                  onChange={() => formRef.current.setFieldError('name', '')}
                  hasBorder={false}
                />
              </Label>
              <Label
                htmlFor="notes"
                label={initialData.id ? 'Descripción' : ''}
              >
                <TextArea
                  name="notes"
                  placeholder="Descripción"
                  onChange={() => formRef.current.setFieldError('notes', '')}
                />
              </Label>
            </div>
            <div style={{ minWidth: '450px' }}>
              <Label htmlFor="materials" label="Materiales">
                <Table
                  columns={columns}
                  data={concreteDesingMaterial}
                  id="materials"
                />
              </Label>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <button
              type="button"
              className="add-material-button"
              onClick={() => setIsMaterialModalOpen(true)}
            >
              Agregar Material
            </button>
            <button
              type="submit"
              name="inserir"
              style={{ backgroundColor: '#2ecc71' }}
            >
              {initialData.id ? 'Guardar' : 'Crear'}
            </button>
            <button
              type="button"
              name="cancelar"
              style={{ backgroundColor: '#C0392B' }}
              onClick={onCancelButton}
            >
              Cancelar
            </button>
          </div>
        </Content>
      </Form>
      {isMaterialModalOpen && (
        <GenericModal isOpen onEscPress={() => setIsMaterialModalOpen(false)}>
          a
        </GenericModal>
      )}
    </GenericModal>
  );
}

export default ConcreteDesignModal;
