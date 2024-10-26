import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import cafeteriaReducer from './reducers/cafeteriaReducer';
import menuReducer from './reducers/menuReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cafeteria: cafeteriaReducer,
    menu: menuReducer,
  },
});

export default store;