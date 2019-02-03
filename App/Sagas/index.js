import { takeLatest } from 'redux-saga/effects'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { PostsTypes } from 'App/Stores/Posts/Actions'
import { ExampleTypes } from 'App/Stores/Example/Actions'
import { fetchTemperature } from './ExampleSaga'
import { fetchPosts } from './PostsSaga'
import { startup } from './StartupSaga'

export default function* root() {
  yield [
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    // Call `fetchTemperature()` when a `FETCH_TEMPERATURE` action is triggered
    takeLatest(ExampleTypes.FETCH_TEMPERATURE, fetchTemperature),
    takeLatest(PostsTypes.FETCH_POSTS, fetchPosts),
  ]
}
