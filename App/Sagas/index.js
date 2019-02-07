import { takeLatest, all } from 'redux-saga/effects'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { PostsTypes } from 'App/Stores/Posts/Actions'
import { fetchPosts, fetchMorePosts, closePost, openPost } from './PostsSaga'
import { startup } from './StartupSaga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(PostsTypes.FETCH_POSTS, fetchPosts),
    takeLatest(PostsTypes.FETCH_MORE_POSTS, fetchMorePosts),
    takeLatest(PostsTypes.CLOSE_POST, closePost),
    takeLatest(PostsTypes.OPEN_POST, openPost),
  ])
}
