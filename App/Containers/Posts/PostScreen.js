import React from 'react'
import { View, Share, ActivityIndicator } from 'react-native'
import { Title, withTheme } from 'react-native-paper'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Style from './PostsScreenStyle'
import { WebViewStyles } from 'App/Theme/WebViewStyles'
import { WebView } from 'react-native-webview'
import PostsActions from '../../Stores/Posts/Actions'
import Icon from 'react-native-vector-icons/EvilIcons'
import { CleanMarkupService } from '../../Services/CleanMarkupService'
import Snackbar from 'react-native-snackbar'

let currentPost = {}
const sharePost = (
  <Icon
    name='share-apple'
    size={35}
    onPress={() => shareArticle(currentPost)}
    color="#15020A"
    style={{ marginRight: 8 }}
  />
)

const populateCurrentPost = (post) => {
  currentPost.link = post.get('link')
  currentPost.title = post.get('title')
  currentPost.excerpt = post.get('excerpt')
}

const shareArticle = (post) => {
  const content = {
    url: post.link,
    message: CleanMarkupService.getPlain(post.excerpt),
    title: post.title,
    dialogTitle: post.title,
    subject: post.title,
  }

  const failureCallback = (param) => {
    console.log('failureCallback', param)
  }
  const successCallback = (param) => {
    console.log('successCallback', param)
  }

  console.log('Share Content', content)
  Share.share(content).then((param) => {
    // Use this to dispatch a Redux / Saga to send a notification
    // cbck(param.action)

    // OR use this to just create a snackbar
    if (param.action !== 'dismissedAction') {
      Snackbar.show({
        title: 'Articol distribuit',
      })
    }
  })
}

const getContent = (post, theme) => {
  /* Generate the styles */
  let htmlStyle = '<head title="WebView">'
  htmlStyle += WebViewStyles.generateStyle(theme)
  htmlStyle += '</head><body>'

  const title = `<h1>${post.get('title')}</h1>`

  const postImage = `<img src="${post.get('jetpack_featured_media_url')}" class="g4postimagemobile">`
  return htmlStyle + title + postImage + post.get('content') + '</body>'
}

class PostScreen extends React.Component {
  componentDidMount() {
    this.props.openPost(this.props.navigation.state.params.postId)
  }
  render() {
    return (
      <View style={[Style.container, { backgroundColor: this.props.theme.colors.background }]}>
        { this.props.post ? populateCurrentPost(this.props.post) : <View />}
        <WebView
          style={{ backgroundColor: this.props.theme.colors.background}}
          originWhitelist={['*']}
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
