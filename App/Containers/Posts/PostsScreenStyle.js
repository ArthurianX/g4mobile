import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    // margin: 12,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  text: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
  },
  loadingActivityContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingActivityHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
})
