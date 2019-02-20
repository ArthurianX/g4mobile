import React from 'react'
import { Linking, View, Share } from 'react-native'
import { Card, Text, IconButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/EvilIcons'
import PropTypes from 'prop-types'
import Styles from './PostsCardsStyles'
import { CleanMarkupService } from 'App/Services/CleanMarkupService'
import Snackbar from 'react-native-snackbar'
import { LoggingService } from '../../Services/SentryLoggingService'
import { SharingService } from '../../Services/SharingService'

let shareIcon = {}
let externalIcon = {}

const showSnack = (message) => {
  Snackbar.show({
    title: message,
  })
}

class PostsCards extends React.Component {
  componentDidMount() {
    Icon.getImageSource('share-apple', 25, '#7f7f7f').then((source) => (shareIcon = source))

    Icon.getImageSource('external-link', 25, '#7f7f7f').then((source) => (externalIcon = source))
  }
  render() {
    return (
      <Card elevation={0} style={Styles.card}>
        <Card.Cover
          source={{ uri: this.props.post.image || 'https://via.placeholder.com/600x400?text=G4' }}
        />
        <Text style={Styles.paragraph}>{this.props.post.title}</Text>
        <Card.Actions style={Styles.actions}>
          {/* <IconButton
            icon="bookmark-border"
            color={'#7f7f7f'}
            size={25}
            onPress={() => console.log('Pressed', this.props.post)}
          /> */}
          {/* <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <Text>{this.props.post.date}</Text>
          </View> */}
          <IconButton
            icon={shareIcon}
            color={'#7f7f7f'}
            size={35}
            onPress={() => SharingService.share(this.props.post)}
          />
          <IconButton
            icon={externalIcon}
            color={'#7f7f7f'}
            size={35}
            style={{ marginBottom: 1 }}
            onPress={() => SharingService.open(this.props.post.link)}
          />
        </Card.Actions>
      </Card>
    )
  }
}

PostsCards.propTypes = {
  post: PropTypes.object,
  notificationCallback: PropTypes.func,
}

export default PostsCards
