import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { PostsTypes } from './Actions'


export const fetchPostsLoading = (state) =>
  state.merge({
    postsIsLoading: true,
    postsErrorMessage: '',
  })

export const fetchPostsSuccess = (state, { posts }) =>
  state.merge({
    posts: posts,
    postsIsLoading: false,
    postsErrorMessage: null,
  })

export const fetchMorePostsSuccess = (state, { posts }) =>
  state.merge({
    posts: posts,
    postsIsLoading: false,
    postsErrorMessage: null,
    apiCallPageOffset: state.get('apiCallPageOffset') + posts.length,
  })

export const fetchPostsFailure = (state, { errorMessage }) =>
  state.merge({
    posts: null,
    postsIsLoading: false,
    postsErrorMessage: errorMessage,
  })

export const resetOffset = (state) =>
  state.merge({
    apiCallPageOffset: 0,
    openPost: null,
  })

export const openPostModal = (state, { post }) =>
  state.merge({
    openPost: post,
  })

export const closePostModal = (state) =>
  state.merge({
    openPost: null,
  })


export const reducer = createReducer(INITIAL_STATE, {
  [PostsTypes.FETCH_POSTS_LOADING]: fetchPostsLoading,
  [PostsTypes.FETCH_POSTS_SUCCESS]: fetchPostsSuccess,
  [PostsTypes.FETCH_MORE_POSTS_SUCCESS]: fetchMorePostsSuccess,
  [PostsTypes.FETCH_POSTS_FAILURE]: fetchPostsFailure,
  [PostsTypes.FETCH_POSTS_FAILURE]: fetchPostsFailure,
  [PostsTypes.RESET_OFFSET]: resetOffset,
  [PostsTypes.OPEN_POST_MODAL]: openPostModal,
  [PostsTypes.CLOSE_POST_MODAL]: closePostModal,
})
