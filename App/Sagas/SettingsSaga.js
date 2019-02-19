import { put, select } from 'redux-saga/effects'
import SettingsActions from 'App/Stores/Settings/Actions'
import Snackbar from 'react-native-snackbar'
import { GetSettingsSelector } from 'App/Stores/Settings/Selectors'
import createStore from 'App/Stores'

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
  setTimeout(() => {
    Snackbar.show({
      title: 'Am adus ultimele articole',
      // title: payload.message, TODO: Message is crappy, fix this.
      duration: Snackbar.LENGTH_SHORT,
    })
  })
  yield put(SettingsActions.setNotification(payload.message))
}

export function* checkAppVersion(payload) {
  const { store, persistor } = createStore()

  // Check app version against the stored one, if different, clear storage
  const settings = yield select(GetSettingsSelector)

  const newVersion = payload.version.appVersion + payload.version.buildVersion

  if (settings.get('appVersion') === undefined) {
    // Means version is not set yet.
    yield put(SettingsActions.setAppVersion(newVersion))
  } else if (newVersion !== settings.get('appVersion')) {
    persistor.purge()
    setTimeout(() => {
      Snackbar.show({
        title: 'Versiune noua! Am sters setarile vechi.',
        // title: payload.message, TODO: Message is crappy, fix this.
        duration: Snackbar.LENGTH_SHORT,
      })
    }, 7000)
    yield put(SettingsActions.setAppVersion(newVersion))
  }
}
