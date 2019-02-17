import React from 'react'
import { Card, Paragraph, Text, IconButton } from 'react-native-paper'
import PropTypes from 'prop-types'
import Styles from './PostsCardsStyles'

class PostsCards extends React.Component {
  render() {
    return (
      <Card
        elevation={0}
        style={Styles.card}>
        <Card.Cover source={{ uri: this.props.post.image || 'https://via.placeholder.com/600x400?text=G4' }} />
        <Text
          style={Styles.paragraph}>
          {this.props.post.title}
        </Text>
        <Card.Actions style={Styles.actions}>
          <IconButton
            icon="bookmark-border"
            color={'#7f7f7f'}
            size={25}
            onPress={() => console.log('Pressed', this.props.post)}
          />
          <IconButton
            icon="launch"
            color={'#7f7f7f'}
            size={25}
            onPress={() => console.log('Pressed')}
          />
          <IconButton
            icon="share"
            color={'#7f7f7f'}
            size={25}
            onPress={() => console.log('Pressed')}
          />

        </Card.Actions>
      </Card>
    )
  }
}

PostsCards.propTypes = {
  post: PropTypes.object,
}

export default PostsCards
