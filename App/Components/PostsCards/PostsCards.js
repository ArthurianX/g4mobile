import React from 'react'
import { Card, Paragraph } from 'react-native-paper'
import PropTypes from 'prop-types'

class PostsCards extends React.Component {
  render() {
    return (
      <Card elevation={5} style={{ marginBottom: 12, marginLeft: 12, marginRight: 12 }}>
        <Card.Cover source={{ uri: this.props.post.image }} />
        <Card.Content>
          <Paragraph>{this.props.post.title}</Paragraph>
        </Card.Content>
      </Card>
    )
  }
}

PostsCards.propTypes = {
  post: PropTypes.object,
}

export default PostsCards
