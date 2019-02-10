import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Fetch the current weather temperature
  fetchPosts: ['apiCallPageSize', 'apiCallPageOffset'],
  fetchMorePosts: ['apiCallPageSize', 'apiCallPageOffset'],
  // The operation has started and is loading
  fetchPostsLoading: null,
  // The temperature was successfully fetched
  fetchPostsSuccess: ['posts'],
  fetchMorePostsSuccess: ['posts'],
  // An error occurred
  fetchPostsFailure: ['errorMessage'],
  // Reset Fetch Posts API Offset
  resetOffset: null,
  openPost: ['post'],
  openPostModal: ['post'],
  closePostModal: null,
  closePost: null,
})

export const PostsTypes = Types
export default Creators
