import React from 'react'
import { Appbar, Modal, Paragraph, Portal, Surface, Title, withTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import PostsActions from '../../Stores/Posts/Actions'
import { connect } from 'react-redux'
import { Text, View, Dimensions, Picker } from 'react-native';


class PostsFilters extends React.Component {
  // componentDidMount() {
  //   console.log('PostModal did mount', this);
  // }
  state = {
    language: 'java'
  }
  render() {
    return (
      <View>
        <Text>Select Shit</Text>
        <Picker
          selectedValue={this.state.language}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            console.log('onValueChange', itemValue, itemIndex)
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  filters: state.posts.get('filters')
})

const mapDispatchToProps = (dispatch) => ({
  // closePost: () => dispatch(PostsActions.closePost()),
})

PostsFilters.propTypes = {
  filters: PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(PostsFilters))
