import React from 'react'
import { Text, View, Image } from 'react-native'
import styles from './SplashScreenStyle'
import Animations from 'App/Theme/Animations'
import Images from 'App/Theme/Images'
import LottieView from 'lottie-react-native'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
            {/* <LottieView source={Animations.logo} autoPlay loop /> */}
            <Image source={Images.g4logo} />
        </View>
      </View>
    )
  }
}
