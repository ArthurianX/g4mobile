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

function processResponse(payload, type) {
  function pick(raw, allowed) {
    return Object.keys(raw)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        if (raw[key]['rendered']) {
          obj[key] = raw[key]['rendered']
        } else {
          obj[key] = raw[key]
        }

        return obj
      }, {})
  }
  let result = []

  if (type === 'post') {
    const pickAttrs = ['id', 'author', 'categories', 'content', 'date', 'excerpt', 'jetpack_featured_media_url', 'title'];
    payload.map((ele) => result.push(pick(ele, pickAttrs)))
  }

  return result
}

function getAllPosts(undefined, params) {
  console.log('API CALL to ', 'posts' + searchQuery(params))
  // return g4MediaApiClient.get('posts' + searchQuery(params)).then((response) => {
  return g4MediaApiClient.get('posts', params).then((response) => {
    if (response.ok) {
      console.info('g4MediaApiClient response OK', response.data)
      return processResponse(response.data, 'post')
    }
    console.info('g4MediaApiClient response FAIL', response)

    return null
  })
}

/* For Storage */
function getCategories() {
  return g4MediaApiClient.get('categories').then((response) => {
    if (response.ok) {
      return processResponse(response.data, 'category')
    }

    return null
  })
}

export const G4MediaService = {
  getAllPosts,
  getCategories,
}
