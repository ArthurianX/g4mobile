import React, { Component } from 'react'
import { createDrawerNavigator, createStackNavigator, DrawerActions } from 'react-navigation'
import NavigationService from 'App/Services/NavigationService'
import { Dimensions, StatusBar, View } from 'react-native'
import styles from './RootScreenStyle'
import { connect } from 'react-redux'
import StartupActions from 'App/Stores/Startup/Actions'
import SettingsActions from 'App/Stores/Settings/Actions'
import { DefaultTheme, IconButton, Provider as PaperProvider } from 'react-native-paper'
import { GetSettingsSelector } from 'App/Stores/Settings/Selectors'
import PostModal from 'App/Components/PostModal/PostModal'
import Colors from 'App/Theme/Colors'
import VersionNumber from 'react-native-version-number'
import PostsScreen from 'App/Containers/Posts/PostsScreen'
import AboutUs from 'App/Containers/AboutUs/AboutUs'
import ContactScreen from 'App/Containers/Contact/ContactScreen'
import FeedbackScreen from 'App/Containers/Feedback/FeedbackScreen'
import DrawerMenu from 'App/Components/DrawerMenu/DrawerMenu'
import Fonts from 'App/Theme/Fonts'
import SmallLogo from 'App/Components/SmallLogo/SmallLogo'

let { height, width } = Dimensions.get('window')

const headerSettings = {
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
/* Navigation Stacks to have headers */
const PostsStack = createStackNavigator({ PostsHome: PostsScreen }, { ...headerSettings })
const AboutStack = createStackNavigator({ AboutHome: AboutUs }, { ...headerSettings })
const ContactStack = createStackNavigator({ ContactHome: ContactScreen }, { ...headerSettings })
const FeedbackStack = createStackNavigator({ FeedbackHome: FeedbackScreen }, { ...headerSettings })

const DrawerStack = createDrawerNavigator(
  {
    Acasa: PostsStack,
    'Despre noi': AboutStack,
    Contact: ContactStack,
    Feedback: FeedbackStack,
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

const lightTheme = {
  ...DefaultTheme,
  roundness: 4,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...Colors.lightTheme.colors,
  },
}

const darkTheme = {
  ...DefaultTheme,
  roundness: 4,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    ...Colors.darkTheme.colors,
  },
}

class RootScreen extends Component {
  componentDidMount() {
    // Run the startup saga when the application is starting
    this.props.checkAppVersion()
    this.props.startup()
  }

  render() {
    const selectedTheme = this.props.settings.get('theme') ? darkTheme : lightTheme
    return (
      <PaperProvider theme={selectedTheme}>
        <StatusBar
          barStyle={this.props.settings.get('theme') ? 'light-content': 'dark-content'}
        />
        <View style={styles.container}>
          <DrawerStack
            // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
            ref={(navigatorRef) => {
              // DEV - Force Open Drawer
              navigatorRef.dispatch(DrawerActions.toggleDrawer())
              // DEV
              NavigationService.setTopLevelNavigator(navigatorRef)
            }}
          />
        </View>
        <PostModal />{/*TODO:REPLACE HTHIS*/}
      </PaperProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  settings: GetSettingsSelector(state),
  notification: state.settings.get('currentNotification'),
})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  checkAppVersion: () => dispatch(SettingsActions.checkAppVersion(VersionNumber)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen)
