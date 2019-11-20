import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';  // 使用 thunk 等中间件可以帮助在 Redux 应用中实现异步性
import {composeWithDevTools} from 'redux-devtools-extension';   // 调试工具
import reducers from './reducers';

const middleware =process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk);

export default createStore(reducers,middleware);