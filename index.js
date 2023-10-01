const TelegramBot = require('node-telegram-bot-api');
const token = '6554382977:AAHsBW5jT7B3qH4aZAV3Lp-xf0MPw85TR5A';
const bot = new TelegramBot(token, {polling: true});
const webAppUrl = 'https://master--elegant-ganache-a2a951.netlify.app/'

let isWelcomeMessageSent = false; // Флаг для отслеживания отправки приветственного сообщения



// Отправка сообщения с видео
function sendWelcomeMessageWithVideo(chatId, videoUrl) {
    const welcomeMessage = 'Привет! Это приветственное сообщение с видео.';

    bot.sendMessage(chatId, welcomeMessage)
        .then((message) => {
            const messageId = message.message_id;
            bot.sendVideo(chatId, videoUrl, { reply_to_message_id: messageId });
        })
        .catch((error) => {
            console.error('Ошибка при отправке сообщения:', error);
        });
}

// Обработка входящих сообщений
bot.on('message',   async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text


    if (!isWelcomeMessageSent) {
        const videoUrl = 'https://tenor.com/boYmA.gif';
        sendWelcomeMessageWithVideo(chatId,videoUrl)
        isWelcomeMessageSent = true
    }

    if(text === '/start') {
        await bot.sendMessage(chatId,'Приветствую! Для дальнейших действий необходима авторизация', {
            reply_markup: {
                inline_keyboard: [
                    [{text:'Авторизоваться', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }
});

