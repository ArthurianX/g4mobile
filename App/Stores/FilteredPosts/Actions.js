import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchPosts: ['apiCallPageSize', 'apiCallPageOffset', 'apiCallAuthor', 'apiCallCategory'],
  fetchPostsLoading: null,
  fetchPostsSuccess: ['posts'],
  fetchPostsFailure: ['errorMessage'],

  fetchCategories: ['categories'],
  fetchAuthors: ['authors']

})

export const PostsTypes = Types
export default Creators
