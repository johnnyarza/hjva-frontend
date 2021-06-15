import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'hjva',
      storage,
      whitelist: ['auth', 'user', 'locale'],
    },
    reducers
  );
  return persistedReducer;
};
