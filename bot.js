import TelegramBot from 'node-telegram-bot-api'

const admin1_chat_id = 961384484
const admin2_chat_id = 840090351

// setup bot
export const bot = new TelegramBot(process.env.TELEGRAM_BOT_API_TOKEN, {
  polling: true,
})

// commands
bot.on('message', async msg => {
  if (msg.chat.type === 'private') {
    await bot.sendMessage(admin1_chat_id, `${JSON.stringify(msg.chat)}\n@${msg.chat.username}`)
    await bot.sendMessage(admin2_chat_id, `${JSON.stringify(msg.chat)}\n@${msg.chat.username}`)
    if (msg.text !== '/start') {
      await bot.deleteMessage(msg.chat.id, msg.message_id).catch(() => {})
    }
  }
})
