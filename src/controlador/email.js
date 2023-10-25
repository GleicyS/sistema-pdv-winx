const enviar = require("../servicos/nodemailer");

const enviarEmail = async (req, res) => {
  const { para, assunto, corpo } = req.body;

  enviar(para, assunto, html);

  return res.json({ mensagem: "Email enviado com sucesso" });
};

module.exports = enviarEmail;
