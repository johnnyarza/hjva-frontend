import React, { useState, useEffect, useRef } from 'react';
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
  TextButton,
} from './styles';
import ContactMeModal from './modal';
import Spinner from '../../components/Spinner';

import imgUrl from '../../assets/contactMe.jpg';
import api from '../../services/api';

function ContactMe() {
  const inputRef = useRef(null);
  const [contactMeSetting, setContactMeSetting] = useState('');
  const [landingImageSetting, setLandingImageSetting] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('');

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
        setLandingImageSetting(data || '');
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
              <label htmlFor="file">
                <span>
                  <MdModeEdit />
                </span>
                <input
                  style={{ display: 'none' }}
                  ref={inputRef}
                  type="file"
                  id="file"
                  multiple={false}
                  onChange={(f) => {
                    const imageSetting = {
                      file: [{ url: URL.createObjectURL(f.target.files[0]) }],
                    };
                    setLandingImageSetting(imageSetting);
                  }}
                  onClick={() => {
                    inputRef.current.value = null;
                  }}
                  accept="image/jpeg,
                image/pjpeg,
                image/png,
                image/gif"
                />
              </label>
            )}
          </Buttons>
          <ImgContainer>
            <ImgContent
              hasUrl={
                (landingImageSetting?.file &&
                  landingImageSetting?.file[0]?.url) ||
                imgUrl
              }
            />
          </ImgContainer>
          <TextButton style={{ display: 'flex', justifyContent: 'end' }}>
            {userRole === 'admin' && (
              <button type="button" onClick={() => setIsModalOpen(true)}>
                <MdModeEdit />
              </button>
            )}
          </TextButton>
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
