import nodemailer from "nodemailer";

type TSend = {
  email: string;
  url: string;
  token: string;
};
export async function sendLoginEmail({ email, url, token }: TSend) {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 7892,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  const info = await transporter.sendMail({
    from: '"Jane Doe"<j.doe@email.com>',
    to: email,
    subject: "Login to your account",
    // using hash bc we don't want to token to be saved in the browser history
    html: `Login by clicking here <a href=${url}/login#token=${token}`,
  });

  console.log(`Preview url: ${nodemailer.getTestMessageUrl(info)}`);
}
