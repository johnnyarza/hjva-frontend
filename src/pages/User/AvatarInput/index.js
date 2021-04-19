import React, { useState, useEffect } from 'react';

import { Container } from './style';

import defaultAvatar from '../../../assets/user.svg';
import api from '../../../services/api';

export default function AvatarInput() {
  const [avatar, setAvatar] = useState({});

  useEffect(() => {
    const loadAvatar = async () => {
      const { data } = await api.get('/user');
      const { avatar: value } = data;
      if (value) {
        setAvatar(value);
      }
    };
    loadAvatar();
  }, []);

  const handleChange = async (e) => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    const res = await api.post('/users/avatar', data);
    setAvatar(res.data);
  };

  return (
    <Container>
      <label htmlFor="avatar">
        <img src={avatar.url || defaultAvatar} alt="UserAvatar" />
        <input
          type="file"
          id="avatar"
          onChange={handleChange}
          accept="image/jpeg,
          image/pjpeg,
          image/png,
          image/gif"
        />
      </label>
    </Container>
  );
}
