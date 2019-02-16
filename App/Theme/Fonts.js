const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
}

const sourceSans = {
  light: 'SourceSansPro-Light',
  regular: 'SourceSansPro-Regular',
  regularItalic: 'SourceSansPro-Italic',
  bold: 'SourceSansPro-Bold',
  black: 'SourceSansPro-Black',
}

const style = {
  h1: {
    fontSize: size.h1,
    fontFamily: sourceSans.bold,
  },
  h2: {
    fontSize: size.h2,
    fontFamily: sourceSans.bold,
  },
  h3: {
    fontSize: size.h3,
    fontFamily: sourceSans.bold,
  },
  normal: {
    fontSize: size.regular,
    fontFamily: sourceSans.regular,
  },
  light: {
    fontSize: size.regular,
    fontFamily: sourceSans.light,
  },
}

const family = {
  bold: {
    fontFamily: sourceSans.bold,
  },
  normal: {
    fontFamily: sourceSans.regular,
  },
  light: {
    fontFamily: sourceSans.light,
  },
}

export default {
  size,
  style,
  family,
}
