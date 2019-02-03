import React from 'react'
import { Platform, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import PostsActions from 'App/Stores/Posts/Actions'
// import ExampleActions from 'App/Stores/Example/Actions'
// import { isHot } from 'App/Stores/Example/Selectors'
import Style from './ExampleScreenStyle'
/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and shows the weather temperature.
 * Feel free to remove it.
 */

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menuuuuuuu.',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu.',
})

class ExampleScreen extends React.Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    let posts = this.props.postsIsLoading ? '...' : this.props.posts
    if (posts === null) {
      posts = '??'
    }

    return (
      <View style={Style.container}>
        <Text style={Style.title}>TheXXCodingMachine boilerplate</Text>
        <Text style={Style.text}>To get started, edit App.js</Text>
        <Text style={Style.text}>{instructions}</Text>
        <Text style={Style.text}>The weather temperature is: {posts}</Text>
        {/* <Text style={Style.text}>{this.props.isHot ? "It's pretty hot!" : ''}</Text> */}
        <Text style={Style.text}>{this.props.postsErrorMessage}</Text>
        <Button onPress={this.props.fetchPosts} title="Refresh" />
      </View>
    )
  }
}

ExampleScreen.propsTypes = {
  posts: PropTypes.array,
  postsErrorMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  posts: state.example.get('posts'),
  postsErrorMessage: state.example.get('postsErrorMessage'),
  postsIsLoading: state.example.get('postsIsLoading'),
  // isHot: isHot(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(PostsActions.fetchPosts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleScreen)
