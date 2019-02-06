import { put, call, select } from 'redux-saga/effects'
import PostsActions from 'App/Stores/Posts/Actions'
import { G4MediaService } from 'App/Services/g4MediaService'
import { PostsApiParamsSelector, PostsSavedSelector } from 'App/Stores/Posts/Selectors'
import { PostsMiddleware } from 'App/Services/PostsMiddlewareService'

// Fetch from the latest Posts
export function* fetchPosts() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(PostsActions.fetchPostsLoading())

  const payload = yield select(PostsApiParamsSelector)
  const existingPosts = yield select(PostsSavedSelector)
  const newPosts = yield call(G4MediaService.getAllPosts, undefined, payload)
  const posts = PostsMiddleware.mergePostsWithStartupTrim(existingPosts, newPosts)

  if (posts) {
    yield put(PostsActions.fetchPostsSuccess(posts))
  } else {
    yield put(
      PostsActions.fetchPostsFailure('There was an error while fetching the latest posts.')
    )
  }
}
// Fetch iteratively posts with page offset
export function* fetchMorePosts() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(PostsActions.fetchPostsLoading())

  const payload = yield select(PostsApiParamsSelector)
  const existingPosts = yield select(PostsSavedSelector)
  const newPosts = yield call(G4MediaService.getAllPosts, undefined, payload)
  const posts = PostsMiddleware.mergePosts(existingPosts, newPosts)


  if (posts) {
    yield put(PostsActions.fetchMorePostsSuccess(posts))
  } else {
    yield put(
      // TODO: Have to send a notification here when we don't get new posts and send the old ones
      PostsActions.fetchPostsFailure('There was an error while fetching the latest posts.')
    )
  }
}
