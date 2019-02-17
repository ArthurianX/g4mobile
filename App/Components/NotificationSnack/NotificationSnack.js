import React from 'react'
import { Snackbar } from 'react-native-paper'
import PropTypes from 'prop-types'

class NotificationSnack extends React.Component {
  render() {
    return (
      <Snackbar.DURATION_SHORT visible={true}>{this.props.content}</Snackbar.DURATION_SHORT>
    )
  }
}
NotificationSnack.propTypes = {
  options: PropTypes.object,
  content: PropTypes.string,
  action: PropTypes.func,
  actionTitle: PropTypes.string,
}

export default NotificationSnack
