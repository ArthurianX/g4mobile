// posts?

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
  let query = ''
  Object.entries(params).map((ele, idx) => {
    query += ele[0] ? ele[0] : ''
    query += ele[0] ? '=' : ''
    query += ele[1] ? ele[1] : ''
    query += idx - 1 <= Object.entries(params).length ? '&' : ''
  })
  return escape(query)
}

function getAllPosts(params) {
  return g4MediaApiClient.get('posts?' + searchQuery(params)).then((response) => {
    if (response.ok) {
      return response.data
    }

    return null
  })
}

/* For Storage */
function getCategories() {
  return g4MediaApiClient.get('categories').then((response) => {
    if (response.ok) {
      return response.data
    }

    return null
  })
}

export const G4MediaService = {
  getAllPosts,
  getCategories,
}
