import React from 'react'
import { createDrawerNavigator, createStackNavigator, DrawerActions } from 'react-navigation'
import PostsScreen from 'App/Containers/Posts/PostsScreen'
import AboutUs from 'App/Containers/AboutUs/AboutUs'
import ContactScreen from 'App/Containers/Contact/ContactScreen'
import FeedbackScreen from 'App/Containers/Feedback/FeedbackScreen'
import DrawerMenu from 'App/Components/DrawerMenu/DrawerMenu'
import Fonts from 'App/Theme/Fonts'
import SmallLogo from 'App/Components/SmallLogo/SmallLogo'
import PostScreen from 'App/Containers/Posts/PostScreen'
import { Dimensions } from 'react-native'
import { IconButton } from 'react-native-paper'

let { height, width } = Dimensions.get('window')

const headerSettings = {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: 'white' },
      headerTitle: (<SmallLogo />),
      headerLeft: (
        <IconButton
          icon={navigation.state.isDrawerOpen ? 'close' : 'menu'}
          size={25}
          color={'#15202A'}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      ),
    }
  },
}
/* Navigation Stacks to have headers */
const PostsStack = createStackNavigator(
  {
    PostsHome: PostsScreen,
    SinglePost: {
      screen: PostScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerStyle: { backgroundColor: 'white' },
          headerTitle: <SmallLogo />,
          headerLeft: (
            <IconButton
              icon="keyboard-backspace"
              size={25}
              color={'#15202A'}
              onPress={() => navigation.goBack()}
            />
          ),
        }
      },
    },
  },
  { ...headerSettings }
)
const AboutStack = createStackNavigator({ AboutHome: AboutUs }, { ...headerSettings })
const ContactStack = createStackNavigator({ ContactHome: ContactScreen }, { ...headerSettings })
const FeedbackStack = createStackNavigator({ FeedbackHome: FeedbackScreen }, { ...headerSettings })

const NavigationStack = createDrawerNavigator(
  {
    Acasa: PostsStack,
    'Despre noi': AboutStack,
    Contact: ContactStack,
    Feedback: FeedbackStack,
  },
  {
    navigationOptions: () => ({
      gesturesEnabled: false,
    }),
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

export default NavigationStack
