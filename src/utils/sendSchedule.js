import { bot } from '../bot.js'
import { fetchSchedule, fetchUsers } from '../utils/fetch.js'

setInterval(async () => {
  const json = await fetchSchedule()

  if (!json) return

  for (const [day, schedule] of Object.entries(json)) {
    for (const [time, message] of Object.entries(schedule)) {
      const [hour, minute] = time.split(':').map((v) => +v)
      const date = new Date()

      if (
        date.getHours() === hour &&
        date.getMinutes() === minute &&
        date.getDay() === +day &&
        message
      ) {
        for (let user_id of await fetchUsers()) {
          bot.sendMessage(user_id, message).catch(console.error)
        }

        console.log('\n', message, '\n')
      }
    }
  }
}, 1000 * 60)
