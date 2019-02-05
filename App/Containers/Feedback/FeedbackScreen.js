import React from 'react'
import { Text, View, Button, FlatList, ScrollView } from 'react-native'
import { Title } from 'react-native-paper'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import PostsActions from 'App/Stores/Posts/Actions'
import PostsCards from 'App/Components/PostsCards/PostsCards'
// import { isHot } from 'App/Stores/Example/Selectors'
import Style from './FeedbackScreen'
import Animations from 'App/Theme/Animations'
import LottieView from 'lottie-react-native'

class FeedbackScreen extends React.Component {
  componentDidMount() {
    // this.props.fetchPosts()
  }

  render() {
    return (
      <View style={Style.container}>
        <ScrollView>
          <Text>Feedback Page</Text>
        </ScrollView>
      </View>
    )
  }
}

FeedbackScreen.propsTypes = {
  posts: PropTypes.array,
  postsErrorMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  // posts: state.posts.get('posts'),
  // postsErrorMessage: state.posts.get('postsErrorMessage'),
  // postsIsLoading: state.posts.get('postsIsLoading'),
  // pageSize: state.posts.get('apiCallPageSize'),
  // pageOffset: state.posts.get('apiCallPageOffset'),
})

const mapDispatchToProps = (dispatch) => ({
  // fetchPosts: () => {
  //   dispatch(PostsActions.fetchPosts(15, 0))
  // },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackScreen)
