import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'

export default StyleSheet.create({
  card: {
    marginBottom: 14,
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 0,
    paddingRight: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  paragraph: {
    ...Fonts.family.bold,
    flex: 0.6,
    fontSize: 20,
    lineHeight: 24,
    paddingLeft: 12,
    paddingRight: 12,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2
  },
  actions: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})
