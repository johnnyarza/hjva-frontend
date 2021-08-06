import React, { useEffect, useMemo, useState, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import SideBar from '../../../components/SideBar';

import { Wrapper, Content, InputContainer, InputContent } from './styles';

export const InputContext = createContext(['', () => {}]);
export const IsMobileContext = createContext(['', () => {}]);

export default function DefaultLayout({ children, hasSideBar }) {
  const sideBar = useMemo(() => <SideBar />, []);
  const [width, setWidth] = useState(window.innerWidth);
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(width <= 768);
  const [inputValue, setInputValue] = useState('');
  const { Provider: InputProvider } = InputContext;
  const { Provider: IsMobileProvider } = IsMobileContext;
  const { pathname } = useLocation();

  useEffect(() => {
    setIsMobile(width <= 768);
  }, [width]);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return (
    <Wrapper isMobile={isMobile}>
      <IsMobileProvider value={[isMobile, setIsMobile]}>
        <Header mobileState={[isMobile, setIsMobile]} />
        <InputContainer isMobile={isMobile}>
          <InputContent isFocused={isFocused}>
            <input
              value={inputValue}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(data) => setInputValue(data.target.value)}
              disabled={pathname !== '/'}
            />
            <FaSearch />
          </InputContent>
        </InputContainer>
        <InputProvider value={[inputValue, setInputValue]}>
          <Content isMobile={isMobile}>
            {hasSideBar && sideBar}
            {children}
          </Content>
        </InputProvider>
      </IsMobileProvider>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
  hasSideBar: PropTypes.bool,
};

DefaultLayout.defaultProps = {
  hasSideBar: false,
};
