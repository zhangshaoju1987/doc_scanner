import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './reducer/rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createLogger} from 'redux-logger';

const persistConfig =
{
	key: 'root',
	storage: AsyncStorage,

};

/**
 * 所谓中间件:就是在中间环节对数据进行处理并将结果传递下去的一种链式结构
 */
const loggerMiddleware = createLogger();
const persistedReducer = persistReducer(persistConfig, rootReducer);
const enhancers = compose(
	applyMiddleware(thunk, loggerMiddleware),
	//applyMiddleware(thunk),
);
const store = createStore(persistedReducer, enhancers);
const persistor = persistStore(store);

export { store, persistor }