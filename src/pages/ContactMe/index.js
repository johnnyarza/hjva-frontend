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

import imgUrl from '../../assets/contactMe.jpg';
import api from '../../services/api';

function ContactMe() {
  const [contactMe, setContactMe] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    try {
      const getContactMeText = async () => {
        const { data } = await api.get(`setting/find/?name=CONTACTME_TEXT`);
        if (data) {
          setContactMe(data || '');
        }
      };

      const loadUserRole = async () => {
        const res = await api.get('/user');
        if (!res.data) {
          throw Error('Usuário não encontrado');
        }
        setUserRole(res.data.role);
      };

      getContactMeText();
      loadUserRole();
    } catch (error) {
      const message = error?.response?.data?.message;
      toast.error(message || 'Error');
    }
  }, []);

  const handleSubmit = async (body) => {
    try {
      const { data } = await api.put(`setting/${contactMe.id}`, body);
      setContactMe(data);
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
          <ImgContent hasUrl={imgUrl} />
        </ImgContainer>
        <TextContainer>
          <TextContent>
            <pre>{contactMe.value}</pre>
          </TextContent>
        </TextContainer>
      </Content>
      {isModalOpen && (
        <ContactMeModal
          onEscPress={() => setIsModalOpen(false)}
          onCancelButton={() => setIsModalOpen(false)}
          initialData={contactMe}
          onSubmit={handleSubmit}
        />
      )}
    </Container>
  );
}

export default ContactMe;
