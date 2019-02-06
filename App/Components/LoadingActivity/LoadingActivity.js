import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import Style from './LoadingActivityStyles'
import Animations from 'App/Theme/Animations'
import LottieView from 'lottie-react-native'

export default class LoadingActivity extends React.Component {
  render() {
    return (
      <View
        pointerEvents={'none'}
        style={[Style.loadingActivityContainer, Style.loadingActivityHorizontal]}>
        <ActivityIndicator size="large" color="#0487f3" />
        {/* <LottieView style={Style.lottieContainer} source={Animations.loading} autoPlay loop resizeMode={'cover'} /> */}
      </View>
    )
  }
}
