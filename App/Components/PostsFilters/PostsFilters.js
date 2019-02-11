import React from 'react'
import { Button, withTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import PostsActions from '../../Stores/Posts/Actions'
import { connect } from 'react-redux'
import { View, Dimensions, Text, Picker, Animated, Easing } from 'react-native'

let animationProgress = new Animated.Value(36)

const toggleFilters = () => {
  if (animationProgress._value < 200) {
    Animated.timing(animationProgress, {
      toValue: 250,
      duration: 1000,
      easing: Easing.elastic(2),
    }).start()
  } else {
    Animated.timing(animationProgress, {
      toValue: 36,
      duration: 600,
      easing: Easing.none,
    }).start()
  }
}

class PostsFilters extends React.Component {
  // componentDidMount() {
  //   console.log('PostModal did mount', this);
  // }
  state = {
    language: 'java'
  }
  render() {
    return (
      <Animated.View style={{height: animationProgress}}>
        <Button icon="sort" color={this.props.theme.colors.accent} mode="outlined" onPress={toggleFilters}>
          Filtreaza
        </Button>
        <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 10}}>
          <View style={{flex: 0.33, flexDirection: 'column'}}>
            <Text style={{
              color: this.props.theme.colors.accent,
              width: '100%',
              textAlign: 'center',
              marginTop: 10,
              marginBottom: -10,
            }}>
              Categorie
            </Text>
            <Picker
              selectedValue={this.state.language}
              style={{ width: '100%' }}
              mode={'dialog'}
              prompt={'Selecteaza Categorii'}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="JavaScript" value="js" />
              <Picker.Item label="Elixir" value="el" />
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="Ruby" value="rb" />
              <Picker.Item label="Python" value="pt" />
            </Picker>
          </View>
          <View style={{flex: 0.33, flexDirection: 'column'}}>
            <Text style={{
              color: this.props.theme.colors.accent,
              width: '100%',
              textAlign: 'center',
              marginTop: 10,
              marginBottom: -10,
            }}>
              Autor
            </Text>
            <Picker
              selectedValue={this.state.language}
              style={{ width: '100%' }}
              mode={'dialog'}
              prompt={'Selecteaza Autor'}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="JavaScript" value="js" />
              <Picker.Item label="Elixir" value="el" />
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="Ruby" value="rb" />
              <Picker.Item label="Python" value="pt" />
            </Picker>
          </View>
          <View style={{flex: 0.33, flexDirection: 'column'}}>
            <Text style={{
              color: this.props.theme.colors.accent,
              width: '100%',
              textAlign: 'center',
              marginTop: 10,
              marginBottom: -10,
            }}>
              Rezultate
            </Text>
            <Picker
              selectedValue={this.state.language}
              style={{ width: '100%' }}
              mode={'dialog'}
              prompt={'Selecteaza Categorii'}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="10" value="js" />
              <Picker.Item label="20" value="el" />
              <Picker.Item label="50" value="java" />
            </Picker>
          </View>
        </View>
      </Animated.View>
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
