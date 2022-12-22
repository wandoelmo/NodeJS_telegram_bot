import { fetchSchedule, fetchUesrs } from "./fetch.js";

// basic config
process.env.TZ = "Europe/Kiev"

console.log(await fetchUesrs())

setInterval(async () => {
  const json = await fetchSchedule()

  for (const [day, schedule] of Object.entries(json)) {
    for (const [time, message] of Object.entries(schedule)) {
      const [hour, minute] = time.split(":")
      const date = new Date()

      if (date.getHours() === +hour && date.getMinutes() === +minute && date.getDay() === +day && message) {
        // const users = await fetchUesrs()

        console.log('\n', message, '\n')
      }
    }
  }
}, 1000 * 60)

console.log('Bot has been started')
