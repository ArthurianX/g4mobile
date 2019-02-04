import React from 'react'
import { Title, Card } from 'react-native'
import PropTypes from 'prop-types'

class PostsCards extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Title>{this.post.title}</Title>
        </Card.Content>
        <Card.Cover source={{ uri: this.post.jetpack_featured_media_url }} />
      </Card>
    )
  }
}

PostsCards.propTypes = {
  post: PropTypes.object,
}

export default PostsCards
