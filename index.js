const TelegramBot = require("node-telegram-bot-api");
const schedule = require("node-schedule");
const fs = require("fs");

process.env.TZ = "Europe/Kiev";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_API_TOKEN, {
  polling: true,
});

const ALEX_CHAT_ID = 961384484;
const MATH_GROUP_ID = -1001520763217;
const TARGET_GROUP = MATH_GROUP_ID;

function sendMessage(link) {
  const sendedMessage = bot.sendMessage(TARGET_GROUP, link, {
    parse_mode: "MarkDown",
  });
}

function check() {
  const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));

  for (const [day, schedule] of Object.entries(config)) {
    for (const [time, link] of Object.entries(schedule)) {
      const [hour, minute] = time.split(":");
      const date = new Date();

      if (date.getHours() === +hour && date.getMinutes() === +minute && date.getDay() === +day && link) {
        sendMessage(link);
      }
    }
  }
}

schedule.scheduleJob("1 * * * * *", check);
