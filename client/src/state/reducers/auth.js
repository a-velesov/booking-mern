let token;

if(localStorage.getItem('token')) {
  token = localStorage.getItem('token');
} else {
  token = null;
}

export const authReducer = (state = token, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return action.payload;
    default:
      return state;
  }
};