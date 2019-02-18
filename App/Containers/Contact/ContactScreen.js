import React from 'react'
import { Text, View, Button, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Style from './ContactScreenStyle'

class ContactScreen extends React.Component {
  componentDidMount() {
    // this.props.fetchPosts()
  }

  render() {
    return (
      <View style={Style.container}>
        <ScrollView>
          <Text>Contact Page</Text>
        </ScrollView>
      </View>
    )
  }
}

ContactScreen.propsTypes = {
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
)(ContactScreen)
