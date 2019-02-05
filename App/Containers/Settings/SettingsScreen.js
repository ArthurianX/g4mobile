import React from 'react'
import { Text, View, Button, FlatList, ScrollView } from 'react-native'
import { Title, Switch, DataTable } from 'react-native-paper'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import SettingsActions from 'App/Stores/Settings/Actions'
import PostsCards from 'App/Components/PostsCards/PostsCards'
import { GetSettingsSelector } from 'App/Stores/Settings/Selectors'
import Style from './SettingsScreenStyle'
import Animations from 'App/Theme/Animations'
import LottieView from 'lottie-react-native'

class SettingsScreen extends React.Component {
  componentDidMount() {
    // this.props.fetchPosts()
  }

  render() {
    return (
      <View style={Style.container}>
        <ScrollView>
          <Title style={Style.title}>Schimbare Setari</Title>
          {/*<Text>{ this.props.settings }</Text>*/}

          <DataTable style={Style.tableStyle}>
            <DataTable.Row style={Style.rowStyle}>
              <DataTable.Cell>Schimba Tema</DataTable.Cell>
              <DataTable.Cell style={{ flex: 0.2 }}>
                <Switch value={this.props.settings.get('theme') ? true : false} onValueChange={ this.props.changeTheme }/>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={Style.rowStyle}>
              <DataTable.Cell>Arata Categoria Articolului</DataTable.Cell>
              <DataTable.Cell style={{ flex: 0.2 }}>
                <Switch value={this.props.settings.get('show_categories') ? true : false} onValueChange={ this.props.changeCategoryVisibility }/>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={Style.rowStyle}>
              <DataTable.Cell>Arata Data Articolului</DataTable.Cell>
              <DataTable.Cell style={{ flex: 0.2 }}>
                <Switch value={this.props.settings.get('show_dates') ? true : false} onValueChange={ this.props.changeDateVisibility }/>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={Style.rowStyle}>
              <DataTable.Cell>Arata Autorul Articolului</DataTable.Cell>
              <DataTable.Cell style={{ flex: 0.2 }}>
                <Switch value={this.props.settings.get('show_author') ? true : false} onValueChange={ this.props.changeAuthorVisibility }/>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={Style.rowStyle}>
              <DataTable.Cell style={Style.disabled}>Notificari Articole Noi</DataTable.Cell>
              <DataTable.Cell style={{ flex: 0.2 }}>
                <Switch disabled value={this.props.settings.get('notifications') ? true : false} onValueChange={ this.props.changeNotificationStatus }/>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </ScrollView>
      </View>
    )
  }
}

SettingsScreen.propsTypes = {
  settings: PropTypes.object,
}

const mapStateToProps = (state) => ({
  settings: GetSettingsSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  changeTheme: () => dispatch(SettingsActions.changeTheme()),
  changeCategoryVisibility: () => dispatch(SettingsActions.changeCategoryVisibility()),
  changeDateVisibility: () => dispatch(SettingsActions.changeDateVisibility()),
  changeAuthorVisibility: () => dispatch(SettingsActions.changeAuthorVisibility()),
  changeNotificationStatus: () => dispatch(SettingsActions.changeNotificationStatus()),
  globalReset: () => dispatch(SettingsActions.globalReset()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen)
