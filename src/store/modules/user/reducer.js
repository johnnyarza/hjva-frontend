import produce from 'immer';

const INITIAL_STATE = {
  user: null,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, (draft) => {
        draft.user = action.payload.user;
      });

    case '@user/UPDATE_USER_SUCCESS':
      return produce(state, (draft) => {
        draft.user = action.payload.user;
      });

    case '@auth/SIGN_OUT':
      return produce(state, (draft) => {
        draft.user = null;
      });

    default:
      return state;
  }
}
