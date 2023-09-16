import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "dennis.franecki@ethereal.email",
      pass: "2x4MStyakTuSnbAqxK",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Abdullah Coder" <abdullahCoding@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
};
