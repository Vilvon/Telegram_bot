const TelegramApi = require("node-telegram-bot-api");
const {gameOptions, againOptions} = require('./options')

const token = "1824802970:AAGM8LRutKIWUqKHP0Ils8p_jZkAb45R0sI";

const bot = new TelegramApi(token, { polling: true });

const chats = {};



const startGame = async (chatId)=>
{
  await bot.sendMessage(
    chatId,
    "Сейчас я отправлю цифру от 0 до 9 и ты должен будешь ее отгадать"
  );
  const a = Math.floor(Math.random() * 10);
  chats[chatId] = a;
  await bot.sendMessage(chatId, "Отгадывай", gameOptions);
}

function start(params) {
  bot.setMyCommands([
    { command: "/start", description: "Начало работы с ботом" },
    { command: "/info", description: "Выводит текущее имя" },
    { command: "/game", description: "Игра на угадайку" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/797/3c0/7973c0af-cfe0-4b01-b08a-707eeeb49041/1.webp"
      );
      return bot.sendMessage(
        chatId,
        `Добро пожаловать в телеграм бот для теста моей рукожопости))`
      );
    }
    if (text === "/info") {
      return bot.sendMessage(chatId, `Тебя зовут ${msg.chat.first_name}`);
    }
    if (text === "/game") {
      return startGame(chatId);
    }
    bot.sendMessage(chatId, "Я тебя не понимаю, попоробуй ещё раз");
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data == chats[chatId]) {
      return await bot.sendMessage(chatId, `Ты угадал ${chats[chatId]}`,againOptions)
    }else if(data === '/again')
    {
      return startGame(chatId)
    }
    else
    {
      return await bot.sendMessage(chatId, `Может в другой раз угодаешь ${chats[chatId]} `,againOptions)
    }
  });
}

start();
