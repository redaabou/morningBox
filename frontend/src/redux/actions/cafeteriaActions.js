import api from '../../services/api';

export const fetchCafeterias = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_CAFETERIAS_REQUEST' });
    const { data } = await api.get('/cafeterias');
    dispatch({ type: 'FETCH_CAFETERIAS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_CAFETERIAS_FAIL', payload: error.response.data.message });
  }
};

export const fetchCafeteriaDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_CAFETERIA_DETAILS_REQUEST' });
    const { data } = await api.get(`/cafeterias/${id}`);
    dispatch({ type: 'FETCH_CAFETERIA_DETAILS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_CAFETERIA_DETAILS_FAIL', payload: error.response?.data?.message || error.message });
  }
};

export const createCafeteria = (formData) => async (dispatch) => {
  
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await api.post('/cafeterias', formData, config);
    dispatch({ type: 'CREATE_CAFETERIA_SUCCESS', payload: data });
  } catch (error) {
    console.error('Error creating cafeteria:', error);
    dispatch({ type: 'CREATE_CAFETERIA_FAIL', payload: error.response?.data?.message || error.message });
  }
};

export const assignManager = (cafeteriaId, gerantId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  
    const { data } = await api.post('/assign-manager', { cafeteriaId, gerantId }, config);
    dispatch({ type: 'ASSIGN_MANAGER_SUCCESS', payload: data });
    
  } catch (error) {
    console.error('Error assigning manager:', error);
    dispatch({ type: 'ASSIGN_MANAGER_FAIL', payload: error.response?.data?.message || error.message });
  }
};

export const fetchGerantCafeteria = (gerantId) => async (dispatch) => {

  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: 'FETCH_GERANT_CAFETERIA_REQUEST' });
    const { data } = await api.get(`/gerant/${gerantId}/cafeterias`, config);
    dispatch({ type: 'FETCH_GERANT_CAFETERIA_SUCCESS', payload: data });
  
  }
  catch (error) {
    dispatch({ type: 'FETCH_GERANT_CAFETERIA_FAIL', payload: error.response.data.message });
  }

}