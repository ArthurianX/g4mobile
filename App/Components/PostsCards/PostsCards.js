import React from 'react'
import { Linking, Platform, Share } from 'react-native'
import { Card, Text, IconButton } from 'react-native-paper'
import PropTypes from 'prop-types'
import Styles from './PostsCardsStyles'

const shareArticle = () => {
  const content = {
    url: 'asdasdasda',
    message: 'asdjskjdsakjdh sjakdfh sjkdfhjsadhfjsd',
    title: 'jsdkjsadjfkhsjdfhsd',
  }

  const failureCallback = (param) => {
    console.log('failureCallback', param)
  }
  const successCallback = (param) => {
    console.log('successCallback', param)
  }
  console.log('Share', Share)
  Share.share(content).then((param) => {
    console.log('Param', param)
  })
}

const openArticle = () => {
  console.log('Linking', Linking);
  Linking.openURL('https://www.g4media.ro/surse-cea-mai-mare-problema-in-pnl-cine-va-deschide-lista-pentru-europarlamentare-liberalii-amana-discutia-listei-inca-doua-saptamani.html').catch((err) => console.error('An error occurred', err));
}

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
            onPress={() => openArticle()}
          />
          <IconButton
            icon="share"
            color={'#7f7f7f'}
            size={25}
            onPress={() => {
              console.log('Pressed')
              shareArticle()
            }}
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
