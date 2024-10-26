const initialState = {
    menus: [],
    loading: false,
    error: null,
    createMenu: {
      loading: false,
      error: null,
      success: false,
    },
  };

  
  const menuReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_MENUS_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_MENUS_SUCCESS':
        return { ...state, loading: false, menus: action.payload };
      case 'FETCH_MENUS_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'CREATE_MENU_REQUEST':
        return { ...state, createMenu: { loading: true, error: null, success: false } };
      case 'CREATE_MENU_SUCCESS':
        return { ...state, createMenu: { loading: false, error: null, success: true }, menus: [...state.menus, action.payload] };
      case 'CREATE_MENU_FAIL':
        return { ...state, createMenu: { loading: false, error: action.payload, success: false } };
      case 'DELETE_MENU_REQUEST':
        return { ...state, loading: true, error: null };
      case 'DELETE_MENU_SUCCESS':
        return { ...state, loading: false, menus: state.menus.filter((menu) => menu._id !== action.payload) };
      case 'DELETE_MENU_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'UPDATE_MENU_REQUEST':
        return { ...state, loading: true, error: null };
      case 'UPDATE_MENU_SUCCESS':
        return { ...state, loading: false, menus: state.menus.map((menu) => (menu._id === action.payload._id ? action.payload : menu)) };
      case 'UPDATE_MENU_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'MARK_MENU_AS_EPUISÉ_REQUEST':
        return { ...state, loading: true, error: null };
      case 'MARK_MENU_AS_EPUISÉ_SUCCESS':
        return { ...state, loading: false, menus: state.menus.map((menu) => (menu._id === action.payload._id ? action.payload : menu)) };
      case 'MARK_MENU_AS_EPUISÉ_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default menuReducer;