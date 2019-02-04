import { put, call } from 'redux-saga/effects'
import PostsActions from 'App/Stores/Posts/Actions'
import { G4MediaService } from 'App/Services/g4MediaService'

export function* fetchPosts() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(PostsActions.fetchPostsLoading())

  // Fetch the temperature from an API
  // console.log('G4Call', G4MediaService.getAllPosts(g4params));
  // TODO: Use here a filters action, to be created
  const posts = yield call(G4MediaService.getAllPosts)

  if (posts) {
    yield put(PostsActions.fetchPostsSuccess(posts))
  } else {
    yield put(
      PostsActions.fetchPostsFailure('There was an error while fetching the latest posts.')
    )
  }
}
