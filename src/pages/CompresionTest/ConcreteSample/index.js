import React, { useEffect, useState } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';

import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';

import Spinner from '../../../components/Spinner';
import Table from '../../../components/Table';

import { Container, Content, ConcreteSampleContainer } from './styles';
import { MenuContainer } from '../styles';
import COMPRESSIONTESTCOLUMNS from '../Table/columns';
import CONCRETESAMPLECOLUMNS from './Table/columns';

import api from '../../../services/api';

function ConcreteSample({ handleBackClick, compressionTest }) {
  const [isLoading, setIsLoading] = useState(true);
  const [concreteSamples, setConcreteSamples] = useState(null);

  useEffect(() => {
    const loadAllConcreteSamples = async () => {
      const { data } = await api.get(
        `concreteSamples/?compressionTestId=${compressionTest.id}`
      );
      setConcreteSamples(data);
    };
    loadAllConcreteSamples();
  }, [compressionTest]);

  useEffect(() => {
    if (concreteSamples) setIsLoading(false);
  }, [concreteSamples]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container>
          <div className="title-container">
            <button
              type="button"
              onClick={() => handleBackClick()}
              className="back-button"
            >
              <MdKeyboardBackspace />
            </button>
            <h2>Probetas</h2>
          </div>
          <MenuContainer>
            <MenuButton>Crear</MenuButton>
          </MenuContainer>
          <Content>
            <Table columns={COMPRESSIONTESTCOLUMNS} data={[compressionTest]} />
            <ConcreteSampleContainer>
              <Table columns={CONCRETESAMPLECOLUMNS} data={concreteSamples} />
            </ConcreteSampleContainer>
          </Content>
        </Container>
      )}
    </>
  );
}

export default ConcreteSample;
