import React from 'react'
import { Text, View, Image } from 'react-native'
import styles from './SplashScreenStyle'
import Animations from 'App/Theme/Animations'
import LottieView from 'lottie-react-native'
import { withTheme } from 'react-native-paper'

class SplashScreen extends React.Component {
  render() {
    return (
      <View style={[styles.container, { backgroundColor: '#15202A' }]}>
      { /* <View style={[styles.container, { backgroundColor: this.props.theme.colors.background }]}> */ }
          <LottieView source={Animations.transition} autoPlay loop={true} resizeMode={'cover'} />
      </View>
    )
  }
}

export default withTheme(SplashScreen)
