import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  // Fetch the current weather temperature
  fetchPosts: null,
  // The operation has started and is loading
  fetchPostsLoading: null,
  // The temperature was successfully fetched
  fetchPostsSuccess: ['posts'],
  // An error occurred
  fetchPostsFailure: ['errorMessage'],
})

export const PostsTypes = Types
export default Creators
