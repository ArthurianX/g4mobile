import React from 'react'
import { Portal } from 'react-native-paper'
import NotificationSnack from './NotificationSnack'
import PropTypes from 'prop-types'

class Notifications extends React.Component {
  render() {
    const Queue = this.props.messages.map((a, i) => {
      console.log('this.props.messages', this.props.messages)
      this.props.messages.slice(1, i)
      return <NotificationSnack content={a.content} />
    })
    return (
      <Portal>
        { Queue }
      </Portal>
    )
  }
}

NotificationSnack.propTypes = {
  messages: PropTypes.array,
}

export default Notifications
