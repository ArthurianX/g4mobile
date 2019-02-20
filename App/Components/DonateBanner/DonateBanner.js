import React from 'react'
import { Surface, Text, Title } from 'react-native-paper'
import Fonts from 'App/Theme/Fonts'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SharingService } from '../../Services/SharingService'

class DonateBanner extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => SharingService.open('https://www.g4media.ro/doneaza')}>
        <Surface style={Styles.donateSurface}>
          <Title style={Styles.donateTitle}>Doneaza pentru presa pe care o sustii</Title>
          <Text style={Styles.donateText}>G4Media este un non-profit si depinde de tine</Text>
        </Surface>
      </TouchableOpacity>
    )
  }
}

const chickenYellow = '#FFC43A'
const inkBlue = '#15202A'
const Styles = StyleSheet.create({
  donateSurface: {
    backgroundColor: chickenYellow,
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
    paddingBottom: 24,
    borderRadius: 4,
  },
  donateTitle: {
    ...Fonts.family.bold,
    color: inkBlue,
    lineHeight: 22,
  },
  donateText: {
    ...Fonts.family.normal,
    color: inkBlue,
  },
})

export default DonateBanner
