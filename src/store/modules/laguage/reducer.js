import produce from 'immer';

const INITIAL_STATE = {
  locale: 'pt-BR',
};

export default function language(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@language/CHANGE_LOCALE':
      return produce(state, (draft) => {
        draft.locale = action.payload.locale;
      });

    default:
      return state;
  }
}
