import { fetchSchedule, fetchUesrs } from "./fetch.js";
import { bot } from "./bot.js";

// basic config
process.env.TZ = "Europe/Kiev"

// bot.sendMessage(-1001520763217, '<a href="tg://user?id=840090351">fadsfas</a>', {parse_mode: 'HTML'})

setInterval(async () => {
  const json = await fetchSchedule()

  for (const [day, schedule] of Object.entries(json)) {
    for (const [time, message] of Object.entries(schedule)) {
      const [hour, minute] = time.split(":")
      const date = new Date()

      if (date.getHours() === +hour && date.getMinutes() === +minute && date.getDay() === +day && message) {
        const users = await fetchUesrs()

        for (let user_id of users) {
          bot.sendMessage(user_id, message).catch(() => {})
        }

        console.log('\n', message, '\n')
      }
    }
  }
}, 1000 * 60)

console.log('Bot has been started')
