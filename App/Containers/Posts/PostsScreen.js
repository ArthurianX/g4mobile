import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { withTheme } from 'react-native-paper'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import PostsActions from 'App/Stores/Posts/Actions'
import SettingsAction from 'App/Stores/Settings/Actions'
import PostsCards from 'App/Components/PostsCards/PostsCards'
import FullCard from 'App/Components/FullCard/FullCard'
import Style from './PostsScreenStyle'

let posts = []
const processPosts = (items) => {
  let result = []
  if (items) {
    let numberOfPosts = 0
    items.map((ele) => {
      numberOfPosts += 1
      result.push({
        id: ele.get('id'),
        title: ele.get('title'),
        date: ele.get('date'),
        link: ele.get('link'),
        excerpt: ele.get('excerpt'),
        image: ele.get('jetpack_featured_media_url'),
      })
    })
    // console.log('PostsScreen => Processing Posts #', numberOfPosts)
  }
  return result
}

class PostsScreen extends React.Component {
  componentDidMount() {
    // this.props.fetchMorePosts()
  }

  render() {
    const onPressItem = (postId) => {
      // this.props.navigation.navigate({ routeName: 'SinglePost', params: { post: post } })

      // const navigateToSinglePostAction = NavigationActions.navigate({
      //   routeName: 'Acasa',
      //   action: NavigationActions.navigate({ routeName: 'SinglePost', params: { post: post } }),
      // })
      // this.props.navigation.dispatch(navigateToSinglePostAction)

      this.props.navigation.navigate('SinglePost', { postId: postId })
    }
    const onRefresh = (id) => {
      this.props.fetchPosts()
    }

    posts = processPosts(this.props.posts)
    return (
      <View style={[Style.container, { flex: 1 }]}>
        {/* Commented FlatList Props, they don't work properly.
        onPressItem={onPressItem}
        onViewableItemsChanged={onViewableItemsChanged}
        keyExtractor={keyExtractor} */}
        <FlatList
          data={posts}
          onRefresh={onRefresh}
          refreshing={this.props.postsIsLoading}
          onEndReachedThreshold={0.8}
          onEndReached={this.props.fetchMorePosts}
          style={{ backgroundColor: this.props.theme.colors.background, paddingTop: 20 }}
          renderItem={({ item, index }) => {
            if (index === 0) {
              return (<TouchableOpacity onPress={onPressItem.bind(this, item.id)}><FullCard post={item} /></TouchableOpacity>)
            } else {
              return (<TouchableOpacity onPress={onPressItem.bind(this, item.id)}><PostsCards post={item} /></TouchableOpacity>)
            }
          }}
        />
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
  fetchMorePosts: () => dispatch(PostsActions.fetchMorePosts()),
  openPost: (post) => {
    dispatch(PostsActions.openPost(post))
  },
  createSnackbar: (message) => dispatch(SettingsAction.pushNotification(message)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(PostsScreen))
