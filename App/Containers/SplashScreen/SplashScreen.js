import React from 'react'
import { Text, View, Image } from 'react-native'
import styles from './SplashScreenStyle'
import Animations from 'App/Theme/Animations'
import LottieView from 'lottie-react-native'
import { withTheme } from 'react-native-paper'

class SplashScreen extends React.Component {
  render() {
    console.log('SPLASH', this.props)
    return (
      <View style={[styles.container, { backgroundColor: this.props.theme.colors.background }]}>
         <LottieView source={Animations.santa} autoPlay loop resizeMode={'cover'} />
      </View>
    )
  }
}

export default withTheme(SplashScreen)
