import React from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

import {
  TextContainer,
  Container,
  Content,
  ImgContainer,
  ImgContent,
} from './styles';
import imgUrl from '../../assets/contactMe.jpg';

function ContactMe() {
  return (
    <Container>
      <Content>
        <div className="back-button">
          <Link to="/">
            <MdKeyboardBackspace />
          </Link>
        </div>
        <ImgContainer>
          <ImgContent hasUrl={imgUrl} />
        </ImgContainer>
        <TextContainer>aaa</TextContainer>
      </Content>
    </Container>
  );
}

export default ContactMe;
