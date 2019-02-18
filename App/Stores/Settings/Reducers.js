import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { SettingsTypes } from './Actions'

export const settingsChangeTheme = (state) =>
  state.merge({
    theme: state.get('theme') ? 0 : 1,
  })

export const settingsCategoryVisibility = (state) =>
  state.merge({
    show_categories: state.get('show_categories') ? 0 : 1,
  })

export const settingsDateVisibility = (state) =>
  state.merge({
    show_dates: state.get('show_dates') ? 0 : 1,
  })

export const settingsAuthorVisibility = (state) =>
  state.merge({
    show_author: state.get('show_author') ? 0 : 1,
  })

export const settingsNotificationStatus = (state) =>
  state.merge({
    notification: state.get('notification') ? 0 : 1,
  })

export const setNotification = (state, { currentNotification }) =>
  state.merge({
    currentNotification: currentNotification,
  })

export const clearNotification = (state) =>
  state.merge({
    currentNotification: '',
  })

export const reducer = createReducer(INITIAL_STATE, {
  [SettingsTypes.CHANGE_THEME]: settingsChangeTheme,
  [SettingsTypes.CHANGE_CATEGORY_VISIBILITY]: settingsCategoryVisibility,
  [SettingsTypes.CHANGE_DATE_VISIBILITY]: settingsDateVisibility,
  [SettingsTypes.CHANGE_AUTHOR_VISIBILITY]: settingsAuthorVisibility,
  [SettingsTypes.CHANGE_NOTIFICATION_STATUS]: settingsNotificationStatus,
  [SettingsTypes.SET_NOTIFICATION]: setNotification,
  [SettingsTypes.CLEAR_NOTIFICATION]: clearNotification,
})
