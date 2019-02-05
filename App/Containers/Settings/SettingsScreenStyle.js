import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    margin: 12,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  title: {
    //...Fonts.style.h2,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  text: {
    ...Fonts.style.normal,
    textAlign: 'center',
    marginBottom: 5,
  },
  disabled: {
    opacity: 0.5,
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: 20
  },
  tableStyle: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  themeContainer: {
    marginLeft: -12,
    marginRight: -12,
    height: 100,
  },
  themeContainerLottie: {
    width: '100%',
    transform: [
      { scaleX: 0.6 },
      { scaleY: 0.6 },
    ],
    height: 300,
    marginLeft: 0,
    zIndex: 1000,
  },
  belowLottie: {
    textAlign: 'center',
    marginTop: -100,
    marginBottom: 50,
    fontSize: 18,
    zIndex: 100,
  }
})
