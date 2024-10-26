const initialState = {
  cafeterias: [],
  loading: false,
  error: null,
  cafeteriaDetails: {
    cafeteria: null,
    loading: false,
    error: null,
  },
  createCafeteria: {
    loading: false,
    error: null,
    success: false,
  },
  assignManager: {
    loading: false,
    error: null,
    success: false,
  },
  };
  
  const cafeteriaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CAFETERIAS_REQUEST':
    return { ...state, loading: true, error: null };
    case 'FETCH_CAFETERIAS_SUCCESS':
    return { ...state, loading: false, cafeterias: action.payload };
    case 'FETCH_CAFETERIAS_FAIL':
    return { ...state, loading: false, error: action.payload };
    case 'FETCH_CAFETERIA_DETAILS_REQUEST':
    return { ...state, cafeteriaDetails: { ...state.cafeteriaDetails, loading: true, error: null } };
    case 'FETCH_CAFETERIA_DETAILS_SUCCESS':
    return { ...state, cafeteriaDetails: { ...state.cafeteriaDetails, loading: false, cafeteria: action.payload } };
    case 'FETCH_CAFETERIA_DETAILS_FAIL':
    return { ...state, cafeteriaDetails: { ...state.cafeteriaDetails, loading: false, error: action.payload } };
    case 'CREATE_CAFETERIA_REQUEST':
    return { ...state, createCafeteria: { loading: true, error: null, success: false } };
    case 'CREATE_CAFETERIA_SUCCESS':
    return { ...state, createCafeteria: { loading: false, error: null, success: true }, cafeterias: [...state.cafeterias, action.payload] };
    case 'CREATE_CAFETERIA_FAIL':
    return { ...state, createCafeteria: { loading: false, error: action.payload, success: false } };
    case 'ASSIGN_MANAGER_REQUEST':
    return { ...state, assignManager: { loading: true, error: null, success: false } };
    case 'ASSIGN_MANAGER_SUCCESS':
    return { ...state, assignManager: { loading: false, error: null, success: true } };
    case 'ASSIGN_MANAGER_FAIL':
    return { ...state, assignManager: { loading: false, error: action.payload, success: false } };
    case 'FETCH_GERANT_CAFETERIA_REQUEST':
    return { ...state, loading: true, error: null };
    case 'FETCH_GERANT_CAFETERIA_SUCCESS':
    return { ...state, loading: false, cafeterias: action.payload };
    case 'FETCH_GERANT_CAFETERIA_FAIL':
    return { ...state, loading: false, error: action.payload };
    default:
    return state;
  }
  };
  
  export default cafeteriaReducer;