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

function AboutMe() {
  const [portifolios, setPortifolios] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const getPortifolios = async () => {
      try {
        const { data } = await api.get('portifolios');
        if (data) {
          setPortifolios(data);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Error al cargar');
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
      const message = error?.response?.data?.message;
      toast.error(message || 'Error');
    }
  }, []);

  return (
    <Container>
      {userRole === 'admin' && (
        <TopBar>
          <button type="button">Crear</button>
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
          {portifolios.map(({ id, title, paragraph, file }) => {
            return (
              <About key={id}>
                {userRole === 'admin' && (
                  <Buttons>
                    <Delete onClick={() => {}} />
                    <button type="button" onClick={() => {}}>
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
  );
}

export default AboutMe;
