import { createTransport } from 'nodemailer';

export var mailObj = {
    from: "<from@gmail.com>",
    to: "<to@gmail.com>",
    subject: "Send Email Using Node.js",
    text: "Node.js New world for me",
    html: "<b>Node.js New world for me</b>"
}

export async function sendEmail(mail:any) {
    var smtpTransport = createTransport({
        service: "gmail",
        auth: {
            user: "<put your email here>",
            pass: "<put your password here>"
        }
    });
    var info = await smtpTransport.sendMail(mail);
    console.log("Message sent: %s", info.messageId);
    smtpTransport.close();
}