import React from 'react';
import { MdClear } from 'react-icons/md';
import { Container } from './style';

export default function Empty({ text = 'Vazio' }) {
  return (
    <Container>
      <MdClear />
      <span>{text}</span>
    </Container>
  );
}
