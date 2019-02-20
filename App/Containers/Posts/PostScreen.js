import React from 'react'
import { View, Share } from 'react-native'
import { withTheme } from 'react-native-paper'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { WebView } from 'react-native-webview'
import Icon from 'react-native-vector-icons/EvilIcons'
import Style from './PostsScreenStyle'
import { WebViewStyles } from 'App/Theme/WebViewStyles'
import PostsActions from 'App/Stores/Posts/Actions'
import LoadingActivity from 'App/Components/LoadingActivity/LoadingActivity'
import { SharingService } from '../../Services/SharingService'

let currentPost = {}
const sharePost = (
  <Icon
    name='share-apple'
    size={35}
    onPress={() => SharingService.share(currentPost)}
    color="#15020A"
    style={{ marginRight: 8 }}
  />
)

const populateCurrentPost = (post) => {
  currentPost.link = post.get('link')
  currentPost.title = post.get('title')
  currentPost.excerpt = post.get('excerpt')
}
const getContent = (post, theme) => {
  /* Generate the styles */
  let htmlStyle = '<head title="WebView">'
  htmlStyle += '<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">'
  htmlStyle += WebViewStyles.generateStyle(theme)
  htmlStyle += '</head><body>'

  const title = `<h1>${post.get('title')}</h1>`

  const postImage = `<img src="${post.get('jetpack_featured_media_url')}" class="g4postimagemobile">`
  return htmlStyle + title + postImage + post.get('content') + '</body>'
}

const webViewRequest = (param) => {
  // console.log('onShouldStartLoadWithRequest', param)
  if (param.loading && param.navigationType === 'other') {
    return true
  }

  if (param.navigationType === 'click' && param.url) {
    SharingService.open(param.url)
  }
}

class PostScreen extends React.Component {
  componentDidMount() {
    this.props.openPost(this.props.navigation.state.params.postId)
  }
  render() {
    return (
      <View style={[Style.container, { backgroundColor: this.props.theme.colors.background }]}>
        { console.log('this.props.postthis.props.postthis.props.post', this.props.post) }
        { this.props.post ? populateCurrentPost(this.props.post) : <View />}
        <WebView
          style={{ backgroundColor: this.props.theme.colors.background}}
          startInLoadingState={true}
          renderLoading={() => <LoadingActivity />}
          originWhitelist={['*']}
          onShouldStartLoadWithRequest={webViewRequest}
          // onLoad={getMessages}
          // onLoadStart={() => switchLoadingState(true)}
          // onLoadEnd={() => switchLoadingState(false)}
          // onMessage={getMessages}
          // renderError={getMessages}
          // onError={(err)=> console.log('WebView err', err)}
          source={{
            html: this.props.post ? getContent(this.props.post, this.props.theme) : '',
          }}
        />
      </View>
    )
  }
}

PostScreen.propsTypes = {
  post: PropTypes.array,
}

PostScreen.navigationOptions = {
  headerRight: sharePost,
}

const mapStateToProps = (state) => ({
  post: state.posts.get('openPost'),
})

const mapDispatchToProps = (dispatch) => ({
  openPost: (postId) => dispatch(PostsActions.openPost(postId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(PostScreen))
