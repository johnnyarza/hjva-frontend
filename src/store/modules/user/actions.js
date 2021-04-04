export function updateUserRequest(body) {
  return {
    type: '@user/UPDATE_USER_REQUEST',
    payload: { body },
  };
}
export function updateUserSuccess(user) {
  return {
    type: '@user/UPDATE_USER_SUCCESS',
    payload: { user },
  };
}
