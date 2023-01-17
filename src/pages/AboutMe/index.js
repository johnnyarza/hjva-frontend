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
      const wasDeleted = await api.delete(`portifolio/${portifolioId}`);
      // const wasDeleted = true;
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

  const handleMaterialFilesChanges = (portifolioId, files) => {
    const filesToCreate = files.filter((file) => !!file.auxId);
    const filesToDelete = files.filter((file) => file.id && file.toDelete);

    const promises = Promise.all(
      filesToCreate.map(({ file }) => {
        const data = new FormData();
        data.append('file', file);
        return api.post(`portifolio/${portifolioId}/file`, data);
      }),
      filesToDelete.map(({ id }) => {
        return api.delete(`portifolio/${id}/file`);
      })
    );

    return promises;
  };
  const handleEditPortifolioClick = async (portifolioId) => {
    try {
      setCurrentPortifolioId(portifolioId);
      setPortifolioModal(true);
    } catch (error) {
      toastError(error, 'Error al editar');
    }
  };
  // TODO Finish edit portifolio
  const handleEditPortifolio = async (data) => {
    try {
      const { id: portifolioId, title, paragraph } = data;
      if (!portifolioId) {
        throw Error('Portifolio sin id');
      }
    } catch (error) {
      toastError(error, 'Error al editar');
    }
  };

  const handleCreatePortifolio = async (body) => {
    try {
      const res = await api.post('portifolio/', body);
      let newPortifolio = res.data;
      const { id } = newPortifolio;
      const { file } = body;

      if (id) {
        if (file && file.length) {
          await handleMaterialFilesChanges(id, file);
          const { data } = await api.get(`portifolio/${id}`);
          if (data) {
            newPortifolio = data;
          }
        }

        const newPortifolios = [...portifolios, newPortifolio];
        setPortifolios(newPortifolios);
        toast.success('Portifolio creado');
      }

      if (!id) {
        throw Error('');
      }
    } catch (error) {
      toastError(error, 'Error al crear');
    }
  };

  const handleSubmit = (data) => {
    try {
      const { id } = data;
      if (id) {
        console.log('edit');
        console.log(data);
      }
      if (!id) {
        handleCreatePortifolio(data);
      }
    } catch (error) {
      toast.error('Error al crear portifolio');
    } finally {
      setPortifolioModal(false);
    }
  };

  return (
    <>
      <Container>
        {userRole === 'admin' && (
          <TopBar>
            <button
              type="button"
              disabled={lockButtons}
              onClick={() => {
                setCurrentPortifolioId('');
                setPortifolioModal(true);
              }}
            >
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
          <>
            {portifolios.map((portifolio) => {
              const { id, title, paragraph, file } = portifolio;
              return (
                <Content key={id}>
                  <About>
                    {userRole === 'admin' && (
                      <Buttons disabled={lockButtons}>
                        <Delete
                          onClick={() => handleDeletePortifolio(id)}
                          disabled={lockButtons}
                        />
                        <button
                          type="button"
                          onClick={() => handleEditPortifolioClick(id)}
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
                </Content>
              );
            })}
          </>
        )}
      </Container>
      {portifolioModal && (
        <Portifolio
          setModalOpen={setPortifolioModal}
          initialData={portifolios.find((p) => p.id === currentPortifolioId)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default AboutMe;
