import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  loadingActivityContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: 1000,
    flex: 1,
    justifyContent: 'center',
  },
  loadingActivityHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  lottieContainer: {
    transform: [
      { scaleX: 0.6 },
      { scaleY: 0.6 },
    ],
  },
})
