export const PostsPageParamsSelector = (state) => {
  const payload = {
    pageSize: state.example.get('apiCallPageSize'),
    pageOffset: state.example.get('apiCallPageOffset'),
  }
  return payload
}
