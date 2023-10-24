const nodemailer = require("nodemailer");

const transportador = nodemailer.createTransport({
  port: process.env.EMAIL_PORT,
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const enviar = (para, assunto, corpo) => {
  transportador.sendMail({
    from: process.env.EMAIL_FROM,
    to: para,
    subject: assunto,
    html: corpo,
  });
};

module.exports = enviar;
