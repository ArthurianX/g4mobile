import React from 'react'
import { withTheme } from 'react-native-paper'
import { Dimensions, ScrollView } from 'react-native'
import { SafeAreaView, DrawerItems } from 'react-navigation'
import Styles from './DrawerMenuStyles'

let { height, width } = Dimensions.get('window')

class DrawerMenu extends React.Component {
  render() {
    return (
      <ScrollView
        alwaysBounceVertical={false}
        style={[
          Styles.topContainer,
          { backgroundColor: this.props.theme.colors.backdrop },
        ]}>
        <SafeAreaView
          style={[Styles.container]}
          forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems style={Styles.drawerItems} {...this.props} />
        </SafeAreaView>
      </ScrollView>
    )
  }
}

export default withTheme(DrawerMenu)