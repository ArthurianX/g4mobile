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

function getAllPosts() {

}

function getCategories() {

}

export const SavedPostsMiddleware = {
  getAllPosts,
  getCategories,
}
