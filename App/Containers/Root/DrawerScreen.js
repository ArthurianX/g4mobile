import React, { Component } from 'react'
import PostsScreen from 'App/Containers/Posts/PostsScreen'
import FilteredPostsScreen from 'App/Containers/FilteredPosts/FilteredPostsScreen'
import FeedbackScreen from 'App/Containers/Feedback/FeedbackScreen'
import SettingsScreen from 'App/Containers/Settings/SettingsScreen'
import { IconButton } from 'react-native-paper'
import { createStackNavigator, createDrawerNavigator, DrawerActions } from 'react-navigation'
import Images from '../../Theme/Images'
import { Dimensions, Image } from 'react-native'
import DrawerMenu from 'App/Components/DrawerMenu/DrawerMenu'
import Fonts from 'App/Theme/Fonts'
import SmallLogo from '../../Components/SmallLogo/SmallLogo'
import AboutUs from '../AboutUs/AboutUs'
import ContactScreen from '../Contact/ContactScreen'

// drawer stack
let { height, width } = Dimensions.get('window')
const DrawerStack = createDrawerNavigator(
  {
    Acasa: { screen: PostsScreen },
    'Despre noi': { screen: AboutUs },
    Contact: { screen: ContactScreen },
    Feedback: { screen: FeedbackScreen },
  },
  {
    contentComponent: DrawerMenu,
    drawerWidth: width,
    contentOptions: {
      inactiveTintColor: '#fff',
      labelStyle: {
        ...Fonts.family.normal,
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 0,
        textTransform: 'uppercase',
      },
    },
  }
)

const DrawerScreen = createStackNavigator(
  {
    DrawerStack: { screen: DrawerStack },
  },
  {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => {
      return {
        headerStyle: { backgroundColor: 'white' },
        headerTitle: <SmallLogo />,
        headerLeft: (
          <IconButton
            icon={navigation.state.isDrawerOpen ? 'close' : 'menu'}
            size={25}
            color={'black'}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }
    },
  }
)

export default DrawerScreen

// class DrawerScreen extends Component {
//
//   render() {
//     return (
//       <BottomNavigation
//         labeled={false}
//         activeColor={this.props.theme.text}
//         inactiveColor={this.props.theme.disabled}
//         navigationState={this.state}
//         onIndexChange={this._handleIndexChange}
//         renderScene={this._renderScene}
//       />
//     )
//   }
// }
//
// // {{ color: colors.primary }}
//
// export default withTheme(DrawerScreen);
