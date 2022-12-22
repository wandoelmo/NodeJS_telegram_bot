import TelegramBot from 'node-telegram-bot-api'
import { fetchUesrs } from "./fetch.js";

const admin_chat_id = [961384484, 840090351]

// setup bot
export const bot = new TelegramBot(process.env.TELEGRAM_BOT_API_TOKEN, {
  polling: true,
})

// commands
bot.on('message', async msg => {
  if (!msg.text)
    return
  if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
    if (msg.text.includes('@all') && admin_chat_id.includes(msg.from.id)) {
      const users = await fetchUesrs()
      let all = ''

      for (const user_id of users) {
        all += `<a href="tg://user?id=${user_id}">.</a>`
      }

      await bot.deleteMessage(msg.chat.id, msg.message_id)
      await bot.sendMessage(msg.chat.id, msg.text.replace('@all', all), {parse_mode: 'HTML'})
    }
  } else if (msg.chat.type === 'private') {
    if (msg.text !== '/start') {
      await bot.deleteMessage(msg.chat.id, msg.message_id).catch(() => {})
    }
  }
})
