import React from 'react'
import { Platform, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import PostsActions from 'App/Stores/Posts/Actions'
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

    function procPosts(obj) {
      let res = ''
      if (typeof obj === 'object') {
        obj.map((ele) => {
          res += ele.get('title').get('rendered')
        })
      } else {
        res = obj
      }

      return res
    }

    return (
      <View style={Style.container}>
        <Text style={Style.title}>TheXXCodingMachine boilerplate</Text>
        <Text style={Style.text}>To get started, edit App.js</Text>
        <Text style={Style.text}>{instructions}</Text>
        <Text style={Style.text}>The weather temperature is: {procPosts(posts)}</Text>
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
  posts: state.posts.get('posts'),
  postsErrorMessage: state.posts.get('postsErrorMessage'),
  postsIsLoading: state.posts.get('postsIsLoading'),
  // isHot: isHot(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(PostsActions.fetchPosts()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleScreen)
