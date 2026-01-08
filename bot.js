require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('🎮 Играй в Крестики-нолики!', {
        reply_markup: {
            inline_keyboard: [[
                { text: '💖 Играть!', web_app: { url: 'https://1acrimosa.github.io/vibecode-task/' } }
            ]]
        }
    });
});

bot.on('web_app_data', async (ctx) => {
    try {
        const data = JSON.parse(ctx.webAppData.data);
        if (data.action === 'victory') {
            await ctx.reply(`🎉 Победа! Промокод выдан: \`${data.code}\``, {
                parse_mode: 'Markdown'
            });
        } else if (data.action === 'defeat') {
            await ctx.reply('😔 Проигрыш. Попробуй еще раз!');
        }
    } catch (e) {
        ctx.reply('Ошибка обработки.');
    }
});

bot.launch();
console.log('Бот запущен!');
