import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import NavigationService from 'App/Services/NavigationService'
import { View } from 'react-native'
import styles from './RootScreenStyle'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import { connect } from 'react-redux'
import StartupActions from 'App/Stores/Startup/Actions'
import RootToMainScreen from './RootToMainScreen'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { GetSettingsSelector } from 'App/Stores/Settings/Selectors'

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const AppNav = createStackNavigator(
  {
    // Create the application routes here (the key is the route name, the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    SplashScreen: SplashScreen,
    MainScreen: RootToMainScreen,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'SplashScreen',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    headerMode: 'none',
    mode: 'card',
  }
)

const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#eceff1',
    accent: '#5fc1ff',
    background: '#ddddde',
    surface: '#f1f1f1',
  },
}

const darkTheme = {
  ...DefaultTheme,
  roundness: 2,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1b1b1b',
    accent: '#111439',
    background: '#424242',
    surface: '#6d6d6d',
    text: '#f9f9f9',
  },
}

class RootScreen extends Component {
  componentDidMount() {
    // Run the startup saga when the application is starting
    this.props.startup()
  }

  render() {
    const selectedTheme = this.props.settings.get('theme') ? darkTheme : lightTheme
    return (
      <PaperProvider theme={selectedTheme}>
        <View style={styles.container}>
          <AppNav
            // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef)
            }}
          />
        </View>
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
