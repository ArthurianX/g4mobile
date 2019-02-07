import sortedUniqBy from 'lodash-es/sortedUniqBy'
import uniqBy from 'lodash-es/uniqBy'
import findIndex from 'lodash-es/findIndex'

function loggingExtractIds(arr, context) {
  let res = ''
  arr.map((ele) => res += ele.id + ' >> ')
  console.log(context, ':  ', res)
}

function convertPresent(arr) {
  if (arr && typeof arr === 'object') {
    const interim = arr.toArray()
    return interim.map((ele) => ele.toObject())
  } else {
    return []
  }
}

function removeDuplicates(arr) {
  return uniqBy(arr, (ele) => ele.id)
}

function limitNumber(arr, nr) {
  if (arr.length > nr) {
    return arr.slice(0, nr)
  } else {
    return arr
  }
}

function sortById(arr) {
  return sortedUniqBy(arr, (ele) => ele.id)
}

/* Merge Posts as the user loads them, limit is 500 */
function mergePosts(present, incoming) {
  const actual = convertPresent(present)

  let collection = incoming && incoming.length ? removeDuplicates(actual.concat(incoming)) : removeDuplicates(actual)
  // loggingExtractIds(collection, 'Right after merge')
  collection = sortById(collection)
  // loggingExtractIds(collection, 'Should be Sorted by ID')
  collection = limitNumber(collection, 500)
  // loggingExtractIds(collection, 'Should be Limited')

  // console.log('mergePosts INPUT: ')
  // console.log('present: ', present)
  // console.log('incoming: ', incoming)
  // console.log('OUTPUT: ', limitNumber(collection.reverse(), 30))
  
  return collection
}
/* Merge Initial Posts on load - Cut the lot of them, leave only 30 news + whatever comes new. */
function mergePostsWithStartupTrim(present, incoming) {
  const actual = convertPresent(present)

  let collection = incoming && incoming.length ? removeDuplicates(actual.concat(incoming)) : removeDuplicates(actual)
  collection = sortById(collection)
  collection = limitNumber(collection, 30)

  // console.log('mergePostsWithStartupTrim INPUT: ')
  // console.log('present: ', present)
  // console.log('incoming: ', incoming)
  // console.log('OUTPUT: ', limitNumber(collection.reverse(), 30))
  
  return collection
}

function mergeAndFilter() {}

function getSpecificPost(id, posts) {
  const processedPosts = convertPresent(posts)
  return processedPosts[findIndex(processedPosts, { id: id })]
}

export const PostsMiddleware = {
  mergePosts,
  mergePostsWithStartupTrim,
  getSpecificPost,
  mergeAndFilter,
}
