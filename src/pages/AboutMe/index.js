import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';

import {
  Container,
  Content,
  ImageContainer,
  About,
  ImageContent,
  TextContainer,
  TextTitle,
  TextParagraf,
  Buttons,
  TopBar,
} from './styles';

import frontImageUrl from '../../assets/20171019_102729.jpg';
import api from '../../services/api';
import Images from '../../components/Images';
import Delete from '../../components/DeleteButton';

import Portifolio from './PortifolioModal/index';

function AboutMe() {
  const [portifolios, setPortifolios] = useState('');
  const [currentPortifolio, setCurrentPortifolio] = useState('');
  const [userRole, setUserRole] = useState('');
  const [lockButtons, setLockButtons] = useState(false);
  const [portifolioModal, setPortifolioModal] = useState(false);

  const toastError = (error, optMessage = 'Erro desconocído') => {
    toast.error(error?.response?.data?.message || optMessage);
  };

  useEffect(() => {
    const getPortifolios = async () => {
      try {
        const { data } = await api.get('portifolios');
        if (data) {
          setPortifolios(data);
        }
        console.log(data);
      } catch (error) {
        toastError(error, 'Error al cargar');
      }
    };
    getPortifolios();
  }, []);

  useEffect(() => {
    try {
      const loadUserRole = async () => {
        const res = await api.get('/user');
        if (!res.data) {
          throw Error('Usuário não encontrado');
        }
        setUserRole(res.data.role);
      };

      loadUserRole();
    } catch (error) {
      toastError(error, 'Error al cargar usuário');
    }
  }, []);

  const handleDeletePortifolio = async (portifolioId) => {
    try {
      // const wasDeleted = await api.delete(`portifolio/${portifolioId}`);
      const wasDeleted = true;
      setLockButtons(true);

      if (wasDeleted) {
        const filteredPortifolios = portifolios.filter(
          ({ id }) => id !== portifolioId
        );
        setPortifolios(filteredPortifolios);
        toast.success('Elemento apagado');
      } else throw Error();
    } catch (error) {
      toastError(error, 'Error al apagar');
    } finally {
      setLockButtons(false);
    }
  };

  const handleEditPortifolio = async (portifolio) => {
    try {
      setCurrentPortifolio(portifolio);
      setPortifolioModal(true);
    } catch (error) {
      toastError(error, 'Error al editar');
    }
  };

  const handleSubmit = async (data) => {
    try {
      console.log(data);
      toast.success('Erro ao criar o produto');
    } catch (error) {
      toast.error('Erro ao criar o produto');
    }
  };

  return (
    <>
      <Container>
        {userRole === 'admin' && (
          <TopBar>
            <button type="button" disabled={lockButtons}>
              Crear
            </button>
          </TopBar>
        )}

        <Content>
          <About>
            <TextContainer>
              <TextTitle>Historia</TextTitle>
            </TextContainer>
            <ImageContainer>
              <ImageContent hasUrl={frontImageUrl} />
            </ImageContainer>
            <TextContainer>
              <TextParagraf>a a</TextParagraf>
            </TextContainer>
          </About>
        </Content>

        {!!portifolios?.length && (
          <Content>
            {portifolios.map((portifolio) => {
              const { id, title, paragraph, file } = portifolio;
              return (
                <About key={id}>
                  {userRole === 'admin' && (
                    <Buttons disabled={lockButtons}>
                      <Delete
                        onClick={() => handleDeletePortifolio(id)}
                        disabled={lockButtons}
                      />
                      <button
                        type="button"
                        onClick={() => handleEditPortifolio(portifolio)}
                        disabled={lockButtons}
                      >
                        <MdEdit />
                      </button>
                    </Buttons>
                  )}
                  <TextContainer>
                    <TextTitle>{title}</TextTitle>
                  </TextContainer>
                  <ImageContainer>
                    <Images images={file} />
                  </ImageContainer>
                  <TextContainer>
                    <TextParagraf>{paragraph}</TextParagraf>
                  </TextContainer>
                </About>
              );
            })}
          </Content>
        )}
      </Container>
      {portifolioModal && (
        <Portifolio
          setModalOpen={setPortifolioModal}
          initialData={currentPortifolio}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default AboutMe;
