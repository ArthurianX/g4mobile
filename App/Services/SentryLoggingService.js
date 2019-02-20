import { Sentry } from 'react-native-sentry'
import createStore from 'App/Stores'
import Snackbar from 'react-native-snackbar'
// Sentry.captureMessage('onBeforeLift - Redux stuck in')

let ActionsQueue = []
console.log('Actions Queue Started', ActionsQueue)

const _setAlertLevel = (level) => {
  let setLevel = {
    logLevel: 'warning',
  }
  switch (level) {
    case 'fatal':
      setLevel.logLevel = 'fatal'
      break
    case 'error':
      setLevel.logLevel = 'error'
      break
    case 'warning':
      setLevel.logLevel = 'warning'
      break
    case 'info':
      setLevel.logLevel = 'info'
      break
    case 'debug':
      setLevel.logLevel = 'debug'
      break
    default:
      setLevel.logLevel = 'warning'
  }
  // Sentry.config('logLevel', setLevel.logLevel)
}

const _respondWithoutEscalating = (responseType) => {
  let response = null
  switch (responseType) {
    case 'array':
      response = []
      break
    case 'object':
      response = () => false
      break
    case 'boolean':
      response = false
      break
    case 'integer':
      response = 0
      break
    case 'string':
      response = ''
      break
  }
  return response
}

const _userAlert = (whatAlert) => {
  Snackbar.show({
    title: 'Este o problema! Reporniti aplicatia.',
  })
}

const _minimizeStoreFootprint = (store) => {
  // Remove all the big content from posts.
  const demutizedStore = JSON.parse(JSON.stringify(store))
  if (demutizedStore.posts.posts) {
    // demutizedStore.posts.posts = demutizedStore.posts.posts.map((ele) => ({
    //   id: ele.id,
    //   title: ele.title,
    //   date: ele.date,
    // }))
    delete demutizedStore.posts.posts
  }
  if (demutizedStore.filteredPosts.posts) {
    // demutizedStore.filteredPosts.posts = demutizedStore.filteredPosts.posts.map((ele) => ({
    //   id: ele.id,
    //   title: ele.title,
    //   date: ele.date,
    // }))
    delete demutizedStore.filteredPosts.posts
  }
  return demutizedStore
}

const _minimizeActionFootprint = (action) => {
  // Remove all the big content from posts.
  if (action.posts !== undefined) {
    delete action.posts
    // action.posts = action.posts.map((ele) => ({
    //   id: ele.id,
    //   title: ele.title,
    //   date: ele.date,
    // }))
  }
  if (action.payload !== undefined) {
    delete action.payload
    // action.posts = action.posts.map((ele) => ({
    //   id: ele.id,
    //   title: ele.title,
    //   date: ele.date,
    // }))
  }
  return JSON.parse(JSON.stringify(action))
}

const recordActions = (payload) => {
  // console.log('recordActions', payload)
  ActionsQueue.push({
    action: _minimizeActionFootprint(payload.action),
    store: _minimizeStoreFootprint(payload.store),
  })
}

const logEvent = (eventName, eventType, attachedData) => {
  // We also need to dump the Redux Store and it's action up until this point.
  console.log('Sentry logEvent - ', eventName, attachedData)
  Sentry.setExtraContext({ eventData: JSON.stringify(attachedData) })
  Sentry.captureMessage(eventName)
  Sentry.captureException(new Error(eventType))
}

const wrapResponse = (callback, alertLevel, responseType) => {
  _setAlertLevel(alertLevel)
  // On Catch send exception and the Redux store.
  try {
    return callback // Params are bound as the last param with .bind(this, params) ?
  } catch (err) {
    _userAlert('')
    Sentry.setExtraContext({ redux_state: JSON.stringify(ActionsQueue) })
    ActionsQueue = []
    Sentry.captureException(err)
    return _respondWithoutEscalating(responseType) // TODO: This is not working, crap.
  }
}

export const LoggingService = {
  log: logEvent,
  recordActions: recordActions,
  wrap: wrapResponse,
}
