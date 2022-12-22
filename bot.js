import TelegramBot from 'node-telegram-bot-api'

const admin_chat_id = 961384484

// setup bot
export const bot = new TelegramBot(process.env.TELEGRAM_BOT_API_TOKEN, {
  polling: true,
})

// commands
bot.on('message', async msg => {
  await bot.sendMessage(admin_chat_id, `${JSON.stringify(msg.chat)}\n@${msg.chat.username}`)
  if (msg.text !== '/start') {
    await bot.deleteMessage(msg.chat.id, msg.message_id).catch(() => {})
  }
})
