import fetch from "node-fetch";

export const fetchSchedule = async () => {
  const scheduleUrl =
    "https://raw.githubusercontent.com/oleksandrh324110/NodeJS_telegram_bot/master/schedule.json";

  const res = await fetch(scheduleUrl, { cache: "no=cache" });
  return (await res.json().catch(console.error)) ?? [];
};

export const fetchUsers = async () => {
  const usersUrl =
    "https://raw.githubusercontent.com/oleksandrh324110/NodeJS_telegram_bot/master/users.json";

  const res = await fetch(usersUrl, { cache: "no-cache" });
  return (await res.json().catch(console.error)) ?? [];
};
