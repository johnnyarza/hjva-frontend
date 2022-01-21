import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { uniqueId } from 'lodash';
import { FaArrowsAltH } from 'react-icons/fa';
import GenericModal from '../../../components/GenericModal';
import api from '../../../services/api';
import { Row, ListContainer, ListsContainer, MiddleContainer } from './styles';
import Spinner from '../../../components/Spinner';

function MaterialsToConcreteDesigns({ onCancelButton, ...rest }) {
  const [currentMaterials, setCurrentMaterials] = useState('');
  const [leftMaterials, setLeftMaterials] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllMaterialsToConcreteDesgins = async () => {
      const { data: usedMats } = await api.get('/materialsToConcreteDesigns');
      const { data: materials } = await api.get('materials');
      let filteredMats = [...materials];

      if (usedMats) {
        setCurrentMaterials(usedMats.map(({ material }) => material));
        usedMats.forEach(({ material }) => {
          filteredMats = [
            ...filteredMats.filter(({ id }) => id !== material.id),
          ];
        });
        setLeftMaterials(filteredMats);
        setIsLoading(false);
      }
    };

    loadAllMaterialsToConcreteDesgins();
  }, []);

  const handleCurrentMaterialClick = async (mat) => {
    try {
      const rowsAffected = await api.delete(
        `materialsToConcreteDesign/${mat.id}`
      );

      if (rowsAffected) {
        setCurrentMaterials(currentMaterials.filter((m) => m.id !== mat.id));
        leftMaterials.push(mat);
        setLeftMaterials([...leftMaterials]);
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      if (message) {
        toast.error(message);
      } else toast.error('Error al mover material');
    }
  };

  const handleLeftMaterialClick = async (mat) => {
    const rowsAffected = await api.post(`materialToConcreteDesign`, {
      materialId: mat.id,
    });
    if (rowsAffected) {
      setLeftMaterials(leftMaterials.filter((m) => m.id !== mat.id));
      currentMaterials.push(mat);
      setCurrentMaterials([...currentMaterials]);
    }
  };

  return (
    <GenericModal isOpen {...rest}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2 style={{ marginBottom: '15px' }}>Materiales para Dosificacíon</h2>
          <ListsContainer>
            <div style={{ gridArea: '1/1/2/2' }}>
              <h3 style={{ textAlign: 'center', gridArea: '1/1/row1-end/2' }}>
                Materiales Dosificaciones
              </h3>
            </div>
            <ListContainer id="materialList">
              {/* <SearchContainer isFocused={isInputFocused}>
          <div>
            <input
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onChange={(d) => {
                hadleSearchInputChange(d.target.value);
                setMaterialListHasError({ hasError: false });
              }}
            />
            <FaSearch />
          </div>
            </SearchContainer> */}
              <ul>
                {currentMaterials &&
                  currentMaterials.map((mat) => {
                    return (
                      <Row key={uniqueId()} id={mat.id}>
                        <button
                          type="button"
                          onClick={() => {
                            handleCurrentMaterialClick(mat);
                          }}
                        >
                          {mat.name}
                        </button>
                      </Row>
                    );
                  })}
              </ul>
            </ListContainer>
            <MiddleContainer>
              <FaArrowsAltH />
            </MiddleContainer>
            <div style={{ gridArea: '1/3/2/4' }}>
              <h3 style={{ textAlign: 'center' }}>Estoque</h3>
            </div>
            <ListContainer id="materialList">
              {/* <SearchContainer isFocused={isInputFocused}>
          <div>
            <input
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onChange={(d) => {
                hadleSearchInputChange(d.target.value);
                setMaterialListHasError({ hasError: false });
              }}
            />
            <FaSearch />
          </div>
            </SearchContainer> */}
              <ul>
                {leftMaterials &&
                  leftMaterials.map((mat) => {
                    return (
                      <Row key={uniqueId()} id={mat.id}>
                        <button
                          type="button"
                          onClick={() => handleLeftMaterialClick(mat)}
                        >
                          {mat.name}
                        </button>
                      </Row>
                    );
                  })}
              </ul>
            </ListContainer>
          </ListsContainer>
          <button
            type="button"
            name="cancelar"
            style={{ backgroundColor: '#e74c3c', fontWeight: '500' }}
            onClick={onCancelButton}
          >
            Cancelar
          </button>
        </>
      )}
    </GenericModal>
  );
}
export default MaterialsToConcreteDesigns;

MaterialsToConcreteDesigns.propTypes = {
  onCancelButton: PropTypes.func.isRequired,
};
