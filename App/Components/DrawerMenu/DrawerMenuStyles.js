import { StyleSheet } from 'react-native'
import Fonts from '../../Theme/Fonts'

export default StyleSheet.create({
  drawerItems: {
    ...Fonts.family.bold,
    fontSize: 24,
    lineHeight: 28,
    textTransform: 'uppercase',
  },
  container: {
    flex: 1,
  },
  topContainer: {},
})
