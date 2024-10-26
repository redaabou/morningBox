import api from '../../services/api';

export const login = (email, motDePasse) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });
    const { data } = await api.post('/login', { email, motDePasse });
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response?.data?.message || error.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};

export const register = (nom, prenom, email, motDePasse) => async (dispatch) => {
  try {
    dispatch({ type: 'REGISTER_REQUEST' });
    const { data } = await api.post('/register', { nom, prenom, email, motDePasse });
    dispatch({ type: 'REGISTER_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  } catch (error) {
    dispatch({ type: 'REGISTER_FAIL', payload: error.response?.data?.message || error.message });
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
   
    dispatch({ type: 'FETCH_USERS_REQUEST' });
    const { data } = await api.get('/users', config);
    dispatch({ type: 'FETCH_USERS_SUCCESS', payload: data });

  } catch (error) {
    dispatch({ type: 'FETCH_USERS_FAIL', payload: error.response?.data?.message || error.message });
  }
};