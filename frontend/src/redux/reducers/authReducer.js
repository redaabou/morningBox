const initialState = {
  loading: false,
  error: null,
  user: null,
  token: null,
  users: [],
  role: null,
  userId: null,
};

// Check and parse userInfo from localStorage
const userInfo = localStorage.getItem('userInfo');
if (userInfo) {
  try {
    initialState.user = JSON.parse(userInfo);
  } catch (error) {
    console.error('Error parsing userInfo from localStorage:', error);
    localStorage.removeItem('userInfo');
  }
}

// Check and set token from localStorage
const token = localStorage.getItem('token');
if (token) {
  initialState.token = token;
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      console.log('LOGIN_SUCCESS payload:', action.payload); // Log the payload
      if (action.payload && action.payload.user && action.payload.token) {
        localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        console.log('userInfo set in localStorage:', localStorage.getItem('userInfo'));
        console.log('token set in localStorage:', localStorage.getItem('token'));
        return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
      } else {
        console.error('Invalid payload structure:', action.payload);
        return { ...state, loading: false, error: 'Invalid payload structure' };
      }
    case 'LOGIN_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      // localStorage.removeItem('userInfo');
      // localStorage.removeItem('token');
      return { ...state, user: null, token: null };
    case 'REGISTER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'REGISTER_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'REGISTER_FAIL':
      return { ...state, loading: false, error: action.payload };
      case 'FETCH_USERS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_USERS_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        users: action.payload,
        role: state.user ? state.user.role : null,
        userId: state.user ? state.user.id : null 
      };
    case 'FETCH_USERS_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;