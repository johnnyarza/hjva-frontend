import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { uniqueId } from 'lodash';
import GenericModal from '../../../components/GenericModal';
import api from '../../../services/api';
import { Row, ListContainer, ListsContainer } from './styles';

function MaterialsToConcreteDesigns({ onCancelButton, ...rest }) {
  const [currentMaterials, setCurrentMaterials] = useState('');
  const [leftMaterials, setLeftMaterials] = useState('');

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
      toast.error('Error al mover material');
    }
  };

  const handleLeftMaterialClick = (mat) => {
    // TODO add materialToConcreteDesing
    setLeftMaterials(leftMaterials.filter((m) => m.id !== mat.id));
    currentMaterials.push(mat);
    setCurrentMaterials(currentMaterials);
  };

  return (
    <GenericModal isOpen {...rest}>
      <ListsContainer>
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
    </GenericModal>
  );
}
export default MaterialsToConcreteDesigns;

MaterialsToConcreteDesigns.propTypes = {
  onCancelButton: PropTypes.func.isRequired,
};
