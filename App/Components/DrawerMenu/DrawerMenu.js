import React from 'react'
import { IconButton, Surface, Text, Title, withTheme } from 'react-native-paper'
import { Dimensions, ScrollView, StatusBar, View } from 'react-native'
import { SafeAreaView, DrawerActions } from 'react-navigation'
import Styles from './DrawerMenuStyles'
import SmallLogo from 'App/Components/SmallLogo/SmallLogo'
import DrawerNavigatorItems from './DrawerNavigatorItems'
import DonateBanner from 'App/Components/DonateBanner/DonateBanner'

let { height, width } = Dimensions.get('window')

class DrawerMenu extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let {routes,navigation, user} = this.props
    return (
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between'
        }}
        style={[
          Styles.topContainer,
          { backgroundColor: this.props.theme.colors.backdrop },
        ]}>
        <StatusBar
          barStyle={navigation.state.isDrawerOpen ? 'light-content': 'dark-content'}
        />
        <SafeAreaView
          style={[Styles.container, { flexGrow: 1, justifyContent: 'space-between' }]}
          forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={{flex: 0.20}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
              <SmallLogo theme={'dark'} />
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', position: 'absolute'}}>
              <IconButton
                icon={'close'}
                size={25}
                color={'white'}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              />
            </View>

          </View>
          <View style={{flex: 0.50, flexDirection: 'column', justifyContent: 'center'}}>
            <DrawerNavigatorItems style={Styles.drawerItems} {...this.props} />
          </View>
          <View style={{flex: 0.30, flexDirection: 'column', justifyContent: 'flex-end'}}>
            <DonateBanner />
          </View>

        </SafeAreaView>
      </ScrollView>
    )
  }
}

export default withTheme(DrawerMenu)
