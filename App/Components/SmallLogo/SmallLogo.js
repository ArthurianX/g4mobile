import React from 'react'
import { View, Easing, Animated, Image } from 'react-native'
import Animations from 'App/Theme/Animations'
import LottieView from 'lottie-react-native'
import Images from '../../Theme/Images'

// <LottieView
//
// resizeMode={'center'}
// source={Animations.themeSwitcher}
//
// />

let animationProgress = new Animated.Value(0)

const animateToEnd = () => {
  Animated.timing(animationProgress, {
    toValue: 0.1,
    duration: 10,
    easing: Easing.none,
  }).start()
}
 // animateToEnd()

//
// setInterval( () => {
//   Animated.timing(animationProgress, {
//     toValue: 0.1,
//     duration: 10,
//     easing: Easing.none,
//   }).start( () => animateToEnd() )
// }, 5000)

export default class SmallLogo extends React.Component {
  // render() {
  //   Animated.timing(animationProgress, {
  //     toValue: 0.1,
  //     duration: 2500,
  //     easing: Easing.none,
  //   }).start()
  //   return (
  //     <LottieView
  //       style={{height: 80, marginTop: -5}}
  //       progress={animationProgress}
  //       source={Animations.smallLogo}
  //       resizeMode={'contain'} />
  //   )
  // }
  render() {
    return (<Image style={{height: 70, marginTop: -5}} resizeMode={'contain'} source={Images.g4logo} />)
  }
}
