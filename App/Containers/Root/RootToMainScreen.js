import React, { Component } from 'react'
import PostsScreen from 'App/Containers/Posts/PostsScreen'
import FilteredPostsScreen from 'App/Containers/FilteredPosts/FilteredPostsScreen'
import FeedbackScreen from 'App/Containers/Feedback/FeedbackScreen'
import SettingsScreen from 'App/Containers/Settings/SettingsScreen'
import { BottomNavigation, Icon, Text, withTheme } from 'react-native-paper'
import SmallLogo from 'App/Components/SmallLogo/SmallLogo'

class RootToMainScreen extends Component {
  state = {
    index: 0, // TODO: MAINSWITCH - This changes the main page.
    routes: [
      { key: 'main', title: 'Articole', icon: 'line-style',
        color: this.props.theme.bottomNavBg1 },
      { key: 'filtered', title: 'Filtrele Mele', icon: 'sort',
        color: this.props.theme.bottomNavBg2 },
      { key: 'logo', title: '', icon: () => (<SmallLogo />) },
      { key: 'settings', title: 'Setari', icon: 'settings',
        color: this.props.theme.bottomNavBg3 },
      { key: 'feedback', title: 'Feedback', icon: 'feedback',
        color: this.props.theme.bottomNavBg1 },
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
        labeled={false}
        activeColor={this.props.theme.text}
        inactiveColor={this.props.theme.disabled}
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    )
  }
}

// {{ color: colors.primary }}

export default withTheme(RootToMainScreen);
