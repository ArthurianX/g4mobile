import React, { Component } from 'react'
import { View } from 'react-native'
import ExampleScreen from 'App/Containers/Example/ExampleScreen'
import PostsScreen from 'App/Containers/Posts/PostsScreen'
import { BottomNavigation, Text, TouchableRipple } from 'react-native-paper';

const AlbumsRoute = () => <Text>Albums</Text>;
const RecentsRoute = () => <Text>Recents</Text>;

export default class RootToMainScreen extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'main', title: 'Articole', icon: 'list' },
      { key: 'filtered', title: 'Filtrele Mele', icon: 'bookmark' },
      { key: 'logo', title: '', icon: 'history' },
      { key: 'settings', title: 'Setari', icon: 'settings' },
      { key: 'feedback', title: 'Feedback', icon: 'help' },
    ],
  };

  _handleIndexChange = index => {
    if (index === 2) {
      return false
    } else {
      this.setState({ index })
    }
  }

  _renderScene = BottomNavigation.SceneMap({
    main: PostsScreen,
    filtered: AlbumsRoute,
    settings: RecentsRoute,
    feedback: RecentsRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    )
  }
}
