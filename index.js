import TelegramBot from 'node-telegram-bot-api'
import fetch from 'node-fetch'
import some adfsfal

process.env.TZ = "Europe/Kiev"

const bot = new TelegramBot(process.env.TELEGRAM_BOT_API_TOKEN, {
  polling: true,
})

const math_group_id = -1001520763217

const fetchSchedule = async () => {
  const res = await fetch('https://raw.githubusercontent.com/AlexMercer324110/NodeJS_telegram_bot/master/config.json', {cache: 'no-cache'})
  return await res.json()
}

setInterval(async () => {
  const json = await fetchSchedule()

  for (const [day, schedule] of Object.entries(json)) {
    for (const [time, message] of Object.entries(schedule)) {
      const [hour, minute] = time.split(":")
      const date = new Date()

      if (date.getHours() === +hour && date.getMinutes() === +minute && date.getDay() === +day && message) {
        bot.sendMessage(math_group_id, message)
        console.log('\n', message, '\n')
      }
    }
  }
}, 1000 * 60)

console.log('Bomb has been planted')
