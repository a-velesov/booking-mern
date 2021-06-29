let initialState = {
  data: {
    accessToken: null,
    user: {
      isActivated: true
    }
  },
  error: null,
};

/*TODO loader*/
/*
if(localStorage.getItem('auth')) {
  initialState.data = JSON.parse(localStorage.getItem('auth'));
}*/

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
}

const loginSuccess = (state, action) => {
  return {
    ...state,
    data: action.payload,
    error: null,
  };
}

export const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return loginSuccess(state, action);
    case 'AUTH_FAIL':
      return authFail(state, action);
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};