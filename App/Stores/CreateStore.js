import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistReducer, persistStore } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import immutableTransform from 'redux-persist-transform-immutable'
import { AsyncStorage } from 'react-native'

/**
 * This import defaults to localStorage for web and AsyncStorage for react-native.
 *
 * Keep in mind this storage *is not secure*. Do not use it to store sensitive information
 * (like API tokens, private and sensitive data, etc.).
 *
 * If you need to store sensitive information, use redux-persist-sensitive-storage.
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */

const persistConfig = {
  transforms: [
    /**
     * This is necessary to support immutable reducers.
     * @see https://github.com/rt2zz/redux-persist-transform-immutable
     */
    immutableTransform(),
    // TODO: Make Offset Reset after each normal refresh
  ],
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
}

export default (rootReducer, rootSaga) => {
  const middleware = []
  const enhancers = []

  // Connect the sagas to the redux store
  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  enhancers.push(applyMiddleware(...middleware))

  // Redux persist
  const persistedReducer = persistReducer(persistConfig, rootReducer)


  let store = null

  if (__DEV__) {
    store = createStore(persistedReducer, compose(...enhancers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
  } else {
    store = createStore(persistedReducer, compose(...enhancers))
  }

  const persistor = persistStore(store)

  // TODO: Uncomment this to purge Redux Store
  // console.log('Persistor Purge!')
  // persistor.purge()

  // Kick off the root saga
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}