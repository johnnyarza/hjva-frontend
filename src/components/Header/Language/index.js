import React, { useState } from 'react';
import { MdLanguage } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { changeLanguage } from '../../../store/modules/laguage/actions';

import {
  Container,
  Content,
  Scroll,
  LanguageList,
  LanguageOption,
} from './styles';

function Language() {
  const [showLanguages, setShowLanguages] = useState(false);
  const dispatch = useDispatch();
  const { locale } = useSelector((state) => state.locale);

  const handleClick = (language = 'pt-BR') => {
    dispatch(changeLanguage(language));
    setShowLanguages(false);
  };

  return (
    <Container>
      <Content>
        <button type="button" onClick={() => setShowLanguages(!showLanguages)}>
          <MdLanguage />
        </button>
        {showLanguages && (
          <LanguageList>
            <Scroll>
              <LanguageOption isSelected={locale === 'pt-BR'}>
                <button type="button" onClick={() => handleClick()}>
                  <span>pt-BR</span>
                </button>
              </LanguageOption>
              <LanguageOption isSelected={locale === 'en-US'}>
                <button type="button" onClick={() => handleClick('en-US')}>
                  <span>en-US</span>
                </button>
              </LanguageOption>
            </Scroll>
          </LanguageList>
        )}
      </Content>
    </Container>
  );
}

export default Language;
