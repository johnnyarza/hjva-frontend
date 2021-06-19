import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import SideBar from '../../../components/SideBar';

import { Wrapper, Content } from './style';

export default function DefaultLayout({ children, hasSideBar }) {
  const sideBar = useMemo(() => <SideBar />, []);

  return (
    <Wrapper>
      <Header />
      <Content>
        {hasSideBar && sideBar}
        {children}
      </Content>
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
