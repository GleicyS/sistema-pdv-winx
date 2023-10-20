const detalharUsuario = async (req, res) => {
    return res.status(200).json(req.usuario);
}

module.exports = detalharUsuario;