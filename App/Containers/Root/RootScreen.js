import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StatusBar, View } from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import styles from './RootScreenStyle'
import NavigationService from 'App/Services/NavigationService'
import NavigationStack from './NavigationStack'
import StartupActions from 'App/Stores/Startup/Actions'
import SettingsActions from 'App/Stores/Settings/Actions'
import { GetSettingsSelector } from 'App/Stores/Settings/Selectors'
import Colors from 'App/Theme/Colors'
import VersionNumber from 'react-native-version-number'

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
    // Give checkAppVersion 700ms to check vers and clear storage if necessary
    setTimeout(() => this.props.startup(), 700)
  }

  render() {
    const selectedTheme = this.props.settings.get('theme') ? darkTheme : lightTheme
    return (
      <PaperProvider theme={selectedTheme}>
        <StatusBar
          barStyle={this.props.settings.get('theme') ? 'light-content': 'dark-content'}
        />
        <View style={styles.container}>
          <NavigationStack
            // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
            ref={(navigatorRef) => {
              // DEV - Force Open Drawer
              // navigatorRef.dispatch(DrawerActions.toggleDrawer())
              // DEV
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
