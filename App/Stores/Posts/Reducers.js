import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { PostsTypes } from './Actions'

export const fetchPostsLoading = (state) =>
  state.merge({
    postsIsLoading: true,
    postsErrorMessage: '',
  })

export const fetchPostsSuccess = (state, { posts }) => {
  // TODO: Debug > console.log('fetchPostsSuccess', state, posts)
  console.log('fetchPostsSuccess', state, posts)
  return state.merge({
    posts: posts,
    postsIsLoading: false,
    postsErrorMessage: null,
  })
}

export const fetchPostsFailure = (state, { errorMessage }) =>
  state.merge({
    posts: null,
    postsIsLoading: false,
    postsErrorMessage: errorMessage,
  })

export const reducer = createReducer(INITIAL_STATE, {
  [PostsTypes.FETCH_POSTS_LOADING]: fetchPostsLoading,
  [PostsTypes.FETCH_POSTS_SUCCESS]: fetchPostsSuccess,
  [PostsTypes.FETCH_POSTS_FAILURE]: fetchPostsFailure,
})
