import React from 'react';

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

function AboutMe() {
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
        <About>
          <ImageContainer>
            <ImageContent hasUrl={frontImageUrl} />
          </ImageContainer>
          <TextContainer>
            <TextTitle>Obra 1</TextTitle>
            <TextParagraf>a a</TextParagraf>
          </TextContainer>
        </About>
        <About>
          <ImageContainer>
            <ImageContent hasUrl={frontImageUrl} />
          </ImageContainer>
          <TextContainer>
            <TextTitle>Obra 2</TextTitle>
            <TextParagraf>a a</TextParagraf>
          </TextContainer>
        </About>
      </Content>
    </Container>
  );
}

export default AboutMe;
