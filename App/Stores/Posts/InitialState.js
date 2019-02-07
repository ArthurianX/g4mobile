import { Map } from 'immutable'

/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = Map({
  posts: null,
  postsErrorMessage: null,
  postsIsLoading: false,
  apiCallPageSize: 15,
  apiCallPageOffset: 0,
  openPost: null
  // TODO: How to handle new posts when updating over existing store ?!!?!?
})
