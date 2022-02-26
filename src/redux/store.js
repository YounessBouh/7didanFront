import {createStore,applyMiddleware,compose} from 'redux'
import reducers from './reducers/index'
import thunk from 'redux-thunk'

// createStore take the reducer element 
//and middleware (like thunk or saga) to change from synchronis to asynchronis 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store=createStore(
       reducers,
        composeEnhancers(applyMiddleware(thunk))
         )

export default store;