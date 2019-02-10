import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Title } from 'react-native-paper'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import PostsActions from 'App/Stores/Posts/Actions'
import PostsCards from 'App/Components/PostsCards/PostsCards'
import LoadingActivity from 'App/Components/LoadingActivity/LoadingActivity'
import Style from './PostsScreenStyle'

let posts = []
const processPosts = (items) => {
  let result = []
  if (items) {
    let numberOfPosts = 0
    items.map((ele) => {
      numberOfPosts += 1
      result.push({id: ele.get('id'), title: ele.get('title'), image: ele.get('jetpack_featured_media_url')})
    })
    // console.log('PostsScreen => Processing Posts #', numberOfPosts)
  }
  return result
}

const keyExtractor = (item, index) => {
  // console.log('keyExtractor', item, index)
  return item.id
}

const onRefresh = (id) => {
  console.log('onPressItem', id)
}

const onViewableItemsChanged = (id) => {
  // console.log('onViewableItemsChanged', id)
}

class PostsScreen extends React.Component {
  componentDidMount() {
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
    const onPressItem = (post) => {
      this.props.openPost(post)
    }
    posts = processPosts(this.props.posts)
    return (
      <View style={[Style.container, { flex: 1 }]}>
        {this.props.posts ? <Title style={Style.title}>Ultimele Articole</Title> : <View />}
        {this.props.postsIsLoading ? <LoadingActivity /> : <View />}

        {/* Commented FlatList Props, they don't work properly.
        onPressItem={onPressItem}
        onRefresh={onRefresh}
        refreshing={this.props.postsIsLoading}
        onViewableItemsChanged={onViewableItemsChanged}
        keyExtractor={keyExtractor} */}
        <FlatList
          data={posts}
          onEndReachedThreshold={0.8}
          onEndReached={this.props.fetchMorePosts}
          renderItem={({ item }) => <TouchableOpacity onPress={onPressItem.bind(this, item)}><PostsCards post={item} /></TouchableOpacity>}
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
  fetchMorePosts: () => dispatch(PostsActions.fetchMorePosts()),
  openPost: (post) => {
    dispatch(PostsActions.openPost(post))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsScreen)
