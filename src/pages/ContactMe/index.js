import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace, MdModeEdit } from 'react-icons/md';

import { toast } from 'react-toastify';
import {
  TextContainer,
  Container,
  Content,
  ImgContainer,
  ImgContent,
  TextContent,
  Buttons,
} from './styles';
import ContactMeModal from './modal';
import Spinner from '../../components/Spinner';

import imgUrl from '../../assets/contactMe.jpg';
import api from '../../services/api';

function ContactMe() {
  const [contactMeSetting, setContactMeSetting] = useState('');
  const [landingImageSetting, SetLandingImageSetting] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [startPos, setStartPos] = useState({ startX: 0, startY: 0 });

  useEffect(() => {
    try {
      const getContactMeText = async () => {
        const { data } = await api.get(`setting/find/?name=CONTACTME_TEXT`);
        if (data) {
          setContactMeSetting(data || '');
        }
      };

      const getLandingImage = async () => {
        const { data } = await api.get(`setting/find/?name=CONTACTME_IMG`);
        SetLandingImageSetting(data || '');
      };

      const loadUserRole = async () => {
        const res = await api.get('/user');
        if (!res.data) {
          throw Error('Usuário não encontrado');
        }
        setUserRole(res.data.role);
      };

      getContactMeText();
      getLandingImage();
      loadUserRole();
      setIsLoading(false);
    } catch (error) {
      const message = error?.response?.data?.message;
      toast.error(message || 'Error');
    }
  }, []);

  const handleSubmit = async (body) => {
    try {
      const { data } = await api.put(`setting/${contactMeSetting.id}`, body);
      setContactMeSetting(data);
      setIsModalOpen(false);
      toast.success('Alteración guardada');
    } catch (error) {
      setIsModalOpen(false);
      const message = error?.response?.data?.message;
      toast.error(message || 'Error al guardar');
    }
  };

  const imgPosition = () => {};

  return (
    <Container>
      {isLoading ? (
        <Spinner />
      ) : (
        <Content>
          <Buttons userRole={userRole}>
            <Link to="/">
              <MdKeyboardBackspace />
            </Link>
            {userRole === 'admin' && (
              <button type="button" onClick={() => setIsModalOpen(true)}>
                <MdModeEdit />
              </button>
            )}
          </Buttons>
          <ImgContainer>
            <ImgContent
              hasUrl={
                (landingImageSetting?.file &&
                  landingImageSetting?.file[0]?.url) ||
                imgUrl
              }
              position={`${startPos.startX}px ${startPos.startY}px`}
              onMouseDown={(prop) =>
                setStartPos({
                  startX: prop.pageX,
                  startY: prop.pageY,
                })
              }
              onMouseUp={(prop) => console.log(prop.pageX - startPos.startX)}
            />
          </ImgContainer>
          <TextContainer>
            <TextContent>
              <pre>{contactMeSetting.value}</pre>
            </TextContent>
          </TextContainer>
        </Content>
      )}

      {isModalOpen && (
        <ContactMeModal
          onEscPress={() => setIsModalOpen(false)}
          onCancelButton={() => setIsModalOpen(false)}
          initialData={contactMeSetting}
          onSubmit={handleSubmit}
        />
      )}
    </Container>
  );
}

export default ContactMe;
