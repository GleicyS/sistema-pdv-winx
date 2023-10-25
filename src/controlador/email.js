const enviar = require("../servicos/nodemailer");

const html = `
<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body style="font-family: sans-serif;">
    <div style="display: block; margin: auto; max-width: 600px;" class="main">
      <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Seu pedido foi efetuado com sucesso!</h1>
      <p>O seu pedido foi registrado com êxito em nosso sistema.</p>
      <img alt="Pedido Efetuado" src="https://exemplo.com/imagem_pedido_cadastrado.png" style="width: 100%;">
      <p>Obrigado por escolher nossos serviços.</p>
      <p>Qualquer dúvida, entre em contato conosco.</p>
    </div>
    <!-- Estilos de exemplo, você pode personalizá-los conforme necessário -->
    <style>
      .main { background-color: white; }
      a:hover { border-left-width: 1em; min-height: 2em; }
    </style>
  </body>
</html>`;

const enviarEmail = async (req, res) => {
  const { para, assunto, corpo } = req.body;

  enviar(para, assunto, html);

  return res.json({ mensagem: "Email enviado com sucesso" });
};

module.exports = enviarEmail;
