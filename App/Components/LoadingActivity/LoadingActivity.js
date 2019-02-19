import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import Style from './LoadingActivityStyles'
import Animations from 'App/Theme/Animations'
import LottieView from 'lottie-react-native'
import { PropTypes } from 'prop-types'

class LoadingActivity extends React.Component {
  render() {
    return (
      <View
        pointerEvents={'none'}
        style={[
          Style.loadingActivityContainer,
          Style.loadingActivityHorizontal,
          this.props.logoplace ? { padding: 10, marginLeft: -80, marginTop: 3 } : {},
        ]}
      >
        <ActivityIndicator size="large" color="#15020A" />
        {/* <LottieView style={Style.lottieContainer} source={Animations.loading} autoPlay loop resizeMode={'cover'} /> */}
      </View>
    )
  }
}

LoadingActivity.propsTypes = {
  logoplace: PropTypes.bool,
  visible: PropTypes.bool,
}

export default LoadingActivity
