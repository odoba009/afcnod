const TelegramSend = async (message) => {
    try {
        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`;
        
        let options = {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "User-Agent":
                    "Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)",
            },
            body: JSON.stringify({
                chat_id: process.env.TELEGRAM_ID,
                text: message,
            })
        };

        await fetch(url, options);
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = TelegramSend;