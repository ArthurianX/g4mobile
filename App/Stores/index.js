import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as PostsReducer } from './Posts/Reducers'
import { reducer as SettingsReducer } from './Settings/Reducers'

export default () => {
  const rootReducer = combineReducers({
    /**
     * Register your reducers here.
     * @see https://redux.js.org/api-reference/combinereducers
     */
    posts: PostsReducer,
    settings: SettingsReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
