import { CleanMarkupService } from './CleanMarkupService'
import { Linking, Share } from 'react-native'
import { LoggingService } from './SentryLoggingService'
import Snackbar from 'react-native-snackbar'

const showSnack = (message) => {
  Snackbar.show({
    title: message,
  })
}

const shareArticle = async (post) => {
  const content = {
    url: post.link,
    message: CleanMarkupService.getPlain(post.excerpt),
    title: post.title,
    dialogTitle: post.title,
    subject: post.title,
  }

  try {
    const result = await Share.share(content)

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
        showSnack('Articol distribuit')
      } else {
        // shared
        showSnack('Articol distribuit')
      }
    } else if (result.action === Share.dismissedAction) {
      showSnack('Articolul nu a fost distribuit')
    }
  } catch (error) {
    LoggingService.log('Share Activity Fail', 'SHARE', error)
  }
}

const openArticle = (link) => {
  Linking.openURL(link).catch((err) => {
    console.error('An error occurred', err)
    LoggingService.log('Open in Browser Fail', 'SHARE', err)
  })
}

export const SharingService = {
  share: shareArticle,
  open: openArticle,
}
