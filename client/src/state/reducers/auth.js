let initialState = {
  data: {},
  error: null,
};

if(localStorage.getItem('auth')) {
  initialState.data = JSON.parse(localStorage.getItem('auth'));
} else {
  initialState.data = {};
}

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
}

export const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case 'AUTH_FAIL':
      return authFail(state, action);
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};