import { StyleSheet } from 'react-native'
import Fonts from 'App/Theme/Fonts'

export default StyleSheet.create({
  card: {
    marginBottom: 24,
    marginLeft: 12,
    marginRight: 12,
    paddingLeft: 0,
    paddingRight: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    shadowColor: 'transparent',
  },
  cardContent: {
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  paragraph: {
    ...Fonts.family.bold,
    fontSize: 18,
    lineHeight: 24,
    marginTop: 10,
    paddingLeft: 4,
    paddingRight: 4,
  },
  actions: {
    flex: 1,
    justifyContent: 'flex-end',
  },
})
