import striptags from 'striptags'
import he from 'he'
import { LoggingService } from './SentryLoggingService'

function getPlain(content) {
  return he.decode(striptags(content, [], '\n'))
}

export const CleanMarkupService = {
  getPlain: LoggingService.wrap(getPlain, 'warning', 'object').bind(this),
}


