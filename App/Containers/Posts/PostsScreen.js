import React from 'react'
import { Text, View, Button, FlatList } from 'react-native'
import { Title } from 'react-native-paper'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import PostsActions from 'App/Stores/Posts/Actions'
import PostsCards from 'App/Components/PostsCards/PostsCards'
import LoadingActivity from 'App/Components/LoadingActivity/LoadingActivity'
import Style from './PostsScreenStyle'
import { withNavigationFocus } from 'react-navigation'

class PostsScreen extends React.Component {
  componentDidMount() {
    // They are already fetched on the Startup Cmpnt
    // this.props.fetchPosts()
    this.props.fetchMorePosts()
  }

  // componentDidUpdate(prevProps) {
  //   console.log('PostsScreen', prevProps)
  //   if (prevProps.isFocused !== this.props.isFocused) {
  //     // Use the `this.props.isFocused` boolean
  //     // Call any action
  //   }
  // }

  render() {
    function processPosts(items) {
      let result = []
      if (items) {
        let numberOfPosts = 0
        items.map((ele) => {
          numberOfPosts += 1
          result.push({id: ele.get('id'), title: ele.get('title'), image: ele.get('jetpack_featured_media_url')})
        })
        console.log('PostsScreen => Processing Posts #', numberOfPosts)
      }
      return result
    }

    return (
      <View style={Style.container}>
        {this.props.posts ? <Title style={Style.title}>Ultimele Articole</Title> : <View />}
        {this.props.postsIsLoading ? <LoadingActivity /> : <View />}

        <FlatList
          data={processPosts(this.props.posts)}
          onEndReachedThreshold={0.8}
          onEndReached={this.props.fetchMorePosts}
          renderItem={({ item }) => <PostsCards post={item} />}
        />
        {/* <Text style={Style.text}>{this.props.isHot ? "It's pretty hot!" : ''}</Text> */}
        <Text style={Style.text}>{this.props.postsErrorMessage}</Text>

        {/*<Button onPress={this.props.fetchMorePosts} title="Mai multe" />*/}

      </View>
    )
  }
}

PostsScreen.propsTypes = {
  posts: PropTypes.array,
  postsErrorMessage: PropTypes.string,
}

const mapStateToProps = (state) => ({
  posts: state.posts.get('posts'),
  postsErrorMessage: state.posts.get('postsErrorMessage'),
  postsIsLoading: state.posts.get('postsIsLoading'),
  pageSize: state.posts.get('apiCallPageSize'),
  pageOffset: state.posts.get('apiCallPageOffset'),
})

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(PostsActions.fetchPosts()),
  fetchMorePosts: (distance) => {
    dispatch(PostsActions.fetchMorePosts())
    // console.log('fetchMorePosts', distance)
    // if (distance < 100) {
    //   console.log('Distance reached, FETCH', distance)
    //   dispatch(PostsActions.fetchMorePosts())
    // }
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(PostsScreen))
