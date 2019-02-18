import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Style from './AboutUsScreenStyle'

class AboutUs extends React.Component {
  componentDidMount() {
    // this.props.fetchPosts()
  }

  render() {
    return (
      <View style={Style.container}>
        <ScrollView>
          <Text>About Us Page</Text>
        </ScrollView>
      </View>
    )
  }
}

AboutUs.propsTypes = {
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
)(AboutUs)
