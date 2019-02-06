import { create } from 'apisauce'
import { Config } from 'App/Config'

const g4MediaApiClient = create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

// page=1&per_page=10&offset=10
function searchQuery(params) {
  if (!params) {
    return ''
  }
  let query = '?'
  Object.entries(params).map((ele, idx) => {
    query += ele[0] ? ele[0] : ''
    query += ele[0] ? '=' : ''
    query += (ele[1] || ele[1] === 0) ? ele[1] : ''
    query += idx - 1 >= Object.entries(params).length ? '&' : ''
  })
  if (query !== '?') {
    // return escape(query)
    return query
  } else {
    return ''
  }
}

function mergePosts(present, incoming) {
  console.log('Merge Posts', present, incoming)
  /*
   * mergePosts logic:
   * - Do not let in duplicates
   * - Arrange by date
   * - Always maximum of 100 posts
   * - New ones need to be attached on top, then refiltered <= 100
   * - TODO: Still need to think about this.
    * */
}

function mergeAndFilter() {}

export const PostsMiddleware = {
  mergePosts,
  mergeAndFilter,
}
