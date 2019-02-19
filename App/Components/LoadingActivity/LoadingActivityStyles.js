import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  loadingActivityContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: 0,
    flex: 1,
    justifyContent: 'center',
  },
  loadingActivityHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoStyles: { padding: 10, marginLeft: -80, marginTop: 3 },
  lottieContainer: {
    transform: [
      { scaleX: 0.4 },
      { scaleY: 0.4 },
    ],
  },
})
