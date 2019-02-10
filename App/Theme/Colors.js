import { DefaultTheme } from 'react-native-paper'

/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

export default {
  colors: {
    transparent: 'rgba(0,0,0,0)',
  },
  lightTheme: {
    // dark: boolean,
    // roundness: number,
    colors: {
      primary: '#feffff',
      background: '#feffff',
      surface: '#feffff',
      accent: '#5fc1ff',
      // error: string,
      text: '#535553',
      disabled: '#babbbc',
      // placeholder: string,
      backdrop: '#edf0ee',
      bottomNavBg1: '#f7f7f7',
      bottomNavBg2: '#e5e5e5',
      bottomNavBg3: '#f9f9f9',
    },
    fonts: {
      // regular: string,
      // medium: string,
      //light: string,
      // thin: string,
    },
  },
  darkTheme: {
    // dark: boolean,
    // roundness: number,
    colors: {
      primary: '#111214',
      background: '#040506',
      surface: '#111214',
      accent: '#137cd1',
      text: '#d6dbdc',
      // error: string,
      disabled: '#7f8485',
      // placeholder: string,
      // backdrop: string,
      bottomNavBg1: '#040506',
      bottomNavBg2: '#111214',
      bottomNavBg3: '#040506',
    },
    fonts: {
      // regular: string,
      // medium: string,
      //light: string,
      // thin: string,
    },
  },

}
