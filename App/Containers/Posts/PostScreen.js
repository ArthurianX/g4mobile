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
import { LoggingService } from '../../Services/SentryLoggingService'

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

const showSnack = (message) => {
  Snackbar.show({
    title: message,
  })
}

const shareArticle = async (post) => {
  const content = {
    url: post.link,
    message: CleanMarkupService.getPlain(post.excerpt),
    title: post.title,
    dialogTitle: post.title,
    subject: post.title,
  }

  try {
    const result = await Share.share(content)

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
        showSnack('Articol distribuit')
      } else {
        // shared
        showSnack('Articol distribuit')
      }
    } else if (result.action === Share.dismissedAction) {
      showSnack('Articolul nu a fost distribuit')
    }
  } catch (error) {
    LoggingService.log('Share Activity Fail', 'SHARE', error)
  }
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
        { console.log('this.props.postthis.props.postthis.props.post', this.props.post) }
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
