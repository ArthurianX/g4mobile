import React from 'react'
import { Card, Paragraph } from 'react-native-paper'
import PropTypes from 'prop-types'

class PostsCards extends React.Component {
  render() {
    return (
      <Card
        elevation={3} style={{ marginBottom: 14, marginLeft: 0, marginRight: 0 }}>
        <Card.Cover source={{ uri: this.props.post.image || 'https://via.placeholder.com/600x400?text=G4' }} />
        <Card.Content>
          <Paragraph style={{fontWeight: 'bold', fontSize: 16, lineHeight: 16, marginTop: 10}}>
            {this.props.post.title}
          </Paragraph>
        </Card.Content>
      </Card>
    )
  }
}

PostsCards.propTypes = {
  post: PropTypes.object,
}

export default PostsCards
