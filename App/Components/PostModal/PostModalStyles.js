import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    marginTop: 0,
  },
  titleFont: {
    ...Fonts.family.bold,
    fontSize: 18,
    lineHeight: 24,
    marginLeft: '4%',
    marginRight: '4%',
  },
  contentFont: {
    ...Fonts.family.regular,
    fontSize: 14,
    lineHeight: 16,
    width: '100%',
    flex: 1,
  },
})
