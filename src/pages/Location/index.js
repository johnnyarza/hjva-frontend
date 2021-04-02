import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import { Container, Content, MapContainer } from './style';

function Location(props) {
  const [google, setGoogle] = useState(null);
  const [initCenter] = useState({
    lat: -19.00255204710697,
    lng: -57.72224895796388,
  });

  useEffect(() => {
    if (props.google) setGoogle(props.google);
  }, [props]);

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Container>
      <Content>
        <MapContainer>
          {google && (
            <Map
              google={google}
              zoom={15}
              style={{
                width: '100%',
                height: '100%',
              }}
              initialCenter={initCenter}
              containerStyle={{
                position: 'static',
              }}
            >
              <Marker
                title="HJVA"
                onClick={() =>
                  openInNewTab(
                    'https://www.google.com/maps/place/HJVA/@-19.0026959,-57.7244847,17z/data=!4m12!1m6!3m5!1s0x9387a14342c8fcad:0xd906e8972645b475!2sHJVA!8m2!3d-19.002701!4d-57.722296!3m4!1s0x9387a14342c8fcad:0xd906e8972645b475!8m2!3d-19.002701!4d-57.722296'
                  )
                }
              />
            </Map>
          )}
        </MapContainer>

        <div style={{ textAlign: 'center' }}>
          <p>Comercio y Construcciones HJVA LTDA</p>
          <p>Av. Bolivia, 210, Puerto Quijarro</p>
          <p>Santa Cruz, Bolivia, Puerto Quijarro, Bolíviao</p>
        </div>
      </Content>
    </Container>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
})(Location);
