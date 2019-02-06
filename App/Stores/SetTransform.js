import { createTransform } from 'redux-persist'
import omit from 'lodash-es/omit'

const blacklistPaths = ['posts.apiCallPageOffset']

const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // convert mySet to an Array.
    console.log('inboundState', inboundState, key)
    return { ...inboundState, mySet: [...inboundState.mySet] }
  },
  // transform state being rehydrated
  (outboundState, key) => {
    // convert mySet back to a Set.
    console.log('outboundState', outboundState, key)
    return { ...outboundState, mySet: new Set(outboundState.mySet) };
  },
  // define which reducers this transform gets called for.
  { whitelist: ['someReducer'] }
)

export default SetTransform


// const blacklistPaths = ['posts.apiCallPageOffset']
// createTransform((inboundState, key) => {
//   console.log('createTransform', inboundState, key)
//   // Blacklist specific props and nested props based on blacklistPaths above
//   if (blacklistPaths.indexOf(key) != -1) return undefined
//   const blacklistPathsForKey = blacklistPaths
//     .filter((path) => path.startsWith(`${key}.`))
//     .map((path) => path.substr(key.length + 1))
//   return blacklistPathsForKey.length
//     ? omit(inboundState, ...blacklistPathsForKey)
//     : inboundState
// }, null),