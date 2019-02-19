import React from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'
import LoadingActivity from 'App/Components/LoadingActivity/LoadingActivity'
import Images from 'App/Theme/Images'
import { PropTypes } from 'prop-types'

class SmallLogo extends React.Component {
  render() {
    return (
      <View>
        <Image
          style={{ height: 25, marginLeft: 20, zIndex: 2 }}
          resizeMode={'contain'}
          source={this.props.theme === 'dark' ? Images.g4logowhite : Images.g4logo}
        />
        {this.props.postsIsLoading ? <LoadingActivity /> : <View />}
      </View>
    )
  }
}

SmallLogo.propsTypes = {
  theme: PropTypes.string,
  postsIsLoading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  postsIsLoading: state.posts.get('postsIsLoading'),
})

export default connect(mapStateToProps)(SmallLogo)
