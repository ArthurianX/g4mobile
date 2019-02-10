import { put } from 'redux-saga/effects'
import PostsActions from 'App/Stores/Posts/Actions'
import NavigationService from 'App/Services/NavigationService'

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html

  yield put(PostsActions.fetchPosts())

  // Add more operations you need to do at startup here
  // ...

  // When those operations are finished we redirect to the main screen
  NavigationService.navigateAndReset('MainScreen')
  //setTimeout(() => NavigationService.navigateAndReset('MainScreen'), 4000)
  // TODO: Uncomment the setTimeout to let the SplashScreen work.
}
