import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import reducer  from '@/modules/counter/counterSlice';
const isDev = process.env.NODE_ENV === 'development';

const makeStore = () => 
    configureStore({
        reducer,
        middleware: getDefaultMiddleware =>
        isDev ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
        devTools: isDev,
    })
export const wrapper = createWrapper(makeStore, {
    debug: isDev,
});

const store = makeStore();

//type 정의 
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;