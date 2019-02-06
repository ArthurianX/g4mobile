import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistReducer, persistCombineReducers, persistStore, createTransform } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import immutableTransform from 'redux-persist-transform-immutable'
import omit from 'lodash-es/omit'

/**
 * This import defaults to localStorage for web and AsyncStorage for react-native.
 *
 * Keep in mind this storage *is not secure*. Do not use it to store sensitive information
 * (like API tokens, private and sensitive data, etc.).
 *
 * If you need to store sensitive information, use redux-persist-sensitive-storage.
 * @see https://github.com/CodingZeal/redux-persist-sensitive-storage
 */
import storage from 'redux-persist/lib/storage'

const blacklistPaths = ['posts.apiCallPageOffset']

const persistConfig = {
  transforms: [
    /**
     * This is necessary to support immutable reducers.
     * @see https://github.com/rt2zz/redux-persist-transform-immutable
     */
    immutableTransform(),
    createTransform((inboundState, key) => {
      // Blacklist specific props and nested props based on blacklistPaths above
      if (blacklistPaths.indexOf(key) != -1) return undefined
      const blacklistPathsForKey = blacklistPaths
        .filter((path) => path.startsWith(`${key}.`))
        .map((path) => path.substr(key.length + 1))
      return blacklistPathsForKey.length
        ? omit(inboundState, ...blacklistPathsForKey)
        : inboundState
    }, null),
  ],
  key: 'root',
  storage: storage,
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
  // const persistedReducer = persistCombineReducers(persistConfig, rootReducer)

  const store = createStore(
    persistedReducer,
    compose(
      ...enhancers,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // TODO: Remove Redux DevTools on prod
    )
    )
  const persistor = persistStore(store)

  // TODO: Uncomment this to purge Redux Store
  // console.log('Persistor Purge!')
  // persistor.purge()

  // Kick off the root saga
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
