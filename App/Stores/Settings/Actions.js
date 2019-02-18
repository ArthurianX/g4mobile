import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  changeTheme: null,
  changeCategoryVisibility: null,
  changeDateVisibility: null,
  changeAuthorVisibility: null,
  changeNotificationStatus: null,
  globalReset: null, // https://github.com/rt2zz/redux-persist/issues/579
  pushNotification: ['message'],
  setNotification: ['currentNotification'],
  clearNotification: null,
})

export const SettingsTypes = Types
export default Creators
