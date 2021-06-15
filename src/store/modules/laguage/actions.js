export function changeLanguage(locale) {
  return {
    type: '@language/CHANGE_LOCALE',
    payload: { locale },
  };
}
