import React, { useEffect, useState, useRef, useContext } from 'react';
import BackgroundImageOnLoad from 'background-image-on-load';
import PropTypes from 'prop-types';

import { IsMobileContext } from '../../pages/_layouts/Default/index';
import logo from '../../assets/HJVA-logo.gif';

import { Content, Glass } from './styles';

function MagnifierGlass({ imgUrl, zoom = 2 }) {
  const [parentDims, setParentDims] = useState('');
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [showGlass, setShowGlass] = useState(false);
  const [parentState, setParentState] = useState('');
  const [isMobile] = useContext(IsMobileContext);
  const divRef = useRef(null);
  const glassRef = useRef(null);

  const getCursorPos = (e) => {
    let x = 0;
    let y = 0;
    e = window.event;
    /* get the x and y positions of the image: */
    const a = parentState?.getBoundingClientRect();
    /* calculate the cursor's x and y coordinates, relative to the image: */
    if (
      e.type === 'touchstart' ||
      e.type === 'touchmove' ||
      e.type === 'touchend' ||
      e.type === 'touchcancel'
    ) {
      const evt = typeof e.originalEvent === 'undefined' ? e : e.originalEvent;
      const touch = evt.touches[0] || evt.changedTouches[0];
      x = touch.pageX - 40;
      y = touch.pageY - 40;
    } else if (
      e.type === 'mousedown' ||
      e.type === 'mouseup' ||
      e.type === 'mousemove' ||
      e.type === 'mouseover' ||
      e.type === 'mouseout' ||
      e.type === 'mouseenter' ||
      e.type === 'mouseleave'
    ) {
      e.preventDefault();
      x = e.pageX;
      y = e.pageY;
    }

    x -= a.left;
    y -= a.top;
    /* consider any page scrolling: */
    x -= window.pageXOffset;
    y -= window.pageYOffset;
    return { x, y };
  };

  const moveMagnifier = (e, bw = 3) => {
    const parent = parentState;
    const glass = glassRef.current;
    const w = glass.offsetWidth / 2;
    const h = glass.offsetHeight / 2;
    let x;
    let y;
    /* prevent any other actions that may occur when moving over the image */

    /* get the cursor's x and y positions: */
    const pos = getCursorPos(e);

    x = pos.x;
    y = pos.y;
    /* prevent the magnifier glass from being positioned outside the image: */
    // limite da direita
    if (x > parent.offsetWidth - w / zoom) {
      x = parent.width - w / zoom;
    }
    // limite da esquerda
    if (x < w / zoom) {
      x = w / zoom;
    }
    // limite inferior
    if (y > parent.offsetHeight - h / zoom) {
      y = parent.height - h / zoom;
    }
    // limite de cima
    if (y < h / zoom) {
      y = h / zoom;
    }
    /* set the position of the magnifier glass: */
    glass.style.left = `${x - w}px`;
    glass.style.top = `${y - h}px`;
    /* display what the magnifier glass "sees": */
    glass.style.backgroundPosition = `-${x * zoom - w + bw}px -${
      y * zoom - h + bw
    }px`;
  };

  useEffect(() => {
    if (divRef.current) {
      setParentDims({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, [
    divRef,
    parentState,
    divRef.current?.offsetWidth,
    divRef.current?.offsetHeight,
  ]);

  useEffect(() => {
    if (parentState) {
      parentState.addEventListener(
        'touchmove',
        (ev) => {
          ev.preventDefault();
          moveMagnifier(ev);
        },
        { passive: false }
      );
    }
  }, [parentState]);

  useEffect(() => {
    setIsImgLoaded(false);
  }, [imgUrl]);

  return (
    <Content
      hasUrl={isImgLoaded ? imgUrl : logo}
      isImgLoaded={isImgLoaded}
      ref={(e) => {
        setParentState(e);
        divRef.current = e;
      }}
      onMouseMove={(e) => {
        if (showGlass) moveMagnifier(e);
      }}
      onMouseEnter={() => setShowGlass(true)}
      onMouseLeave={() => setShowGlass(false)}
      onTouchStart={() => setShowGlass(true)}
      onTouchEnd={() => setShowGlass(false)}
    >
      <BackgroundImageOnLoad
        src={imgUrl}
        onLoadBg={() => {
          setIsImgLoaded(true);
        }}
      />
      <Glass
        ref={glassRef}
        hasUrl={imgUrl}
        parentDims={parentDims}
        zoom={zoom}
        isMobile={isMobile}
        showGlass={showGlass}
      />
    </Content>
  );
}

export default MagnifierGlass;