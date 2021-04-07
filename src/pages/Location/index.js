import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import { Container, Content } from './style';

const hjvaURL =
  'https://www.google.com/maps/place/HJVA/@-19.0025942,-57.7223016,18z/data=!4m12!1m6!3m5!1s0x9387a14342c8fcad:0xd906e8972645b475!2sHJVA!8m2!3d-19.002701!4d-57.722296!3m4!1s0x9387a14342c8fcad:0xd906e8972645b475!8m2!3d-19.002701!4d-57.722296';
function Location() {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Container>
      <Content>
        <MapContainer
          center={[-19.002477800648624, -57.72232820416712]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '400px', width: '960px', marginBottom: '20px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[-19.002477800648624, -57.72232820416712]}
            eventHandlers={{ click: () => openInNewTab(hjvaURL) }}
          />
        </MapContainer>
        <div style={{ textAlign: 'center' }}>
          <p>Comercio y Construcciones HJVA LTDA</p>
          <p>Av. Bolivia, 210, Puerto Quijarro</p>
          <p>Santa Cruz, Bolivia, Puerto Quijarro, Bolívia</p>
        </div>
      </Content>
    </Container>
  );
}

export default Location;
