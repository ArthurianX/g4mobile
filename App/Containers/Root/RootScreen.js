import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import NavigationService from 'App/Services/NavigationService'
import { StatusBar, View } from 'react-native'
import styles from './RootScreenStyle'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import { connect } from 'react-redux'
import StartupActions from 'App/Stores/Startup/Actions'
import DrawerScreen from './DrawerScreen'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { GetSettingsSelector } from 'App/Stores/Settings/Selectors'
import PostModal from 'App/Components/PostModal/PostModal'
import Colors from 'App/Theme/Colors'
import Notifications from '../../Components/NotificationSnack/Notifications'
import { LocalNotificationsService } from '../../Services/LocalNotificationsService'

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const AppNav = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    MainScreen: DrawerScreen, // Navigation to it happens in StartupSaga.js
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
    mode: 'card',
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
    this.props.startup()

    setTimeout( () => {
      LocalNotificationsService.addMessage('This is a test')
    }, 7000 )

    setTimeout( () => {
      LocalNotificationsService.addMessage('This is another test')
    }, 10000 )
  }

  render() {
    const selectedTheme = this.props.settings.get('theme') ? darkTheme : lightTheme
    return (
      <PaperProvider theme={selectedTheme}>
        <StatusBar
          barStyle={this.props.settings.get('theme') ? 'light-content': 'dark-content'}
        />
        <View style={styles.container}>
          <AppNav
            // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef)
            }}
          />
        </View>
        <PostModal />{/*TODO:REPLACE HTHIS*/}
        <Notifications messages={LocalNotificationsService.queue} />
      </PaperProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  settings: GetSettingsSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen)
