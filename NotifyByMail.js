var mailer = require("nodemailer");

var mailObj = {
    from: "<from@gmail.com>",
    to: "<to@gmail.com>",
    subject: "Send Email Using Node.js",
    text: "Node.js New world for me",
    html: "<b>Node.js New world for me</b>"
}

async function sendEmail(mail) {
    var smtpTransport = mailer.createTransport({
        service: "gmail",
        auth: {
            user: "<put your username here>",
            pass: "<put your password here>"
        }
    });
    var info = await smtpTransport.sendMail(mail);
    console.log("Message sent: %s", info.messageId);
    smtpTransport.close();
}
exports.mailObj = mailObj;
exports.sendEmail = sendEmail;