export const PostsApiParamsSelector = (state) => {
  const payload = {
    per_page: state.posts.get('apiCallPageSize'),
    offset: state.posts.get('apiCallPageOffset'),
  }
  return payload
}

export const PostsSavedSelector = (state) => {
  return state.posts.get('posts')
}
