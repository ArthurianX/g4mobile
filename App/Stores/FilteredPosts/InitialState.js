import { Map } from 'immutable'

export const INITIAL_STATE = Map({
  posts: null,
  postsErrorMessage: null,
  postsIsLoading: false,
  categories: null,
  authors: null,
  apiCallPageSize: 10,
  apiCallPageOffset: 0,
  apiCallCategory: null,
  apiCallAuthor: null,
})
