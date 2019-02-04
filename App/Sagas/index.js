import { takeLatest, all, call } from 'redux-saga/effects'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { PostsTypes } from 'App/Stores/Posts/Actions'
import { ExampleTypes } from 'App/Stores/Example/Actions'
import { fetchTemperature } from './ExampleSaga'
import { fetchPosts } from './PostsSaga'
import { startup } from './StartupSaga'
import { delay } from 'redux-saga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(PostsTypes.FETCH_POSTS, fetchPosts),
    // Call `fetchTemperature()` when a `FETCH_TEMPERATURE` action is triggered
    takeLatest(ExampleTypes.FETCH_TEMPERATURE, fetchTemperature),
    call(delay, 3000),
  ])
}
