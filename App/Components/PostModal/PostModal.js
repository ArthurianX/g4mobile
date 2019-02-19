import React from 'react'
import { Appbar, Modal, Portal, Title, withTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import PostsActions from '../../Stores/Posts/Actions'
import { connect } from 'react-redux'
import Style from './PostModalStyles'
import { WebView } from 'react-native-webview'
import { View } from 'react-native'
import { WebViewStyles } from 'App/Theme/WebViewStyles'

const getContent = (props) => {
  let htmlStyle = '<head title="WebView">'
  htmlStyle += WebViewStyles.generateStyle(props.theme)
  htmlStyle += '</head>'

  const postImage = `
    <body>
    <img src="${props.post.get('jetpack_featured_media_url')}" class="g4postimagemobile"> 
  `
  // console.log('Generated Content is ', props, htmlStyle + postImage + props.post.get('content'));
  return htmlStyle + postImage + props.post.get('content') + '</body>'
}

const getMessages = (message, param1) => {
  console.log('getMessages', message, param1)
}

class PostModal extends React.Component {
  // componentDidMount() {
  //   console.log('PostModal did mount', this);
  // }

  render() {
    const _hideModal = () => {
      this.props.open = false
      console.log('this.props.theme', this.props.theme)
    }
    return (
      <Portal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.post} onDismiss={_hideModal}>
          <View style={[Style.container, {backgroundColor: this.props.theme.colors.background}]}>
            <Appbar style={{marginTop: 40, height: 20, paddingTop: 30, alignSelf: 'flex-end', flex: 0.03, flexDirection: 'row'}}>
              <Appbar.Action style={{marginRight: 5, marginTop: -20}} icon="close" onPress={() => this.props.closePost()} />
            </Appbar>
            <Title style={Style.titleFont}>
              {this.props.post ? this.props.post.get('title') : ''}
            </Title>
            <WebView
              style={[Style.contentFont, { backgroundColor: this.props.theme.colors.background }]}
              originWhitelist={['*']}
              // onLoad={getMessages}
              // onLoadStart={getMessages}
              // onLoadEnd={getMessages}
              // onMessage={getMessages}
              // renderError={getMessages}
              // onError={(err)=> console.log('WebView err', err)}
              source={{ html: this.props.post ? getContent(this.props) : '', baseUrl: 'https://www.google/com' }}
            />
          </View>
        </Modal>
      </Portal>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.posts.get('openPost'),
  // snack: state.posts.get('currentSnack'),
})

const mapDispatchToProps = (dispatch) => ({
  closePost: () => dispatch(PostsActions.closePost()),
})

PostModal.propTypes = {
  post: PropTypes.object,
  open: PropTypes.bool,
}
// TODO: Perf IDEA, maybe get the state out, and render the component dynamically from RootScreen
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(PostModal))
