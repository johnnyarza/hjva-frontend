import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { MdEdit, MdModeEdit, MdImage } from 'react-icons/md';
import Spinner from '../../components/Spinner';
import Setting from '../../classes/Setting';

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
  const [landingImageSetting, setLandingImageSetting] = useState('');
  const [portifolios, setPortifolios] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPortifolioId, setCurrentPortifolioId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [lockButtons, setLockButtons] = useState(false);
  const [portifolioModal, setPortifolioModal] = useState(false);
  const [aboutMeModal, setAboutMeModal] = useState(false);
  const [settings, setSettings] = useState('');
  const [currentSetting, setCurrentSetting] = useState(new Setting());
  const inputRef = useRef(null);

  const toastError = (error, optMessage = 'Erro desconocído') => {
    toast.error(error?.response?.data?.message || optMessage);
  };

  useEffect(() => {
    if (settings) {
      const setting = settings.find((s) => s.name === 'ABOUTME_IMG');
      setLandingImageSetting(setting || {});
    }
  }, [settings]);

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

      const getSettings = async () => {
        const url = 'settings';
        try {
          const { data } = await api.get(url);
          if (data) {
            const newSettings = data.map((s) => {
              const newSetting = new Setting(s);
              return newSetting;
            });
            setSettings(newSettings);
          }
        } catch (error) {
          toastError(error, `Error al cargar ${url}`);
        }
      };

      getPortifolios();
      getSettings();
      loadUserRole();

      setIsLoading(false);
    } catch (error) {
      toastError(error, 'Error al cargar pagina ');
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

  const getText = (settingsArray = [new Setting()], settingName = '') => {
    const defaultText = 'Insertar Text';
    if (settingsArray.length > 0) {
      const setting = settingsArray.find((s) => s.name === settingName);
      return setting.value || defaultText;
    }
    return '';
  };

  const handleEditAboutMeTitle = () => {
    const setting = settings.find((s) => s.name === 'ABOUTME_TITLE');
    setCurrentSetting(setting || {});
  };

  const handleEditAboutMeText = () => {
    const setting = settings.find((s) => s.name === 'ABOUTME_TEXT');
    setCurrentSetting(setting || {});
  };

  const updateSetting = async (payload) => {
    try {
      const { id } = payload;
      const { data } = await api.put(`/setting/${id}`, payload);
      if (data) {
        const setting = new Setting(data);
        const newSettings = settings.filter((s) => s.id !== id);
        newSettings.push(setting);
        setSettings(newSettings);
        toast.success('Portifolio creado');
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      toast.error(message || 'Error desconocído');
    } finally {
      setAboutMeModal(false);
    }
  };

  const handleChangeImage = async (fileList) => {
    try {
      const formData = new FormData();
      const file = fileList[0];
      const setting = settings.find((s) => s.name === 'ABOUTME_IMG');

      formData.append('file', file);
      await api.post(`setting/${setting.id}/file`, formData);

      const { data: newSetting } = await api.get(
        `setting/find/?name=ABOUTME_IMG`
      );

      setLandingImageSetting(newSetting || '');
      toast.success('Alteración guardada');
    } catch (error) {
      const message = error?.response?.data?.message;
      toast.error(message || 'Error al guardar');
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

          <Content>
            <About>
              {userRole === 'admin' && (
                <Buttons disabled={lockButtons}>
                  <button
                    type="button"
                    onClick={() => {
                      handleEditAboutMeTitle();
                      setAboutMeModal(true);
                    }}
                    disabled={lockButtons}
                  >
                    <MdEdit />
                  </button>
                  {/* TODO FINISH EDIT ABOUT ME LANDING PICTURE. DO THE SAME AS CONTACME */}
                  <label htmlFor="file">
                    <span>
                      <MdImage />
                    </span>
                    <input
                      style={{ display: 'none' }}
                      ref={inputRef}
                      type="file"
                      id="file"
                      multiple={false}
                      onChange={(f) => handleChangeImage(f.target.files)}
                      onClick={() => {
                        inputRef.current.value = null;
                      }}
                      accept="image/jpeg,
                image/pjpeg,
                image/png,
                image/gif"
                    />
                  </label>
                </Buttons>
              )}

              <TextContainer>
                <TextTitle>{getText(settings, 'ABOUTME_TITLE')}</TextTitle>
              </TextContainer>
              <ImageContainer>
                <ImageContent
                  hasUrl={() => {
                    const url =
                      landingImageSetting?.file &&
                      (landingImageSetting?.file[0].url || frontImageUrl);
                    return url;
                  }}
                />
              </ImageContainer>

              <TextContainer>
                {userRole === 'admin' && (
                  <Buttons
                    disabled={lockButtons}
                    onClick={() => {
                      handleEditAboutMeText();
                      setAboutMeModal(true);
                    }}
                  >
                    <MdModeEdit />
                  </Buttons>
                )}

                <TextParagraf>{getText(settings, 'ABOUTME_TEXT')}</TextParagraf>
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
      {aboutMeModal && (
        <AboutMeModal
          initialData={currentSetting}
          setModalOpen={setAboutMeModal}
          onSubmit={updateSetting}
        />
      )}
    </>
  );
}

export default AboutMe;
