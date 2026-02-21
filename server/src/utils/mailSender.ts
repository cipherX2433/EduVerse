import nodemailer from "nodemailer";

export const mailSender = async (
    email: string,
    subject: string,
    html: string,
) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    return transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject,
        html,
    });
};