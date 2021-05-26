import { createTransport } from 'nodemailer';

export let mailObj = {
    from: "<from@gmail.com>",
    to: "<to@gmail.com>",
    subject: "Send Email Using Node.js",
    text: "Node.js New world for me",
    html: "<b>Node.js New world for me</b>"
}

export async function sendEmail(mail:any) {
    const smtpTransport = createTransport({
        service: "gmail",
        auth: {
            user: "<put your email here>",
            pass: "<put your password here>"
        }
    });
    const info = await smtpTransport.sendMail(mail);
    console.log("Message sent: %s", info.messageId);
    smtpTransport.close();
}