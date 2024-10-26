import api from '../../services/api';

export const fetchMenus = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_MENUS_REQUEST' });
    const response = await api.get('/menus');
    console.log('API Response:', response); // Log the response
    dispatch({ type: 'FETCH_MENUS_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('API Error:', error); // Log the error
    console.error('Error Response:', error.response); // Log the error response
    dispatch({ type: 'FETCH_MENUS_FAIL', payload: error.response?.data?.message || error.message });
  }
};

//create menu
export const createMenu = (formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await api.post('/menus', formData, config);
    console.log('API Response:', data); // Log the response
    dispatch({ type: 'CREATE_MENU_SUCCESS', payload: data });
  } catch (error) {
    console.error('API Error:', error); // Log the error
    console.error('Error Response:', error.response); // Log the error response
    dispatch({ type: 'CREATE_MENU_FAIL', payload: error.response?.data?.message || error.message });
  }
};

// deleteMenu, updateMenu, markMenuAsEpuisé 
export const deleteMenu = (id) => async (dispatch) => {
  console.log('Deleting menu with ID:', id);
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await api.delete(`/menus/${id}`, config);
    dispatch({ type: 'DELETE_MENU_SUCCESS', payload: id });
  } catch (error) {
    console.error('API Error:', error); // Log the error
    console.error('Error Response:', error.response); // Log the error response
    dispatch({ type: 'DELETE_MENU_FAIL', payload: error.response?.data?.message || error.message });
  }
};

export const updateMenu = (id, formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await api.put(`/menus/${id}`, formData, config);
    console.log('API Response:', data); // Log the response
    dispatch({ type: 'UPDATE_MENU_SUCCESS', payload: data });
  } catch (error) {
    console.error('API Error:', error); // Log the error
    console.error('Error Response:', error.response); // Log the error response
    dispatch({ type: 'UPDATE_MENU_FAIL', payload: error.response?.data?.message || error.message });
  }
};

export const markMenuAsEpuisé = (id, status) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = await api.put(`/menus/${id}/epuise`, null, config, status);
    console.log('API Response:', data); // Log the response
    dispatch({ type: 'MARK_MENU_AS_EPUISÉ_SUCCESS', payload: data });
  } catch (error) {
    console.error('API Error:', error); // Log the error
    console.error('Error Response:', error.response); // Log the error response
    dispatch({ type: 'MARK_MENU_AS_EPUISÉ_FAIL', payload: error.response?.data?.message || error.message });
  }
};