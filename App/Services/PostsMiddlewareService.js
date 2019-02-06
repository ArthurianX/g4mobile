import sortedUniqBy from 'lodash-es/sortedUniqBy'

function convertPresent(arr) {
  const interim = arr.toArray()
  return interim.map((ele) => ele.toObject())
}

function removeDuplicates(arr) {
  return sortedUniqBy(arr, (ele) => ele.id)
}

function limitNumber(arr, nr) {
  return arr.slice(0, nr)
}

function mergePosts(present, incoming) {
  const actual = present && present.length
    ? convertPresent(present)
    : []

  let collection = incoming && incoming.length
    ? removeDuplicates(actual.concat(incoming))
    : removeDuplicates(actual)

  return collection.length > 500
    ? limitNumber(collection.reverse(), 500)
    : collection.reverse()
}

function mergePostsWithStartupTrim(present, incoming) {
  const actual = present && present.length
    ? convertPresent(present)
    : []

  let collection = incoming && incoming.length
    ? removeDuplicates(actual.concat(incoming))
    : removeDuplicates(actual)

  return collection.length > 30
    ? limitNumber(collection.reverse(), 30)
    : collection.reverse()
}

function mergeAndFilter() {}

export const PostsMiddleware = {
  mergePosts,
  mergePostsWithStartupTrim,
  mergeAndFilter,
}
