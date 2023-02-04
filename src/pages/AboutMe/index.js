import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdEdit, MdModeEdit } from 'react-icons/md';
import Spinner from '../../components/Spinner';

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
import AboutMeModal from './AboutMeModal/index';

function AboutMe() {
  const [portifolios, setPortifolios] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPortifolioId, setCurrentPortifolioId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [lockButtons, setLockButtons] = useState(false);
  const [portifolioModal, setPortifolioModal] = useState(false);
  const [aboutMeModal, setAboutMeModal] = useState(false);

  const toastError = (error, optMessage = 'Erro desconocído') => {
    toast.error(error?.response?.data?.message || optMessage);
  };

  useEffect(() => {
    try {
      const loadUserRole = async () => {
        const res = await api.get('/user');
        if (!res.data) {
          throw Error('Usuário não encontrado');
        }
        setUserRole(res.data.role);
      };

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
      loadUserRole();

      setIsLoading(false);
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

  const handleEditPortifolio = async (body) => {
    try {
      const { id: portifolioId, title, paragraph, file } = body;

      if (!portifolioId) {
        throw Error('Portifolio sin id');
      }

      if (file && file.length) {
        await handleMaterialFilesChanges(portifolioId, file);
      }

      const { data: newPortifolio } = await api.put(
        `portifolio/${portifolioId}`,
        { title, paragraph }
      );

      const newPortifolios = [...portifolios];
      const objIndex = newPortifolios.findIndex(
        (p) => p.id === newPortifolio.id
      );

      newPortifolios[objIndex] = newPortifolio;
      setPortifolios(newPortifolios);

      toast.success('Portifolio actualizado');
    } catch (error) {
      toastError(error, 'Error al editar');
    } finally {
      setLockButtons(false);
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
    } finally {
      setLockButtons(false);
    }
  };

  const handleSubmit = (data) => {
    try {
      const { id } = data;
      setLockButtons(true);
      if (id) {
        handleEditPortifolio(data);
      }
      if (!id) {
        handleCreatePortifolio(data);
      }
    } catch (error) {
      toast.error('Error desconocído');
    } finally {
      setPortifolioModal(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
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
          {/* TODO FINISH EDIT ABOUT ME */}
          <Content>
            <About>
              <Buttons
                disabled={lockButtons}
                onClick={() => {
                  console.log('click');
                  setAboutMeModal(true);
                }}
              >
                <MdModeEdit />
              </Buttons>
              <TextContainer>
                <TextTitle>Historia</TextTitle>
              </TextContainer>
              <ImageContainer>
                <ImageContent hasUrl={frontImageUrl} />
              </ImageContainer>

              <TextContainer>
                <Buttons
                  disabled={lockButtons}
                  onClick={() => {
                    console.log('click');
                    setAboutMeModal(true);
                  }}
                >
                  <MdModeEdit />
                </Buttons>
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
      )}

      {portifolioModal && (
        <Portifolio
          setModalOpen={setPortifolioModal}
          initialData={portifolios.find((p) => p.id === currentPortifolioId)}
          onSubmit={(data) => {
            handleSubmit(data);
          }}
        />
      )}
      {aboutMeModal && <AboutMeModal />}
    </>
  );
}

export default AboutMe;
