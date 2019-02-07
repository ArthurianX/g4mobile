import React from 'react'
import { Modal, Portal, Text, withTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import PostsActions from '../../Stores/Posts/Actions'
import { connect } from 'react-redux'

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
        <Modal visible={this.props.post} onDismiss={_hideModal}>

          <Text>Example Modal {this.props.post ? this.props.post.get('title') : ''}</Text>
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
