let queue = []

function addMessage(message, context) {
  queue.push({ content: message })
  console.log('addMessage', message, queue)
}

export const LocalNotificationsService = {
  queue,
  addMessage,
}
