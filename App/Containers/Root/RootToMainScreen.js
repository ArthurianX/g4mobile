import React, { Component } from 'react'
import { View } from 'react-native'
import PostsScreen from 'App/Containers/Posts/PostsScreen'
import FilteredPostsScreen from 'App/Containers/FilteredPosts/FilteredPostsScreen'
import FeedbackScreen from 'App/Containers/Feedback/FeedbackScreen'
import SettingsScreen from 'App/Containers/Settings/SettingsScreen'
import { BottomNavigation, Text } from 'react-native-paper';

export default class RootToMainScreen extends Component {
  state = {
    index: 3, // TODO: This changes the main page.
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
    filtered: FilteredPostsScreen,
    settings: SettingsScreen,
    feedback: FeedbackScreen,
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
