import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';

import {
  Container,
  Content,
  ImageContainer,
  About,
  ImageContent,
  TextContainer,
  TextTitle,
  TextParagraf,
} from './styles';

import frontImageUrl from '../../assets/20171019_102729.jpg';
import api from '../../services/api';

function AboutMe() {
  const [portifolios, setPortifolios] = useState('');

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
  return (
    <Container>
      <Content>
        <About>
          <ImageContainer>
            <ImageContent hasUrl={frontImageUrl} />
          </ImageContainer>
          <TextContainer>
            <TextTitle>Historia</TextTitle>
            <TextParagraf>a a</TextParagraf>
          </TextContainer>
        </About>
        {portifolios &&
          portifolios.map(({ id, title, paragraph }) => (
            <About key={id}>
              <ImageContainer>
                <ImageContent hasUrl={frontImageUrl} />
              </ImageContainer>

              <TextContainer>
                <TextTitle>{title}</TextTitle>
                <TextParagraf>{paragraph}</TextParagraf>
              </TextContainer>
            </About>
          ))}
      </Content>
    </Container>
  );
}

export default AboutMe;
