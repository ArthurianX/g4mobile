import { put } from 'redux-saga/effects'
import SettingsActions from 'App/Stores/Settings/Actions'

// import { PostsApiParamsSelector } from '../Stores/Posts/Selectors';

export function* changeTheme() {
  yield put(SettingsActions.changeTheme())
}

export function* changeCategoryVisibility() {
  yield put(SettingsActions.changeCategoryVisibility())
}

export function* changeDateVisibility() {
  yield put(SettingsActions.changeDateVisibility())
}

export function* changeAuthorVisibility() {
  yield put(SettingsActions.changeAuthorVisibility())
}

export function* changeNotificationStatus() {
  yield put(SettingsActions.changeNotificationStatus())
}

export function* globalReset() {
  // Do a Redux Store Reset Here.
}

export function* pushNotification(payload) {
  yield put(SettingsActions.setNotification(payload.message))
}
