import sortedUniqBy from 'lodash-es/sortedUniqBy'
import sortBy from 'lodash-es/sortBy'
import uniqBy from 'lodash-es/uniqBy'
import findIndex from 'lodash-es/findIndex'
import { difference } from 'lodash-es'
import { LoggingService } from './SentryLoggingService'

function loggingExtractIds(arr, context) {
  let res = ''
  arr.map((ele) => (res += ele.id + ' >> '))
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

function sortByTime(arr) {
  return sortBy(arr, (ele) => (new Date(ele.date).getTime() / 1000) | 0).reverse()
}

/* Merge Posts as the user loads them, limit is 500 */
function mergePosts(present, incoming) {
  const actual = convertPresent(present)

  let collection =
    incoming && incoming.length
      ? removeDuplicates(actual.concat(incoming))
      : removeDuplicates(actual)
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

  let collection =
    incoming && incoming.length
      ? removeDuplicates(actual.concat(incoming))
      : removeDuplicates(actual)
  collection = sortByTime(collection)
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

function getNewCount(existing, actual) {
  const processedPosts = convertPresent(existing)
  let existingIndexes = []
  let actualIndexes = []
  actual.map((ele) => existingIndexes.push(ele.id))
  processedPosts.map((ele) => actualIndexes.push(ele.id))
  return difference(existingIndexes, actualIndexes).length
}

export const PostsMiddleware = {
  mergePosts: LoggingService.wrap(mergePosts, 'warning', 'object').bind(this),
  mergePostsWithStartupTrim: LoggingService.wrap(
    mergePostsWithStartupTrim,
    'warning',
    'object'
  ).bind(this),
  getSpecificPost: LoggingService.wrap(getSpecificPost, 'warning', 'object').bind(this),
  mergeAndFilter,
  getNewCount: LoggingService.wrap(getNewCount, 'warning', 'object').bind(this),
}
