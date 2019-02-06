import React from 'react'
import { Text, View, Button, FlatList, ScrollView } from 'react-native'
import { Title } from 'react-native-paper'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import PostsActions from 'App/Stores/Posts/Actions'
import PostsCards from 'App/Components/PostsCards/PostsCards'
import Style from './PostsScreenStyle'

class PostsScreen extends React.Component {
  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    let posts = this.props.postsIsLoading ? [] : this.props.posts

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
        <ScrollView>
          {/* TODO: Removing ^ this will leave the title fixed at the top */}

          <Title style={Style.title}>Ultimele Articole</Title>

          {/*{this.props.postsIsLoading ? <Component /> : <OtherComponent />}*/}

          <FlatList
            data={processPosts(this.props.posts)}
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsScreen)
