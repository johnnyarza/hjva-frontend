import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
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
  const [currentPortifolioId, setCurrentPortifolioId] = useState('');
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

  const handleEditPortifolio = async (portifolioId) => {
    try {
      setCurrentPortifolioId(portifolioId);
      setPortifolioModal(true);
    } catch (error) {
      toastError(error, 'Error al editar');
    }
  };

  const handleSubmit = async (data) => {
    try {
      const { id } = data;
      let res;

      if (id) {
        res = await api.put(`portifolio/${id}`, data);
      }

      if (!id) {
        res = await api.post(`portifolio/`, data);
      }

      if (!res) throw Error('response is empty');
      const { data: newPortifolio } = res;

      const oldPortifolios = portifolios.filter((p) => p.id !== id);
      const newPortifolios = [newPortifolio, ...oldPortifolios];

      setPortifolios(newPortifolios);
      setPortifolioModal(false);

      toast.success('Erro ao criar o produto');
    } catch (error) {
      toast.success('Erro ao criar o produto');
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
                        onClick={() => handleEditPortifolio(id)}
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
          portifolioState={[portifolios, setPortifolios]}
          initialData={portifolios.find((p) => p.id === currentPortifolioId)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default AboutMe;
