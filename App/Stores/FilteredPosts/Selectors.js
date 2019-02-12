export const FilteredPostsApiParamsSelector = (state) => {
  const payload = {
    per_page: state.filteredPosts.get('apiCallPageSize'),
    offset: state.filteredPosts.get('apiCallPageOffset'),
    category: state.filteredPosts.get('apiCallCategory'),
    author: state.filteredPosts.get('apiCallAuthor'),
  }
  return payload
}

export const FilteredPostsSavedSelector = (state) => {
  return state.filteredPosts.get('posts')
}
