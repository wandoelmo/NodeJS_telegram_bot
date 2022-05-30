const TelegramBot = require('node-telegram-bot-api');
const schedule = require('node-schedule');
const config = require('./config.json');

const API_TOKEN = process.env.TELEGRAM_BOT_API_TOKEN;
const bot = new TelegramBot(API_TOKEN, {polling: true});

// const target_group = config.test_group_id;
const target_group = config.math_group_id;

async function send_link(link, password = ''){
	const sended_message = await bot.sendMessage(target_group, link);

    await bot.unpinChatMessage(target_group);
    await bot.pinChatMessage(target_group, sended_message.message_id);

	if(password)
		await bot.sendMessage(target_group, password, {parse_mode: 'MarkDown'});
}

// Monday
schedule.scheduleJob('55 7 * * 1', () => send_link(config.informatics));
schedule.scheduleJob('15 11 * * 1', () => send_link(config.mathematics));
schedule.scheduleJob('45 12 * * 1', () => send_link(config.algebra));

// Tuesday
schedule.scheduleJob('55 7 * * 2', () => send_link(config.discrete_math));
schedule.scheduleJob('15 11 * * 2', () => send_link(config.discrete_math));
schedule.scheduleJob('45 12 * * 2', () => send_link(config.english));

// Wednesday
// schedule.scheduleJob('55 7 * * 3', () => send_link(config.history));
schedule.scheduleJob('15 11 * * 3', () => send_link(config.history));
schedule.scheduleJob('45 12 * * 3', () => send_link(config.protection_of_ukraine, config.protection_of_ukraine_password));

// Thursday
schedule.scheduleJob('55 7 * * 4', () => send_link(config.physical_education));
schedule.scheduleJob('15 11 * * 4', () => send_link(config.foreign_literature));
schedule.scheduleJob('45 12 * * 4', () => send_link(config.economic_theory));

// Friday
schedule.scheduleJob('55 7 * * 5', () => send_link(config.chemistry));
schedule.scheduleJob('15 11 * * 5', () => send_link(config.mathematics));
// schedule.scheduleJob('45 12 * * 5', () => send_link(config.));

// Test every 5 seconds
// schedule.scheduleJob('*/5 * * * * *', () => send_link(config.protection_of_ukraine, config.protection_of_ukraine_password));