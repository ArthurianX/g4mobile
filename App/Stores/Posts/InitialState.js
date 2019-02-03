import { Map } from 'immutable'

/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = Map({
  posts: null,
  postsErrorMessage: null,
  postsIsLoading: false,
})
