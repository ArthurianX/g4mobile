import React from 'react'
import { Text, View, Button, FlatList, ScrollView } from 'react-native'
import { Title } from 'react-native-paper'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import PostsActions from 'App/Stores/Posts/Actions'
import PostsCards from 'App/Components/PostsCards/PostsCards'
// import { isHot } from 'App/Stores/Example/Selectors'
import Style from './FilteredPostsScreenStyle'
import Animations from 'App/Theme/Animations'
import LottieView from 'lottie-react-native'

class FilteredPostsScreen extends React.Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    let posts = this.props.postsIsLoading ? [] : this.props.posts
    // if (posts === null) {
    //   posts = []
    // }

    function processPosts(items) {
      console.log('processPosts', items)
      let result = []
      if (items) {
        items.map((ele) => result.push({id: ele.get('id'), title: ele.get('title'), image: ele.get('jetpack_featured_media_url')}))
      }
      return result
    }

    return (
      <View style={Style.container}>
        <ScrollView>
          <Title style={Style.title}>Ultimele Articole</Title>
          <FlatList
            data={processPosts(posts)}
            renderItem={({ item }) => <PostsCards post={item} />}
          />
          {/* <Text style={Style.text}>{this.props.isHot ? "It's pretty hot!" : ''}</Text> */}
          <Text style={Style.text}>{this.props.postsErrorMessage}</Text>
          <Button onPress={this.props.fetchPosts} title="Mai multe" />
        </ScrollView>
      </View>
    )
  }
}

FilteredPostsScreen.propsTypes = {
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
  fetchPosts: () => {
    dispatch(PostsActions.fetchPosts(15, 0))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilteredPostsScreen)
