import React from 'react'
import { Appbar, Modal, Portal, Surface, Title, withTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import PostsActions from '../../Stores/Posts/Actions'
import { connect } from 'react-redux'
import { WebView } from 'react-native-webview'
import Style from './PostModalStyles'
import { ScrollView, View } from 'react-native'

const getContent = (content) => {
  console.log('getContent', content)
  return content
}

class PostModal extends React.Component {
  // componentDidMount() {
  //   console.log('PostModal did mount', this);
  // }

  render() {
    const _hideModal = () => {
      this.props.open = false
    }
    return (
      <Portal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.post} onDismiss={_hideModal}>
          <View style={Style.container}>
            <Appbar style={{marginTop: 40, height: 20, paddingTop: 30, alignSelf: 'flex-end', flex: 0.03, flexDirection: 'row'}}>
              <Appbar.Action style={{marginRight: 5, marginTop: 20}} icon="close" onPress={() => this.props.closePost()} />
            </Appbar>

            <ScrollView style={{marginLeft: 12, marginRight: 12}}>
              <Title>{this.props.post ? this.props.post.get('title') : ''}</Title>
              <WebView
                originWhitelist={['*']}
                source={{html: this.props.post ? getContent(this.props.post.get('content')) : ''}}
              />
            </ScrollView>
          </View>
        </Modal>
      </Portal>
    )
  }
}

const mapStateToProps = (state) => ({
  post: state.posts.get('openPost')
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
