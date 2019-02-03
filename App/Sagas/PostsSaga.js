import { put, call } from 'redux-saga/effects'
import PostsActions from 'App/Stores/Posts/Actions'
import { G4MediaService } from 'App/Services/g4MediaService'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch the weather temperature.
 * Feel free to remove it.
 */

const g4params = {
  page: 1,
  pageSize: 15,
  offset: 0,
}
// TODO: How to make this dynamic ?
// Call out other state? A filter state to get the params ?
// All the while saving every new post we can get our hands on.

export function* fetchPosts() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(PostsActions.fetchPostsLoading())

  // Fetch the temperature from an API
  const posts = yield call(G4MediaService.getAllPosts(g4params))

  if (posts) {
    yield put(PostsActions.fetchPostsSuccess(posts))
  } else {
    yield put(
      PostsActions.fetchPostsFailure('There was an error while fetching the latest posts.')
    )
  }
}
