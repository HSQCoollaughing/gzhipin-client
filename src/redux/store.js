/*
* redux的核心管理模块*/
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers'

//向外暴露store

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
)