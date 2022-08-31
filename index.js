const TelegramBot = require("node-telegram-bot-api");
const schedule = require("node-schedule");
const fs = require("fs");

process.env.TZ = "Europe/Kiev";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_API_TOKEN, {
  polling: true,
});

const ALEX_CHAT_ID = 961384484;
const TEST_GROUP_ID = -1001551171870;
const MATH_GROUP_ID = -1001520763217;
const TARGET_GROUP = MATH_GROUP_ID;

bot.on("message", (message) => {
  if (message.chat.id === ALEX_CHAT_ID) {
    try {
      JSON.parse(message.text);
      fs.writeFileSync("config.json", message.text);
      bot.sendMessage(message.chat.id, "Ok!");
    } catch (err) {
      bot.sendMessage(message.chat.id, "Parse error!");
    }
  }
});

async function sendMessage(link, password = "") {
  const sendedMessage = await bot.sendMessage(TARGET_GROUP, link, {
    parse_mode: "MarkDown",
  });

  if (password) {
    bot.sendMessage(TARGET_GROUP, password);
  }
}

function check() {
  const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));

  for (const [day] of Object.entries(config)) {
    for (const [time, link] of Object.entries(config[day])) {
      const [hour, minute] = time.split(":");
      const mySchedule = `${minute} ${hour} * * ${day}`;

      const date = new Date();
      if (
        date.getHours() == hour &&
        date.getMinutes() == minute &&
        date.getDay() == day
      ) {
        sendMessage(link);
      }
    }
  }
}

schedule.scheduleJob("1 * * * * *", check);
