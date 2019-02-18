import striptags from 'striptags'
import he from 'he'

function getPlain(content) {
  return he.decode(striptags(content, [], '\n'))
}

export const CleanMarkupService = {
  getPlain,
}


