const TelegramBot = require("node-telegram-bot-api");
const schedule = require("node-schedule");
const fetch = require('node-fetch');

process.env.TZ = "Europe/Kiev";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_API_TOKEN, {
  polling: true,
});

const MATH_GROUP_ID = -1001520763217;
const TARGET_GROUP = MATH_GROUP_ID;

function sendMessage(link) {
  const sendedMessage = bot.sendMessage(TARGET_GROUP, link, {
    parse_mode: "MarkDown",
  });
}

function check() {
  fetch('https://raw.githubusercontent.com/AlexMercer324110/NodeJS_telegram_bot/master/config.json', {cache: 'no-cache'})
    .then(res => res.json())
    .then(json => {
      for (const [day, schedule] of Object.entries(json)) {
        for (const [time, link] of Object.entries(schedule)) {
          const [hour, minute] = time.split(":");
          const date = new Date();

          if (date.getHours() === +hour && date.getMinutes() === +minute && date.getDay() === +day && link) {
            sendMessage(link);
          }
        }
      }
    })
}

schedule.scheduleJob("1 * * * * *", check);
