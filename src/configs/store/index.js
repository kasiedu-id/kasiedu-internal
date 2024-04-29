import { configureStore } from '@reduxjs/toolkit';
import combine from './combine';

const store = configureStore({ reducer: combine });

export default store;