import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { PostsTypes } from './Actions'
import { PostsMiddleware } from 'App/Services/PostsMiddlewareService'

export const fetchPostsLoading = (state) =>
  state.merge({
    postsIsLoading: true,
    postsErrorMessage: '',
  })

export const fetchPostsSuccess = (state, { posts }) =>
  state.merge({
    posts: PostsMiddleware.mergePosts(state.get('posts'), posts),
    postsIsLoading: false,
    postsErrorMessage: null,
    apiCallPageOffset: state.get('apiCallPageOffset') + posts.length,
    // TODO: Momentarily this breaks everything, every page load we get a new offset. FIX THIS
  })

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
