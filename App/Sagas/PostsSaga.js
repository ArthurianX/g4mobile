import { put, call, select } from 'redux-saga/effects'
import PostsActions from 'App/Stores/Posts/Actions'
import { G4MediaService } from 'App/Services/g4MediaService'
import { PostsApiParamsSelector } from '../Stores/Posts/Selectors';

export function* fetchPosts() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(PostsActions.fetchPostsLoading())

  const payload = yield select(PostsApiParamsSelector)
  const posts = yield call(G4MediaService.getAllPosts, undefined, payload)

  if (posts) {
    yield put(PostsActions.fetchPostsSuccess(posts))
  } else {
    yield put(
      PostsActions.fetchPostsFailure('There was an error while fetching the latest posts.')
    )
  }
}
