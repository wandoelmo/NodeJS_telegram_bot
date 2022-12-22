import fetch from "node-fetch";

const admin_chat_id = 961384484

export const fetchSchedule = async () => {
  const scheduleUrl = 'https://raw.githubusercontent.com/oleksandrh324110/NodeJS_telegram_bot/master/schedule.json'

  const res = await fetch(scheduleUrl, {cache: 'no=cache'})
  return await res.json()
}

export const fetchUesrs = async () => {
  const usersUrl = 'https://raw.githubusercontent.com/oleksandrh324110/NodeJS_telegram_bot/master/users.json'

  const res = await fetch(usersUrl, {cache: 'no-cache'})
  return await res.json()
}