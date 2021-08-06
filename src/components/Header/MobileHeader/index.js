import React from 'react';
import { Link } from 'react-router-dom';
import { MdCall, MdPlace } from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io';

import logo from '../../../assets/HJVA-logo.png';
import WhatsAppFowardButton from '../../WhatsAppFowardButton';

export default function MobielHeader() {
  return (
    <div
      style={{
        display: 'flex',
        height: '56px',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '300px',
      }}
    >
      <div style={{ width: '22%' }}>
        <Link to="/">
          <img src={logo} alt="logo" style={{ width: '100%' }} />
        </Link>
      </div>
      <div
        style={{
          width: '30%',
          display: 'flex',

          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span style={{ fontWeight: '600', display: 'block' }}>HJVA Ltda</span>
      </div>
      <div
        style={{
          width: '30%',
          display: 'flex',

          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Link to="/">
          <MdCall />
        </Link>
        <WhatsAppFowardButton style={{ border: 'none', background: 'none' }}>
          <IoLogoWhatsapp />
        </WhatsAppFowardButton>
        <Link to="/location">
          <MdPlace />
        </Link>
      </div>
    </div>
  );
}
