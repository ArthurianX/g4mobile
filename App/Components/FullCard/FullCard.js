import React from 'react'
import { Text, IconButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/EvilIcons'
import PropTypes from 'prop-types'
import Styles from './FullCardStyles'
import Snackbar from 'react-native-snackbar'
import { SharingService } from 'App/Services/SharingService'
import { Dimensions, ImageBackground, View } from 'react-native'

let shareIcon = {}
let externalIcon = {}
let { height, width } = Dimensions.get('window')

const showSnack = (message) => {
  Snackbar.show({
    title: message,
  })
}

class FullCard extends React.Component {
  componentDidMount() {
    Icon.getImageSource('share-apple', 25, '#fff').then((source) => (shareIcon = source))

    Icon.getImageSource('external-link', 25, '#fff').then((source) => (externalIcon = source))
  }
  render() {
    return (
      <ImageBackground
        source={{ uri: this.props.post.image || 'https://via.placeholder.com/600x400?text=G4' }}
        style={[Styles.card, { height: height * 0.6 }]}
      >
        <View style={{flex: 1 }} />
        <Text style={Styles.paragraph}>{this.props.post.title}</Text>
        <View style={Styles.actions}>
          <IconButton
            icon={shareIcon}
            color={'#fff'}
            size={35}
            style={{ marginTop: 6 }}
            onPress={() => SharingService.share(this.props.post)}
          />
          <IconButton
            icon={externalIcon}
            color={'#fff'}
            size={35}
            style={{ marginBottom: 0 }}
            onPress={() => SharingService.open(this.props.post.link)}
          />
        </View>
      </ImageBackground>
    )
  }
}

FullCard.propTypes = {
  post: PropTypes.object,
}

export default FullCard
