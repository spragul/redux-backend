import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();
export const sendmailuser=async(useremail,link)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.G_MAIL,
            pass: process.env.G_MAIL_PASSWORD,
        }
    });
    var mailOptions = {
        from: process.env.G_MAIL,
        to: useremail,
        subject: 'Reset password',
        text: link
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return {  rd:false,error}
        } else {
            return {  rd: true, message: "mail send " }
        }
    });
}