import { StyleSheet } from 'react-native'
import Fonts from '../../Theme/Fonts'

export default StyleSheet.create({
  drawerItems: {
    ...Fonts.family.regulae,
    fontSize: 16,
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  container: {
    flex: 1,
  },
  topContainer: {},
})
